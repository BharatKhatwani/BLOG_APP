import React from 'react';
//  import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

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
} from "@/components/ui/alert-dialog"

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto px-5 py-4">
          {/* Logo */}
          <Link href="/blog" className="text-4xl font-extrabold text-gray-900 cursor-pointer">
            Medium
          </Link>

          {/* Buttons */}
          <div className="flex gap-4">
          {session ? (
  <Link href="/blog/create">
    <Button className="bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer">
      Create
    </Button>
  </Link>
) : (
  <Link href="/login">
    <Button className="bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer">
      Create
    </Button>
  </Link>
)}


            {session ? (
            <form action="/api/auth/signout" method="post">
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button type="button" className="bg-red-600 hover:bg-red-700 text-white font-medium cursor-pointer">
        Logout
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
        <AlertDialogDescription>
          This will sign you out of your account.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
        <AlertDialogAction asChild>
          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer">
            Logout
          </button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</form>

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

      {/* Page Content */}
      <main className="max-w-screen-xl mx-auto px-5 py-6">{children}</main>
    </div>
  );
};

export default Layout;
