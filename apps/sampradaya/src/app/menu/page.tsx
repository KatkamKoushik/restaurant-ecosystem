"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "@/components/CartDrawer";
import { ShoppingBag, ArrowLeft, Search, Utensils } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { Footer } from "@/components/Footer";

// Structured from user's provided menu
const menuCategories = [
  {
    "id": "biryanis",
    "name": "Biryanis",
    "items": [
      {
        "id": "i1",
        "name": "Chicken Biryani",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Biryanis/Chicken_biryani_in_copper_handi_202608150112.jpeg"
      },
      {
        "id": "i2",
        "name": "Chicken Dum Biryani",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Biryanis/Chicken_Dum_Biryani_in_handi_202608150112.jpeg"
      },
      {
        "id": "i3",
        "name": "Chicken Fry Biryani",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Biryanis/Chicken_Fry_Biryani_in_handi_202608150112.jpeg"
      },
      {
        "id": "i4",
        "name": "Egg Biryani",
        "price": 300,
        "type": "non-veg",
        "image": "/dishes/Biryanis/Egg_biryani_in_copper_handi_202608150112.jpeg"
      },
      {
        "id": "i5",
        "name": "Gongura Paneer Biryani",
        "price": 300,
        "type": "veg",
        "image": "/dishes/Biryanis/Gongura_Paneer_Biryani_served_202608150112.jpeg"
      },
      {
        "id": "i6",
        "name": "Guntur Chicken Fry Biryani",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Biryanis/Guntur_chicken_fry_biryani_serving_202608150112.jpeg"
      },
      {
        "id": "i7",
        "name": "Mushroom Biryani",
        "price": 300,
        "type": "veg",
        "image": "/dishes/Biryanis/Mushroom_Biryani_in_copper_handi_202608150112.jpeg"
      },
      {
        "id": "i8",
        "name": "Mutton Biryani",
        "price": 450,
        "type": "non-veg",
        "image": "/dishes/Biryanis/Mutton_biryani_in_copper_handi_202608150113.jpeg"
      },
      {
        "id": "i9",
        "name": "Mutton Fry Biryani",
        "price": 450,
        "type": "non-veg",
        "image": "/dishes/Biryanis/Mutton_fry_biryani_in_handi_202608150113.jpeg"
      },
      {
        "id": "i10",
        "name": "Mutton Keema Biryani",
        "price": 450,
        "type": "non-veg",
        "image": "/dishes/Biryanis/Mutton_keema_biryani_in_handi_202608150113.jpeg"
      },
      {
        "id": "i11",
        "name": "Paneer Biryani",
        "price": 300,
        "type": "veg",
        "image": "/dishes/Biryanis/Paneer_biryani_in_copper_handi_202608150112.jpeg"
      },
      {
        "id": "i12",
        "name": "Veg Biryani",
        "price": 300,
        "type": "veg",
        "image": "/dishes/Biryanis/Veg_biryani_in_copper_handi_202608150112.jpeg"
      }
    ]
  },
  {
    "id": "desserts-ice-cream-beverages",
    "name": "Desserts, Ice Cream & Beverages",
    "items": [
      {
        "id": "i13",
        "name": "Caramel Nuts Ice Cream Scoop",
        "price": 80,
        "type": "veg",
        "image": "/dishes/Desserts, Ice Cream & Beverages/Caramel_nuts_ice_cream_scoop_202608150522.jpeg"
      },
      {
        "id": "i14",
        "name": "Cold Soft Drink",
        "price": 50,
        "type": "veg",
        "image": "/dishes/Desserts, Ice Cream & Beverages/Cold_soft_drink_on_table_202608150522.jpeg"
      },
      {
        "id": "i15",
        "name": "Glass Of Lime Soda",
        "price": 60,
        "type": "veg",
        "image": "/dishes/Desserts, Ice Cream & Beverages/Glass_of_lime_soda_202608150523.jpeg"
      },
      {
        "id": "i16",
        "name": "Glass Of Spiced Buttermilk",
        "price": 80,
        "type": "veg",
        "image": "/dishes/Desserts, Ice Cream & Beverages/Glass_of_spiced_buttermilk_202608150522.jpeg"
      },
      {
        "id": "i17",
        "name": "Glass Of Sweet Lassi",
        "price": 120,
        "type": "veg",
        "image": "/dishes/Desserts, Ice Cream & Beverages/Glass_of_Sweet_Lassi_202608150522.jpeg"
      },
      {
        "id": "i18",
        "name": "Gulab Jamun",
        "price": 99,
        "type": "veg",
        "image": "/dishes/Desserts, Ice Cream & Beverages/Gulab_Jamun_in_syrup_202608150521.jpeg"
      },
      {
        "id": "i19",
        "name": "Honeymoon Delight Specialty Dessert",
        "price": 80,
        "type": "veg",
        "image": "/dishes/Desserts, Ice Cream & Beverages/Honeymoon_Delight_specialty_dessert_202608150522.jpeg"
      },
      {
        "id": "i20",
        "name": "Scoop Of Butterscotch Ice Cream",
        "price": 80,
        "type": "veg",
        "image": "/dishes/Desserts, Ice Cream & Beverages/Scoop_of_butterscotch_ice_cream_202608150522.jpeg"
      },
      {
        "id": "i21",
        "name": "Serving Of Double-Ka-Meeta",
        "price": 99,
        "type": "veg",
        "image": "/dishes/Desserts, Ice Cream & Beverages/Serving_dish_of_Double-Ka-Meeta_202608150523.jpeg"
      },
      {
        "id": "i22",
        "name": "Strawberry Ice Cream",
        "price": 80,
        "type": "veg",
        "image": "/dishes/Desserts, Ice Cream & Beverages/Strawberry_ice_cream_in_bowl_202608150522.jpeg"
      },
      {
        "id": "i23",
        "name": "Vanilla Ice Cream",
        "price": 80,
        "type": "veg",
        "image": "/dishes/Desserts, Ice Cream & Beverages/Vanilla_ice_cream_in_dish_202608150521.jpeg"
      },
      {
        "id": "i24",
        "name": "Water Bottle",
        "price": 20,
        "type": "veg",
        "image": "/dishes/Desserts, Ice Cream & Beverages/Water_bottle_on_table_202608150522.jpeg"
      }
    ]
  },
  {
    "id": "indian-breads",
    "name": "Indian Breads",
    "items": [
      {
        "id": "i25",
        "name": "Aloo Kulcha",
        "price": 60,
        "type": "veg",
        "image": "/dishes/Indian Breads/Aloo_Kulcha_on_rustic_platter_202608150306.jpeg"
      },
      {
        "id": "i26",
        "name": "Aloo Paratha",
        "price": 50,
        "type": "veg",
        "image": "/dishes/Indian Breads/Aloo_paratha_on_platter_202608150305.jpeg"
      },
      {
        "id": "i27",
        "name": "Butter Kulcha",
        "price": 60,
        "type": "veg",
        "image": "/dishes/Indian Breads/Butter_kulcha_on_platter_202608150305.jpeg"
      },
      {
        "id": "i28",
        "name": "Butter Naan",
        "price": 50,
        "type": "veg",
        "image": "/dishes/Indian Breads/Butter_naan_on_platter_202608150306.jpeg"
      },
      {
        "id": "i29",
        "name": "Butter Roti",
        "price": 35,
        "type": "veg",
        "image": "/dishes/Indian Breads/Butter_roti_on_platter_202608150305.jpeg"
      },
      {
        "id": "i30",
        "name": "Cheese Naan",
        "price": 50,
        "type": "veg",
        "image": "/dishes/Indian Breads/Cheese_naan_on_platter_202608150305.jpeg"
      },
      {
        "id": "i31",
        "name": "Classic Naan Bread",
        "price": 50,
        "type": "veg",
        "image": "/dishes/Indian Breads/Classic_Naan_bread_on_platter_202608150305.jpeg"
      },
      {
        "id": "i32",
        "name": "Garlic Naan",
        "price": 50,
        "type": "veg",
        "image": "/dishes/Indian Breads/Garlic_naan_on_platter_202608150305.jpeg"
      },
      {
        "id": "i33",
        "name": "Kulcha Bread",
        "price": 60,
        "type": "veg",
        "image": "/dishes/Indian Breads/Kulcha_bread_on_rustic_platter_202608150306.jpeg"
      },
      {
        "id": "i34",
        "name": "Lacha Paratha",
        "price": 50,
        "type": "veg",
        "image": "/dishes/Indian Breads/Lacha_Paratha_on_platter_202608150305.jpeg"
      },
      {
        "id": "i35",
        "name": "Masala Kulcha",
        "price": 60,
        "type": "veg",
        "image": "/dishes/Indian Breads/Masala_Kulcha_on_platter_202608150306.jpeg"
      },
      {
        "id": "i36",
        "name": "Mutton Keema Paratha",
        "price": 50,
        "type": "non-veg",
        "image": "/dishes/Indian Breads/Mutton_Keema_Paratha_on_platter_202608150305.jpeg"
      },
      {
        "id": "i37",
        "name": "Paneer Kulcha",
        "price": 60,
        "type": "veg",
        "image": "/dishes/Indian Breads/Paneer_Kulcha_on_rustic_platter_202608150306.jpeg"
      },
      {
        "id": "i38",
        "name": "Paneer Paratha",
        "price": 50,
        "type": "veg",
        "image": "/dishes/Indian Breads/Paneer_paratha_on_rustic_platter_202608150305.jpeg"
      },
      {
        "id": "i39",
        "name": "Roti",
        "price": 35,
        "type": "veg",
        "image": "/dishes/Indian Breads/Roti_served_on_rustic_platter_202608150305.jpeg"
      }
    ]
  },
  {
    "id": "non-veg-curries-egg-chicken-mutton-seafood-",
    "name": "Non-Veg Curries (Egg, Chicken, Mutton, Seafood)",
    "items": [
      {
        "id": "i40",
        "name": "Bowl Of Achari Murgh",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Bowl_of_Achari_Murgh_202608150204.jpeg"
      },
      {
        "id": "i41",
        "name": "Bowl Of Mutton Masala",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Bowl_of_Mutton_Masala_202608150204.jpeg"
      },
      {
        "id": "i42",
        "name": "Butter Chicken",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Butter_Chicken_in_copper_bowl_202608150204.jpeg"
      },
      {
        "id": "i43",
        "name": "Ceramic Of Egg Masala",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Ceramic_bowl_of_Egg_Masala_202608150204.jpeg"
      },
      {
        "id": "i44",
        "name": "Ceramic Of Mutton Curry",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Ceramic_bowl_of_mutton_curry_202608150204 (1).jpeg"
      },
      {
        "id": "i45",
        "name": "Ceramic Of Mutton Curry",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Ceramic_bowl_of_mutton_curry_202608150204.jpeg"
      },
      {
        "id": "i46",
        "name": "Ceramic Of Prawns Masala",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Ceramic_bowl_of_Prawns_Masala_202608150205.jpeg"
      },
      {
        "id": "i47",
        "name": "Clay Of Achari Fish",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Clay_pot_of_Achari_Fish_202608150205.jpeg"
      },
      {
        "id": "i48",
        "name": "Copper Katori Of Achari Mutton",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Copper_katori_of_Achari_Mutton_202608150204.jpeg"
      },
      {
        "id": "i49",
        "name": "Copper Katori Of Chicken Curry",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Copper_katori_of_chicken_curry_202608150204.jpeg"
      },
      {
        "id": "i50",
        "name": "Copper Katori Of Chicken",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Copper_katori_of_Kadai_Chicken_202608150204.jpeg"
      },
      {
        "id": "i51",
        "name": "Copper Katori Of Mutton",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Copper_katori_of_Kadai_Mutton_202608150204.jpeg"
      },
      {
        "id": "i52",
        "name": "Copper Katori Of Prawns",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Copper_katori_of_Kadai_Prawns_202608150205.jpeg"
      },
      {
        "id": "i53",
        "name": "Egg Bhurji",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Egg_Bhurji_on_rustic_plate_202608150204.jpeg"
      },
      {
        "id": "i54",
        "name": "Rustic Clay Of Fish",
        "price": 310,
        "type": "non-veg",
        "image": "/dishes/Non-Veg Curries (Egg, Chicken, Mutton, Seafood)/Rustic_clay_pot_of_fish_202608150205.jpeg"
      }
    ]
  },
  {
    "id": "rice-noodles",
    "name": "Rice & Noodles",
    "items": [
      {
        "id": "i55",
        "name": "Bowl Of Chicken Fried Rice",
        "price": 290,
        "type": "non-veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_chicken_fried_rice_202608150213.jpeg"
      },
      {
        "id": "i56",
        "name": "Bowl Of Chicken Garlic Noodles",
        "price": 290,
        "type": "non-veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_chicken_garlic_noodles_202608150214.jpeg"
      },
      {
        "id": "i57",
        "name": "Bowl Of Chicken Noodles",
        "price": 290,
        "type": "non-veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_chicken_noodles_202608150213.jpeg"
      },
      {
        "id": "i58",
        "name": "Bowl Of Chicken Schezwan Noodles",
        "price": 290,
        "type": "non-veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_Chicken_Schezwan_Noodles_202608150213.jpeg"
      },
      {
        "id": "i59",
        "name": "Bowl Of Egg Fried Rice",
        "price": 290,
        "type": "non-veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_egg_fried_rice_202608150213.jpeg"
      },
      {
        "id": "i60",
        "name": "Bowl Of Egg Schezwan Noodles",
        "price": 290,
        "type": "non-veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_Egg_Schezwan_Noodles_202608150213.jpeg"
      },
      {
        "id": "i61",
        "name": "Bowl Of Fried Rice",
        "price": 280,
        "type": "veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_fried_rice_202608150214.jpeg"
      },
      {
        "id": "i62",
        "name": "Bowl Of Mixed Fried Rice",
        "price": 280,
        "type": "veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_mixed_fried_rice_202608150213.jpeg"
      },
      {
        "id": "i63",
        "name": "Bowl Of Mushroom Fried Rice",
        "price": 280,
        "type": "veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_mushroom_fried_rice_202608150213.jpeg"
      },
      {
        "id": "i64",
        "name": "Bowl Of Schezwan Chicken Fried",
        "price": 290,
        "type": "non-veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_Schezwan_Chicken_Fried_202608150213.jpeg"
      },
      {
        "id": "i65",
        "name": "Bowl Of Schezwan Fried Rice",
        "price": 280,
        "type": "veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_Schezwan_fried_rice_202608150212.jpeg"
      },
      {
        "id": "i66",
        "name": "Bowl Of Veg Fried Rice",
        "price": 280,
        "type": "veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_veg_fried_rice_202608150212.jpeg"
      },
      {
        "id": "i67",
        "name": "Bowl Of Veg Schezwan Noodles",
        "price": 280,
        "type": "veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_Veg_Schezwan_Noodles_202608150213.jpeg"
      },
      {
        "id": "i68",
        "name": "Bowl Of Veg Soft Noodles",
        "price": 280,
        "type": "veg",
        "image": "/dishes/Rice & Noodles/Bowl_of_Veg_Soft_Noodles_202608150213.jpeg"
      },
      {
        "id": "i69",
        "name": "Ceramic Of Curd Rice",
        "price": 280,
        "type": "veg",
        "image": "/dishes/Rice & Noodles/Ceramic_bowl_of_curd_rice_202608150213.jpeg"
      },
      {
        "id": "i70",
        "name": "Ceramic Of Egg Fried",
        "price": 290,
        "type": "non-veg",
        "image": "/dishes/Rice & Noodles/Ceramic_bowl_of_egg_fried_202608150212.jpeg"
      },
      {
        "id": "i71",
        "name": "Ceramic Of Egg Noodles",
        "price": 290,
        "type": "non-veg",
        "image": "/dishes/Rice & Noodles/Ceramic_bowl_of_egg_noodles_202608150213.jpeg"
      },
      {
        "id": "i72",
        "name": "Ceramic Of Noodles",
        "price": 280,
        "type": "veg",
        "image": "/dishes/Rice & Noodles/Ceramic_bowl_of_noodles_202608150213.jpeg"
      }
    ]
  },
  {
    "id": "salads-raithas",
    "name": "Salads & Raithas",
    "items": [
      {
        "id": "i73",
        "name": "Boondi Raitha",
        "price": 100,
        "type": "veg",
        "image": "/dishes/Salads & Raithas/Boondi_raitha_in_ceramic_bowl_202608150518.jpeg"
      },
      {
        "id": "i74",
        "name": "Cucumber Raitha",
        "price": 100,
        "type": "veg",
        "image": "/dishes/Salads & Raithas/Cucumber_raitha_in_ceramic_bowl_202608150517.jpeg"
      },
      {
        "id": "i75",
        "name": "Cucumber Salad",
        "price": 100,
        "type": "veg",
        "image": "/dishes/Salads & Raithas/Cucumber_salad_in_bowl_202608150517.jpeg"
      },
      {
        "id": "i76",
        "name": "Green Salad",
        "price": 100,
        "type": "veg",
        "image": "/dishes/Salads & Raithas/Green_salad_in_ceramic_bowl_202608150517.jpeg"
      },
      {
        "id": "i77",
        "name": "Onion Raitha",
        "price": 100,
        "type": "veg",
        "image": "/dishes/Salads & Raithas/Onion_raitha_in_ceramic_katori_202608150518.jpeg"
      },
      {
        "id": "i78",
        "name": "Onion Salad",
        "price": 100,
        "type": "veg",
        "image": "/dishes/Salads & Raithas/Onion_salad_in_ceramic_bowl_202608150517.jpeg"
      },
      {
        "id": "i79",
        "name": "Potato Raitha",
        "price": 100,
        "type": "veg",
        "image": "/dishes/Salads & Raithas/Potato_raitha_in_bowl_202608150518.jpeg"
      },
      {
        "id": "i80",
        "name": "Tandoori Salad",
        "price": 100,
        "type": "veg",
        "image": "/dishes/Salads & Raithas/Tandoori_salad_in_ceramic_bowl_202608150517.jpeg"
      }
    ]
  },
  {
    "id": "starters",
    "name": "Starters",
    "items": [
      {
        "id": "i81",
        "name": "Chicken 65",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Chicken_65_on_ceramic_plate_202608150125.jpeg"
      },
      {
        "id": "i82",
        "name": "Chicken Chunks",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Chicken_chunks_with_curry_leaves_202608150125.jpeg"
      },
      {
        "id": "i83",
        "name": "Chicken Ghee Roast",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Chicken_ghee_roast_on_plate_202608150125.jpeg"
      },
      {
        "id": "i84",
        "name": "Chicken Majestic",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Chicken_Majestic_on_plate_202608150125.jpeg"
      },
      {
        "id": "i85",
        "name": "Chicken Tikka",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Chicken_tikka_on_plate_202608150125 (1).jpeg"
      },
      {
        "id": "i86",
        "name": "Chicken Tikka",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Chicken_Tikka_on_plate_202608150125.jpeg"
      },
      {
        "id": "i87",
        "name": "Chilli Chicken",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Chilli_chicken_on_ceramic_plate_202608150125.jpeg"
      },
      {
        "id": "i88",
        "name": "Egg 65",
        "price": 300,
        "type": "non-veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Egg_65_on_ceramic_plate_202608150125.jpeg"
      },
      {
        "id": "i89",
        "name": "Egg Chilli",
        "price": 300,
        "type": "non-veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Egg_chilli_on_ceramic_plate_202608150126.jpeg"
      },
      {
        "id": "i90",
        "name": "Egg Manchuria",
        "price": 300,
        "type": "non-veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Egg_Manchuria_on_ceramic_plate_202608150126.jpeg"
      },
      {
        "id": "i91",
        "name": "Murgh Seekh Kebab",
        "price": 300,
        "type": "veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Murgh_Seekh_Kebab_on_plate_202608150125.jpeg"
      },
      {
        "id": "i92",
        "name": "Roasted Chicken Tikka",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Roasted_chicken_tikka_on_plate_202608150125.jpeg"
      },
      {
        "id": "i93",
        "name": "Tandoori Chicken",
        "price": 350,
        "type": "non-veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Tandoori_chicken_on_ceramic_plate_202608150125.jpeg"
      },
      {
        "id": "i94",
        "name": "Tangdi Kebab",
        "price": 300,
        "type": "veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Tangdi_Kebab_on_ceramic_plate_202608150125.jpeg"
      },
      {
        "id": "i95",
        "name": "Vellulli Kodi Vepudu",
        "price": 300,
        "type": "veg",
        "image": "/dishes/Starters/Chicken Starters (Tandoori, South Indian, Chinese)/Vellulli_kodi_vepudu_on_plate_202608150125.jpeg"
      },
      {
        "id": "i96",
        "name": "Apollo Fish",
        "price": 499,
        "type": "non-veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Apollo_fish_on_ceramic_plate_202608150132.jpeg"
      },
      {
        "id": "i97",
        "name": "Chilli Prawns",
        "price": 499,
        "type": "non-veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Chilli_prawns_on_ceramic_plate_202608150132.jpeg"
      },
      {
        "id": "i98",
        "name": "Fish Fingers",
        "price": 499,
        "type": "non-veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Fish_fingers_on_plate_202608150131.jpeg"
      },
      {
        "id": "i99",
        "name": "Fish Tikka",
        "price": 499,
        "type": "non-veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Fish_tikka_on_plate_202608150131 (1).jpeg"
      },
      {
        "id": "i100",
        "name": "Fish Tikka",
        "price": 499,
        "type": "non-veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Fish_tikka_on_plate_202608150131.jpeg"
      },
      {
        "id": "i101",
        "name": "Fried Prawns",
        "price": 499,
        "type": "non-veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Fried_prawns_with_dipping_sauce_202608150131.jpeg"
      },
      {
        "id": "i102",
        "name": "Loose Prawns",
        "price": 499,
        "type": "non-veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Loose_prawns_on_ceramic_plate_202608150131.jpeg"
      },
      {
        "id": "i103",
        "name": "Mamsam Vepudu",
        "price": 300,
        "type": "veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Mamsam_Vepudu_on_plate_202608150131.jpeg"
      },
      {
        "id": "i104",
        "name": "Miryala Mamsam Vepudu",
        "price": 300,
        "type": "veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Miryala_Mamsam_Vepudu_on_plate_202608150131.jpeg"
      },
      {
        "id": "i105",
        "name": "Miryala Royyala Vepudu",
        "price": 300,
        "type": "veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Miryala_Royyala_Vepudu_on_plate_202608150131.jpeg"
      },
      {
        "id": "i106",
        "name": "Mutton Ghee Roast",
        "price": 450,
        "type": "non-veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Mutton_ghee_roast_on_plate_202608150131.jpeg"
      },
      {
        "id": "i107",
        "name": "Mutton Seekh Kebab",
        "price": 450,
        "type": "non-veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Mutton_Seekh_Kebab_on_plate_202608150131.jpeg"
      },
      {
        "id": "i108",
        "name": "Prawns Garnished",
        "price": 499,
        "type": "non-veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Prawns_garnished_with_cashews_202608150131.jpeg"
      },
      {
        "id": "i109",
        "name": "Royyala Vepudu",
        "price": 300,
        "type": "veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Royyala_Vepudu_on_plate_202608150131.jpeg"
      },
      {
        "id": "i110",
        "name": "Velluli Mamsam Vepudu",
        "price": 300,
        "type": "veg",
        "image": "/dishes/Starters/Mutton & Seafood Starters (Tandoori, South Indian, Chinese)/Velluli_Mamsam_Vepudu_on_plate_202608150131.jpeg"
      }
    ]
  },
  {
    "id": "veg-curries-dals",
    "name": "Veg Curries & Dals",
    "items": [
      {
        "id": "i111",
        "name": "Bowl Of Kaju Masala",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Bowl_of_Kaju_Masala_202608150143.jpeg"
      },
      {
        "id": "i112",
        "name": "Bowl Of Mushroom Masala",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Bowl_of_mushroom_masala_202608150143.jpeg"
      },
      {
        "id": "i113",
        "name": "Ceramic Of Dal Fry",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Ceramic_bowl_of_Dal_Fry_202608150143.jpeg"
      },
      {
        "id": "i114",
        "name": "Ceramic Of Malai Methi",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Ceramic_bowl_of_Malai_Methi_202608150143.jpeg"
      },
      {
        "id": "i115",
        "name": "Ceramic Of Mix Veg",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Ceramic_bowl_of_mix_veg_202608150142.jpeg"
      },
      {
        "id": "i116",
        "name": "Ceramic Of Paneer Curry",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Ceramic_bowl_of_paneer_curry_202608150143.jpeg"
      },
      {
        "id": "i117",
        "name": "Ceramic Of Veg Kolhapuri",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Ceramic_bowl_of_Veg_Kolhapuri_202608150143.jpeg"
      },
      {
        "id": "i118",
        "name": "Copper Of Mixed Vegetables",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Copper_bowl_of_mixed_vegetables_202608150142.jpeg"
      },
      {
        "id": "i119",
        "name": "Copper Katori Of Dal Tadka",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Copper_katori_of_Dal_Tadka_202608150144.jpeg"
      },
      {
        "id": "i120",
        "name": "Copper Katori Of Paneer",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Copper_katori_of_Kadai_Paneer_202608150143.jpeg"
      },
      {
        "id": "i121",
        "name": "Copper Katori Of Malai Kofta",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Copper_katori_of_Malai_Kofta_202608150143.jpeg"
      },
      {
        "id": "i122",
        "name": "Copper Katori Of Mushroom Masala",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Copper_katori_of_Mushroom_Masala_202608150143.jpeg"
      },
      {
        "id": "i123",
        "name": "Copper Katori Of Paneer Lababdar",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Copper_katori_of_Paneer_Lababdar_202608150143.jpeg"
      },
      {
        "id": "i124",
        "name": "Copper Katori Of Veg Nizami",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Copper_katori_of_Veg_Nizami_202608150143.jpeg"
      },
      {
        "id": "i125",
        "name": "Paneer Butter Masala",
        "price": 310,
        "type": "veg",
        "image": "/dishes/Veg Curries & Dals/Paneer_butter_masala_in_bowl_202608150143.jpeg"
      }
    ]
  }
];

