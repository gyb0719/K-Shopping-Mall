import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K-Shop - 프리미엄 온라인 쇼핑몰",
  description: "최고의 상품과 서비스로 고객님의 일상을 더 풍요롭게 만들어드립니다",
  keywords: "온라인쇼핑, 이커머스, 전자제품, 패션, 홈리빙, 뷰티, 스포츠",
  authors: [{ name: "K-Shop" }],
  openGraph: {
    title: "K-Shop - 프리미엄 온라인 쇼핑몰",
    description: "최고의 상품과 서비스로 고객님의 일상을 더 풍요롭게",
    url: "https://kshop.com",
    siteName: "K-Shop",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          defaultTheme="system"
          storageKey="kshop-theme"
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartSidebar />
          <ChatWidget />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
