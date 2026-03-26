import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: '#738c65',
};

export const metadata: Metadata = {
  title: "Blooms by Beth | Charleston Gardening",
  description: "Bringing Lowcountry charm and timeless elegance to your garden. Professional garden design and landscaping services.",
  keywords: ["garden design", "landscaping", "Lowcountry", "Southern gardens"],
  authors: [{ name: "Beth" }],
  creator: "Beth",
  openGraph: {
    title: "Blooms by Beth | Charleston Gardening",
    description: "Bringing Lowcountry charm and timeless elegance to your garden",
    url: "https://bloomsbybethchs.com", // Update with your actual domain
    siteName: "Blooms by Beth",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: '/flower-favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/flower-favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
