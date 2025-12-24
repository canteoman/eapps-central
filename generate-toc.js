const fs = require('fs');
const path = require('path');

const announcementsDir = path.join(__dirname, 'announcements');
const tocPath = path.join(announcementsDir, 'toc.yml');

// Klasörü oku
const files = fs.readdirSync(announcementsDir)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => {
        // Dosya ismini baþlýk yap (örn: yeni-duyuru.md -> Yeni Duyuru)
        const name = file.replace('.md', '').replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
        return { name, href: file };
    });

// TOC içeriðini oluþtur (Baþa bir "Duyurular Ana Sayfa" ekleyebilirsin)
let tocContent = "- name: Duyurular\n  href: index.md\n";
files.forEach(file => {
    tocContent += `- name: ${file.name}\n  href: ${file.href}\n`;
});

// toc.yml dosyasýný üzerine yaz (veya yoksa oluþtur)
fs.writeFileSync(tocPath, tocContent, 'utf8');
console.log('TOC baþarýyla güncellendi: ' + tocPath);