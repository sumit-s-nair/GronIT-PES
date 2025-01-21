import type { Metadata } from "next";
import "../globals.css";
import { Background } from "@/components/Background";

export const metadata: Metadata = {
  title: "GronIT Members | Green Computing Club of PES",
  description: "Meet the GronIT team members, the driving force behind the Green Computing Club of PES University.",
  keywords: [
    "GronIT Members",
    "Green Computing Club",
    "PES University",
    "Green Computing Team",
    "Sustainability",
    "Technology and Environment",
  ],
  authors: [{ name: "GronIT", url: "https://gronit-pes.vercel.app" }],
  openGraph: {
    title: "GronIT Members | Green Computing Club of PES",
    description: "Discover the team behind GronIT, PES University's Green Computing Club.",
    url: "https://gronit-pes.vercel.app/team",
    siteName: "GronIT",
    images: [
      {
        url: "/assets/logo_black.png",
        width: 800,
        height: 600,
        alt: "GronIT Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Background */}
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

        {/* Main Content */}
        <div style={{ position: "relative", zIndex: "1" }}>{children}</div>
      </body>
    </html>
  );
}
