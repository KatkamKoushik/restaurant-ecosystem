"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Utensils, Users, Percent, MapPin, Clock, CreditCard, Car, ArrowUp, Snowflake, ChefHat, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { addItem } = useCartStore();

  const handleReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const date = formData.get("date");
    const time = formData.get("time");
    const guests = formData.get("guests");

    const phoneNumber = "916303563242";
    const message = `Hello, I would like to book a table at Sampradaya.\n\n*Reservation Details*\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\n\nPlease confirm my reservation.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const bestsellers = [
    { id: "bs1", name: "Guntur Chicken Fry Biryani", price: 390, image: "/dishes/Biryanis/Guntur_chicken_fry_biryani_serving_202608150112.jpeg", desc: "Fiery, spicy, and perfectly cooked." },
    { id: "bs2", name: "Gongura Paneer Biryani", price: 349, image: "/dishes/Biryanis/Gongura_Paneer_Biryani_served_202608150112.jpeg", desc: "Tangy gongura meets soft paneer." },
    { id: "bs3", name: "Mutton Fry Piece Biryani", price: 450, image: "/dishes/Biryanis/Mutton_fry_biryani_in_handi_202608150113.jpeg", desc: "Tender mutton pieces with aromatic rice." },
    { id: "bs4", name: "Apollo Fish", price: 449, image: "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Apollo_fish_on_ceramic_plate_202608150132.jpeg", desc: "Crispy, spicy, and a local favorite." }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/ambience/1.webp"
            alt="Sampradaya Restaurant Ambience"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory font-bold max-w-4xl leading-tight will-change-transform"
            style={{ color: "var(--color-ivory)" }}
          >
            The Authentic Taste of <span className="text-secondary italic">Hanamkonda</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.8, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl text-ivory/90 max-w-2xl font-light tracking-wide will-change-transform"
            style={{ color: "var(--color-ivory)" }}
          >
            Experience a fusion of North Indian, South Indian, and Indo-Chinese flavors in a vibrant family atmosphere.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.1, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row gap-4 will-change-transform"
          >
            <Link href="/menu" className="px-8 py-4 bg-primary text-ivory rounded-full font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1 flex items-center gap-2">
              <ShoppingBag size={20} />
              Order Now via WhatsApp
            </Link>
            <a href="#reservation" className="px-8 py-4 bg-transparent border border-ivory text-ivory rounded-full font-medium hover:bg-ivory/10 transition-all transform hover:-translate-y-1 flex justify-center items-center">
              Reserve a Table
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features (Why Choose Us) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Utensils, title: "Multi-Cuisine Menu", desc: "Authentic flavors spanning across regions." },
              { icon: Users, title: "Family Ambience", desc: "Premium seating located on the 4th floor." },
              { icon: Percent, title: "Special Offers", desc: "15% discount for students & corporates." },
              { icon: MapPin, title: "Convenient Location", desc: "Heart of Balasamudram with ample parking." }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow will-change-transform">
                <div className="p-4 bg-secondary/10 text-secondary rounded-full mb-4">
                  <feature.icon size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70 font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-ivory">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden will-change-transform"
          >
            <Image
              src="/ambience/2.webp"
              alt="About Sampradaya"
              fill
              className="object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex flex-col items-start will-change-transform"
          >
            <h4 className="text-secondary tracking-widest uppercase font-medium text-sm mb-2">Our Story</h4>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Bringing <span className="text-primary italic">Sampradaya</span> Back To Your Plate
            </h2>
            <p className="text-foreground/80 leading-relaxed font-light mb-6 text-lg">
              Welcome to Sampradaya Multicuisine Family Restaurant, Hanamkonda&apos;s newest destination for food lovers. We pride ourselves on bringing &apos;Sampradaya&apos; (Tradition) back to your plate.
            </p>
            <p className="text-foreground/80 leading-relaxed font-light mb-8 text-lg">
              Whether you are craving the fiery spice of a Guntur Chicken Fry Biryani or the comfort of a buttery Paneer Masala, our chefs use authentic spices and traditional techniques to serve you the perfect meal. Located in the heart of Balasamudram, our restaurant offers a modern yet culturally rich ambiance perfect for family dinners, friendly gatherings, and celebrations.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ChefHat size={32} />
              </div>
              <div>
                <p className="font-serif text-xl font-bold text-foreground">Expert Chefs</p>
                <p className="text-foreground/70 font-light text-sm">Authentic Recipes</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bestsellers Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h4 className="text-secondary tracking-widest uppercase font-medium text-sm mb-2">Signature Dishes</h4>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Our Bestsellers</h2>
            </div>
            <Link href="/menu" className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-bold transition-colors">
              View Full Menu <ArrowRight size={20} />
            </Link>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {bestsellers.map((dish, i) => (
              <motion.div key={i} variants={fadeInUp} className="group will-change-transform flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                    <div className="w-full">
                      <h3 className="font-serif text-xl font-bold text-white mb-1 line-clamp-2">{dish.name}</h3>
                      <p className="text-white/80 font-light text-sm line-clamp-2">{dish.desc}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex items-center justify-between flex-1 bg-white">
                  <p className="font-bold text-xl text-primary font-serif">₹{dish.price}</p>
                  <button 
                    onClick={() => addItem({ ...dish, quantity: 1 })}
                    className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/menu" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold transition-colors">
              View Full Menu <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="py-24 bg-ivory scroll-mt-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            <div className="w-full md:w-1/2 relative min-h-[400px]">
              <Image 
                src="/ambience/4.webp" 
                alt="Table Reservation" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
              <h4 className="text-secondary tracking-widest uppercase font-medium text-sm mb-2">Book a Table</h4>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-8">Make a Reservation</h2>
              <form className="space-y-6" onSubmit={handleReservation}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input name="name" type="text" placeholder="Your Name" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground" />
                  <input name="phone" type="tel" placeholder="Phone Number" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <input name="date" type="date" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground" />
                  <input name="time" type="time" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground" />
                  <select name="guests" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground">
                    <option value="">Guests</option>
                    <option value="1 Person">1 Person</option>
                    <option value="2 People">2 People</option>
                    <option value="3 People">3 People</option>
                    <option value="4 People">4 People</option>
                    <option value="5+ People">5+ People</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold text-lg hover:bg-[#128C7E] transition-colors shadow-lg shadow-[#25D366]/20">
                  Reserve via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Ambience Gallery (Mandatory) */}
      <section className="py-24 bg-foreground text-ivory overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 mb-16 text-center">
          <h4 className="text-secondary tracking-widest uppercase font-medium text-sm mb-2">Experience</h4>
          <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: "var(--color-ivory)" }}>Our Ambience</h2>
          <p className="mt-4 text-ivory/70 max-w-2xl mx-auto font-light">
            A premium dining experience located on the 4th floor, featuring traditional aesthetics and comfortable family seating.
          </p>
        </div>
        
        {/* Horizontal Scroll Gallery */}
        <div className="relative w-full flex overflow-x-hidden">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 px-4 will-change-transform"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="relative w-[300px] md:w-[450px] aspect-[4/3] flex-shrink-0 rounded-2xl overflow-hidden">
                <Image
                  src={`/ambience/${num}.webp`}
                  alt={`Restaurant Ambience ${num}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
          {/* Duplicate for seamless infinite loop */}
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 px-4 will-change-transform"
            aria-hidden="true"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={`dup-${num}`} className="relative w-[300px] md:w-[450px] aspect-[4/3] flex-shrink-0 rounded-2xl overflow-hidden">
                <Image
                  src={`/ambience/${num}.webp`}
                  alt={`Restaurant Ambience ${num}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Physical Menu CTA */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-primary rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/brand/pattern.png')" }} />
            
            <div className="relative z-10 w-full md:w-2/3 text-center md:text-left">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-ivory mb-4">View Our Dine-in Menu</h2>
              <p className="text-ivory/80 text-lg mb-8 font-light max-w-xl">
                Prefer the traditional experience? Browse through our physical menu cards directly on your phone with our high-resolution digital viewer.
              </p>
              <Link href="/physical-menu" className="inline-flex px-8 py-4 bg-secondary text-white rounded-full font-bold hover:bg-secondary/90 transition-all shadow-lg transform hover:-translate-y-1 items-center gap-2">
                Browse Physical Menu <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="relative z-10 w-full md:w-1/3 flex justify-center">
              <div className="relative w-64 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl rotate-3 transform transition-transform hover:rotate-0 duration-500">
                <Image
                  src="/menu/1.webp"
                  alt="Physical Menu Cover"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Amenities */}
      <section className="py-20 bg-background text-foreground">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center"
          >
            {[
              { icon: Clock, label: "Mon–Sun", sub: "11 AM–11 PM" },
              { icon: CreditCard, label: "₹200–₹600", sub: "per person" },
              { icon: CreditCard, label: "Payments", sub: "Cards/UPI/Cash" },
              { icon: Snowflake, label: "AC Seating", sub: "Comfortable dining" },
              { icon: Car, label: "Parking", sub: "Ample space" },
              { icon: ArrowUp, label: "Lift Access", sub: "4th Floor" }
            ].map((service, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center gap-3 will-change-transform">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center">
                  <service.icon size={32} className="text-primary" />
                </div>
                <div>
                  <p className="font-bold text-lg text-foreground">{service.label}</p>
                  <p className="text-foreground/60 text-sm font-light">{service.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Restaurant Footer */}
      <Footer />

      {/* Developer Credits & Contact Footer */}
      <div id="contact" className="w-full">
        <div className="w-full h-[1px] bg-[#C5A059]/40 relative z-30" />
        <footer className="relative overflow-hidden w-full py-14 px-6 sm:px-10 bg-[#0A0A0B]">
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/ambiance/footer-particles.mp4"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

          <div className="relative z-20 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

            {/* Left: Credits */}
            <div className="flex flex-col shrink-0">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-3 font-sans">
                DESIGNED &amp; DEVELOPED BY
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="font-cinzel text-white text-xl sm:text-2xl uppercase tracking-[0.15em] whitespace-nowrap">KOUSHIK KATKAM</h2>
                <h2 className="font-cinzel text-white text-xl sm:text-2xl uppercase tracking-[0.15em] whitespace-nowrap">VYSHNAVI NAGAVELLI</h2>
              </div>
            </div>

            {/* Right: Contact Grid */}
            <div className="grid grid-cols-2 gap-10 md:gap-16 lg:gap-24 text-left md:text-right font-sans">

              {/* Vyshnavi */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col md:items-end">
                  <span className="text-[10px] text-[#C5A059] tracking-widest uppercase mb-1 font-semibold">EMAIL</span>
                  <a href="mailto:nagavellivyshnavi3@gmail.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C5A059] transition-colors duration-300 text-sm tracking-wide">nagavellivyshnavi3@gmail.com</a>
                </div>
                <div className="flex flex-col md:items-end">
                  <span className="text-[10px] text-[#C5A059] tracking-widest uppercase mb-1 font-semibold">LINKEDIN</span>
                  <a href="https://linkedin.com/in/vyshnavi-nagavelli-135465355/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C5A059] transition-colors duration-300 text-sm tracking-wide">in/vyshnavi-nagavelli</a>
                </div>
                <div className="flex flex-col md:items-end">
                  <span className="text-[10px] text-[#C5A059] tracking-widest uppercase mb-1 font-semibold">GITHUB</span>
                  <a href="https://github.com/nagavellivyshnavi" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C5A059] transition-colors duration-300 text-sm tracking-wide">github.com/nagavellivyshnavi</a>
                </div>
              </div>

              {/* Koushik */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col md:items-end">
                  <span className="text-[10px] text-[#C5A059] tracking-widest uppercase mb-1 font-semibold">EMAIL</span>
                  <a href="mailto:koushikkatkam@gmail.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C5A059] transition-colors duration-300 text-sm tracking-wide">koushikkatkam@gmail.com</a>
                </div>
                <div className="flex flex-col md:items-end">
                  <span className="text-[10px] text-[#C5A059] tracking-widest uppercase mb-1 font-semibold">INSTAGRAM</span>
                  <a href="https://instagram.com/koushik_katkam" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C5A059] transition-colors duration-300 text-sm tracking-wide">@koushik_katkam</a>
                </div>
                <div className="flex flex-col md:items-end">
                  <span className="text-[10px] text-[#C5A059] tracking-widest uppercase mb-1 font-semibold">LINKEDIN</span>
                  <a href="https://linkedin.com/in/koushik-katkam" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C5A059] transition-colors duration-300 text-sm tracking-wide">in/koushik-katkam</a>
                </div>
                <div className="flex flex-col md:items-end">
                  <span className="text-[10px] text-[#C5A059] tracking-widest uppercase mb-1 font-semibold">GITHUB</span>
                  <a href="https://github.com/KatkamKoushik" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C5A059] transition-colors duration-300 text-sm tracking-wide">github.com/KatkamKoushik</a>
                </div>
              </div>

            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
