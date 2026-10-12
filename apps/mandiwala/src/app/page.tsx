"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Wifi, Accessibility, Car, Users, Utensils, ChevronRight } from "lucide-react";
import BestSellers from "@/components/BestSellers";
import Footer from "@/components/Footer";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Home() {
  const [resForm, setResForm] = useState({ name: "", phone: "", date: "", time: "", size: "Family / Majlis Room", notes: "" });
  const [resStatus, setResStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setResStatus("loading");
    try {
      await addDoc(collection(db, "reservations"), {
        ...resForm,
        status: "pending",
        createdAt: serverTimestamp()
      });
      setResStatus("success");
      setResForm({ name: "", phone: "", date: "", time: "", size: "Family / Majlis Room", notes: "" });
    } catch (error) {
      console.error(error);
      setResStatus("error");
    }
  };

  return (
    <div className="bg-obsidian text-charcoal-light font-sans selection:bg-gold-royal selection:text-obsidian">
      <main className="flex-1 w-full flex flex-col">
        {/* HERO SECTION */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/dish/Family_mandi_meal_setup_2K_202608150433.jpeg" 
              alt="Family Mandi Meal" 
              fill 
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
            {/* Gradients for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center mt-20">
            <motion.h1 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-light to-gold-royal tracking-widest drop-shadow-xl"
            >
              ROYAL ARABIAN<br/>FEAST
            </motion.h1>
            <motion.p 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="mt-6 text-lg md:text-xl text-charcoal-light max-w-2xl mx-auto font-light tracking-wide opacity-90"
            >
              Experience the authentic taste of Arabia at Mandiwala. 
              Traditional spices, slow-cooked perfection, and royal hospitality.
            </motion.p>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <a href="#reservations" className="w-full sm:w-auto px-8 py-4 bg-gold-royal text-obsidian font-cinzel font-bold tracking-widest uppercase hover:bg-gold-light transition-colors will-change-transform">
                Book Majlis Cabin
              </a>
              <Link href="/menu" className="w-full sm:w-auto px-8 py-4 border border-gold-royal text-gold-royal font-cinzel font-bold tracking-widest uppercase hover:bg-gold-royal/10 transition-colors will-change-transform">
                Explore Menu
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ABOUT US */}
        <section className="py-24 bg-obsidian border-b border-bronze relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="space-y-6">
              <h2 className="font-cinzel text-4xl md:text-5xl text-gold-royal tracking-wide">
                Our Story
              </h2>
              <div className="w-24 h-1 bg-gold-royal/50" />
              <p className="text-lg leading-relaxed text-charcoal-light/80">
                Experience the authentic taste of Arabia right here in Hanamkonda. Mandiwala Arabian Restaurant is a premier dining destination known for its traditional Mandi dishes, cooked to perfection with rich spices and served in a cozy, modern setting.
              </p>
              <p className="text-lg leading-relaxed text-charcoal-light/80">
                Whether you are planning a family dinner or a hangout with friends, our private dining areas and warm hospitality ensure a memorable meal every time.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-bronze shadow-[0_20px_50px_rgba(0,0,0,0.5)] will-change-transform">
              <Image src="/ambience/innerview3.jpeg" alt="Mandiwala Interior" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-1000" />
            </motion.div>
          </div>
        </section>

        {/* SIGNATURE MENU HIGHLIGHTS */}
        <section className="py-24 bg-charcoal relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16 space-y-4">
              <h2 className="font-cinzel text-4xl md:text-5xl text-gold-royal tracking-wide">Our Best Sellers</h2>
              <p className="text-charcoal-light/70 max-w-2xl mx-auto">The most loved dishes by our guests, cooked to perfection.</p>
            </motion.div>
            <BestSellers />
            
            <div className="mt-16 text-center">
              <Link href="/menu" className="inline-block px-8 py-4 border border-gold-royal text-gold-royal font-cinzel tracking-widest uppercase hover:bg-gold-royal hover:text-obsidian transition-colors">
                View Full Menu
              </Link>
            </div>
          </div>
        </section>

        {/* PHYSICAL MENU CTA */}
        <section className="py-24 bg-obsidian border-t border-bronze relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#111111] border border-bronze/50 rounded-2xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
              <h3 className="text-gold-royal text-xs md:text-sm font-bold tracking-widest uppercase mb-4">Complete Dining Experience</h3>
              <h2 className="font-cinzel text-3xl md:text-5xl text-white mb-6">Looking for our full menu?</h2>
              <p className="text-charcoal-light/70 max-w-2xl mx-auto mb-10 text-base md:text-lg">
                Our physical menu features the complete selection of our Royal Mandi specialties, authentic Arabian drinks, and exclusive seasonal offerings.
              </p>
              <Link href="/physical-menu" className="inline-flex items-center space-x-2 px-6 md:px-8 py-3 border border-gold-royal/50 text-gold-royal rounded-full hover:bg-gold-royal hover:text-obsidian transition-colors font-medium">
                <span>View Physical Menu</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
        {/* AMENITIES */}
        <section className="py-24 bg-obsidian border-y border-bronze">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-6 border border-bronze rounded-lg bg-charcoal/30 flex flex-col items-center">
                <Users className="w-12 h-12 text-gold-royal mb-4" strokeWidth={1} />
                <h4 className="font-cinzel text-lg text-gold-light mb-2">Private Majlis</h4>
                <p className="text-sm text-charcoal-light/60">Exclusive dining cabins for families</p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-6 border border-bronze rounded-lg bg-charcoal/30 flex flex-col items-center">
                <Wifi className="w-12 h-12 text-gold-royal mb-4" strokeWidth={1} />
                <h4 className="font-cinzel text-lg text-gold-light mb-2">Free Wi-Fi</h4>
                <p className="text-sm text-charcoal-light/60">High-speed internet for our guests</p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-6 border border-bronze rounded-lg bg-charcoal/30 flex flex-col items-center">
                <Accessibility className="w-12 h-12 text-gold-royal mb-4" strokeWidth={1} />
                <h4 className="font-cinzel text-lg text-gold-light mb-2">Accessible</h4>
                <p className="text-sm text-charcoal-light/60">Wheelchair ramps and restrooms</p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-6 border border-bronze rounded-lg bg-charcoal/30 flex flex-col items-center">
                <Car className="w-12 h-12 text-gold-royal mb-4" strokeWidth={1} />
                <h4 className="font-cinzel text-lg text-gold-light mb-2">Parking</h4>
                <p className="text-sm text-charcoal-light/60">Dedicated spaces & drive-through</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AMBIENCE */}
        <section id="ambience" className="py-24 bg-charcoal border-y border-bronze">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <h2 className="font-cinzel text-3xl md:text-4xl text-gold-royal tracking-wide mb-4">Our Ambience</h2>
              <p className="text-charcoal-light/70 max-w-2xl mx-auto">
                Step into a world of Arabian hospitality. Our thoughtfully designed interiors and private Majlis seating offer the perfect setting for unforgettable dining experiences.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-2 lg:row-span-2 relative h-64 lg:h-full rounded-2xl overflow-hidden group">
                <Image src="/ambience/innerview.jpeg" alt="Interior View" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                <Image src="/ambience/outerview1.png" alt="Exterior View" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                <Image src="/ambience/innerview3.jpeg" alt="Majlis Seating" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                <Image src="/ambience/outerview3.jpeg" alt="Restaurant Exterior" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} className="relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                <Image src="/ambience/innerview2.jpeg" alt="Dining Area" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              {/* Added missing 2 images */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }} className="lg:col-span-2 relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                <Image src="/ambience/innerview4.jpeg" alt="Private Dining" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.7 }} className="lg:col-span-2 relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                <Image src="/ambience/outerview2.jpeg" alt="Restaurant Front" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-obsidian relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-royal/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-cinzel text-3xl md:text-4xl text-gold-royal tracking-wide mb-4">What Our Guests Say</h2>
              <div className="flex justify-center items-center space-x-2 text-gold-royal mb-4">
                <span className="font-bold text-xl">4.3</span>
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-charcoal-light/70 uppercase tracking-widest text-sm">Based on Google Reviews</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Review 1 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-8 bg-charcoal border border-bronze/50 hover:border-gold-royal/50 transition-colors rounded-2xl relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex space-x-1 text-amber-500">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    {/* Google G Logo Badge */}
                    <div className="flex items-center space-x-1 opacity-80">
                       <span className="font-bold text-sm bg-white rounded-full w-5 h-5 flex items-center justify-center text-blue-600 border border-gray-200">G</span>
                       <span className="text-xs text-charcoal-light/60">Google Review</span>
                    </div>
                  </div>
                  <p className="text-lg font-light leading-relaxed text-charcoal-light mb-8">
                    "Excellent authentic Arabian cuisine with generous portion sizes. The Chicken Fry Piece Mandi and Majlis seating made it a perfect family dinner!"
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#1e8e3e] flex items-center justify-center text-white font-medium text-lg">
                    R
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gold-light">Rahul Kumar</div>
                    <div className="text-xs text-charcoal-light/50">Local Guide · 12 reviews</div>
                  </div>
                </div>
              </motion.div>

              {/* Review 2 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} className="p-8 bg-charcoal border border-bronze/50 hover:border-gold-royal/50 transition-colors rounded-2xl relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex space-x-1 text-amber-500">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <div className="flex items-center space-x-1 opacity-80">
                       <span className="font-bold text-sm bg-white rounded-full w-5 h-5 flex items-center justify-center text-blue-600 border border-gray-200">G</span>
                       <span className="text-xs text-charcoal-light/60">Google Review</span>
                    </div>
                  </div>
                  <p className="text-lg font-light leading-relaxed text-charcoal-light mb-8">
                    "The ambience is very cozy and premium. Tried the Mutton Juicy Mandi, and the meat was perfectly slow-roasted and incredibly tender. Great value for money."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#fbbc04] flex items-center justify-center text-white font-medium text-lg">
                    S
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gold-light">Srinivas Reddy</div>
                    <div className="text-xs text-charcoal-light/50">2 reviews</div>
                  </div>
                </div>
              </motion.div>

              {/* Review 3 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.4 }} className="p-8 bg-charcoal border border-bronze/50 hover:border-gold-royal/50 transition-colors rounded-2xl relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex space-x-1 text-amber-500">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <div className="flex items-center space-x-1 opacity-80">
                       <span className="font-bold text-sm bg-white rounded-full w-5 h-5 flex items-center justify-center text-blue-600 border border-gray-200">G</span>
                       <span className="text-xs text-charcoal-light/60">Google Review</span>
                    </div>
                  </div>
                  <p className="text-lg font-light leading-relaxed text-charcoal-light mb-8">
                    "Best place for Mandi in Hanamkonda. The private dining areas are great for hanging out with friends. Don't leave without trying the Double Ka Meetha!"
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#1a73e8] flex items-center justify-center text-white font-medium text-lg">
                    M
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gold-light">Mohammed Ali</div>
                    <div className="text-xs text-charcoal-light/50">Local Guide · 47 reviews</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* RESERVATIONS */}
        <section id="reservations" className="py-24 bg-obsidian border-t border-bronze">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="font-cinzel text-4xl text-gold-royal tracking-wide mb-4">Reserve a Majlis</h2>
              <p className="text-charcoal-light/70">Secure your private dining experience.</p>
            </motion.div>

            <motion.form 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              onSubmit={handleReservation}
              className="bg-charcoal p-8 md:p-12 border border-bronze rounded-xl shadow-2xl space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-cinzel text-gold-light uppercase tracking-wider">Full Name</label>
                  <input required value={resForm.name} onChange={e => setResForm({...resForm, name: e.target.value})} type="text" className="w-full bg-obsidian border border-bronze rounded-md px-4 py-3 text-charcoal-light focus:outline-none focus:border-gold-royal transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-cinzel text-gold-light uppercase tracking-wider">Phone Number</label>
                  <input required value={resForm.phone} onChange={e => setResForm({...resForm, phone: e.target.value})} type="tel" className="w-full bg-obsidian border border-bronze rounded-md px-4 py-3 text-charcoal-light focus:outline-none focus:border-gold-royal transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-cinzel text-gold-light uppercase tracking-wider">Date</label>
                  <input required value={resForm.date} onChange={e => setResForm({...resForm, date: e.target.value})} type="date" className="w-full bg-obsidian border border-bronze rounded-md px-4 py-3 text-charcoal-light focus:outline-none focus:border-gold-royal transition-colors [color-scheme:dark]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-cinzel text-gold-light uppercase tracking-wider">Time</label>
                  <input required value={resForm.time} onChange={e => setResForm({...resForm, time: e.target.value})} type="time" className="w-full bg-obsidian border border-bronze rounded-md px-4 py-3 text-charcoal-light focus:outline-none focus:border-gold-royal transition-colors [color-scheme:dark]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-cinzel text-gold-light uppercase tracking-wider">Seating Type</label>
                <select value={resForm.size} onChange={e => setResForm({...resForm, size: e.target.value})} className="w-full bg-obsidian border border-bronze rounded-md px-4 py-3 text-charcoal-light focus:outline-none focus:border-gold-royal transition-colors appearance-none">
                  <option>Single (1-2 pax)</option>
                  <option>Half (2-3 pax)</option>
                  <option>Family / Majlis Room (4-6 pax)</option>
                  <option>Large Group (6+ pax)</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                disabled={resStatus === "loading"}
                className="w-full py-4 mt-4 bg-gold-royal text-obsidian font-cinzel font-bold tracking-widest uppercase hover:bg-gold-light transition-colors disabled:opacity-50"
              >
                {resStatus === "loading" ? "Submitting..." : resStatus === "success" ? "Request Sent!" : "Confirm Reservation"}
              </button>
              
              {resStatus === "success" && (
                <p className="text-green-400 text-center mt-4 text-sm">Your reservation request has been received. We will contact you shortly to confirm.</p>
              )}
              {resStatus === "error" && (
                <p className="text-red-400 text-center mt-4 text-sm">Failed to submit reservation. Please try again or call us.</p>
              )}
            </motion.form>
          </div>
        </section>

        {/* LOCATION / MAP */}
        <section className="py-24 bg-charcoal border-t border-bronze">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="font-cinzel text-3xl md:text-4xl text-gold-royal tracking-wide mb-4">Find Us</h2>
              <p className="text-charcoal-light/70 max-w-2xl mx-auto">
                Located in the heart of Hanamkonda. Visit us to experience the finest authentic Arabian cuisine.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="w-full h-[450px] rounded-xl overflow-hidden border border-bronze shadow-[0_0_30px_rgba(212,175,55,0.05)]"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.8198925039424!2d79.55221512494971!3d17.99863143299656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334ff07ba8698f%3A0xf1f64b9e8894722c!2sMandiwala%20Arabian%20Restaurant!5e1!3m2!1sen!2sin!4v1786731752842!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* RESTAURANT FOOTER */}
        <Footer />

        {/* DEVELOPER CREDITS & CONTACT FOOTER */}
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
      </main>
    </div>
  );
}
