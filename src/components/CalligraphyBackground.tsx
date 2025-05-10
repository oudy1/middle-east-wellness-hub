
import { useEffect } from "react";

const CalligraphyBackground = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;
    
    canvas.width = 1500;
    canvas.height = 1500;
    
    // Set background
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Arabic words for countries and cities
    const arabicTexts = [
      "القاهرة", // Cairo
      "دمشق", // Damascus
      "بغداد", // Baghdad
      "الرياض", // Riyadh
      "بيروت", // Beirut
      "مصر", // Egypt
      "المغرب", // Morocco
      "الجزائر", // Algeria
      "تونس", // Tunisia
      "عمان", // Oman
      "الأردن", // Jordan
      "لبنان", // Lebanon
      "سوريا", // Syria
      "العراق", // Iraq
      "الكويت", // Kuwait
      "قطر", // Qatar
      "البحرين", // Bahrain
      "الإمارات", // UAE
      "السعودية", // Saudi Arabia
      "اليمن", // Yemen
      "فلسطين", // Palestine
      "الصحة", // Health
      "الطب", // Medicine
      "الرعاية الصحية", // Healthcare
    ];
    
    const healthPhrases = [
      "الصحة للجميع", // Health for all
      "الوقاية خير من العلاج", // Prevention is better than cure
      "صحة أفضل لمستقبل أفضل", // Better health for a better future
      "رعاية صحية متميزة", // Outstanding healthcare
    ];
    
    // Draw calligraphy
    const colors = ['#1A9AAD', '#A82B2B', '#1F4068', '#E6C095', '#563C5C'];
    
    // Draw city/country names
    for (let i = 0; i < 30; i++) {
      const text = arabicTexts[Math.floor(Math.random() * arabicTexts.length)];
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 18 + Math.floor(Math.random() * 30);
      const rotation = Math.random() * Math.PI * 0.5 - Math.PI * 0.25;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.font = `${size}px Amiri, serif`;
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.globalAlpha = 0.15 + Math.random() * 0.15;
      ctx.textAlign = 'center';
      ctx.fillText(text, 0, 0);
      ctx.restore();
    }
    
    // Draw health phrases (larger)
    for (let i = 0; i < 8; i++) {
      const text = healthPhrases[Math.floor(Math.random() * healthPhrases.length)];
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 32 + Math.floor(Math.random() * 20);
      const rotation = Math.random() * Math.PI * 0.3 - Math.PI * 0.15;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.font = `${size}px Amiri, serif`;
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.globalAlpha = 0.2 + Math.random() * 0.1;
      ctx.textAlign = 'center';
      ctx.fillText(text, 0, 0);
      ctx.restore();
    }
    
    // Export as image and set to localStorage to avoid regenerating on every reload
    const dataUrl = canvas.toDataURL('image/png');
    localStorage.setItem('calligraphy-bg', dataUrl);
    
    // Update the CSS variable for the background
    document.documentElement.style.setProperty('--calligraphy-bg', `url(${dataUrl})`);
  }, []);
  
  return null;
};

export default CalligraphyBackground;
