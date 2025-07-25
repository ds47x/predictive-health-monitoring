'use client';

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from 'react-hot-toast';

interface AppBodyProps {
  children: React.ReactNode;
}

export function AppBody({ children }: AppBodyProps) {
  // We need to know if /assessment uses PageLayout or not.
  // For now, assuming PageLayout is used everywhere except potentially /assessment.
  // If /assessment does not use PageLayout, it won't have a navbar after this change.
  // Let's assume the goal is for PageLayout to provide the navbar on all pages it's used.

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" reverseOrder={false} />
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 