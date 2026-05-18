const fs = require('fs');
const path = require('path');

// 1. Optimize individual page files
const fileOptimizations = [
  { file: 'top-stocks/[type]/page.tsx', from: 'export const revalidate = 60;', to: 'export const revalidate = 3600; // 1 hour' },
  { file: 'stocks/[symbol]/page.tsx', from: 'export const revalidate = 60;', to: 'export const revalidate = 14400; // 4 hours' },
  { file: 'stocks/page.tsx', from: 'export const revalidate = 60;', to: 'export const revalidate = 3600; // 1 hour' },
  { file: 'page.tsx', from: 'export const revalidate = 60;', to: 'export const revalidate = 3600; // 1 hour' },
  { file: 'markets/page.tsx', from: 'export const revalidate = 60;', to: 'export const revalidate = 3600; // 1 hour' },
  { file: 'markets/india/page.tsx', from: 'export const revalidate = 60;', to: 'export const revalidate = 3600; // 1 hour' },
  { file: 'markets/global/page.tsx', from: 'export const revalidate = 120;', to: 'export const revalidate = 3600; // 1 hour' },
  { file: 'indices/[id]/page.tsx', from: 'export const revalidate = 60;', to: 'export const revalidate = 14400; // 4 hours' },
  { file: 'indices/page.tsx', from: 'export const revalidate = 60;', to: 'export const revalidate = 3600; // 1 hour' },
  { file: 'forex/page.tsx', from: 'export const revalidate = 300; // Forex updates every 5 mins', to: 'export const revalidate = 3600; // 1 hour' },
  { file: 'forex/[id]/page.tsx', from: 'export const revalidate = 300; // Forex updates every few mins', to: 'export const revalidate = 14400; // 4 hours' },
  { file: 'crypto/[id]/page.tsx', from: 'export const revalidate = 60;', to: 'export const revalidate = 14400; // 4 hours' },
  { file: 'crypto/page.tsx', from: 'export const revalidate = 60;', to: 'export const revalidate = 3600; // 1 hour' },
  { file: 'crypto/losers/page.tsx', from: 'export const revalidate = 60;', to: 'export const revalidate = 3600; // 1 hour' },
  { file: 'crypto/gainers/page.tsx', from: 'export const revalidate = 60;', to: 'export const revalidate = 3600; // 1 hour' },
  { file: 'commodities/page.tsx', from: 'export const revalidate = 300; // Commodities update every 5 mins', to: 'export const revalidate = 3600; // 1 hour' },
  { file: 'commodities/[id]/page.tsx', from: 'export const revalidate = 300;', to: 'export const revalidate = 14400; // 4 hours' },
];

const basePath = path.join(__dirname, '..', 'app');

fileOptimizations.forEach(opt => {
  const filePath = path.join(basePath, opt.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(opt.from)) {
      content = content.replace(opt.from, opt.to);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${opt.file}`);
    } else {
      console.log(`Pattern not found in ${opt.file}`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

// 2. Optimize conglomerate pages
const conglomeratesDir = path.join(basePath, 'conglomerates');
if (fs.existsSync(conglomeratesDir)) {
  const subdirs = fs.readdirSync(conglomeratesDir);
  subdirs.forEach(sub => {
    const pagePath = path.join(conglomeratesDir, sub, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      let content = fs.readFileSync(pagePath, 'utf8');
      if (content.includes('export const revalidate = 60;')) {
        content = content.replace('export const revalidate = 60;', 'export const revalidate = 86400; // 24 hours (daily)');
        fs.writeFileSync(pagePath, content, 'utf8');
        console.log(`Updated conglomerate: ${sub}`);
      }
    }
  });
}
