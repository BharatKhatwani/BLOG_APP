import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto px-5 py-4">
          {/* Logo */}
          <Link href='/blog' className="text-4xl font-extrabold text-gray-900 cursor-pointer ">Medium</Link>

          {/* Buttons */}
          <div className="flex gap-4">
            <Link href="/blog/create">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer">
                Create
              </Button>
            </Link>
            <Button className="bg-gray-800 hover:bg-gray-900 text-white font-medium cursor-pointer">
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-screen-xl mx-auto px-5 py-6">{children}</main>
    </div>
  );
};

export default Layout;
