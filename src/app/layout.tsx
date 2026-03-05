import type { Metadata } from "next";
import { Cinzel, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const displayFont = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Jocul celor 7 Biserici",
  description: "Quiz interactiv cu podium pentru cele 7 biserici din Apocalipsa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
