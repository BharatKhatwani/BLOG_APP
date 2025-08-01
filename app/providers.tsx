'use client';

import { SessionProvider } from "next-auth/react";
// import { ThemeProvider } from "@/components/theme/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
     
        {children}
      
    </SessionProvider>
  );
}
