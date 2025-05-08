"use client";

import Link from "next/link";
import Image from "next/image";
import ClientHeader from "./home/clientHeader";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header>
      <div className="header">
        <div className="flex items-center justify-center">
          <Link href="/">
            <Image
              src="/images/logo.png" // or "logo.png" if that's your file
              alt="Hilaac Hotel Logo"
              width={30}
              height={30}
              className="rounded-full mr-0.5 md:mr-2 "
            />
          </Link>
          <Link href={"/"} className="text-2xl">
            {/* Show only 'H' on small screens */}
            <span className="font-extrabold text-[32px] text-amber-600 font-serif tracking-normal italic block md:hidden">
              Hilaac
            </span>
            {/* Show 'H hotel' on larger screens */}
            <span className="hidden md:block">
              <span className="font-extrabold text-[32px] text-amber-600 font-serif tracking-normal italic">
                H{" "}
              </span>
              <span className="text-md font-normal">hotel</span>
            </span>
          </Link>
        </div>

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
            Blogs
          </Link>
          <Link href={"/contact"} className="nav_links">
            Contact
          </Link>
        </nav>

        {/* Client Header */}
        <ClientHeader />

        {/* Mobile Menu Toggle */}

        <div className="md:hidden flex justify-end">
          <button
            className="text-amber-700 font-bold hover:text-[#f27405] transition-all duration-300"
            aria-label="Open Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {isMobileMenuOpen && (
        <div className=" md:hidden bg-amber-300 p-4 fixed top-10 left-0 right-0 z-50 flex justify-between transition-all duration-300">
          <nav className="flex flex-col gap-4 items-start dark:text-black">
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

          {/* Authentication Links */}
          <div>
            <ClientHeader isMobile setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
