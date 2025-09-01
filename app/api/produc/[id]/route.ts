import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import verifyAuth from "@/middleware";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } } 
) {
  const { id } = params;
  const userId = verifyAuth(req);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 401 });

    if (user.role !== "Admin" && product.created_by !== userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    const body = await req.json();
    const updated = await prisma.product.update({
      where: { id },
      data: { ...body, updated_by: userId },
    });

    return NextResponse.json({ message: "Product updated", product: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } } 
) {
  const { id } = params;
  const userId = verifyAuth(req);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 401 });

    if (user.role !== "Admin" && product.created_by !== userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    const deleted = await prisma.product.update({
      where: { id },
      data: { is_deleted: true, updated_by: userId },
    });

    return NextResponse.json({ success: true, message: "Deleted", data: deleted });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
