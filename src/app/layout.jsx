"use client";
import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Maven_Pro, Rowdies, Pacifico } from "next/font/google";
import "./globals.css";
import { Footer, Navbar, ToTop } from "@/app/components/mdx/Navbar";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/finn.jpg" sizes="any" />
      </head>
      <body className="overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Analytics />

          <div className=" min-h-screen   justify-between  flex dark:bg-[#1c2225] dark:text-[#D3C6AA] text-[#232A2E]  bg-[#d8dee9] flex-col items-center  bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:39px_49px]">
            <Navbar />
            <main
              className={`${maven.variable} ${inter.variable} ${rowdies.variable} antialiased py-0 md:py-12 z-50 flex-col flex justify-center items-center `}
            >
              {children}

              <ToTop />
            </main>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
