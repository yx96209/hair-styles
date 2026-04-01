import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURUM — 全自動美髮機",
  description: "精準，始於深度洞察。AI驅動的未來美髮體驗。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
