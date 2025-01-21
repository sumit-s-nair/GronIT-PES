import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/Background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GronIT | Green Computing Club of PES",
  description:
    "Welcome to GronIT, the Green Computing Club of PES University, where we promote sustainable computing practices and eco-friendly technology.",
  keywords: [
    "GronIT",
    "Green Computing Club",
    "PES University",
    "Sustainability",
    "Eco-friendly Technology",
    "Tech Initiatives",
    "Workshops",
    "Environment",
    "Green Computing",
  ],
  authors: [{ name: "GronIT", url: "https://gronit-pes.vercel.app" }],
  openGraph: {
    title: "GronIT | Green Computing Club of PES",
    description:
      "Discover the GronIT Green Computing Club at PES University. Join us in our mission for sustainable and eco-friendly technology.",
    url: "https://gronit-pes.vercel.app",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
