'use client';

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  session: Session | null;
};

const Navbar = ({ session }: Props) => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto px-5 py-4">
        {/* Logo */}
        <Link href="/blog" className="text-4xl font-extrabold text-gray-900 cursor-pointer">
          Medium
        </Link>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link href={session ? "/blog/create" : "/login"}>
            <Button className="bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer">
              Create
            </Button>
          </Link>

          {session ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white font-medium cursor-pointer">
                  Logout
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                  <AlertDialogDescription>This will sign you out of your account.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
                    >
                      Logout
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Link href="/login">
              <Button className="bg-gray-800 hover:bg-gray-900 text-white font-medium cursor-pointer">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
