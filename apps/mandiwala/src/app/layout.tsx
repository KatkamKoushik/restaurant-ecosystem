import type { Metadata } from "next";
import { Cinzel, Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { RestaurantSwitcher } from "@restaurant-ecosystem/ui";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mandiwala Arabian Restaurant",
  description: "Experience the authentic taste of Arabia right here in Hanamkonda. Mandiwala Arabian Restaurant is a premier dining destination known for its traditional Mandi dishes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${cinzel.variable} ${montserrat.variable} ${plusJakartaSans.variable} h-full antialiased`}
      >
        <body suppressHydrationWarning className="min-h-full flex flex-col bg-obsidian text-charcoal-light">
          <SmoothScrollProvider>
            <Preloader />
            <Navbar />
            <CartSidebar />
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
              <RestaurantSwitcher currentRestaurantId="mandiwala" className="mt-3 relative z-10" />
            </div>
            {children}
          </SmoothScrollProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
