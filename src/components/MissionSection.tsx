
import { useEffect, useRef } from 'react';

const MissionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const addCalligraphyElements = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const sectionWidth = section.offsetWidth;
      const sectionHeight = section.offsetHeight;
      
      // Arabic words for health-related concepts
      const arabicTexts = [
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
      ];
      
      // Colors from our theme
      const colors = ['#1A9AAD', '#A82B2B', '#1F4068', '#E6C095', '#563C5C'];
      
      // Create and append calligraphy elements
      for (let i = 0; i < 12; i++) {
        const text = arabicTexts[Math.floor(Math.random() * arabicTexts.length)];
        const span = document.createElement('span');
        
        span.className = 'font-arabic absolute pointer-events-none select-none';
        span.style.fontSize = `${Math.floor(30 + Math.random() * 20)}px`;
        span.style.opacity = `${0.1 + Math.random() * 0.15}`;
        span.style.color = colors[Math.floor(Math.random() * colors.length)];
        span.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
        span.textContent = text;
        
        // Position elements around the section's content
        // Create a margin around the content
        const marginX = sectionWidth * 0.1;
        const marginY = sectionHeight * 0.1;
        
        // Determine positions - either along the edges or in corners
        let posX, posY;
        
        const position = Math.floor(Math.random() * 4);
        switch (position) {
          case 0: // Left side
            posX = marginX - 40;
            posY = marginY + Math.random() * (sectionHeight - marginY * 2);
            break;
          case 1: // Right side
            posX = sectionWidth - marginX + 10;
            posY = marginY + Math.random() * (sectionHeight - marginY * 2);
            break;
          case 2: // Top
            posX = marginX + Math.random() * (sectionWidth - marginX * 2);
            posY = marginY - 20;
            break;
          default: // Bottom
            posX = marginX + Math.random() * (sectionWidth - marginX * 2);
            posY = sectionHeight - marginY + 20;
            break;
        }
        
        span.style.left = `${posX}px`;
        span.style.top = `${posY}px`;
        
        section.appendChild(span);
      }
    };
    
    // Add a small delay to ensure the section is fully rendered
    const timer = setTimeout(() => {
      addCalligraphyElements();
    }, 500);
    
    return () => {
      clearTimeout(timer);
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll('.font-arabic');
        elements.forEach(el => el.remove());
      }
    };
  }, []);
  
  return (
    <section className="py-16 md:py-24 relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">
            <span className="relative inline-block">
              <span className="relative z-10">Our Mission</span>
              <span className="absolute -top-6 -left-8 text-healthGold opacity-20 font-arabic text-4xl">رسالة</span>
            </span>
          </h2>
          <div className="prose prose-lg mx-auto relative">
            <div className="absolute -top-12 -right-16 text-healthRed opacity-15 font-arabic text-5xl rotate-12">مهمة</div>
            <div className="absolute -bottom-12 -left-16 text-healthTeal opacity-15 font-arabic text-5xl -rotate-12">صحة</div>
            <p className="text-lg text-center mb-6">
              The Middle Eastern Health Initiative is a national research network designed to increase health education and medical research in the Middle East and enhance the healthcare quality and outcomes for communities across the region.
            </p>
            <p className="text-lg text-center mb-6">
              Founded in 2023, the Initiative develops new knowledge and healthcare practices to increase the availability of quality healthcare for people in need and improve long-term outcomes for patients across the Middle East.
            </p>
            <p className="text-lg text-center">
              Our program is the first to bring together and integrate five research themes, overarching from creating a culture of health education to post-treatment long-term health.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
