import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Inter, Playfair_Display, Montserrat, Cinzel } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { LoadingScreen } from "@/components/LoadingScreen";
import { GoldenAura } from "@/components/ui/GoldenAura";
import { RestaurantSwitcher } from "@restaurant-ecosystem/ui";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Aroma Fine Dine Restaurant & Banquet Hall | Premium Dining",
  description: "Experience the Legacy of Authentic Dining in Hanamkonda. Jaw-dropping ambience and the finest flavors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${cinzel.variable} overflow-x-hidden`}
      >
        <body
          suppressHydrationWarning
          className="bg-[#0b0905] text-white min-h-screen overflow-x-hidden max-w-[100vw] flex flex-col selection:bg-[#DFB15B] selection:text-[#0b0905]"
        >
          <GoldenAura />
          <SmoothScrollProvider>
            <LoadingScreen>
              <div className="relative z-10 w-full flex flex-col min-h-screen">
                {/* ══════════════════ TOP VIDEO BANNER ══════════════════ */}
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
                  <RestaurantSwitcher currentRestaurantId="aroma" className="mt-3 relative z-10" />
                </div>
                {/* ═══════════════ END TOP VIDEO BANNER ═══════════════ */}

                {children}
              </div>
            </LoadingScreen>
          </SmoothScrollProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
