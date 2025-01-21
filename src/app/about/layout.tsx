import type { Metadata } from "next";
import "../globals.css";
import { Background } from "@/components/Background";

export const metadata: Metadata = {
  title: "GronIT - Green Computing Club of PES",
  description:
    "Discover GronIT, the green computing club of PES University, where innovation meets sustainability. Join us in creating a sustainable future through technology.",
  keywords: [
    "GronIT",
    "Green Computing",
    "PES University",
    "Sustainability",
    "Tech Club",
    "Green Technology",
  ],
  openGraph: {
    title: "GronIT - Green Computing Club of PES",
    description:
      "Discover GronIT, the green computing club of PES University, where innovation meets sustainability. Join us in creating a sustainable future through technology.",
    url: "https://gronit-pes.vercel.app/about",
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
    title: "GronIT - Green Computing Club of PES",
    description:
      "Discover GronIT, the green computing club of PES University, where innovation meets sustainability.",
    images: ["/assets/logo_black.png"],
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
