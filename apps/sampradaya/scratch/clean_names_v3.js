const fs = require('fs');
let content = fs.readFileSync('d:/Sampradaya/src/app/menu/page.tsx', 'utf8');

const cleanName = (name) => {
    let clean = name.replace(/\s+(In|On|With|Served|Serving).*$/i, '');
    clean = clean.replace(/\s+(Bowl|Ceramic|Plate|Handi|Copper|Pot|Pan|Kadhai|Kadai|Dish)\b/gi, '');
    return clean.trim();
};

content = content.replace(/"name": "(.*?)"/g, (match, p1) => {
    const skip = ["Veg Curries & Dals", "Starters", "Biryanis", "Indian Breads", "Desserts, Ice Cream & Beverages", "Non-Veg Curries (Egg, Chicken, Mutton)", "Rice & Noodles", "Salads & Raithas"];
    if (skip.includes(p1)) {
        return match;
    }
    const cleaned = cleanName(p1);
    return `"name": "${cleaned}"`;
});

fs.writeFileSync('d:/Sampradaya/src/app/menu/page.tsx', content);
console.log('Names cleaned successfully with double quotes around name');
