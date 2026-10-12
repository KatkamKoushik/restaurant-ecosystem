import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl font-bold text-secondary tracking-wide">
              Sampradaya
            </span>
          </Link>
          <p className="text-background/70 font-light max-w-sm mt-2">
            Where Tradition Meets Taste. Experience a fusion of North Indian, South Indian, and Indo-Chinese flavors in a vibrant family atmosphere.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-xl text-secondary font-medium mb-2">Contact Us</h3>
          
          <div className="flex items-start gap-3 text-background/80 hover:text-secondary transition-colors">
            <MapPin size={20} className="shrink-0 mt-1" />
            <a href="https://maps.google.com/?q=Sampradaya+Restaurant+Hanamkonda" target="_blank" rel="noopener noreferrer" className="text-sm leading-relaxed">
              4th Floor, Kaloji Marg,<br />
              Above Apollo Clinic, Balasamudram,<br />
              Hanamkonda, Telangana 506001
            </a>
          </div>
          
          <div className="flex items-center gap-3 text-background/80 hover:text-secondary transition-colors">
            <Phone size={20} className="shrink-0" />
            <a href="tel:+916303563242" className="text-sm">+91 63035 63242</a>
          </div>
          
          <div className="flex items-center gap-3 text-background/80 hover:text-secondary transition-colors">
            <Mail size={20} className="shrink-0" />
            <a href="mailto:contact@sampradayarestaurant.com" className="text-sm">contact@sampradayarestaurant.com</a>
          </div>
        </div>

        {/* Quick Links & Social */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-xl text-secondary font-medium mb-2">Connect With Us</h3>
          
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/sampradayarestaurant" target="_blank" rel="noopener noreferrer" className="p-2 bg-background/10 rounded-full text-background hover:bg-secondary hover:text-foreground transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
          
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/menu" className="text-sm text-background/70 hover:text-secondary transition-colors">
              Our Menu
            </Link>
            <Link href="/#about" className="text-sm text-background/70 hover:text-secondary transition-colors">
              About Us
            </Link>
            <Link href="/admin" className="text-sm text-background/70 hover:text-secondary transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-background/10 text-center">
        <p className="text-background/50 text-xs tracking-wider uppercase">
          &copy; {new Date().getFullYear()} Sampradaya Multicuisine Family Restaurant. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
