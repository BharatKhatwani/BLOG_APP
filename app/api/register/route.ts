// /app/api/register/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpires,
      },
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('REGISTER ERROR:', err); // <== LOG FULL ERROR
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
