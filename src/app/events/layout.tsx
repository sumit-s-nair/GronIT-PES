import type { Metadata } from "next";
import "../globals.css";
import { Background } from "@/components/Background";

export const metadata: Metadata = {
  title: "GronIT Events | Green Computing Club of PES",
  description:
    "Stay updated with the latest events and initiatives by the GronIT Green Computing Club of PES University.",
  keywords: [
    "GronIT Events",
    "Green Computing Club",
    "PES University",
    "Sustainability Events",
    "Tech and Environment",
    "Workshops",
    "Seminars",
    "Hackathons",
  ],
  authors: [{ name: "GronIT", url: "https://gronit-pes.vercel.app" }],
  openGraph: {
    title: "GronIT Events | Green Computing Club of PES",
    description:
      "Explore upcoming events organized by GronIT, the Green Computing Club of PES University.",
    url: "https://gronit-pes.vercel.app/events",
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
