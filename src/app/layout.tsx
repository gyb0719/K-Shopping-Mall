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
  title: {
    default: "K-Shop - 프리미엄 온라인 쇼핑몰",
    template: "%s | K-Shop"
  },
  description: "최고의 상품과 서비스로 고객님의 일상을 더 풍요롭게 만들어드립니다. 의류, 전자제품, 가구, 식품 등 다양한 카테고리의 상품을 만나보세요.",
  keywords: "온라인쇼핑, 이커머스, 전자제품, 패션, 홈리빙, 뷰티, 스포츠, 의류, 가구, 식품, K-Shop, 쇼핑몰",
  authors: [{ name: "K-Shop" }],
  creator: "K-Shop Team",
  publisher: "K-Shop",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://kshop.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "K-Shop - 프리미엄 온라인 쇼핑몰",
    description: "최고의 상품과 서비스로 고객님의 일상을 더 풍요롭게 만들어드립니다",
    url: "https://kshop.com",
    siteName: "K-Shop",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "K-Shop - 프리미엄 온라인 쇼핑몰",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K-Shop - 프리미엄 온라인 쇼핑몰",
    description: "최고의 상품과 서비스로 고객님의 일상을 더 풍요롭게",
    images: ["/og-image.jpg"],
    creator: "@kshop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
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
