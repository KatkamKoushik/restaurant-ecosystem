# Restaurant Showcase & Branding

The Restaurant Ecosystem powers four unique hospitality brands tailored to distinct dining demographics, cuisines, and operational formats.

---

## Brand Portfolio

### 1. Sampradaya Multicuisine Family Restaurant
- **Positioning**: Traditional Indian recipes, authentic regional multicuisine, and family dining.
- **Tagline**: *"Authentic Multicuisine Flavors"*
- **Location**: Pragathi Nagar, Hyderabad
- **Design Palette**:
  - Primary: Deep Terracotta (`#8B2500`)
  - Secondary: Warm Amber (`#FF8C00`)
  - Accent: Gold (`#FFD700`)
- **Key Features**:
  - Interactive digital menu with dietary filters (Vegetarian, Non-Vegetarian, Chef's Specials)
  - Table reservations with real-time slot selection
  - Online ordering integration
  - Live kitchen transparency
- **Production URL**: [sampradaya-multicuisine-family-rest.vercel.app](https://sampradaya-multicuisine-family-rest.vercel.app/)

---

### 2. Majesty Mandi House
- **Positioning**: Royal Arabian mandi feast, traditional Arabic majlis floor seating, and slow-cooked delicacies.
- **Tagline**: *"Royal Flavors, Majestic Feast"*
- **Location**: Tolichowki, Hyderabad
- **Design Palette**:
  - Primary: Royal Burgundy (`#4A0E17`)
  - Secondary: Imperial Gold (`#D4AF37`)
  - Accent: Warm Gold (`#E5C158`)
- **Key Features**:
  - Dedicated Mandi feast builder (Mutton Juicy, Chicken Faham, Fish Mandi)
  - Private Majlis and family section reservations
  - Late-night dining availability
  - Visual menu with high-resolution culinary photography
- **Production URL**: [majesty-mandi-house-eight.vercel.app](https://majesty-mandi-house-eight.vercel.app/)

---

### 3. Mandiwala Arabian Restaurant
- **Positioning**: Authentic Arabian mandi with aromatic spice blends, group platters, and express takeaway counters.
- **Tagline**: *"The Authentic Arabian Experience"*
- **Location**: Gachibowli, Hyderabad
- **Design Palette**:
  - Primary: Arabian Sapphire (`#1A365D`)
  - Secondary: Desert Gold (`#C69214`)
  - Accent: Slate Mist (`#E2E8F0`)
- **Key Features**:
  - Dynamic platter sizing (Single, Double, Family, Grand Feast)
  - Quick-pickup takeaway ordering system
  - Comprehensive admin dashboard for real-time menu management
  - Direct Cloudinary integration for menu item image uploads
- **Production URL**: [mandiwala-arabian-restaurant.vercel.app](https://mandiwala-arabian-restaurant.vercel.app/)

---

### 4. Aroma Fine Dine Restaurant & Banquet
- **Positioning**: High-end fine dining paired with luxury banquet halls for weddings, corporate galas, and celebrations.
- **Tagline**: *"Fine Dine Restaurant & Banquet"*
- **Location**: Jubilee Hills, Hyderabad
- **Design Palette**:
  - Primary: Emerald Teal (`#1C3F3A`)
  - Secondary: Antique Champagne (`#C5A059`)
  - Accent: Alabaster Cream (`#F4EBD9`)
- **Key Features**:
  - Banquet hall capacity calculator and event inquiry portal
  - Curated tasting menus and multi-course chef selections
  - Valet parking booking and VIP private dining
  - Administrative event reservation tracking
- **Production URL**: [aroma-fine-dine-restaurant-banquet.vercel.app](https://aroma-fine-dine-restaurant-banquet.vercel.app/)

---

## Cross-Restaurant Ecosystem Switcher

To unify the dining brands under a cohesive customer journey, the shared component library provides the `RestaurantSwitcher` component ([`packages/ui/src/RestaurantSwitcher.tsx`](file:///d:/ecosystem/packages/ui/src/RestaurantSwitcher.tsx)).

### Functional Specifications
1. **Persistent Access**: Floats smoothly on the layout header across every application.
2. **Current Context Awareness**: Highlights the currently active restaurant and disables redundant reloads.
3. **Sister Brand Discovery**: Displays city location, short descriptions, cuisine tags, and direct cross-domain routing.
4. **Motion & Polish**: Powered by Framer Motion spring animations, backdrop blur filters (`backdrop-blur-md`), and status indicators.
