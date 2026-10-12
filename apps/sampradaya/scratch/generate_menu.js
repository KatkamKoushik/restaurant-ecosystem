const fs = require('fs');
const path = require('path');
function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, filesList);
    } else {
      filesList.push(fullPath.replace(/\\/g, '/').replace('d:/Sampradaya/public', ''));
    }
  }
  return filesList;
}
const allImages = getFiles('d:/Sampradaya/public/dishes');

let idCounter = 1;
const getPrice = (name, cat) => {
    if (name.includes('Water')) return 20;
    if (name.includes('Soft Drink')) return 50;
    if (name.includes('Butter Milk')) return 90;
    if (name.includes('Lassi')) return 120;
    if (name.includes('Lime')) return 60;
    if (name.includes('Jamun') || name.includes('Meeta')) return 99;
    if (cat.includes('Beverages')) return 80;
    if (cat.includes('Bread')) {
        if (name.includes('Roti')) return 35;
        if (name.includes('Kulcha')) return 60;
        return 50;
    }
    if (cat.includes('Salad') || cat.includes('Raitha')) return 100;
    if (cat.includes('Veg')) return 310;
    if (cat.includes('Rice & Noodles')) {
        return name.toLowerCase().includes('chicken') || name.toLowerCase().includes('egg') ? 290 : 280;
    }
    if (name.toLowerCase().includes('fish') || name.toLowerCase().includes('prawn') || name.toLowerCase().includes('seafood')) return 499;
    if (name.toLowerCase().includes('mutton')) return 450;
    if (name.toLowerCase().includes('chicken')) return 350;
    return 300;
};

const getType = (name, cat) => {
    if (name.toLowerCase().includes('chicken') || name.toLowerCase().includes('mutton') || name.toLowerCase().includes('fish') || name.toLowerCase().includes('prawn') || name.toLowerCase().includes('egg')) return 'non-veg';
    return 'veg';
};

const formatName = (filename) => {
    let name = path.parse(filename).name;
    name = name.replace(/_2026\d+/, '').replace(/\s*\(\d+\)/, '');
    name = name.replace(/_/g, ' ');
    return name.replace(/\b\w/g, c => c.toUpperCase());
};

const categoryMap = {};

allImages.forEach(imgPath => {
    if (imgPath.includes('.DS_Store') || !imgPath.endsWith('.jpeg')) return;
    const parts = imgPath.split('/');
    let catName = parts[2];
    if (catName.includes('Starters')) catName = 'Starters';
    
    if (!categoryMap[catName]) categoryMap[catName] = [];
    
    const formattedName = formatName(path.basename(imgPath));
    
    categoryMap[catName].push({
        id: 'i' + idCounter++,
        name: formattedName,
        price: getPrice(formattedName, catName),
        type: getType(formattedName, catName),
        image: imgPath
    });
});

const menuCategories = Object.keys(categoryMap).map(k => ({
    id: k.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
    name: k,
    items: categoryMap[k]
}));

if (!fs.existsSync('d:/Sampradaya/scratch')) fs.mkdirSync('d:/Sampradaya/scratch');
fs.writeFileSync('d:/Sampradaya/scratch/menu.json', JSON.stringify(menuCategories, null, 2));
