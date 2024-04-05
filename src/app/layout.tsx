import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ColorModeProvider from "@/providers/ColorModeProvider";

export const metadata: Metadata = {
  title: "내꺼니꺼",
  description: "사기 잡는 안전한 C2C 거래 플랫폼 내꺼니꺼",
  icons: {
    icon: "/favicon.svg",
  },
};

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="내꺼니꺼" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="내꺼니꺼" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={pretendard.className}>
        <ColorModeProvider>{children}</ColorModeProvider>
      </body>
    </html>
  );
}
