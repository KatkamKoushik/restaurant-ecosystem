"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RESTAURANTS, RestaurantMetadata } from "@restaurant-ecosystem/config";

export interface RestaurantSwitcherProps {
  currentRestaurantId: string;
  className?: string;
}

export function RestaurantSwitcher({
  currentRestaurantId,
  className = "",
}: RestaurantSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = RESTAURANTS[currentRestaurantId] || {
    name: "Restaurant",
    tagline: "Ecosystem Showcase",
  };

  const sisterRestaurants: RestaurantMetadata[] = Object.values(RESTAURANTS);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left text-sm font-sans ${className}`}
      style={{ zIndex: 9999 }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-black/70 backdrop-blur-md text-amber-200 hover:text-amber-100 hover:border-amber-400/60 transition-all duration-200 shadow-lg text-xs font-medium tracking-wide"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="opacity-75">Sister Restaurant:</span>
        <span className="font-semibold text-white group-hover:text-amber-300 transition-colors">
          {current.name}
        </span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-80 sm:w-96 rounded-2xl bg-neutral-950/95 border border-amber-500/25 p-3 shadow-2xl backdrop-blur-xl"
          >
            <div className="px-3 py-2 border-b border-white/10 mb-2">
              <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                Restaurant Ecosystem Showcase
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Explore our sister dining establishments in Hanamkonda
              </p>
            </div>

            <div className="space-y-1.5 max-h-[70vh] overflow-y-auto">
              {sisterRestaurants.map((restaurant) => {
                const isActive = restaurant.id === currentRestaurantId;
                return (
                  <a
                    key={restaurant.id}
                    href={isActive ? "#" : restaurant.url}
                    target={isActive ? undefined : "_blank"}
                    rel={isActive ? undefined : "noopener noreferrer"}
                    onClick={(e) => {
                      if (isActive) {
                        e.preventDefault();
                        setIsOpen(false);
                      }
                    }}
                    className={`block p-3 rounded-xl transition-all duration-150 border ${
                      isActive
                        ? "bg-amber-500/10 border-amber-500/40 text-white cursor-default"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.07] hover:border-amber-500/30 text-neutral-200 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm tracking-wide text-white flex items-center gap-2">
                        {restaurant.name}
                        {isActive && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Current
                          </span>
                        )}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {restaurant.location.city}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {restaurant.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {restaurant.cuisine.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="pt-2.5 mt-2 border-t border-white/10 text-center">
              <span className="text-[11px] text-neutral-500">
                Custom Web Experience built by Koushik & Vyshnavi
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
