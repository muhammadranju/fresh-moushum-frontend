import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: {
    default: "Fresh MouShum | ফ্রেশ ফলমূলের বিশ্বস্ত ঠিকানা",
    template: "%s | Fresh MouShum"
  },
  description: "সরাসরি বাগান থেকে আম, লিচুসহ সব ধরণের সিজনাল ফল সংগ্রহ করি এবং আপনাদের কাছে পৌঁছে দেই। টাটকা ও নিরাপদ খাদ্যের বিশ্বস্ত নাম ফ্রেশ মৌসুম।",
  keywords: ["fresh fruits", "mango", "litchi", "organic fruits", "bangladesh", "fresh food", "রাজশাহীর আম", "ফ্রেশ লিচু"],
  authors: [{ name: "Fresh MouShum Team" }],
  creator: "Fresh MouShum",
  publisher: "Fresh MouShum",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://freshmoushum.com",
    siteName: "Fresh MouShum",
    title: "Fresh MouShum | ফ্রেশ ফলমূলের বিশ্বস্ত ঠিকানা",
    description: "সরাসরি বাগান থেকে ফ্রেশ ফলমূল পৌঁছে দিচ্ছি আপনার দোরগোড়ায়। আম, লিচুসহ সব ধরণের সিজনাল ফল অর্ডার করুন।",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fresh MouShum",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fresh MouShum | ফ্রেশ ফলমূলের বিশ্বস্ত ঠিকানা",
    description: "সরাসরি বাগান থেকে ফ্রেশ ফলমূল পৌঁছে দিচ্ছি আপনার দোরগোড়ায়।",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={`${hindSiliguri.variable} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
