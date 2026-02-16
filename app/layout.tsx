import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import "react-datepicker/dist/react-datepicker.css";

import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/providers/ThemeProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orion Rooms",
  description: "Glassmorphism video and audio calls for Orion Rooms",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/icons/logo.svg",
        },
        variables: {
          colorText: "hsl(var(--foreground))",
          colorPrimary: "hsl(var(--primary))",
          colorBackground: "hsl(var(--background))",
          colorInputBackground: "hsl(var(--card))",
          colorInputText: "hsl(var(--foreground))",
          colorDanger: "hsl(var(--destructive))",
          fontFamily: "Manrope, ui-sans-serif",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${manrope.className} min-h-screen bg-app-light text-foreground antialiased transition-colors duration-300 dark:bg-app`}
        >
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
