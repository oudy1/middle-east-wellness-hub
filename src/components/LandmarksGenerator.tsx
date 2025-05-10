
import { useEffect } from 'react';

const LandmarksGenerator = () => {
  useEffect(() => {
    const generateLandmarksPattern = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      // Set background
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Define landmark silhouettes
      const landmarks = [
        drawMosqueDome,
        drawMinaret,
        drawPyramid,
        drawPalmTree,
        drawArabicArch
      ];
      
      // Draw landmarks randomly across the canvas
      for (let i = 0; i < 30; i++) {
        const landmark = landmarks[Math.floor(Math.random() * landmarks.length)];
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const scale = 0.2 + Math.random() * 0.3;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.globalAlpha = 0.3 + Math.random() * 0.2;
        
        // Choose a random color from the theme
        const colors = ['#1A9AAD', '#A82B2B', '#1F4068', '#E6C095', '#563C5C'];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        
        landmark(ctx);
        ctx.restore();
      }
      
      // Export as image
      const dataUrl = canvas.toDataURL('image/png');
      
      // Create an img element and download it
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'landmarks-bg.png';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    
    // Drawing functions
    const drawMosqueDome = (ctx: CanvasRenderingContext2D) => {
      // Base
      ctx.beginPath();
      ctx.rect(-40, 20, 80, 30);
      ctx.fill();
      ctx.stroke();
      
      // Dome
      ctx.beginPath();
      ctx.ellipse(0, 20, 40, 40, 0, Math.PI, 0);
      ctx.fill();
      ctx.stroke();
      
      // Top
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(0, -40);
      ctx.stroke();
      
      // Crescent
      ctx.beginPath();
      ctx.arc(0, -45, 5, 0.5, Math.PI * 2.7);
      ctx.stroke();
    };
    
    const drawMinaret = (ctx: CanvasRenderingContext2D) => {
      // Tower
      ctx.beginPath();
      ctx.rect(-10, -70, 20, 100);
      ctx.fill();
      ctx.stroke();
      
      // Top
      ctx.beginPath();
      ctx.moveTo(-15, -70);
      ctx.lineTo(0, -90);
      ctx.lineTo(15, -70);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };
    
    const drawPyramid = (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.moveTo(-40, 30);
      ctx.lineTo(0, -40);
      ctx.lineTo(40, 30);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };
    
    const drawPalmTree = (ctx: CanvasRenderingContext2D) => {
      // Trunk
      ctx.beginPath();
      ctx.rect(-5, -20, 10, 50);
      ctx.fill();
      ctx.stroke();
      
      // Leaves
      for (let i = 0; i < 7; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3.5);
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.bezierCurveTo(10, -30, 30, -25, 40, -10);
        ctx.stroke();
        ctx.restore();
      }
    };
    
    const drawArabicArch = (ctx: CanvasRenderingContext2D) => {
      // Base
      ctx.beginPath();
      ctx.rect(-30, 0, 60, 50);
      ctx.fill();
      ctx.stroke();
      
      // Arch
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.quadraticCurveTo(0, -30, 30, 0);
      ctx.fill();
      ctx.stroke();
    };
    
    // This would be used to actually generate the image when needed
    // generateLandmarksPattern();
  }, []);

  return null;
};

export default LandmarksGenerator;
