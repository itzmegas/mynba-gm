import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import Providers from "./_layout/providers";
import AppShellLayout from "./_layout/app-shell";

import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYNBA GM",
  description: "A Next.js application for managing NBA teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <AppShellLayout>{children}</AppShellLayout>
        </Providers>
      </body>
    </html>
  );
}
