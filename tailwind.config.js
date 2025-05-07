// filepath: c:\Users\AHMED KADER\Desktop\FullStack\NextJS\nextJsProjects\hilaac\tailwind.config.ts

const config = {
  darkMode: "class", // Enable dark mode support
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust paths to match your project structure
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2",
        secondary: "#14171A",
        accent: "#657786",
      },
      scale: {
        103: "1.03",
      },
      boxShadow: {
        "custom-glow": "0 0 10px rgba(131, 131, 131, 0.3)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    // ... other plugins
    require("@tailwindcss/transforms"),
  ],
};

export default config;
