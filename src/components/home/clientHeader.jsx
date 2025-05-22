"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import Link from "next/link";
import { useContext, useState } from "react";
import ThemeContext from "@/context/theme";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons for dropdown caret

const ClientHeader = ({ isMobile = false, setIsMobileMenuOpen = () => {} }) => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const { user, isSignedIn } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controls the dropdown for both signed-in and signed-out states

  const userRole = user?.publicMetadata?.role || "user";

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
    // When toggling the desktop dropdown, ensure the mobile menu is closed
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLinkClick = () => {
    // Close the dropdown and mobile menu when any link within it is clicked
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className={`${
        isMobile
          ? "flex justify-between pt-4 px-2 w-full"
          : "hidden md:flex items-center md:gap-1 md:flex-nowrap relative" // Added 'relative' for dropdown positioning
      }`}
    >
      {/* Desktop View Logic */}
      {!isMobile && (
        <div className="relative">
          {isSignedIn ? (
            // User is signed in: show Profile/Dashboard link and UserButton in a dropdown
            <button
              onClick={handleDropdownToggle}
              className="flex items-center px-5 py-2 tracking-widest text-black bg-amber-500 font-bold rounded-lg hover:bg-amber-600 hover:text-white outline-none transition-all duration-500 transform hover:scale-103 cursor-pointer "
            >
              {userRole === "admin" ? "Dashboard" : "Profile"}
              {isDropdownOpen ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </button>
          ) : (
            // User is not signed in: show "Get Started" button
            <button
              onClick={handleDropdownToggle}
              className="flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-md transition-all duration-300 focus:ring-amber-500 cursor-pointer transform hover:scale-103"
            >
              Get Started
              {isDropdownOpen ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </button>
          )}

          {/* Slide-down dropdown menu (for both signed-in and signed-out states) */}
          <div
            className={`
              absolute right-[-15px] mt-1.5 w-60 bg-white  text-black rounded-md border-b-2 shadow-lg py-2 px-3
              transform transition-all duration-300 ease-in-out origin-top-right flex flex-col gap-3 cursor-pointer
              ${
                isDropdownOpen
                  ? "scale-y-100 opacity-100 visible"
                  : "scale-y-0 opacity-0 invisible pointer-events-none"
              }
            `}
          >
            {isSignedIn ? (
              // Content when signed in
              <>
                {userRole === "admin" && (
                  <Link
                    href="/admin"
                    className="block px-4 py-3 text-sm text-center  text-white hover:bg-gray-700 border-1 rounded-lg bg-gray-600 mt-2  font-bold tracking-widest transition-all duration-300 transform hover:scale-105"
                    onClick={handleLinkClick}
                  >
                    Dashboard
                  </Link>
                )}
                {userRole === "user" && (
                  <Link
                    href="/profile"
                    className="block px-4 py-3 text-sm text-center  text-white hover:bg-gray-700 border-1 rounded-lg bg-gray-600 mt-2  font-bold tracking-widest transition-all duration-300 transform hover:scale-105"
                    onClick={handleLinkClick}
                  >
                    Profile
                  </Link>
                )}
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button
                  className="w-full flex items-center justify-between px-4 py-4 font-bold text-sm  text-black hover:bg-gray-300 hover:text-black hover:rounded-lg cursor-pointer bg-gray-200 rounded-lg transition-all duration-300 transform hover:scale-103"
                  onClick={() => {
                    const newTheme = !darkTheme;
                    setDarkTheme(newTheme);
                    localStorage.setItem("darkTheme", JSON.stringify(newTheme));
                    // Keep dropdown open if user just toggles theme
                  }}
                >
                  Dark Mode
                  {darkTheme ? (
                    <MdOutlineLightMode className="text-xl" />
                  ) : (
                    <MdDarkMode className="text-xl" />
                  )}
                </button>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <div className="px-4 py-3 flex items-center justify-between  rounded-lg bg-gray-200 hover:bg-gray-300 transition-all duration-300 transform hover:scale-103">
                  <span className="text-sm font-bold tracking-widest">
                    Account
                  </span>
                  <UserButton
                    appearance={{
                      elements: { userButtonAvatarBox: "w-8 h-8" },
                    }}
                  />
                </div>
              </>
            ) : (
              // Content when not signed in
              <>
                <Link
                  href="/sign-in"
                  className="block px-4 py-3 text-sm ring ring-amber-500 text-center rounded-full hover:bg-black hover:text-white text-black font-bold tracking-widest transition-all duration-500 transform hover:scale-105"
                  onClick={handleLinkClick}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="block px-4 py-3 text-sm font-bold tracking-widest bg-black text-center rounded-full text-white hover:text-white transition-all duration-500 transform hover:scale-105 mt-2"
                  onClick={handleLinkClick}
                >
                  Sign Up
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1 mt-3"></div>
                <button
                  className="w-full flex items-center justify-between px-4 py-4 font-bold text-black bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-lg transition-all duration-300 transform hover:scale-103 "
                  onClick={() => {
                    const newTheme = !darkTheme;
                    setDarkTheme(newTheme);
                    localStorage.setItem("darkTheme", JSON.stringify(newTheme));
                    // Keep dropdown open if user just toggles theme
                  }}
                >
                  <span className="border-r-2 pr-7">Dark Mode</span>
                  {darkTheme ? (
                    <MdOutlineLightMode className="text-xl" />
                  ) : (
                    <MdDarkMode className="text-xl" />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile View: Original authentication links and Dark Mode Toggle (always visible) */}
      {isMobile && (
        <div className="flex justify-between w-full mt-6">
          {isSignedIn && (
            <div>
              {userRole === "admin" && (
                <Link
                  href="/admin"
                  className="px-2 py-2 font-bold text-black bg-white rounded-sm ring hover:rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              {userRole === "user" && (
                <Link
                  href="/profile"
                  className="px-4 py-2 tracking-widest text-black bg-amber-500 hover:bg-amber-600 font-bold rounded-lg border-1 "
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              )}
            </div>
          )}

          {
            !isSignedIn ? (
              <div className="flex justify-between gap-2">
                <Link
                  href="/sign-in"
                  className="sign_links font-bold py-1  dark:text-black border-1 hover:bg-black hover:text-white px-4 tracking-widest "
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="sign_links bg-amber-500 hover:bg-amber-600 font-bold px-4 tracking-widest py-2 dark:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : null /* If signed in, the UserButton is already shown for mobile */
          }
          <div className="flex gap-2.5 mr-1">
            <button
              className="hover:bg-black hover:text-white rounded-full p-2 dark:text-black cursor-pointer"
              onClick={() => {
                const newTheme = !darkTheme;
                setDarkTheme(newTheme);
                localStorage.setItem("darkTheme", JSON.stringify(newTheme));
                // setIsMobileMenuOpen(false); // Close mobile menu after theme toggle
              }}
            >
              {darkTheme ? (
                <MdOutlineLightMode className="text-xl" />
              ) : (
                <MdDarkMode className="text-xl" />
              )}
            </button>
            <UserButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientHeader;
