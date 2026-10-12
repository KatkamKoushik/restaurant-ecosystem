import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-charcoal-light border-t border-bronze pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand & About */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-2xl text-gold-royal tracking-widest uppercase">
              Mandiwala
            </h3>
            <p className="text-sm leading-relaxed opacity-80">
              Experience the authentic taste of Arabia right here in Hanamkonda. 
              Traditional Mandi dishes, cooked to perfection with rich spices and 
              served in a cozy, modern setting.
            </p>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-lg text-gold-light tracking-wide uppercase">
              Visit Us
            </h4>
            <div className="space-y-3 opacity-80">
              <p className="flex items-start space-x-3 text-sm">
                <MapPin className="text-gold-royal shrink-0 w-5 h-5" />
                <span>
                  H No. 2-5-287, Nakkala Gutta,<br />
                  Hanamkonda, Warangal,<br />
                  Telangana 506001
                </span>
              </p>
              <p className="flex items-center space-x-3 text-sm">
                <Phone className="text-gold-royal w-5 h-5" />
                <span>+91 85003 71100</span>
              </p>
              <p className="flex items-center space-x-3 text-sm">
                <Clock className="text-gold-royal w-5 h-5" />
                <span>Mon – Sun: 12:00 PM – 11:30 PM</span>
              </p>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-lg text-gold-light tracking-wide uppercase">
              Connect
            </h4>
            <div className="flex space-x-4 mb-6">
              <a href="https://www.instagram.com/mandiwala.official" target="_blank" rel="noreferrer" className="p-2 bg-bronze rounded-full text-gold-royal hover:bg-gold-royal hover:text-obsidian transition-colors">
                <span className="font-cinzel text-sm">Follow Us</span>
              </a>
            </div>
            <div className="flex flex-col space-y-2">
              <Link href="/menu" className="text-sm opacity-80 hover:text-gold-light transition-colors">Full Menu</Link>
              <Link href="/physical-menu" className="text-sm opacity-80 hover:text-gold-light transition-colors">Digital QR Menu</Link>
              <a href="https://maps.google.com/?q=Mandiwala+Arabian+Restaurant+Nakkala+Gutta" target="_blank" rel="noreferrer" className="text-sm opacity-80 hover:text-gold-light transition-colors">
                Get Directions
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-bronze/50 text-center text-sm opacity-50 flex flex-col md:flex-row justify-center items-center">
          <p>&copy; {new Date().getFullYear()} Mandiwala Arabian Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
