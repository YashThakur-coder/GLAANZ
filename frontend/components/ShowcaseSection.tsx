
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ShoppingBag, Eye, ArrowRight, Star } from 'lucide-react';
import IntersectionVideo from './IntersectionVideo';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ShowcaseSectionProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}

const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ onProductClick, onAddToCart }) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Optional: playbackRate logic if still desired, though 1.0 is safer
  }, []);

  const featuredItems = [
    {
      id: 'kundan-choker-set-royal',
      top: '28%',
      left: '48%',
      label: 'Necklace'
    },
    {
      id: 'oxidized-jhumka-statement',
      top: '25%',
      left: '32%',
      label: 'Earrings'
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-stone-950 overflow-hidden border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16">

          {/* Left Side: Content */}
          <div className="lg:w-2/5 space-y-6 sm:space-y-8 z-10 w-full">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-8 sm:w-10 h-[1px] bg-amber-500"></span>
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-amber-500">Heritage Lookbook</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
                Be the <span className="gold-gradient bg-clip-text text-transparent italic">Jewel</span> of Every Occasion
              </h2>
              <p className="text-stone-400 text-base sm:text-lg leading-relaxed font-medium">
                Our artisanal pieces are designed to complement the modern Indian woman who cherishes her roots while embracing the future.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/50 border border-stone-800">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-serif text-base sm:text-lg font-bold">Bridal Mastery</h4>
                  <p className="text-[10px] sm:text-xs text-stone-500 leading-relaxed">Exquisite Kundan and Polki designs for your most special day.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/50 border border-stone-800">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-stone-100/10 flex items-center justify-center text-stone-100 flex-shrink-0">
                  <Star className="w-5 h-5 sm:w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-serif text-base sm:text-lg font-bold">Handcrafted Precision</h4>
                  <p className="text-[10px] sm:text-xs text-stone-500 leading-relaxed">Every stone is hand-set by heritage artisans from Jaipur.</p>
                </div>
              </div>
            </div>

            <button
              className="group flex items-center gap-4 text-stone-100 hover:text-amber-500 transition-colors pt-2"
              onClick={() => {
                if ((window as any).lenis) {
                  (window as any).lenis.scrollTo(0);
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Explore Full Collection</span>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-stone-800 flex items-center justify-center group-hover:border-amber-500 transition-all">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Right Side: Interactive Model Shot */}
          <div className="lg:w-3/5 relative group w-full">
            <div className="absolute -inset-4 gold-gradient opacity-10 blur-[60px] sm:blur-[100px] rounded-full group-hover:opacity-20 transition-opacity"></div>

            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl sm:rounded-[3rem] overflow-hidden border border-stone-800 shadow-2xl">
              <IntersectionVideo
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                style={{ willChange: 'transform' }}
              >
                <source src="/image/Background video 2.mp4" type="video/mp4" />
              </IntersectionVideo>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20"></div>

              {/* Hotspots - Hidden on very small screens if needed, or scaled */}
              {featuredItems.map((item) => {
                const product = PRODUCTS.find(p => p.id === item.id);
                if (!product) return null;

                return (
                  <div
                    key={item.id}
                    className="absolute z-20"
                    style={{ top: item.top, left: item.left }}
                    onMouseEnter={() => setActiveHotspot(item.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    onClick={() => setActiveHotspot(activeHotspot === item.id ? null : item.id)}
                  >
                    {/* Glowing Ring */}
                    <div className="relative w-6 h-6 sm:w-8 h-8 flex items-center justify-center cursor-pointer">
                      <div className="absolute w-full h-full rounded-full border-2 border-amber-500 animate-ping opacity-50"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full gold-gradient shadow-[0_0_15px_#f59e0b]"></div>
                    </div>

                    {/* Popover */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 sm:mb-4 w-40 sm:w-56 transition-all duration-300 pointer-events-none ${activeHotspot === item.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
                      <div className="bg-stone-900/90 backdrop-blur-xl border border-white/10 p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl pointer-events-auto">
                        <div className="flex justify-between items-start mb-1 sm:mb-2">
                          <div>
                            <span className="text-[6px] sm:text-[8px] font-black uppercase tracking-widest text-amber-500 block mb-0.5 sm:mb-1">{item.label}</span>
                            <h4 className="text-[8px] sm:text-[10px] font-bold text-white uppercase tracking-tight line-clamp-1">{product.name}</h4>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2 sm:mt-3">
                          <span className="text-[9px] sm:text-[10px] font-bold text-stone-100">₹{product.price}</span>
                          <button
                            onClick={() => onProductClick(product)}
                            className="p-1.5 sm:px-3 sm:py-2 rounded-lg bg-stone-800 text-[6px] sm:text-[8px] font-black uppercase tracking-widest hover:bg-stone-700 transition-colors flex items-center justify-center gap-1"
                          >
                            <Eye className="w-2 h-2 sm:w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="w-2 h-2 sm:w-3 h-3 bg-stone-900 border-r border-b border-white/10 rotate-45 mx-auto -mt-1 sm:-mt-1.5"></div>
                    </div>
                  </div>
                );
              })}

              {/* Look Description Overlay */}
              <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 p-4 sm:p-6 bg-stone-950/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl max-w-[200px] sm:max-w-xs transition-transform duration-500 translate-y-4 sm:translate-y-12 group-hover:translate-y-0">
                <p className="text-white font-serif text-lg sm:text-xl italic mb-1 sm:mb-2">"The Royal Heritage Look"</p>
                <p className="text-stone-400 text-[10px] sm:text-xs leading-relaxed">
                  Featured here is our signature Royal Kundan set, hand-set with grade-AAA stones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
