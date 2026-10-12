const fs = require('fs');
let content = fs.readFileSync('d:/Sampradaya/src/app/menu/page.tsx', 'utf8');

// Function to clean a name
const cleanName = (name) => {
    // Remove anything from "In", "On", "With", "Served", "Serving" onwards
    // e.g. "Chicken Fry Biryani In Handi" -> "Chicken Fry Biryani"
    // "Gongura Paneer Biryani Served" -> "Gongura Paneer Biryani"
    // "Chicken Biryani In Copper Handi" -> "Chicken Biryani"
    let clean = name.replace(/\s+(In|On|With|Served|Serving).*$/i, '');
    
    // Also remove any stray "Bowl", "Ceramic", "Plate", "Handi", "Copper" at the end if they exist
    clean = clean.replace(/\s+(Bowl|Ceramic|Plate|Handi|Copper|Pot|Pan|Kadhai|Kadai|Dish)\b/gi, '');
    
    return clean.trim();
};

content = content.replace(/name: "(.*?)"/g, (match, p1) => {
    // skip category names
    if (p1 === "Veg Curries & Dals" || p1 === "Starters" || p1 === "Biryanis" || p1 === "Indian Breads" || p1 === "Desserts, Ice Cream & Beverages" || p1 === "Non-Veg Curries (Egg, Chicken, Mutton)" || p1 === "Rice & Noodles" || p1 === "Salads & Raithas") {
        return match;
    }
    const cleaned = cleanName(p1);
    return `name: "${cleaned}"`;
});

fs.writeFileSync('d:/Sampradaya/src/app/menu/page.tsx', content);
console.log('Names cleaned successfully');
