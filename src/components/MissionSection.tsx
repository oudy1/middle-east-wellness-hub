
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

const MissionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const addCalligraphyElements = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const sectionWidth = section.offsetWidth;
      const sectionHeight = section.offsetHeight;
      
      // Arabic words for health-related concepts and Arab cities
      const arabicTexts = [
        // Health terms
        "صحة", // Health
        "عافية", // Wellness
        "شفاء", // Healing
        "طب", // Medicine
        "رعاية", // Care
        "علاج", // Treatment
        "وقاية", // Prevention
        "تقدم", // Progress
        "تعاون", // Cooperation
        "بحث", // Research
        // Arab cities
        "القاهرة", // Cairo
        "دمشق", // Damascus
        "بغداد", // Baghdad
        "الرياض", // Riyadh
        "بيروت", // Beirut
        "عمّان", // Amman
        "دبي", // Dubai
        "مكة", // Mecca
        "المدينة", // Medina
        "الإسكندرية", // Alexandria
        "حلب", // Aleppo
        "طنجة", // Tangier
        "القدس", // Jerusalem
        "مراكش", // Marrakech
      ];
      
      // Colors from our theme
      const colors = ['#1A9AAD', '#A82B2B', '#1F4068', '#E6C095', '#563C5C', '#8B5CF6', '#0EA5E9'];
      
      // Remove any existing calligraphy elements
      const existingElements = section.querySelectorAll('.font-arabic');
      existingElements.forEach(el => el.remove());
      
      // Create and append calligraphy elements
      for (let i = 0; i < 30; i++) {
        const text = arabicTexts[Math.floor(Math.random() * arabicTexts.length)];
        const span = document.createElement('span');
        
        span.className = 'font-arabic absolute pointer-events-none select-none transition-opacity duration-1000';
        span.style.fontSize = `${Math.floor(30 + Math.random() * 20)}px`;
        span.style.opacity = `${0.15 + Math.random() * 0.2}`;
        span.style.color = colors[Math.floor(Math.random() * colors.length)];
        span.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
        span.textContent = text;
        
        // Position elements around the section's content
        // Create a margin around the content
        const marginX = sectionWidth * 0.1;
        const marginY = sectionHeight * 0.1;
        
        // Create a more pleasing distribution
        let posX, posY;
        
        // Distribute elements evenly around the edges
        const position = Math.floor(Math.random() * 8);
        switch (position) {
          case 0: // Left side - top
            posX = Math.random() * marginX;
            posY = Math.random() * (sectionHeight / 3);
            break;
          case 1: // Left side - middle
            posX = Math.random() * marginX;
            posY = (sectionHeight / 3) + Math.random() * (sectionHeight / 3);
            break;
          case 2: // Left side - bottom
            posX = Math.random() * marginX;
            posY = (2 * sectionHeight / 3) + Math.random() * (sectionHeight / 3);
            break;
          case 3: // Right side - top
            posX = sectionWidth - Math.random() * marginX;
            posY = Math.random() * (sectionHeight / 3);
            break;
          case 4: // Right side - middle
            posX = sectionWidth - Math.random() * marginX;
            posY = (sectionHeight / 3) + Math.random() * (sectionHeight / 3);
            break;
          case 5: // Right side - bottom
            posX = sectionWidth - Math.random() * marginX;
            posY = (2 * sectionHeight / 3) + Math.random() * (sectionHeight / 3);
            break;
          case 6: // Top
            posX = marginX + Math.random() * (sectionWidth - 2 * marginX);
            posY = Math.random() * marginY;
            break;
          default: // Bottom
            posX = marginX + Math.random() * (sectionWidth - 2 * marginX);
            posY = sectionHeight - Math.random() * marginY;
            break;
        }
        
        span.style.left = `${posX}px`;
        span.style.top = `${posY}px`;
        
        // Add entrance animation
        span.style.opacity = '0';
        section.appendChild(span);
        
        // Delayed fade in for visual interest
        setTimeout(() => {
          span.style.opacity = `${0.15 + Math.random() * 0.2}`;
        }, 100 * i);
      }
    };
    
    // Add a small delay to ensure the section is fully rendered
    const timer = setTimeout(() => {
      addCalligraphyElements();
    }, 500);
    
    // Handle window resize
    const handleResize = () => {
      clearTimeout(timer);
      addCalligraphyElements();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll('.font-arabic');
        elements.forEach(el => el.remove());
      }
    };
  }, []);
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">
            <span className="relative inline-block">
              <span className="relative z-10">Our Mission</span>
              <span className="absolute -top-6 -left-8 text-healthGold opacity-20 font-arabic text-4xl">رسالة</span>
            </span>
          </h2>
          
          {/* Calligraphy Frame */}
          <div className="relative p-8 md:p-12 mb-8 mt-8">
            {/* Frame Border with Calligraphy Pattern */}
            <div className="absolute inset-0 border-8 border-opacity-30 border-healthGold rounded-lg overflow-hidden">
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
            
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm relative z-10">
              <div className="prose prose-lg mx-auto p-6 relative">
                <div className="absolute -top-12 -right-16 text-healthRed opacity-20 font-arabic text-5xl rotate-12 animate-[pulse_5s_infinite]">مهمة</div>
                <div className="absolute -bottom-12 -left-16 text-healthTeal opacity-20 font-arabic text-5xl -rotate-12 animate-[pulse_5s_infinite]">صحة</div>
                <div className="absolute top-1/4 -left-20 text-healthPurple opacity-20 font-arabic text-4xl rotate-6 animate-[pulse_7s_infinite]">طب</div>
                <div className="absolute top-1/3 -right-24 text-healthGold opacity-20 font-arabic text-4xl -rotate-9 animate-[pulse_6s_infinite]">الرعاية</div>
                
                <p className="text-lg text-center mb-6 relative">
                  <span className="absolute -top-6 -left-6 font-arabic text-healthRed opacity-25 text-3xl">علم</span>
                  The Middle Eastern Health Initiative is a national research network designed to increase health education and medical research in the Middle East and enhance the healthcare quality and outcomes for communities across the region.
                </p>
                <p className="text-lg text-center mb-6 relative">
                  <span className="absolute -top-6 -right-6 font-arabic text-healthTeal opacity-25 text-3xl">طب</span>
                  Founded in 2023, the Initiative develops new knowledge and healthcare practices to increase the availability of quality healthcare for people in need and improve long-term outcomes for patients across the Middle East.
                </p>
                <p className="text-lg text-center relative">
                  <span className="absolute -bottom-6 -right-6 font-arabic text-healthGold opacity-25 text-3xl">خدمة</span>
                  Our program is the first to bring together and integrate five research themes, overarching from creating a culture of health education to post-treatment long-term health.
                  <span className="absolute -bottom-6 -left-6 font-arabic text-healthPurple opacity-25 text-3xl">بحث</span>
                </p>
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
