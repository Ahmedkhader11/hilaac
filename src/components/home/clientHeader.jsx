"use client";

import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import ThemeContext from "@/context/theme";

const ClientHeader = () => {
  const { isSignedIn } = useUser();
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <div className="hidden md:flex items-center  md:gap-4 md:flex-nowrap  ">
      {/* Dark Mode Toggle */}
      {darkTheme ? (
        <button className="flex justify-center items-center font-extrabold px-2 py-2  hover:bg-black hover:text-white rounded-full">
          <MdOutlineLightMode
            className="cursor-pointer text-xl"
            onClick={() => {
              setDarkTheme(false);
              localStorage.removeItem("darkTheme");
            }}
          />
        </button>
      ) : (
        <button className="flex justify-center items-center font-extrabold px-2 py-2 hover:bg-black hover:text-white rounded-full">
          <MdDarkMode
            className="cursor-pointer text-xl"
            onClick={() => {
              setDarkTheme(true);
              localStorage.setItem("darkTheme", "true");
            }}
          />
        </button>
      )}

      {/* Authentication Links */}
      {isSignedIn ? (
        <div className="flex items-center">
          <UserButton />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href={"/sign-in"} className="sign_links ">
            Sign in
          </Link>
          {/* <Link href={"/sign-up"} className="sign_links">
            Sign up
          </Link> */}
        </div>
      )}
    </div>
  );
};

export default ClientHeader;
