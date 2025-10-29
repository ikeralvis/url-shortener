"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="linkly-theme">
      {children}
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}
