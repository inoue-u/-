import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Quiet North of Japan",
  description: "An independent English-language guide to art, architecture, craft, railways and quiet journeys within Fukushima Prefecture.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
