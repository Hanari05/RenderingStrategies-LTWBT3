import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Game Library | CSR Demo",
  description: "Thư viện game demo sử dụng Client-Side Rendering trong Next.js 14.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
