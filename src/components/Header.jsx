"use client";

import Link from "next/link";
import ClientHeader from "./home/clientHeader";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header>
      <div className="header">
        {/* Logo */}
        <Link href={"/"} className="font-black text-2xl">
          <span className="font-extrabold text-indigo-700 font-serif tracking-widest">
            Hilaac{" "}
          </span>
          <span className="text-xl font-bold tracking-wider">Hotel</span>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href={"/"} className="nav_links">
            Home
          </Link>
          <Link href={"/about"} className="nav_links">
            About
          </Link>
          <Link href={"/rooms"} className="nav_links">
            Our Rooms
          </Link>
          <Link href={"/blog"} className="nav_links">
            Blog
          </Link>
          <Link href={"/contact"} className="nav_links">
            Contact
          </Link>
        </nav>

        {/* Client Header */}

        {/* Toggle Button For Mobile Menu */}
        <ClientHeader />
        <div className="md:hidden flex justify-end">
          <button
            className="text-white hover:text-[#f27405] transition-colors duration-300"
            aria-label="Open Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-200 p-4 flex justify-end">
          <nav className="flex flex-col gap-4">
            <Link href={"/"} className="nav_links">
              Home
            </Link>
            <Link href={"/about"} className="nav_links">
              About
            </Link>
            <Link href={"/rooms"} className="nav_links">
              Our Rooms
            </Link>
            <Link href={"/facilities"} className="nav_links">
              Facilities
            </Link>
            <Link href={"/blog"} className="nav_links">
              Blog
            </Link>
            <Link href={"/contact"} className="nav_links">
              Contact
            </Link>
          </nav>

          {/* Authentication Links */}
          <div className="mt-4">
            <ClientHeader />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
