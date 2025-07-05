"use client";

import { ThemeProvider as NextThemeProvider, ThemeProviderProps } from "next-themes";
import { cn } from "@/lib/utils"; // assuming you have this utility
import Header from "../layout/header";
import React from "react";

// ✅ Fix: Typo in `interface`
interface ExtendedThemeProviderProps extends ThemeProviderProps {
  containerClassName?: string;
}

// ✅ Fix: Typo in props name + missing type
export function ThemeProvider({
  children,
  containerClassName,
  ...props
}: ExtendedThemeProviderProps) {
  return (
    <NextThemeProvider {...props}>
      <Header />
      <main className={cn("container mx-auto px-4", containerClassName)}>
        {children}
      </main>
    </NextThemeProvider>
  );
}
