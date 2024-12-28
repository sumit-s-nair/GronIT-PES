import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "GronIT Blogs",
  description: "Green computing club of PES",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
