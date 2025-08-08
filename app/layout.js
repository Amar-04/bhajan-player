import "./globals.css";
import Link from "next/link";
import { List, Music } from "lucide-react";

export const metadata = {
  title: "Bhajan App",
  description: "PWA Bhajan Player",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Bhajan App",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* This <head> is optional here — for extra safety, add these manually too */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="pb-16 bg-white">
        {children}
        {/* Bottom Nav */}
        <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full flex justify-around py-2">
          <Link
            href="/"
            className="text-orange-500 text-sm text-center flex flex-col items-center"
          >
            <List className="w-5 h-5 mb-1" />
            Categories
          </Link>
          <Link
            href="/bhajans"
            className="text-orange-500 text-sm text-center flex flex-col items-center"
          >
            <Music className="w-5 h-5 mb-1" />
            All Bhajans
          </Link>
        </nav>
      </body>
    </html>
  );
}
