import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";

export const metadata: Metadata = {
  title: "WEWALLDIFO China Tools",
  description: "เครื่องมือคำนวณต้นทุนและจัดการธุรกิจจีนสำหรับคนไทย",
  icons: {
    icon: "/wewalldifo-logo.png",
    shortcut: "/wewalldifo-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased">{children}</body>
    </html>
  );
}
