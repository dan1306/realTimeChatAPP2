import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/global.css"
import NavBar from "@/components/NavBar";
import Providers from '@/components/Providers'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  authModal
}: Readonly<{
  children: React.ReactNode;
   authModal: React.ReactNode,
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
        
        <div className="app-content">
          <NavBar />
          {authModal}
          <div className="main-container">
            {children}
          </div>
        </div>
          </Providers>
      </body>
    </html>
  );
}
