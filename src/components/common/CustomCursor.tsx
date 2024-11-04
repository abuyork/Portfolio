import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('white');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Get the element under the cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        // Check if hovering over interactive element
        const isInteractive = element.matches('button, a, input, textarea, select');
        setIsHovering(isInteractive);
        
        // Get the background color of the element
        const bgColor = window.getComputedStyle(element).backgroundColor;
        
        // Convert RGB to brightness
        const rgb = bgColor.match(/\d+/g);
        if (rgb) {
          const brightness = (Number(rgb[0]) * 299 + Number(rgb[1]) * 587 + Number(rgb[2]) * 114) / 1000;
          setColor(brightness > 128 ? '#000000' : '#ffffff');
        }
      }
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div 
        className={`rounded-full transition-all duration-200 ease-out ${isHovering ? 'w-8 h-8' : 'w-5 h-5'}`}
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}40`,
          transition: 'all 0.2s ease-out'
        }}
      />
    </div>
  );
};

export default CustomCursor; 