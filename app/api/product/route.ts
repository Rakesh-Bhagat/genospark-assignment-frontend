import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import verifyAuth  from "@/middleware";

export async function POST(req: Request) {
  const userId = verifyAuth(req);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { name, desc, status } = await req.json();

  if (!name || !desc) {
    return NextResponse.json({ success: false, message: "Name and description are required" }, { status: 400 });
  }

  try {
    const product = await prisma.product.create({
      data: { name, desc, status, created_by: userId, updated_by: userId },
    });

    return NextResponse.json({ success: true, message: "Product created", data: product }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
