import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest){
    try {
        const {email , otp} = await req.json();
        if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }
     const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.otp || !user.otpExpires) {
      return NextResponse.json({ error: 'User not found or OTP not requested' }, { status: 404 });
    }
    const isOtpExpired = new Date() > user.otpExpires;

    if (isOtpExpired) {
      return NextResponse.json({ error: 'OTP expired. Please register again.' }, { status: 400 });
    }

 if (user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

     await prisma.user.update({
      where: { email },
      data: {
        emailVerified: true,
        otp: null,
        otpExpires: null,
      },
    });
      return NextResponse.json({ success: true, message: 'Email verified successfully' });

    } catch (err) {
        console.error('[VERIFY_OTP_ERROR]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}