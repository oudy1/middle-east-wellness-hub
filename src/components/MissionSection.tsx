
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

const MissionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to create organized calligraphy background
    const createOrganizedCalligraphy = () => {
      if (!frameRef.current) return;
      
      const frame = frameRef.current;
      const frameWidth = frame.offsetWidth;
      const frameHeight = frame.offsetHeight;
      
      // Clear existing elements
      const existingElements = frame.querySelectorAll('.calligraphy-float');
      existingElements.forEach(el => el.remove());
      
      // Arabic words for health-related concepts and cities
      const arabicTexts = [
        // Health terms
        "صحة", "عافية", "شفاء", "طب", "رعاية", "علاج", "وقاية", "تقدم", "تعاون", "بحث", "تعليم", "مشاركة", "تمثيل", "عدالة", "مساواة",
        "توعية", "دعم", "تمكين", "تطوير", "إبداع", "ابتكار", "تواصل", "تضامن", "أمل", "ثقة", "احترام", "كرامة", "اهتمام", "إصغاء",

        // Arab cities and capitals - organized by country
        // Saudi Arabia
        "الرياض", "جدة", "مكة", "المدينة", "الدمام", "الطائف", "تبوك", "أبها", "حائل", "جازان",
        
        // Egypt
        "القاهرة", "الإسكندرية", "الأقصر", "أسوان", "الغردقة", "شرم الشيخ", "بورسعيد", "طنطا", "المنصورة", "الفيوم",
        
        // UAE
        "أبو ظبي", "دبي", "الشارقة", "عجمان", "رأس الخيمة", "الفجيرة", "أم القيوين", "العين", "خورفكان", "دبا",
        
        // Lebanon
        "بيروت", "طرابلس", "صيدا", "صور", "جونية", "زحلة", "بعلبك", "النبطية", "بشري", "جبيل",
        
        // Jordan
        "عمّان", "إربد", "الزرقاء", "العقبة", "السلط", "مادبا", "جرش", "عجلون", "الكرك", "المفرق",
        
        // Iraq
        "بغداد", "البصرة", "الموصل", "أربيل", "كركوك", "النجف", "كربلاء", "السليمانية", "الفلوجة", "الناصرية",
        
        // Syria
        "دمشق", "حلب", "حمص", "اللاذقية", "طرطوس", "حماة", "دير الزور", "الرقة", "درعا", "السويداء",
        
        // Morocco
        "الرباط", "الدار البيضاء", "مراكش", "فاس", "طنجة", "مكناس", "أغادير", "وجدة", "تطوان", "الصويرة",
        
        // Tunisia
        "تونس", "صفاقس", "سوسة", "القيروان", "بنزرت", "قابس", "المنستير", "نابل", "مدنين", "جربة",
        
        // Algeria
        "الجزائر", "وهران", "قسنطينة", "عنابة", "سطيف", "تلمسان", "باتنة", "بجاية", "سكيكدة", "البليدة",
        
        // Kuwait
        "الكويت", "الأحمدي", "حولي", "الفروانية", "الجهراء", "مبارك الكبير",
        
        // Bahrain
        "المنامة", "المحرق", "الرفاع", "مدينة عيسى", "مدينة حمد", "سترة",
        
        // Qatar
        "الدوحة", "الريان", "الوكرة", "أم صلال", "الخور", "الشمال",
        
        // Oman
        "مسقط", "صلالة", "صحار", "نزوى", "صور", "البريمي",
        
        // Libya
        "طرابلس", "بنغازي", "مصراتة", "الزاوية", "البيضاء", "سبها",
        
        // Palestine
        "القدس", "غزة", "رام الله", "نابلس", "الخليل", "بيت لحم", "جنين", "أريحا", "طولكرم", "قلقيلية",
        
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
      
      // Featured health phrases
      const healthPhrases = [
        "الصحة للجميع", // Health for all
        "رعاية صحية متكاملة", // Comprehensive healthcare
        "التعليم الطبي", // Medical education
        "البحث العلمي", // Scientific research
        "المشاركة المجتمعية", // Community participation
        "الوقاية خير من العلاج", // Prevention is better than cure
        "الصحة النفسية", // Mental health
        "التمثيل العادل", // Fair representation
        "العدالة الصحية", // Health equity
        "بناء الثقة", // Building trust
        "تمكين المجتمع", // Community empowerment
        "كسر الحواجز", // Breaking barriers
        "الرعاية الثقافية", // Cultural care
        "صوت المجتمع", // Community voice
        "التعاون الصحي", // Health cooperation
      ];
      
      // Colors from our theme with opacity variations for visual layering
      const colors = [
        'rgba(26, 154, 173, 0.6)', // healthTeal
        'rgba(26, 154, 173, 0.3)', 
        'rgba(168, 43, 43, 0.6)', // healthRed
        'rgba(168, 43, 43, 0.3)',
        'rgba(31, 64, 104, 0.6)', // healthDarkBlue
        'rgba(31, 64, 104, 0.3)',
        'rgba(230, 192, 149, 0.6)', // healthGold
        'rgba(230, 192, 149, 0.3)',
        'rgba(86, 60, 92, 0.6)', // healthPurple
        'rgba(86, 60, 92, 0.3)',
        'rgba(96, 108, 56, 0.6)', // healthOlive
        'rgba(96, 108, 56, 0.3)',
      ];
      
      // Create grid-based organization for hundreds of elements
      const elementCount = 200; // Number of calligraphy elements
      
      // Create frame border elements (more densely packed)
      const borderWidth = 60; // Width of the border area
      const createFrameBorder = () => {
        // Top border
        for (let i = 0; i < 60; i++) {
          const x = (frameWidth * (i / 60)) + (Math.random() * 20 - 10);
          const y = Math.random() * borderWidth;
          createCalligraphyElement(x, y, arabicTexts, 0.2, 14, 22, true);
        }
        
        // Bottom border
        for (let i = 0; i < 60; i++) {
          const x = (frameWidth * (i / 60)) + (Math.random() * 20 - 10);
          const y = frameHeight - (Math.random() * borderWidth);
          createCalligraphyElement(x, y, arabicTexts, 0.2, 14, 22, true);
        }
        
        // Left border
        for (let i = 0; i < 40; i++) {
          const x = Math.random() * borderWidth;
          const y = (frameHeight * (i / 40)) + (Math.random() * 20 - 10);
          createCalligraphyElement(x, y, arabicTexts, 0.2, 14, 22, true);
        }
        
        // Right border
        for (let i = 0; i < 40; i++) {
          const x = frameWidth - (Math.random() * borderWidth);
          const y = (frameHeight * (i / 40)) + (Math.random() * 20 - 10);
          createCalligraphyElement(x, y, arabicTexts, 0.2, 14, 22, true);
        }
      };
      
      // Create scattered elements in the rest of the frame
      const createInnerElements = () => {
        // Create a grid system for more pleasing arrangement
        const gridCols = 10;
        const gridRows = 10;
        const cellWidth = (frameWidth - (borderWidth * 2)) / gridCols;
        const cellHeight = (frameHeight - (borderWidth * 2)) / gridRows;
        
        // Fill grid cells with elements
        for (let row = 0; row < gridRows; row++) {
          for (let col = 0; col < gridCols; col++) {
            if (Math.random() < 0.4) continue; // Skip some cells for a more natural look
            
            const baseX = borderWidth + (col * cellWidth);
            const baseY = borderWidth + (row * cellHeight);
            
            // Add randomness within the cell
            const x = baseX + (Math.random() * cellWidth * 0.7);
            const y = baseY + (Math.random() * cellHeight * 0.7);
            
            // Different types of elements based on position
            if (row === 0 || row === gridRows - 1 || col === 0 || col === gridCols - 1) {
              // Edges get cities
              createCalligraphyElement(x, y, arabicTexts, 0.25, 16, 24, false);
            } else if (Math.random() < 0.2) {
              // Some get health phrases
              createCalligraphyElement(x, y, healthPhrases, 0.3, 18, 30, false);
            } else {
              // Most get regular text
              createCalligraphyElement(x, y, arabicTexts, 0.25, 16, 24, false);
            }
          }
        }
      };
      
      // Helper function to create a single calligraphy element
      const createCalligraphyElement = (x, y, textArray, baseOpacity, minSize, maxSize, isBorder) => {
        const text = textArray[Math.floor(Math.random() * textArray.length)];
        const span = document.createElement('span');
        
        span.className = 'calligraphy-float font-arabic absolute pointer-events-none select-none';
        const fontSize = Math.floor(minSize + Math.random() * (maxSize - minSize));
        span.style.fontSize = `${fontSize}px`;
        
        // Slightly adjust opacity based on position and size
        const opacityVariation = Math.random() * 0.15;
        let opacity = baseOpacity + opacityVariation;
        if (fontSize > (minSize + maxSize) / 2) opacity += 0.05; // Larger text is slightly more visible
        
        span.style.opacity = opacity.toString();
        span.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Add rotation
        const rotation = Math.random() * 90 - 45;
        span.style.transform = `rotate(${rotation}deg)`;
        
        span.textContent = text;
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        
        // Add animation
        if (!isBorder && Math.random() < 0.3) {
          span.classList.add('animate-pulse');
          span.style.animationDuration = `${3 + Math.random() * 4}s`;
        }
        
        // Start with zero opacity and fade in
        span.style.opacity = '0';
        span.style.transition = 'opacity 0.5s ease-in-out';
        
        frame.appendChild(span);
        
        // Delayed fade in - creates a nice sequential effect
        setTimeout(() => {
          span.style.opacity = opacity.toString();
        }, Math.random() * 1500);
      };
      
      // Create all elements
      createFrameBorder();
      createInnerElements();
      
      // Add special featured phrases in larger size
      for (let i = 0; i < 10; i++) {
        const x = borderWidth + Math.random() * (frameWidth - borderWidth * 2);
        const y = borderWidth + Math.random() * (frameHeight - borderWidth * 2);
        createCalligraphyElement(x, y, healthPhrases, 0.35, 24, 32, false);
      }
    };
    
    // Initialize once and handle resize
    const initializeCalligraphy = () => {
      setTimeout(() => {
        createOrganizedCalligraphy();
      }, 100);
    };
    
    initializeCalligraphy();
    
    const handleResize = () => {
      initializeCalligraphy();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">
            <span className="relative inline-block">
              <span className="relative z-10">Our Mission</span>
              <span className="absolute -top-6 -left-8 text-healthGold opacity-20 font-arabic text-4xl">رسالة</span>
            </span>
          </h2>
          
          {/* Ornate Calligraphic Frame */}
          <div className="relative p-8 md:p-12 lg:p-16 mb-8 mt-8">
            {/* Frame Border with Rich Calligraphy Pattern */}
            <div ref={frameRef} className="absolute inset-0 border-8 border-opacity-30 border-healthGold rounded-lg overflow-hidden">
              <div className="absolute inset-0 calligraphy-frame-bg opacity-10"></div>
              
              {/* Calligraphy Corner Elements */}
              <span className="absolute top-0 left-0 font-arabic text-healthGold opacity-70 text-5xl -translate-x-1/4 -translate-y-1/4">بسم</span>
              <span className="absolute top-0 right-0 font-arabic text-healthTeal opacity-70 text-5xl translate-x-1/4 -translate-y-1/4">الله</span>
              <span className="absolute bottom-0 left-0 font-arabic text-healthRed opacity-70 text-5xl -translate-x-1/4 translate-y-1/4">الرحمن</span>
              <span className="absolute bottom-0 right-0 font-arabic text-healthPurple opacity-70 text-5xl translate-x-1/4 translate-y-1/4">الرحيم</span>
              
              {/* Decorative Side Elements */}
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="font-arabic text-healthDarkBlue opacity-60 text-4xl rotate-90 mb-4">صحة</span>
                <span className="font-arabic text-healthRed opacity-60 text-4xl rotate-90">عافية</span>
              </div>
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="font-arabic text-healthTeal opacity-60 text-4xl -rotate-90 mb-4">شفاء</span>
                <span className="font-arabic text-healthGold opacity-60 text-4xl -rotate-90">علاج</span>
              </div>
            </div>
            
            <Card className="shadow-lg bg-white/90 backdrop-blur-md relative z-10">
              <div className="prose prose-lg mx-auto p-6 relative">
                <div className="absolute -top-12 -right-16 text-healthRed opacity-20 font-arabic text-5xl rotate-12 animate-[pulse_5s_infinite]">مهمة</div>
                <div className="absolute -bottom-12 -left-16 text-healthTeal opacity-20 font-arabic text-5xl -rotate-12 animate-[pulse_5s_infinite]">صحة</div>
                <div className="absolute top-1/4 -left-20 text-healthPurple opacity-20 font-arabic text-4xl rotate-6 animate-[pulse_7s_infinite]">طب</div>
                <div className="absolute top-1/3 -right-24 text-healthGold opacity-20 font-arabic text-4xl -rotate-9 animate-[pulse_6s_infinite]">الرعاية</div>
                
                {/* Updated Mission Statement */}
                <h3 className="text-2xl font-bold text-center mb-6">Mission Statement</h3>
                <p className="text-lg text-center mb-6 relative">
                  <span className="absolute -top-6 -left-6 font-arabic text-healthRed opacity-25 text-3xl">ثقة</span>
                  Our mission is to build trust, dismantle barriers, and create a shared space of understanding between Arab and Middle Eastern communities and the Canadian healthcare system.
                </p>
                <p className="text-lg text-center mb-6 relative">
                  <span className="absolute -top-6 -right-6 font-arabic text-healthTeal opacity-25 text-3xl">تعليم</span>
                  We focus on bridging gaps in medical education, research participation, and healthcare access while advocating for culturally responsive care, accurate representation, and inclusive dialogue.
                </p>
                <p className="text-lg text-center mb-8 relative">
                  <span className="absolute -bottom-6 -right-6 font-arabic text-healthGold opacity-25 text-3xl">مجتمع</span>
                  Our work brings together students, families, professionals, and researchers to build a future where community voices are at the center of health equity.
                  <span className="absolute -bottom-6 -left-6 font-arabic text-healthPurple opacity-25 text-3xl">تعاون</span>
                </p>
                
                {/* Concise Arabic Mission Statement */}
                <div className="bg-healthLightGray/30 p-6 rounded-lg rtl">
                  <h3 className="text-2xl font-bold text-center mb-4 font-arabic">الرسالة</h3>
                  <p className="text-lg text-center mb-4 font-arabic leading-relaxed">
                    مهمّتنا هي نردم الفجوة بين الجاليات العربية والشرق أوسطية في كندا وبين النظام الصحي، من خلال بناء ثقة حقيقية، وتسهيل الفهم، وخلق مساحة نحكي فيها بصوتنا ونوصل أفكارنا.
                  </p>
                  <p className="text-lg text-center font-arabic leading-relaxed">
                    إحنا بنحاول نكسر الحواجز اللي بتبعدنا عن البحث العلمي، الطب، والتعليم الصحّي. بنشتغل سوا كطلّاب، أهالي، دكاترة، وباحثين عشان نخلق مجتمع متعاون، واعي، وبيمثلنا، منّا ولينا.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Decorative Flowing Calligraphy Ribbon */}
      <div className="absolute w-full bottom-0 left-0 h-24 overflow-hidden pointer-events-none">
        <div className="flowing-calligraphy absolute whitespace-nowrap font-arabic animate-[scroll_50s_linear_infinite] text-3xl opacity-10 bottom-2">
          صحة عافية شفاء طب رعاية علاج وقاية تقدم تعاون بحث القاهرة دمشق بغداد الرياض بيروت عمّان دبي مكة المدينة الإسكندرية حلب طنجة القدس مراكش
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
