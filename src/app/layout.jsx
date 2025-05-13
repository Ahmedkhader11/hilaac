import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  title: "Hilaac Hotel",
  description: "Book your perfect hotel room",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://hilac.vercel.app"
  ),
  openGraph: {
    images: [
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://hilac.vercel.app"
      }/og-image.png`,
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ThemeProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased `}
          >
            <ClerkLoaded>
              <Header />
              <main className="min-h-screen mx-auto pt-10">{children}</main>
              <Footer />
            </ClerkLoaded>
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
