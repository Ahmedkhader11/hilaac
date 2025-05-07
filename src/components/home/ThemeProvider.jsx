"use client";

import ThemeContext from "@/context/theme";
import { useState, useEffect } from "react";

const ThemeProvider = ({ children }) => {
  const themeFromLocalStorage =
    typeof localStorage !== "undefined" && localStorage.getItem("darkTheme")
      ? JSON.parse(localStorage.getItem("darkTheme"))
      : false;

  const [darkTheme, setDarkTheme] = useState(themeFromLocalStorage);

  useEffect(() => {
    // Apply the dark class to the <html> element
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save the theme to localStorage
    localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
