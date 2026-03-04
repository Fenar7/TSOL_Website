import type { Metadata } from "next";
import "./globals.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import IntroLoader from "./components/IntroLoader/IntroLoader";
import GlobalHoverEffects from "./components/GlobalHoverEffects/GlobalHoverEffects";

export const metadata: Metadata = {
  title: {
    default: "TSOL — The Shape Of Life | Architecture & Design Studio",
    template: "%s | TSOL Architecture",
  },
  description:
    "TSOL — The Shape Of Life is a timeless architecture and design studio led by Akbar Khan, crafting spaces shaped by lived human experience. Residential, interiors, and landscaping across Kerala since 1991.",
  openGraph: {
    title: "TSOL — The Shape Of Life | Architecture & Design Studio",
    description:
      "Architecture grounded in timeless principles and values. TSOL designs spaces shaped by posture, movement, rest, and belonging.",
    siteName: "TSOL Architecture",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <IntroLoader />
        <GlobalHoverEffects />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

