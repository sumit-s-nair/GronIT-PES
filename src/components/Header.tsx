"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

const DesktopNav: React.FC = () => (
  <nav className="hidden md:flex space-x-8 ">
    <Link href="/events" className="text-lg hover:text-green-500 transition">
      Events
    </Link>
    <Link href="/team" className="text-lg hover:text-green-500 transition">
      Team
    </Link>
    <Link href="/blogs" className="text-lg hover:text-green-500 transition">
      Blogs
    </Link>
    <Link href="/about" className="text-lg hover:text-green-500 transition">
      About
    </Link>
  </nav>
);

const MobileNav: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg z-10 flex flex-col items-center justify-center">
    <nav className="flex flex-col space-y-8 text-white text-lg">
      <Link
        href="/events"
        className="hover:text-green-500 transition"
        onClick={toggleMenu}
      >
        Events
      </Link>
      <Link
        href="/team"
        className="hover:text-green-500 transition"
        onClick={toggleMenu}
      >
        Team
      </Link>
      <Link
        href="/blogs"
        className="hover:text-green-500 transition"
        onClick={toggleMenu}
      >
        Blogs
      </Link>
      <Link
        href="/about"
        className="hover:text-green-500 transition"
        onClick={toggleMenu}
      >
        About
      </Link>
    </nav>
  </div>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative sticky top-0 z-50 flex justify-between items-center py-4 px-16 bg-black/70 text-white sm:mx-12 rounded-md shadow-md">
      {/* Logo and Name */}
      <Link href="/">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-black p-1 overflow-hidden">
            <Image
              src="/assets/logo_black.png"
              alt="Logo"
              className="h-12 w-12"
              height={240}
              width={240}
            />
          </div>
          <h1 className="text-2xl font-bold">GronIT</h1>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <DesktopNav />

      {/* Hamburger Icon */}
      <div className="md:hidden relative z-20">
        <button
          onClick={toggleMenu}
          className={`text-3xl transition-all duration-300 ease-in-out ${
            isMenuOpen ? "rotate-90" : ""
          }`}
        >
          {isMenuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <MobileNav toggleMenu={toggleMenu} />}
    </header>
  );
};

export default Header;
