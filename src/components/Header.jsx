"use client";

import Link from "next/link";
import Image from "next/image";
import ClientHeader from "./home/clientHeader";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Added Lucide icons

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header>
      <div className="header">
        <div className="flex items-center justify-center ">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Hilaac Hotel Logo"
              width={30}
              height={30}
              className="rounded-full mr-0.5 md:mr-2 "
            />
          </Link>
          <Link href={"/"} className="text-2xl">
            <span className="font-extrabold text-[32px] text-amber-600 font-serif tracking-normal italic block md:hidden">
              Hilaac
            </span>
            <span className="hidden md:block">
              <span className="font-extrabold text-[32px] text-amber-600 font-serif tracking-normal italic">
                H{" "}
              </span>
              <span className="text-md font-normal">hotel</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href={"/"} className="nav_links">
            Home
          </Link>
          <Link href={"/about"} className="nav_links">
            About
          </Link>
          <Link href={"/rooms"} className="nav_links">
            Rooms
          </Link>
          <Link href={"/blog"} className="nav_links">
            Blogs
          </Link>
          <Link href={"/contact"} className="nav_links">
            Contact
          </Link>
        </nav>

        <ClientHeader />

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-amber-700 hover:text-[#f27405] transition-all duration-300 p-2"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" /> // Close icon
            ) : (
              <Menu className="h-6 w-6" /> // Hamburger icon
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-100 rounded-b-2xl p-4 fixed top-12  max-sm:left-0 left-1/2  right-0 z-60 flex flex-col justify-between transition-all duration-300 border-b-2 ">
          <nav className="flex flex-col gap-4 items-start w-full dark:text-black">
            <Link
              href={"/"}
              className="nav_links font-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href={"/about"}
              className="nav_links font-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href={"/rooms"}
              className="nav_links font-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Rooms
            </Link>
            <Link
              href={"/blog"}
              className="nav_links font-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              href={"/contact"}
              className="nav_links font-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>

          <div>
            <ClientHeader isMobile setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
