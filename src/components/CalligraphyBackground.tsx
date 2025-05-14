
import { useEffect } from "react";

const CalligraphyBackground = () => {
  useEffect(() => {
    // Check if we already have a stored background
    const storedBg = localStorage.getItem('calligraphy-bg');
    if (storedBg) {
      document.documentElement.style.setProperty('--calligraphy-bg', `url(${storedBg})`);
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;
    
    canvas.width = 1800;
    canvas.height = 1800;
    
    // Set background
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Expanded list of Arabic cities, capitals, and regions
    const arabicTexts = [
      // Saudi Arabia
      "الرياض", "جدة", "مكة", "المدينة", "الدمام", "الطائف", "تبوك", "أبها", "حائل", "جازان",
      "القصيم", "نجران", "الباحة", "الجوف", "عرعر", "سكاكا", "بريدة", "خميس مشيط", "ينبع", "الخبر",
      
      // Egypt
      "القاهرة", "الإسكندرية", "الأقصر", "أسوان", "الغردقة", "شرم الشيخ", "بورسعيد", "طنطا", "المنصورة", "الفيوم",
      "دمياط", "سوهاج", "المنيا", "قنا", "الإسماعيلية", "السويس", "بني سويف", "الوادي الجديد", "مطروح", "العريش",
      
      // UAE
      "أبو ظبي", "دبي", "الشارقة", "عجمان", "رأس الخيمة", "الفجيرة", "أم القيوين", "العين", "خورفكان", "دبا",
      "ليوا", "مدينة زايد", "مصفح", "جبل علي", "القصيص", "ديرة", "الحمرية", "بطين", "السلع", "غناتي",
      
      // Lebanon
      "بيروت", "طرابلس", "صيدا", "صور", "جونية", "زحلة", "بعلبك", "النبطية", "بشري", "جبيل",
      "عاليه", "بيبلوس", "حمانا", "الشوف", "كسروان", "المتن", "عكار", "بعقلين", "البترون", "المنية",
      
      // Jordan
      "عمّان", "إربد", "الزرقاء", "العقبة", "السلط", "مادبا", "جرش", "عجلون", "الكرك", "المفرق",
      "الطفيلة", "معان", "البتراء", "وادي رم", "أم قيس", "الرمثا", "الحصن", "الشونة", "ديرعلا", "الرصيفة",
      
      // Iraq
      "بغداد", "البصرة", "الموصل", "أربيل", "كركوك", "النجف", "كربلاء", "السليمانية", "الفلوجة", "الناصرية",
      "الديوانية", "الحلة", "بعقوبة", "الكوت", "العمارة", "سامراء", "الرمادي", "دهوك", "تكريت", "الخالص",
      
      // Syria
      "دمشق", "حلب", "حمص", "اللاذقية", "طرطوس", "حماة", "دير الزور", "الرقة", "درعا", "السويداء",
      "القامشلي", "الحسكة", "إدلب", "بانياس", "المالكية", "عفرين", "منبج", "جبلة", "تدمر", "دوما",
      
      // Morocco
      "الرباط", "الدار البيضاء", "مراكش", "فاس", "طنجة", "مكناس", "أغادير", "وجدة", "تطوان", "الصويرة",
      "القنيطرة", "خريبكة", "بني ملال", "سلا", "الناظور", "العرائش", "آسفي", "الجديدة", "سطات", "محمدية",
      
      // Tunisia
      "تونس", "صفاقس", "سوسة", "القيروان", "بنزرت", "قابس", "المنستير", "نابل", "مدنين", "جربة",
      "قفصة", "باجة", "سليانة", "الكاف", "توزر", "جندوبة", "سيدي بوزيد", "تطاوين", "زغوان", "بنقردان",
      
      // Algeria
      "الجزائر", "وهران", "قسنطينة", "عنابة", "سطيف", "تلمسان", "باتنة", "بجاية", "سكيكدة", "البليدة",
      "تيزي وزو", "بسكرة", "مستغانم", "الشلف", "غرداية", "الجلفة", "برج بوعريريج", "الوادي", "تبسة", "المدية",
      
      // Kuwait, Bahrain, Qatar, Oman
      "الكويت", "المنامة", "الدوحة", "مسقط", "الأحمدي", "المحرق", "الريان", "صلالة",
      "حولي", "الرفاع", "الوكرة", "نزوى", "الفروانية", "ستره", "الخور", "صحار",
      
      // Libya
      "طرابلس", "بنغازي", "مصراتة", "الزاوية", "البيضاء", "سبها", "درنة", "زليتن", "الخمس", "غريان",
      
      // Palestine
      "القدس", "غزة", "رام الله", "نابلس", "الخليل", "بيت لحم", "جنين", "أريحا", "طولكرم", "قلقيلية",
      "رفح", "خان يونس", "البيرة", "بيت حانون", "سلفيت", "طوباس", "دير البلح", "حلحول", "الظاهرية", "سلواد",
      
      // Yemen
      "صنعاء", "عدن", "تعز", "الحديدة", "المكلا", "ذمار", "إب", "البيضاء", "حضرموت", "المحويت",
      
      // Sudan
      "الخرطوم", "أم درمان", "بورتسودان", "كسلا", "الأبيض", "الفاشر", "نيالا", "عطبرة", "الدمازين", "الجنينة",
      
      // Countries
      "مصر", "السعودية", "الإمارات", "الكويت", "البحرين", "قطر", "عمان", "العراق", "سوريا", "لبنان", "الأردن", 
      "فلسطين", "اليمن", "السودان", "تونس", "الجزائر", "المغرب", "ليبيا", "موريتانيا", "جيبوتي", "الصومال", "جزر القمر",
      
      // Canada - Arabic
      "كندا", "تورنتو", "مونتريال", "فانكوفر", "كالجاري", "أوتاوا", "إدمونتون", "كيبيك", "هاليفاكس", "وينيبيغ"
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
      "صحة المجتمع", // Community health
      "التثقيف الصحي", // Health education
      "الطب العربي", // Arab medicine
      "البحث الطبي", // Medical research
      "تكنولوجيا الصحة", // Health technology
      "الرعاية المتكاملة", // Integrated care
      "الصحة العامة", // Public health
      "تعزيز الصحة", // Health promotion
      "الرفاهية", // Wellbeing
      "التشخيص المبكر", // Early diagnosis
      "العافية الشاملة", // Holistic wellness
      "الطب الوقائي", // Preventive medicine
      "الصحة الجسدية", // Physical health
      "التغذية السليمة", // Proper nutrition
      "العلاج الطبيعي", // Physical therapy
      "رعاية المسنين", // Elder care
      "صحة الأطفال", // Children's health
      "صحة المرأة", // Women's health
      "التواصل الصحي", // Health communication
      "الثقافة الصحية", // Health culture
    ];
    
    // Draw calligraphy
    const colors = ['#1A9AAD', '#A82B2B', '#1F4068', '#E6C095', '#563C5C', '#8B5CF6', '#0EA5E9', '#606C38'];
    
    // Function to create a more organized, grid-based distribution
    const createOrganizedDistribution = (texts, size, opacity, count) => {
      // Create a grid system for more structured arrangement
      const gridSize = Math.sqrt(count * 1.5); // More cells than elements for some empty space
      const cellWidth = canvas.width / gridSize;
      const cellHeight = canvas.height / gridSize;
      
      let elementsPlaced = 0;
      const occupiedCells = new Set();
      
      while (elementsPlaced < count) {
        // Select a random cell
        const gridX = Math.floor(Math.random() * gridSize);
        const gridY = Math.floor(Math.random() * gridSize);
        const cellKey = `${gridX}-${gridY}`;
        
        // Skip if cell is already occupied
        if (occupiedCells.has(cellKey)) continue;
        
        occupiedCells.add(cellKey);
        elementsPlaced++;
        
        // Position within cell with some randomness but avoid overlap
        const cellPadding = cellWidth * 0.2;
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
    
    // Draw geometric patterns (enhanced for more detail)
    const drawGeometricPatterns = () => {
      const patternCount = 20; // Increased from 12
      const patternSize = 150; // Increased from 120
      
      for (let i = 0; i < patternCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = patternSize * (0.5 + Math.random() * 0.5);
        const rotation = Math.random() * Math.PI * 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.05 + Math.random() * 0.05;
        ctx.lineWidth = 1;
        
        // Draw star pattern (common in Islamic art)
        ctx.beginPath();
        // More complex star with 10 points instead of 8
        for (let j = 0; j < 10; j++) {
          const angle = (j * Math.PI / 5);
          const innerRadius = size * 0.3;
          const outerRadius = size * 0.5;
          
          // Draw point of star
          ctx.lineTo(
            Math.cos(angle) * outerRadius,
            Math.sin(angle) * outerRadius
          );
          
          // Draw inner point
          ctx.lineTo(
            Math.cos(angle + Math.PI/10) * innerRadius,
            Math.sin(angle + Math.PI/10) * innerRadius
          );
        }
        ctx.closePath();
        ctx.stroke();
        
        // Draw inner geometric design
        ctx.beginPath();
        for (let j = 0; j < 10; j++) {
          const angle = (j * Math.PI / 5) + Math.PI / 10;
          ctx.moveTo(0, 0);
          ctx.lineTo(
            Math.cos(angle) * (size * 0.4),
            Math.sin(angle) * (size * 0.4)
          );
        }
        ctx.stroke();
        
        // Add circular patterns
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
        ctx.stroke();
        
        // Add arabesque-inspired details
        ctx.beginPath();
        for (let j = 0; j < 20; j++) {
          const angle = (j * Math.PI / 10);
          const radius = size * 0.6;
          
          ctx.moveTo(
            Math.cos(angle) * (radius * 0.7),
            Math.sin(angle) * (radius * 0.7)
          );
          
          ctx.bezierCurveTo(
            Math.cos(angle + Math.PI/20) * (radius * 0.8),
            Math.sin(angle + Math.PI/20) * (radius * 0.8),
            Math.cos(angle + Math.PI/10) * (radius * 0.8),
            Math.sin(angle + Math.PI/10) * (radius * 0.8),
            Math.cos(angle + Math.PI/10) * (radius * 0.7),
            Math.sin(angle + Math.PI/10) * (radius * 0.7)
          );
        }
        ctx.stroke();
        
        ctx.restore();
      }
    };
    
    // Draw city/country names (small) - increased count from 60 to 120
    createOrganizedDistribution(arabicTexts, 20, 0.15, 120);
    
    // Draw health phrases (medium) - increased from 18 to 30
    createOrganizedDistribution(healthPhrases, 32, 0.2, 30);
    
    // Add geometric patterns
    drawGeometricPatterns();
    
    // Add a few larger featured words for visual interest (larger) - increased from 10 to 15
    const featuredWords = ["الصحة", "العافية", "الطب", "العلاج", "الرعاية الصحية", "المبادرة", "التعاون", "البحث", "التعليم", "المجتمع", "المشاركة", "كندا", "العرب", "الثقة", "المستقبل"];
    createOrganizedDistribution(featuredWords, 48, 0.25, 15);
    
    // Export as image and set to localStorage to avoid regenerating on every reload
    const dataUrl = canvas.toDataURL('image/png');
    localStorage.setItem('calligraphy-bg', dataUrl);
    
    // Update the CSS variable for the background
    document.documentElement.style.setProperty('--calligraphy-bg', `url(${dataUrl})`);
  }, []);
  
  return null;
};

export default CalligraphyBackground;
