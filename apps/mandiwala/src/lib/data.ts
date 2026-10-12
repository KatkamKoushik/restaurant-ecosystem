export interface MenuItem {
  id: string;
  name: string;
  category: "Signature" | "Chicken" | "Mutton" | "Egg" | "Paneer" | "Seafood" | "Add-on" | "Dessert";
  description: string;
  image: string;
  isBestSeller?: boolean;
  prices: {
    single?: number;
    half?: number;
    tri?: number;
    family?: number;
    fixed?: number;
  };
}
