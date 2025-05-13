"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import ThemeContext from "@/context/theme";

const ClientHeader = ({ isMobile = false, setIsMobileMenuOpen = () => {} }) => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const { user, isSignedIn } = useUser();

  return (
    <div
      className={`${
        isMobile ? "flex flex-col gap-y-3" : "hidden md:flex"
      } items-center md:gap-1 md:flex-nowrap`}
    >
      {/* Dashboard Link (visible only for admin users) */}
      {isSignedIn && user?.publicMetadata?.role === "admin" && (
        <Link
          href="/admin"
          className="px-2 py-2 font-bold text-black bg-white rounded-sm ring hover:rounded-full"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Dashboard
        </Link>
      )}

      {/* Dark Mode Toggle */}
      <button
        className="hover:bg-black hover:text-white rounded-full p-2 dark:text-black cursor-pointer"
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
            className="sign_links font-bold py-1 max-sm:px-2 dark:text-black"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="sign_links bg-white hover:bg-amber-600 font-bold px-2 py-1 dark:text-black"
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