export default function DigitalMenuPage() {
  const [menuData, setMenuData] = useState(menuCategories);
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVegOnly, setIsVegOnly] = useState(false);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "your_api_key") {
          throw new Error("Placeholder keys");
        }
        const { collection, getDocs } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        
        const querySnapshot = await getDocs(collection(db, "menu_items"));
        const items: any[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        
        if (items.length > 0) {
          const categoryMap: Record<string, any> = {};
          items.forEach(item => {
            const cat = item.category || "Other";
            if (!categoryMap[cat]) {
              categoryMap[cat] = {
                id: cat.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-"),
                name: cat,
                items: []
              };
            }
            categoryMap[cat].items.push(item);
          });
          const sorted = Object.values(categoryMap).sort((a, b) => a.name.localeCompare(b.name));
          setMenuData(sorted);
          if (sorted.length > 0) {
             setActiveCategory(sorted[0].id);
          }
        }
      } catch (e) {
        console.warn("Using local menu data", e);
      }
    };
    fetchMenu();
  }, []);

  // Flatten items for search
  const allItems = menuData.flatMap(c => c.items);
  let searchResults = searchQuery 
    ? allItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
    
  if (isVegOnly) {
    searchResults = searchResults.filter(item => item.type === "veg");
  }

  // Scrollspy effect
  useEffect(() => {
    if (searchQuery) return; // Don't run scrollspy when searching

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // If multiple are visible, pick the one closest to the top
          // The observer options rootMargin sets the detection zone
          setActiveCategory(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-150px 0px -60% 0px", // Trigger when element hits top 150px
        threshold: 0,
      }
    );

    menuCategories.forEach((category) => {
      const element = document.getElementById(category.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-32">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <Link href="/" className="inline-flex text-primary hover:text-primary/80 transition-colors items-center gap-2 mb-4 font-medium">
              <ArrowLeft size={20} /> Back to Home
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Digital Menu</h1>
            <p className="text-foreground/70 mt-2 font-light">Select items to add to your WhatsApp cart.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => setIsVegOnly(!isVegOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                isVegOnly 
                  ? "bg-green-50 border-green-200 text-green-700" 
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 border-green-600`}>
                <div className={`w-2 h-2 rounded-full bg-green-600`} />
              </div>
              <span className="font-medium text-sm">Veg Only</span>
            </button>
            <div className="relative w-full md:w-72">
              <input 
                type="text" 
                placeholder="Search dishes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-full py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {searchQuery ? (
          /* Search Results View */
          <div>
            <h2 className="text-xl font-bold mb-6">Search Results for "{searchQuery}"</h2>
            {searchResults.length === 0 ? (
              <p className="text-gray-500">No dishes found matching your search.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(item => (
                  <MenuCard key={item.id} item={item} onAdd={() => addItem({ ...item, quantity: 1 })} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Category View */
          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Sidebar / Mobile Tabs */}
            <div className="md:w-1/4 flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar sticky top-24 z-10 bg-[#FDFBF7] md:bg-transparent">
              {menuData.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`whitespace-nowrap px-5 py-3 rounded-xl font-medium text-left transition-colors ${
                    activeCategory === category.id 
                      ? "bg-primary text-white shadow-md" 
                      : "bg-white text-foreground hover:bg-gray-50 border border-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Menu Sections */}
            <div className="md:w-3/4 flex flex-col gap-12">
              {menuData.map(category => {
                const visibleItems = isVegOnly 
                  ? category.items.filter(item => item.type === "veg")
                  : category.items;
                  
                if (visibleItems.length === 0) return null;

                return (
                  <div key={category.id} id={category.id} className="scroll-mt-32">
                    <h2 className="font-serif text-3xl font-bold text-foreground mb-6 pb-2 border-b border-gray-200">
                      {category.name}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {visibleItems.map(item => (
                        <MenuCard key={item.id} item={item} onAdd={() => addItem({ ...item, quantity: 1 })} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      {/* Floating Cart Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <div className="bg-primary rounded-full shadow-2xl p-1">
           <CartDrawer />
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

function MenuCard({ item, onAdd }: { item: any, onAdd: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden will-change-transform h-full"
    >
      <div className="relative w-full aspect-[4/3] bg-gray-50 flex items-center justify-center border-b border-gray-100 shrink-0">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        ) : (
          <Utensils className="text-gray-300" size={32} />
        )}
        
        {/* Veg / Non-Veg Indicator Overlaid */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1.5 rounded shadow-sm border border-white/20">
          <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${item.type === 'veg' ? 'border-green-600' : 'border-red-600'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${item.type === 'veg' ? 'bg-green-600' : 'bg-red-600'}`} />
          </div>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-foreground text-lg mb-4">{item.name}</h3>
        
        <div className="mt-auto flex items-center justify-between gap-4">
          <p className="text-primary font-bold font-serif text-2xl">₹{item.price}</p>
          <button 
            onClick={onAdd}
            className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors text-sm flex items-center gap-2 shadow-sm shadow-primary/20"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Add to Order</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
