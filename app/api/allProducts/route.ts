import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import verifyAuth  from "@/middleware";

export async function GET(req: Request) {
  const userId = verifyAuth(req);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const products = await prisma.product.findMany({
      where:{
        is_deleted: false
      }
    });
    return NextResponse.json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
