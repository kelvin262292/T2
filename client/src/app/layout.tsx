import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { CartProvider } from "~/contexts/CartContext";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: 'E-commerce 3D Store - Trải nghiệm mua sắm công nghệ 3D',
    template: '%s | E-commerce 3D Store'
  },
  description: 'Khám phá cửa hàng trực tuyến với công nghệ 3D tiên tiến. Xem, tùy chỉnh và mua sắm sản phẩm với trải nghiệm tương tác chân thực. Miễn phí vận chuyển, bảo hành 2 năm.',
  keywords: [
    'ecommerce 3D',
    'mua sắm trực tuyến',
    'công nghệ 3D',
    'sản phẩm điện tử',
    'laptop gaming',
    'smartphone 5G',
    'phụ kiện công nghệ',
    'trải nghiệm 3D',
    'mua sắm tương tác',
    'cửa hàng online Việt Nam'
  ],
  authors: [{ name: 'E-commerce 3D Store', url: 'https://your-domain.com' }],
  creator: 'E-commerce 3D Store Team',
  publisher: 'E-commerce 3D Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
    languages: {
      'vi-VN': '/vi',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'E-commerce 3D Store - Trải nghiệm mua sắm công nghệ 3D',
    description: 'Khám phá cửa hàng trực tuyến với công nghệ 3D tiên tiến. Xem, tùy chỉnh và mua sắm sản phẩm với trải nghiệm tương tác chân thực.',
    url: 'https://your-domain.com',
    siteName: 'E-commerce 3D Store',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'E-commerce 3D Store - Trải nghiệm mua sắm 3D',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-commerce 3D Store - Trải nghiệm mua sắm công nghệ 3D',
    description: 'Khám phá cửa hàng trực tuyến với công nghệ 3D tiên tiến. Xem, tùy chỉnh và mua sắm sản phẩm với trải nghiệm tương tác chân thực.',
    images: ['/twitter-image.jpg'],
    creator: '@your_twitter_handle',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${GeistSans.variable}`}>
      <body className="min-h-screen bg-gray-50">
        <SessionProvider>
          <TRPCReactProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </CartProvider>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
