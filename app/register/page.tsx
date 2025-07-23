'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"register" | "otp">("register");
  const router = useRouter();

  // 1. Register the user
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", form);
      setStep("otp"); // show OTP field
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  // 2. Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/verify-otp", {
        email: form.email,
        otp: otp,
      });
      router.push("/blog");
    } catch (err) {
      console.error("OTP verification failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-md shadow-md border rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            {step === "register" ? "Create Account" : "Verify OTP"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {step === "register" ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="name" className=" py-2">Username</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <Label className="py-2" htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <Label className="py-2" htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <Button className="w-full cursor-pointer" type="submit">
                Register
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button className="w-full" type="submit">
                Verify OTP
              </Button>
            </form>
          )}

          {step === "register" && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm text-muted-foreground">
                  <span className="bg-white px-2">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full flex items-center gap-2 cursor-pointer"
                onClick={() => signIn("google")}
              >
                <FcGoogle className="text-xl" />
                Sign up with Google
              </Button>

              <p className="text-sm text-center mt-4 text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Login
                </Link>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
