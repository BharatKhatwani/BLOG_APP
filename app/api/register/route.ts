import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
// Add at the top of your file
// @ts-ignore
import nodemailer from 'nodemailer';


const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      emailVerified: false,
    },
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Verify Your Email",
    text: `Your OTP is: ${otp}`,
  });

  return NextResponse.json({ success: true, message: "OTP sent to email" });
}
