'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/* ─────────────────────────────────────────────
   OCCASION OPTIONS
   ───────────────────────────────────────────── */
const OCCASIONS = [
  'Birthday',
  'Anniversary',
  'Corporate Event',
  'Engagement',
  'Family Gathering',
  'Date Night',
  'Other',
];

/* ─────────────────────────────────────────────
   TABLE RESERVATION SECTION
   ───────────────────────────────────────────── */
export function TableReservation() {
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    guests: '2',
    occasion: '',
    date: '',
    time: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsApp = () => {
    const { fullName, mobile, guests, occasion, date, time } = form;

    // Format date for display
    let formattedDate = date;
    if (date) {
      const d = new Date(date);
      formattedDate = d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    }

    const message = encodeURIComponent(
      `🍽️ *Table Reservation Request – Aroma Fine Dine*\n\n` +
        `👤 Name: ${fullName || 'Not provided'}\n` +
        `📞 Mobile: ${mobile || 'Not provided'}\n` +
        `👥 Guests: ${guests}\n` +
        `🎉 Occasion: ${occasion || 'Not specified'}\n` +
        `📅 Date: ${formattedDate || 'Not specified'}\n` +
        `⏰ Time: ${time || 'Not specified'}\n\n` +
        `Please confirm my reservation. Thank you! 🙏`
    );

    // Aroma's WhatsApp numbers
    const phone = '917331122436';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const isFormReady = form.fullName && form.mobile;

  return (
    <section
      id="reservation"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20"
    >
      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-14"
      >
        <p className="text-[#C5A059] text-xs font-bold tracking-[0.25em] uppercase mb-3">
          Plan a Grand Celebration
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-white">
          Table Reservation
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="
          grid grid-cols-1 lg:grid-cols-2
          rounded-2xl overflow-hidden border border-[#C5A059]/20
          bg-[#0E0E10] shadow-[0_0_60px_rgba(0,0,0,0.5)]
        "
      >
        {/* ── LEFT: Image ── */}
        <div className="relative min-h-[300px] lg:min-h-[520px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=85&auto=format&fit=crop"
            alt="Arabian cocktail drink at Aroma Fine Dine"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#0E0E10]/60 lg:to-[#0E0E10]" />
          {/* Bottom overlay for mobile */}
          <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-[#0E0E10] via-transparent to-transparent" />
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
          {/* Row 1: Full Name + Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative group">
              <input
                id="res-fullname"
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="
                  w-full bg-[#1A1A1E] border border-neutral-800 rounded-xl
                  px-4 py-3.5 text-white text-sm placeholder-neutral-500
                  focus:outline-none focus:border-[#C5A059]/60 focus:bg-[#1E1E22]
                  transition-all duration-300
                  group-hover:border-neutral-700
                "
              />
            </div>
            <div className="relative group">
              <input
                id="res-mobile"
                name="mobile"
                type="tel"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                className="
                  w-full bg-[#1A1A1E] border border-neutral-800 rounded-xl
                  px-4 py-3.5 text-white text-sm placeholder-neutral-500
                  focus:outline-none focus:border-[#C5A059]/60 focus:bg-[#1E1E22]
                  transition-all duration-300
                  group-hover:border-neutral-700
                "
              />
            </div>
          </div>

          {/* Row 2: Guests + Occasion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <select
                id="res-guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="
                  w-full bg-[#1A1A1E] border border-neutral-800 rounded-xl
                  px-4 py-3.5 text-white text-sm
                  focus:outline-none focus:border-[#C5A059]/60 focus:bg-[#1E1E22]
                  transition-all duration-300 appearance-none cursor-pointer
                  hover:border-neutral-700
                "
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((n) => (
                  <option key={n} value={String(n)}>
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
                <option value="20+">20+ Guests</option>
              </select>
              {/* Custom arrow */}
              <svg
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="relative">
              <select
                id="res-occasion"
                name="occasion"
                value={form.occasion}
                onChange={handleChange}
                className="
                  w-full bg-[#1A1A1E] border border-neutral-800 rounded-xl
                  px-4 py-3.5 text-sm
                  focus:outline-none focus:border-[#C5A059]/60 focus:bg-[#1E1E22]
                  transition-all duration-300 appearance-none cursor-pointer
                  hover:border-neutral-700
                  text-neutral-500
                "
                style={{ color: form.occasion ? 'white' : undefined }}
              >
                <option value="" disabled>
                  Occasion
                </option>
                {OCCASIONS.map((o) => (
                  <option key={o} value={o} style={{ color: 'white' }}>
                    {o}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Row 3: Date + Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative group">
              <input
                id="res-date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="
                  w-full bg-[#1A1A1E] border border-neutral-800 rounded-xl
                  px-4 py-3.5 text-sm placeholder-neutral-500
                  focus:outline-none focus:border-[#C5A059]/60 focus:bg-[#1E1E22]
                  transition-all duration-300
                  group-hover:border-neutral-700
                  [color-scheme:dark]
                "
                style={{ color: form.date ? 'white' : '#6b7280' }}
              />
            </div>

            <div className="relative group">
              <input
                id="res-time"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                className="
                  w-full bg-[#1A1A1E] border border-neutral-800 rounded-xl
                  px-4 py-3.5 text-sm placeholder-neutral-500
                  focus:outline-none focus:border-[#C5A059]/60 focus:bg-[#1E1E22]
                  transition-all duration-300
                  group-hover:border-neutral-700
                  [color-scheme:dark]
                "
                style={{ color: form.time ? 'white' : '#6b7280' }}
                placeholder="Time"
              />
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            id="res-confirm-whatsapp"
            onClick={handleWhatsApp}
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(37,211,102,0.25)' }}
            whileTap={{ scale: 0.97 }}
            className="
              w-full mt-2 flex items-center justify-center gap-3
              bg-[#C5A059] hover:bg-[#D4AF6A]
              text-black font-bold text-sm tracking-[0.15em] uppercase
              py-4 rounded-xl
              transition-colors duration-300
              shadow-[0_4px_20px_rgba(197,160,89,0.3)]
            "
          >
            {/* WhatsApp icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.118 1.527 5.845L0 24l6.335-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.373l-.36-.214-3.727.977.994-3.634-.234-.373A9.78 9.78 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
            </svg>
            Confirm Table via WhatsApp
          </motion.button>

          <p className="text-center text-xs text-neutral-600">
            We'll confirm your reservation via WhatsApp within minutes.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
