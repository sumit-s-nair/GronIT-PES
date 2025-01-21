import type { Metadata } from "next";
import "../globals.css";
import { Background } from "@/components/Background";

export const metadata: Metadata = {
  title: "GronIT Admin",
  description: "Green computing club of PES",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <Background
          style={{ zIndex: "-1", position: "fixed" }}
          mask="cursor"
          dots={{
            display: true,
            opacity: 0.4,
            size: "20",
          }}
          gradient={{
            display: true,
            opacity: 0.4,
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: "1" }}>{children}</div>
      </body>
    </html>
  );
}
