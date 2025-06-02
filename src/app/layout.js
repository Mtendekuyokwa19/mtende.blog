"use client";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Maven_Pro, Inter, Rowdies, Pacifico } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from "./page";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Pacifico({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-pacifico",
});
const maven = Maven_Pro({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-maven-pro",
});
const rowdies = Rowdies({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-rowdies",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata = {
  title: "Mtende's thoughts",
  description: "Mtende's Blog' ",
  icons: {
    icon: [
      {
        url: "/finn.jpg",
        href: "/finn.jpg",
      },
    ],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/finn.jpg" sizes="any" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Analytics />
          <main
            className={`${maven.variable} ${inter.variable} ${rowdies.variable} antialiased flex dark:bg-[#1c2225] dark:text-[#D3C6AA] text-[#232A2E]  bg-[#D3C6AA] flex-col justify-center items-center`}
          >
            <Navbar />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
