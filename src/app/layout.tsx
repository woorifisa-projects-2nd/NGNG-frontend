import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ColorModeProvider from "@/providers/ColorModeProvider";
import UserContext from "@/providers/UserContext";
import UserContextProvider from "@/providers/UserContext";
export const viewport: Viewport = {
  themeColor: "#873EAC",
};
export const metadata: Metadata = {
  applicationName: "내꺼니꺼",
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
    <html lang="ko" dir="ltr">
      <head>
        <link rel="preload" as="image" href="/banners/1.jpg" />
      </head>
      <body className={pretendard.className}>
        <UserContextProvider>
          <ColorModeProvider>{children}</ColorModeProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
