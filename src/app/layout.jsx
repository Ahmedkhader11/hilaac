import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { dark } from "@clerk/themes";
import ThemeProvider from "@/components/home/ThemeProvider";

/* 

*/

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Hilaac Apartment",
  description: "The best hotel in Somaliland",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <ThemeProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased `}
          >
            <ClerkLoaded>
              <Header />
              <main className="min-h-screen mx-auto pt-12  ">{children}</main>
              <Footer />
            </ClerkLoaded>
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
