const fs = require('fs');
let content = fs.readFileSync('d:/Sampradaya/src/app/menu/page.tsx', 'utf8');

// Function to clean a name
const cleanName = (name) => {
    let clean = name.replace(/ (In|On|With|And)? ?(A )?(White|Black|Brown)? ?(Bowl|Ceramic|Plate|Kadhai|Dish|Pan|Pot|Kadai|Kadhi|Handi|Bucket|Bowl on|Bowl in|Ceramic Bowl|White Bowl|Black Bowl|Brown Bowl|Plate|Dish)\b/gi, '');
    clean = clean.replace(/ (In|On) /gi, ' ').trim();
    return clean;
};

// We will find all `name: "Something"` lines inside page.tsx and clean them
content = content.replace(/name: "(.*?)"/g, (match, p1) => {
    // skip category names like "Veg Curries & Dals"
    if (p1 === "Veg Curries & Dals" || p1 === "Starters" || p1 === "Biryanis" || p1 === "Indian Breads") return match;
    const cleaned = cleanName(p1);
    return `name: "${cleaned}"`;
});

fs.writeFileSync('d:/Sampradaya/src/app/menu/page.tsx', content);
console.log('Done cleaning names in page.tsx');
