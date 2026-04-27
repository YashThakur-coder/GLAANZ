import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import IntersectionVideo from './IntersectionVideo';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1728119884594-51af35d32c1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subtitle: "JAIPUR ATELIER • EST. 2020",
    title: "Shine <br /> <span class='text-shimmer italic'>Forever</span>",
    desc: "Curating India's finest imitation jewelry. Handcrafted masterpieces designed to make your inner light shine."
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1740020242524-318435e4be6f?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subtitle: "WEDDING COLLECTION 2024",
    title: "Royal <br /> <span class='text-shimmer italic'>Elegance</span>",
    desc: "Exquisite Kundan sets that bridge the gap between Mughal tradition and modern high-fashion."
  },
  {
    image: "https://images.unsplash.com/photo-1674729446905-1cfcd533d90e?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subtitle: "FESTIVE ESSENTIALS",
    title: "Divine <br /> <span class='text-shimmer italic'>Glow</span>",
    desc: "Antique Temple designs that whisper tales of ancient heritage, carved for the modern queen."
  }
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => { });
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      clearInterval(timer);
      if (videoRef.current) observer.unobserve(videoRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      className={`relative h-[80vh] sm:h-[90vh] flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${isVideoReady ? 'opacity-100' : 'opacity-0'
        }`}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-stone-900" style={{ opacity: isVideoReady ? 1 : 0, transition: 'opacity 1.5s ease' }}>
        <IntersectionVideo
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={() => setIsVideoReady(true)}
          className="w-full h-full object-cover brightness-100"
          style={{ willChange: 'transform' }}
        >
          <source src="/image/Background video.mp4" type="video/mp4" />
        </IntersectionVideo>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/10 to-stone-950"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl w-full">
        <div className="flex flex-col items-center gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div className="flex items-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-top duration-1000">
            <span className="w-8 sm:w-16 h-px bg-amber-500/30"></span>
            <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-amber-500 foil-shadow whitespace-nowrap">
              {HERO_SLIDES[currentSlide].subtitle}
            </span>
            <span className="w-8 sm:w-16 h-px bg-amber-500/30"></span>
          </div>
        </div>

        <h1
          className="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-serif font-bold text-white mb-6 sm:mb-10 leading-[0.9] tracking-tight transition-all duration-700 break-words"
          dangerouslySetInnerHTML={{ __html: HERO_SLIDES[currentSlide].title }}
        />

        <p className="text-stone-200 text-base sm:text-lg md:text-2xl font-medium max-w-3xl mx-auto mb-10 sm:mb-14 leading-relaxed opacity-90 animate-in fade-in duration-1000 delay-300 px-4 drop-shadow-lg">
          {HERO_SLIDES[currentSlide].desc}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 px-4">
          <button
            onClick={() => {
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo('#product-grid-header', { offset: -200 });
              } else {
                window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto group relative px-8 sm:px-12 py-4 sm:py-6 bg-white text-stone-950 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] sm:text-[11px] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Discover Collections
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </span>
            <div className="absolute inset-0 gold-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>

          <button className="w-full sm:w-auto flex items-center justify-center gap-4 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl border border-stone-800 text-stone-300 hover:text-white hover:border-amber-500/50 transition-all text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] bg-stone-900/30 backdrop-blur-xl group">
            <Sparkles className="w-4 h-4 text-amber-500 group-hover:scale-125 transition-transform" />
            Virtual Consultation
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-[-8vh] sm:bottom-[-10vh] left-1/2 -translate-x-1/2 flex gap-3 sm:gap-4">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="group relative py-4 px-1 sm:px-2"
            >
              <div className={`h-1 transition-all duration-500 rounded-full ${idx === currentSlide ? 'w-10 sm:w-16 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'w-5 sm:w-8 bg-stone-800 group-hover:bg-stone-700'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Side Decorative Text */}
      <div className="absolute bottom-20 left-10 flex items-center gap-6 rotate-90 origin-left opacity-30 hidden lg:flex">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-stone-500 whitespace-nowrap">CRAFTING DREAMS SINCE 2020</span>
        <div className="h-px w-32 bg-stone-800"></div>
      </div>
    </section>
  );
};

export default HeroSection;