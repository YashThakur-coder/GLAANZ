
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-28 right-8 z-[90] transition-all duration-500 ease-in-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
    }`}>
      <button
        onClick={scrollToTop}
        className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-stone-900 border border-stone-800 shadow-2xl hover:border-amber-500/50 transition-all active:scale-90 overflow-hidden"
        aria-label="Scroll to top"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-500"></div>
        
        {/* Progress-like border that shines */}
        <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-amber-500/20 transition-all duration-700 animate-pulse"></div>
        
        <ChevronUp className="w-5 h-5 text-amber-500 transition-transform duration-500 group-hover:-translate-y-1" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Return to Top</span>
        </div>
      </button>
    </div>
  );
};

export default ScrollToTop;
