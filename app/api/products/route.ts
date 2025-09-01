import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { status: "Published", is_deleted: false },
    });

    return NextResponse.json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      data: products,
    });
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
