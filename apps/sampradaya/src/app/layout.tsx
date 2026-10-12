import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { CustomLoadingScreen } from "@/components/CustomLoadingScreen";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Sampradaya | Multicuisine Family Restaurant",
  description: "Experience a fusion of North Indian, South Indian, and Indo-Chinese flavors in a vibrant family atmosphere in Hanamkonda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cinzel.variable} ${montserrat.variable}`}>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
          <CustomLoadingScreen />
          <LenisProvider>
            <div className="w-full py-6 px-4 flex flex-col items-center justify-center text-center relative z-[100] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="/ambiance/gold-particles.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-0 pointer-events-none" />
              <p className="font-montserrat text-[11px] md:text-[13px] font-semibold uppercase text-white tracking-[0.3em] mb-2 relative z-10">
                CURRENTLY AVAILABLE FOR SHOWCASE PURPOSES.
              </p>
              <p
                className="font-cinzel text-sm md:text-base text-white uppercase tracking-[0.3em] relative z-10"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(255, 255, 255, 0.3)" }}
              >
                A CUSTOM WEB EXPERIENCE BUILT BY KOUSHIK &amp; VYSHNAVI.
              </p>
            </div>
            <Navbar />
            <main className="min-h-screen">{children}</main>
          </LenisProvider>
      </body>
    </html>
  );
}
