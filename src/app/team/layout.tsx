import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "GronIT Members",
  description: "Green computing club of PES",
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
 