import Link from "next/link";
import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdMail } from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="flex flex-wrap justify-between items-center px-6 py-4 border-t border-gray-800">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} GronIT. All rights reserved.
      </p>
      <div className="flex gap-4">
        <Link
          href="https://www.instagram.com/gronit_pes/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-white duration-300"
        >
          <FaInstagram size={28} />
        </Link>
        <Link
          href="https://www.linkedin.com/company/gron-it-pes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-white duration-300"
        >
          <FaLinkedin size={28} />
        </Link>
        <Link
          href="mailto:"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-white duration-300"
        >
          <MdMail size={28} />
        </Link>
      </div>
    </footer>
  );
};
