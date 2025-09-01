import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createUserSchema } from "../../../lib/zod";

export async function POST(req: Request) {
  const body = await req.json();
  const parsedData = createUserSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json({ message: "wrong inputs" }, { status: 401 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { username: parsedData.data.username },
  });

  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name: parsedData.data.name,
        username: parsedData.data.username,
        password: hashedPassword,
        role: parsedData.data.role,
      },
    });

    return NextResponse.json({ user, message: "user created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "something went wrong" }, { status: 500 });
  }
}
