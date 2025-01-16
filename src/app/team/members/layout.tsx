// app/members/layout.tsx
import React from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Meet Our Team",
  description: "Learn more about our passionate team members.",
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
