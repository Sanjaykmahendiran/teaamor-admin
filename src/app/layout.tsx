// app/layout.tsx or app/layout.ts

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";


// Load Nunito font using next/font/google
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tea Amor",
  description: "Admin dashboard for Tea Amor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="antialiased">
        
        <main className="flex flex-col min-h-screen">
          <div className="flex-grow">{children}</div>
        
        </main>
        
      </body>
    </html>
  );
}
