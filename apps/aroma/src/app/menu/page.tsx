import type { Metadata } from "next";
import { PhysicalMenuClient } from "./PhysicalMenuClient";

export const metadata: Metadata = {
  title: "Full Menu | Aroma Fine Dine Restaurant & Banquet Hall",
  description:
    "Browse the complete physical menu of Aroma Fine Dine — Royal Mandi specialties, authentic Arabian drinks, starters, biryanis, and exclusive seasonal offerings.",
};

export default function MenuPage() {
  return <PhysicalMenuClient />;
}
