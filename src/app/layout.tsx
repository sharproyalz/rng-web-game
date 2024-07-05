import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pet RNG Game",
  description:
    "A simulation of Egg Hatching of Pets inspired from Pet Simulator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-bl from-[#f57b7a] to-[#f57b7a]`}
        style={{ fontFamily: "Pixelify Sans, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
