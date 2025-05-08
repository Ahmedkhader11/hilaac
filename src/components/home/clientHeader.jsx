"use client";

import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import ThemeContext from "@/context/theme";

// Default setIsMobileMenuOpen to an empty function if not provided
const ClientHeader = ({ isMobile = false, setIsMobileMenuOpen = () => {} }) => {
  const { isSignedIn } = useUser();
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${
        isMobile ? "flex flex-col gap-y-3" : "hidden md:flex"
      } items-center md:gap-1 md:flex-nowrap`}
    >
      {/* Dark Mode Toggle */}
      <button
        className="hover:bg-black hover:text-white rounded-full p-2 dark:text-black"
        onClick={() => {
          const newTheme = !darkTheme;
          setDarkTheme(newTheme);
          localStorage.setItem("darkTheme", newTheme ? "true" : "");
          setIsMobileMenuOpen(false);
        }}
      >
        {darkTheme ? (
          <MdOutlineLightMode className="text-xl" />
        ) : (
          <MdDarkMode className="text-xl" />
        )}
      </button>

      {/* Authentication Links */}
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className="flex flex-col md:flex-row gap-2 pl-2">
          <Link
            href="/sign-in"
            className="sign_links font-bold py-1 max-sm:px-2 "
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="sign_links bg-white hover:bg-amber-600 font-bold px-2 py-1 "
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default ClientHeader;
