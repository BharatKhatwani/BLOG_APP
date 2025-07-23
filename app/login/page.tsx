'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Spinner } from "@heroui/spinner";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/blog");
    } else {
      alert("Invalid credentials or email not verified");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-md shadow-md border rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Login to Your Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="py-2">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="password" className="py-2">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm text-muted-foreground">
              <span className="bg-white px-2">Or continue with</span>
            </div>
          </div>


 {/* <Button
  variant="outline"
  className="w-full flex items-center gap-2 cursor-pointer"
  onClick={() => {
    setLoading(true); // show spinner immediately

    setTimeout(() => {
      signIn("google", { callbackUrl: "/blog" });
    }, 1000); // 1-second delay
  }}
>
  {loading ? (
    <Spinner size="sm" />
  ) : (
    <>
      <FcGoogle className="text-xl" />
      Sign up with Google
    </>
  )}
</Button> */}



           <Button
  variant="outline"
  className="w-full flex items-center gap-2 cursor-pointer"
  onClick={() => {
    setLoading(true); // show spinner immediately

    setTimeout(() => {
      signIn("google", { callbackUrl: "/blog" });
    }, 1000); // 1-second delay
  }}
>
  {loading ? (
    <Spinner size="sm" />
  ) : (
    <>
      <FcGoogle className="text-xl" />
      Sign up with Google
    </>
  )}
</Button>


          <p className="text-sm text-center mt-4 text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
