
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
    
    // Expanded list of Arabic cities and capitals
    const arabicTexts = [
      // Capitals
      "القاهرة", // Cairo
      "دمشق", // Damascus
      "بغداد", // Baghdad
      "الرياض", // Riyadh
      "بيروت", // Beirut
      "عمّان", // Amman
      "الرباط", // Rabat
      "الجزائر", // Algiers
      "تونس", // Tunis
      "مسقط", // Muscat
      "صنعاء", // Sana'a
      "الدوحة", // Doha
      "المنامة", // Manama
      "أبو ظبي", // Abu Dhabi
      "الكويت", // Kuwait City
      "طرابلس", // Tripoli
      "الخرطوم", // Khartoum
      "نواكشوط", // Nouakchott
      
      // Countries
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
      "ليبيا", // Libya
      "السودان", // Sudan
      "موريتانيا", // Mauritania
      "جيبوتي", // Djibouti
      
      // Major Cities
      "الإسكندرية", // Alexandria
      "جدة", // Jeddah
      "مكة", // Mecca
      "المدينة", // Medina
      "فاس", // Fes
      "مراكش", // Marrakech
      "وهران", // Oran
      "حلب", // Aleppo
      "البصرة", // Basra
      "دبي", // Dubai
      "الشارقة", // Sharjah
      "صفاقس", // Sfax
      "طنجة", // Tangier
      "الموصل", // Mosul
      "أسوان", // Aswan
      "الأقصر", // Luxor
      "حيفا", // Haifa
      "القدس", // Jerusalem
      "غزة", // Gaza
    ];
    
    const healthPhrases = [
      "الصحة للجميع", // Health for all
      "الوقاية خير من العلاج", // Prevention is better than cure
      "صحة أفضل لمستقبل أفضل", // Better health for a better future
      "رعاية صحية متميزة", // Outstanding healthcare
      "العلم والطب", // Science and medicine
      "الصحة النفسية", // Mental health
      "الغذاء الصحي", // Healthy food
      "التطور الطبي", // Medical advancement
      "الرعاية الأولية", // Primary care
      "طب المستقبل", // Future medicine
    ];
    
    // Draw calligraphy
    const colors = ['#1A9AAD', '#A82B2B', '#1F4068', '#E6C095', '#563C5C', '#8B5CF6', '#0EA5E9'];
    
    // Function to create a harmonious distribution
    const createHarmoniousDistribution = (texts, size, opacity, count) => {
      // Create a grid system for more pleasing arrangement
      const gridSize = Math.sqrt(count);
      const cellWidth = canvas.width / gridSize;
      const cellHeight = canvas.height / gridSize;
      
      for (let i = 0; i < count; i++) {
        // Get grid position with some randomness
        const gridX = i % gridSize;
        const gridY = Math.floor(i / gridSize);
        
        // Add randomness within the cell, but ensure no overlap with cell boundaries
        const cellPadding = 50;
        const x = (gridX * cellWidth) + cellPadding + (Math.random() * (cellWidth - cellPadding * 2));
        const y = (gridY * cellHeight) + cellPadding + (Math.random() * (cellHeight - cellPadding * 2));
        
        const text = texts[Math.floor(Math.random() * texts.length)];
        const actualSize = size + Math.floor(Math.random() * 10) - 5; // Slight variation in size
        const rotation = Math.random() * Math.PI * 0.5 - Math.PI * 0.25;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.font = `${actualSize}px Amiri, serif`;
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.globalAlpha = opacity + (Math.random() * 0.1 - 0.05); // Slight variation in opacity
        ctx.textAlign = 'center';
        ctx.fillText(text, 0, 0);
        ctx.restore();
      }
    };
    
    // Draw city/country names (small)
    createHarmoniousDistribution(arabicTexts, 20, 0.15, 40);
    
    // Draw health phrases (medium)
    createHarmoniousDistribution(healthPhrases, 32, 0.2, 12);
    
    // Add a few larger featured words for visual interest (larger)
    const featuredWords = ["الصحة", "العافية", "الطب", "العلاج"];
    createHarmoniousDistribution(featuredWords, 48, 0.25, 6);
    
    // Export as image and set to localStorage to avoid regenerating on every reload
    const dataUrl = canvas.toDataURL('image/png');
    localStorage.setItem('calligraphy-bg', dataUrl);
    
    // Update the CSS variable for the background
    document.documentElement.style.setProperty('--calligraphy-bg', `url(${dataUrl})`);
  }, []);
  
  return null;
};

export default CalligraphyBackground;
