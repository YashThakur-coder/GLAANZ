import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ShieldCheck, Gem, History, Droplets, Package, CheckCircle2, Search, X, ArrowRight } from 'lucide-react';
import IntersectionVideo from './IntersectionVideo';

const FadeInSection: React.FC<{ children: React.ReactNode, delay?: number, threshold?: number, direction?: 'up' | 'left' | 'right', className?: string }> = ({ children, delay = 0, threshold = 0.1, direction = 'up', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        if (domRef.current) observer.unobserve(domRef.current);
      }
    }, { threshold, rootMargin: '0px' });

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, [threshold]);

  let translateClass = 'translate-y-16';
  if (direction === 'left') translateClass = '-translate-x-16';
  if (direction === 'right') translateClass = 'translate-x-16';

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1200ms] ${className} ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${translateClass}`}`}
      style={{ transitionDelay: `${delay}ms`, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {children}
    </div>
  );
};

const AboutView: React.FC = () => {
  return (
    <div className="bg-stone-950 min-h-screen selection:bg-amber-500/30 overflow-hidden">
      {/* 1. Cinematic Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src="/image/heritage-bg.jpg"
          alt="Heritage Background"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/20 to-stone-950/70"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 flex flex-col items-center pt-20">
          <FadeInSection delay={100}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 sm:w-16 bg-amber-500/50"></div>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 animate-pulse" />
              <div className="h-px w-12 sm:w-16 bg-amber-500/50"></div>
            </div>
            <span className="text-amber-500 text-[10px] md:text-xs font-black uppercase tracking-[0.5em] sm:tracking-[0.8em] block drop-shadow-2xl mb-6">
              Our Heritage
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-serif font-black text-white drop-shadow-2xl leading-none mb-8">
              A Legacy of <br className="hidden sm:block" />
              <span className="gold-gradient bg-clip-text text-transparent italic">Brilliance</span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-stone-300 font-medium leading-relaxed italic max-w-sm sm:max-w-3xl mx-auto drop-shadow-md">
              "Crafted in heritage, worn with pride. Every piece tells a story of timeless elegance."
            </p>
          </FadeInSection>

        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
          <div className="w-[1px] h-12 gold-gradient opacity-60"></div>
        </div>
      </section>

      {/* 2. Royal Heritage Inspiration */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-16 md:mb-24 space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">Echoes of the Royal Court</h2>
              <p className="text-amber-500/80 text-[10px] md:text-xs uppercase tracking-[0.4em] font-black">Mughal & Indian Lineage</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <FadeInSection direction="left">
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 mix-blend-overlay"></div>
                <div className="w-full aspect-[4/5] overflow-hidden">
                  <IntersectionVideo
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms] filter contrast-110"
                  >
                    <source src="/Videos/POLKI Necklaces video.mp4" type="video/mp4" />
                  </IntersectionVideo>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent z-20"></div>
                <div className="absolute bottom-8 left-8 z-30">
                  <span className="text-[10px] uppercase font-black tracking-widest text-amber-500 mb-2 block">Inspiration</span>
                  <p className="text-2xl font-serif text-white italic">The Mughal Archives</p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection direction="right" delay={200}>
              <div className="space-y-8 max-w-xl">
                <p className="text-stone-300 text-lg sm:text-xl leading-relaxed italic border-l-2 border-amber-500/50 pl-6">
                  Rooted deeply in the grand courtyards of Rajasthan, our designs draw from centuries-old Kundan and Polki traditions.
                </p>
                <div className="h-px w-24 bg-gradient-to-r from-amber-500 to-transparent"></div>
                <p className="text-stone-400 leading-relaxed font-medium">
                  We translate the ornate architectural details of Indian palaces into wearable art. The geometry of the Jali (latticework), the floral motifs of the royal gardens, and the opulence of the crown jewels are meticulously miniaturized into every GLAANZ piece.
                </p>
                <p className="text-stone-400 leading-relaxed font-medium">
                  Where tradition meets modern luxury—our vintage textures and gold-toned visual elements are designed for the contemporary connoisseur who carries a piece of history.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 3. Craftsmanship Journey: Transformation Block */}
      <section className="py-24 sm:py-32 bg-stone-900/30 relative border-y border-stone-800/50">
        <div className="absolute top-0 inset-x-0 h-px gold-gradient opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-16 md:mb-24 space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">The Metamorphosis</h2>
              <p className="text-amber-500/80 text-[10px] md:text-xs uppercase tracking-[0.4em] font-black">Our Craftsmanship Journey</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-start">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[35%] left-[10%] right-[10%] h-px bg-stone-800 border-b border-stone-900">
              <div className="h-full gold-gradient opacity-50 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
            </div>

            {/* Step 1 */}
            <FadeInSection delay={100} className="relative z-10 group">
              <div className="bg-stone-950 p-4 rounded-3xl border border-stone-800/80 shadow-xl group-hover:border-amber-500/30 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.1)] transition-all duration-700">
                <div className="rounded-2xl overflow-hidden aspect-square relative mb-6">
                  <img src="/image/step1_raw_promise.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] filter grayscale-[0.2]" alt="Gold Smelting and Raw Materials" />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>
                <div className="px-2 space-y-2 text-center pb-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-amber-500">Step 01</span>
                  <h3 className="text-2xl font-serif font-bold text-white">The Raw Promise</h3>
                  <p className="text-sm text-stone-400 leading-relaxed max-w-[250px] mx-auto">Ethically sourced premium base metals and raw AAA Zirconia stones, waiting for purpose.</p>
                </div>
              </div>
            </FadeInSection>

            {/* Step 2 */}
            <FadeInSection delay={300} className="relative z-10 group">
              <div className="bg-stone-950 p-4 rounded-3xl border border-stone-800/80 shadow-xl group-hover:border-amber-500/30 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.1)] transition-all duration-700 relative md:-top-6 lg:-top-10">
                <div className="rounded-2xl overflow-hidden aspect-square relative mb-6">
                  <img src="/image/step2_artisan.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] brightness-90" alt="Artisan Handcrafting Details" />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>
                <div className="px-2 space-y-2 text-center pb-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-amber-500">Step 02</span>
                  <h3 className="text-2xl font-serif font-bold text-white">The Art of Shaping</h3>
                  <p className="text-sm text-stone-400 leading-relaxed max-w-[250px] mx-auto">Generational artisans hand-carving molds, casting, and setting each stone with microscopic precision.</p>
                </div>
              </div>
            </FadeInSection>

            {/* Step 3 */}
            <FadeInSection delay={500} className="relative z-10 group">
              <div className="bg-stone-950 p-4 rounded-3xl border border-stone-800/80 shadow-xl group-hover:border-amber-500/50 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] transition-all duration-700">
                <div className="rounded-2xl overflow-hidden aspect-square relative mb-6 group-hover:ring-2 ring-amber-500/50 ring-offset-4 ring-offset-stone-950 transition-all duration-500">
                  <IntersectionVideo autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]">
                    <source src="/Videos/Antique Peacock Rani Haar video.mp4" type="video/mp4" />
                  </IntersectionVideo>
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
                  </div>
                </div>
                <div className="px-2 space-y-2 text-center pb-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-amber-500">Step 03</span>
                  <h3 className="text-2xl font-serif font-bold text-white">Final Brilliance</h3>
                  <p className="text-sm text-stone-400 leading-relaxed max-w-[250px] mx-auto">A rigorous 5-step polishing ritual and premium 22K gold plating breathes life into the masterpiece.</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 4. Macro Detailing / Luxury Interaction */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeInSection direction="left">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500">Micro Excellence</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                  Perfection in <br />
                  <span className="italic text-stone-400">Every Millimeter</span>
                </h2>
              </div>
              <p className="text-stone-300 text-lg leading-relaxed">
                Zoom into our creations and you will find an obsession with detail. Hand-set prongs, flawlessly flush stones, and smoothly polished edges ensure that the back of the jewelry looks just as spectacular as the front.
              </p>

              <ul className="space-y-6 pt-4">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center flex-shrink-0">
                    <Search className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-stone-100 font-bold mb-1">Micro Pave Setting</h4>
                    <p className="text-stone-500 text-sm">Stones laid meticulously close together for an uninterrupted field of brilliance.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-stone-100 font-bold mb-1">Mirror Polish Edges</h4>
                    <p className="text-stone-500 text-sm">Eliminating any sharp corners for skin-safe, comfortable prolonged wear.</p>
                  </div>
                </li>
              </ul>
            </div>
          </FadeInSection>

          <FadeInSection direction="right" delay={200}>
            <div className="relative aspect-[4/5] sm:aspect-square rounded-[2rem] sm:rounded-[3rem] overflow-hidden group cursor-crosshair shadow-2xl">
              <div className="absolute inset-0 bg-stone-950 flex items-center justify-center z-0">
                <div className="w-32 h-32 border-4 border-stone-800 animate-spin rounded-full border-t-amber-500"></div>
              </div>
              <img
                src="/image/perfect_macro.png"
                className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-150 transition-transform duration-[3s] ease-out z-10 cursor-crosshair filter drop-shadow-[0_0_50px_rgba(245,158,11,0.2)]"
                alt="Macro Diamond Detailing"
                style={{ transformOrigin: 'center center' }}
                onMouseMove={(e) => {
                  const img = e.currentTarget;
                  const rect = img.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  img.style.transformOrigin = `${x}% ${y}%`;
                }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 z-20 pointer-events-none rounded-[2rem] sm:rounded-[3rem]"></div>

              {/* Interaction Hint */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 bg-stone-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-800 flex items-center gap-2 group-hover:opacity-0 transition-opacity">
                <Search className="w-3 h-3 text-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-300">Hover to Inspect</span>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 5. Trust & Differentiation Section */}
      <section className="py-24 sm:py-32 bg-stone-900/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-16">The GLAANZ Difference</h2>
          </FadeInSection>

          <div className="flex flex-col md:flex-row gap-8 justify-center max-w-5xl mx-auto">
            {/* Generic / Mass Production */}
            <FadeInSection delay={100} className="flex-1 bg-stone-950/50 p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-stone-800/50 opacity-70">
              <div className="flex items-center justify-center gap-3 mb-8">
                <X className="w-5 h-5 text-stone-500" />
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-stone-400">Mass Production</h3>
              </div>
              <ul className="space-y-6 text-left">
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-700 mt-2 flex-shrink-0"></div>
                  <p className="text-stone-500 text-xs sm:text-sm">Machine-made, casting hundreds of identical flat pieces without character.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-700 mt-2 flex-shrink-0"></div>
                  <p className="text-stone-500 text-xs sm:text-sm">Glued stones that easily pop out and lose their luster quickly.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-700 mt-2 flex-shrink-0"></div>
                  <p className="text-stone-500 text-xs sm:text-sm">Flash plating that tarnishes, reveals cheap brass, and irritates the skin.</p>
                </li>
              </ul>
            </FadeInSection>

            {/* VS Badge */}
            <div className="hidden md:flex items-center justify-center -mx-4 z-10 w-16">
              <div className="w-12 h-12 bg-stone-950 rounded-full border border-stone-800 flex items-center justify-center font-serif text-amber-500 italic shadow-2xl">vs</div>
            </div>

            {/* GLAANZ Heritage */}
            <FadeInSection delay={200} className="flex-1 bg-gradient-to-br from-stone-900 to-stone-950 p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.05)] relative overflow-hidden group hover:border-amber-500/60 transition-colors duration-500">
              <div className="absolute -inset-24 gold-gradient opacity-[0.02] group-hover:opacity-[0.05] blur-3xl transition-opacity duration-1000"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Gem className="w-5 h-5 text-amber-500" />
                  <h3 className="text-sm font-black uppercase tracking-[0.3em] text-amber-500">GLAANZ Heritage</h3>
                </div>
                <ul className="space-y-6 text-left">
                  <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shadow-[0_0_5px_rgba(245,158,11,0.8)] flex-shrink-0"></div>
                    <p className="text-stone-200 text-xs sm:text-sm font-medium">Slow luxury—each piece meticulously handcrafted by generations of master artisans.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shadow-[0_0_5px_rgba(245,158,11,0.8)] flex-shrink-0"></div>
                    <p className="text-stone-200 text-xs sm:text-sm font-medium">Every Zirconia is individually prong or bezel set under microscopes for diamond-like grip.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shadow-[0_0_5px_rgba(245,158,11,0.8)] flex-shrink-0"></div>
                    <p className="text-stone-200 text-xs sm:text-sm font-medium">Thick 18K/22K gold e-coating ensuring a hypoallergenic, premium, anti-tarnish finish.</p>
                  </li>
                </ul>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 6. Luxury Packaging Showcase */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-stone-900/30 rounded-l-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <FadeInSection direction="left" className="order-2 lg:order-1 relative">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group shadow-2xl">
              <img
                src="/image/heritage-drop-earrings-box.jpg"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] filter brightness-90"
                alt="Luxury Heritage Packaging Box"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="flex items-center gap-3 backdrop-blur-md bg-stone-950/50 px-5 py-3 rounded-full border border-stone-800/80 text-white">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">FSC-Certified Heritage Box</span>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection direction="right" delay={200} className="order-1 lg:order-2">
            <div className="space-y-6 max-w-lg">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500">The Unboxing</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                A Gifting <br />
                <span className="italic gold-gradient bg-clip-text text-transparent">Experience</span>
              </h2>
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
                Every masterpiece deserves a throne. We encase our creations in plush, velvet-lined signature boxes wrapped in an aura of luxury.
              </p>
              <p className="text-stone-400 text-sm sm:text-base leading-relaxed font-medium">
                Designed to be a lifelong keeper for your jewelry, preserving its pristine shine for decades. Arrives with a certificate of authenticity and a jewelry care kit.
              </p>
            </div>
          </FadeInSection>

        </div>
      </section>

      {/* 7. Badges Footer Block */}
      <section className="py-12 sm:py-16 border-t border-stone-800/50 bg-stone-950 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-stone-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors shadow-lg group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
              </div>
              <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase text-stone-400 group-hover:text-stone-200 transition-colors">Anti-Tarnish</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-stone-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors shadow-lg group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
              </div>
              <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase text-stone-400 group-hover:text-stone-200 transition-colors">Skin-Safe</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-stone-800 flex items-center justify-center group-hover:border-amber-500/50 transition-colors shadow-lg group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
              </div>
              <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase text-stone-400 group-hover:text-stone-200 transition-colors">Premium Finish</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-stone-800 flex items-center justify-center group-hover:border-stone-400/50 transition-colors shadow-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <History className="w-4 h-4 sm:w-5 sm:h-5 text-stone-300" />
              </div>
              <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase text-stone-400 group-hover:text-stone-200 transition-colors">Heritage Craft</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutView;