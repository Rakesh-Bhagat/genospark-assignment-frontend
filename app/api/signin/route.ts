import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { signinSchema } from "../../../lib/zod";

export async function POST(req: Request) {
  const body = await req.json();
  const parsedData = signinSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json({ message: "wrong inputs" }, { status: 401 });
  }

  const user = await prisma.user.findFirst({
    where: { username: parsedData.data.username },
  });

  if (!user) {
    return NextResponse.json({ message: "No user exists" }, { status: 403 });
  }

  const correctPassword = await bcrypt.compare(parsedData.data.password, user.password);
  if (!correctPassword) {
    return NextResponse.json({ message: "Wrong password" }, { status: 403 });
  }

  const token = jwt.sign(
    { userId: user.id, name: user.name },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return NextResponse.json({ token, message: "signin successful" }, { status: 200 });
}
