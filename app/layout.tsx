import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/sidebar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "一码检查智慧巡查平台",
  description: "智能化巡查管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        geist.variable
      )}>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4">
              <span className="font-semibold">一码检查智慧巡查平台</span>
            </div>
          </header>
          <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr]">
            <Sidebar className="hidden md:block" />
            <main className="flex w-full flex-col overflow-hidden">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
