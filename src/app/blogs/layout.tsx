import type { Metadata } from "next";
import "../globals.css";
import { Background } from "@/components/Background";

export const metadata: Metadata = {
  title: "GronIT Blogs | Green Computing Club of PES",
  description:
    "Dive into the latest blogs from GronIT, the Green Computing Club of PES University. Explore insights, innovations, and sustainability tips in technology.",
  keywords: [
    "GronIT",
    "Green Computing",
    "PES University",
    "Tech Blogs",
    "Sustainability Blogs",
    "Green Technology Insights",
  ],
  openGraph: {
    title: "GronIT Blogs - Green Computing Club of PES",
    description:
      "Explore blogs from GronIT, where technology meets sustainability. Stay informed on the latest in green computing and sustainable innovations.",
    url: "https://gronit-pes.vercel.app/blogs",
    type: "website",
    images: [
      {
        url: "/assets/logo_black.png",
        width: 800,
        height: 600,
        alt: "GronIT Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GronIT Blogs - Green Computing Club of PES",
    description:
      "Stay updated with GronIT blogs featuring green computing insights, tech sustainability tips, and more from PES University.",
    images: [
      "/assets/logo_black.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Background Component */}
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
        <main
          style={{ position: "relative", zIndex: "1" }}
          role="main"
          className="min-h-screen"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
