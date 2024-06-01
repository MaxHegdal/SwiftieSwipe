import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SwiftieSwipe",
  description: "En app för att swipea bland Taylor Swifts låtar",
  image: "./taylorHead.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-gray-900 via-pink-900 to-gray-900 text-gray-50`}>{children}</body>
    </html>
  );
}
