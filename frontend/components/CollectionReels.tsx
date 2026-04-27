import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { ChevronRight, ChevronLeft, Sparkles, X, ShoppingBag, ArrowRight, Play, Eye, Loader2, Image as ImageIcon } from 'lucide-react';
import IntersectionVideo from './IntersectionVideo';

const CATEGORY_META: Record<Category, { video: string; poster: string; title: string; desc: string; heritage: string }> = {
  [Category.KUNDAN]: {
    video: "https://player.vimeo.com/external/517651070.hd.mp4?s=18f8883626e2a22a6132d73199736c92a2a0d922&profile_id=175",
    poster: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    title: "Kundan Heritage",
    desc: "A timeless Mughal legacy, where every gemstone is hand-set with pure 24k gold foil to create a divine radiance.",
    heritage: "Bikaner Royal Atelier"
  },
  [Category.TEMPLE]: {
    video: "https://player.vimeo.com/external/517651070.hd.mp4?s=18f8883626e2a22a6132d73199736c92a2a0d922&profile_id=175",
    poster: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=800",
    title: "Temple Divinity",
    desc: "Hand-carved motifs of gods and goddesses, finished in a majestic antique matte gold that whispers tales of ancient Dravidian temples.",
    heritage: "South Indian Classic"
  },
  [Category.OXIDIZED]: {
    video: "https://player.vimeo.com/external/394741364.hd.mp4?s=d0092f6c0f65584591a27e7f77047065996b79c6&profile_id=175",
    poster: "/image/Oxidized curated moods.jpg",
    title: "Vintage Oxidized",
    desc: "The charm of the old world, featuring tribal patterns and a deep black polish that celebrates the bohemian spirit of Jaipur.",
    heritage: "Jaipur Tribal Collection"
  },
  [Category.POLKI]: {
    video: "https://player.vimeo.com/external/494252666.hd.mp4?s=913988648324e937d578f773663a7638d2f02f9e&profile_id=175",
    poster: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    title: "Polki Brilliance",
    desc: "Uncut stones set in high-polish gold, mirroring the raw, natural brilliance of diamonds as preferred by the Rajputs.",
    heritage: "Jodhpur Legacy"
  },
  [Category.AMERICAN_DIAMOND]: {
    video: "https://player.vimeo.com/external/517651070.hd.mp4?s=18f8883626e2a22a6132d73199736c92a2a0d922&profile_id=175",
    poster: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&q=80&w=800",
    title: "Contemporary AD",
    desc: "Modern fire meets classic design. AAA-grade Zirconia stones that capture every ray of light for the modern gala.",
    heritage: "Modern Luxury"
  },
  [Category.BANGLES]: {
    video: "https://player.vimeo.com/external/394741364.hd.mp4?s=d0092f6c0f65584591a27e7f77047065996b79c6&profile_id=175",
    poster: "https://images.unsplash.com/photo-1679156271456-d6068c543ee7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFuZ2xlc3xlbnwwfDF8MHx8fDA%3D",
    title: "Artisanal Bangles",
    desc: "From delicate kadas to majestic bangles, our arm-wear collection is designed to sing with every movement.",
    heritage: "Handcrafted Adornments"
  },
  [Category.NECKLACES]: {
    video: "https://player.vimeo.com/external/517651070.hd.mp4?s=18f8883626e2a22a6132d73199736c92a2a0d922&profile_id=175",
    poster: "https://images.unsplash.com/photo-1722410180670-b6d5a2e704fa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Majestic Chokers",
    desc: "Statement pieces that frame your presence. Our necklaces are a blend of architectural precision and poetic beauty.",
    heritage: "Grand Masterpieces"
  },
  [Category.RINGS]: {
    video: "https://player.vimeo.com/external/394741364.hd.mp4?s=d0092f6c0f65584591a27e7f77047065996b79c6&profile_id=175",
    poster: "https://images.unsplash.com/photo-1747116404311-55f8d8944e83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJpbmdzfGVufDB8MXwwfHx8MA%3D%3D",
    title: "Royal Rings",
    desc: "Cocktail rings that command attention. Hand-set centerpieces that symbolize status and unmatched elegance.",
    heritage: "The Signet Collection"
  },
  [Category.NOSE_PINS]: {
    video: "https://player.vimeo.com/external/494252666.hd.mp4?s=913988648324e937d578f773663a7638d2f02f9e&profile_id=175",
    poster: "https://images.unsplash.com/photo-1629114266200-c16449519985?auto=format&fit=crop&q=80&w=800",
    title: "Heritage Nathni",
    desc: "Petite accents of brilliance. From traditional clip-on naths to delicate studs, redefine your profile.",
    heritage: "Jaipur Nath Collection"
  },
};

interface VideoPlayerProps {
  src: string;
  poster: string;
  className?: string;
  style?: React.CSSProperties;
  onCanPlay?: () => void;
  onError?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, className, style, onCanPlay, onError }) => {
  return (
    <IntersectionVideo
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      onCanPlay={onCanPlay}
      onError={onError}
      className={className}
      style={{ ...style, willChange: 'transform, opacity' }}
    >
      <source src={src} type="video/mp4" />
    </IntersectionVideo>
  );
};

interface CollectionReelsProps {
  selectedCategory: Category | 'All';
  onCategorySelect: (cat: Category) => void;
}

const CollectionReels: React.FC<CollectionReelsProps> = ({ selectedCategory, onCategorySelect }) => {
  const [spotlightCategory, setSpotlightCategory] = useState<Category | null>(null);
  const [videoLoaded, setVideoLoaded] = useState<Record<string, boolean>>({});
  const [videoError, setVideoError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (spotlightCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [spotlightCategory]);

  const handleSpotlight = (cat: Category) => setSpotlightCategory(cat);
  const closeSpotlight = () => setSpotlightCategory(null);

  const exploreCategory = (cat: Category) => {
    onCategorySelect(cat);
    setSpotlightCategory(null);
  };

  const handleVideoLoad = (cat: string) => {
    setVideoLoaded(prev => ({ ...prev, [cat]: true }));
  };

  const handleVideoError = (cat: string) => {
    setVideoError(prev => ({ ...prev, [cat]: true }));
    setVideoLoaded(prev => ({ ...prev, [cat]: true }));
  };

  return (
    <section className="py-10 sm:py-16 bg-stone-900/10 relative overflow-hidden transition-all duration-1000">
      <div className="absolute top-0 left-0 w-full h-px gold-gradient opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 mb-8 sm:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-5 sm:w-7 h-px bg-amber-500/50"></div>
            <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.4em] text-amber-500/80">Cinematic Gallery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-none tracking-tight">
            Curated <span className="gold-gradient bg-clip-text text-transparent italic">Moods</span>
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 px-6 lg:px-[calc((100vw-80rem)/2)] pb-6">
        {Object.entries(CATEGORY_META).map(([cat, meta]) => (
          <div
            key={cat}
            onClick={() => handleSpotlight(cat as Category)}
            className={`relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] group border border-stone-800/30 ${selectedCategory === cat ? 'ring-1 ring-amber-500/50 scale-[1.03] shadow-2xl' : 'hover:scale-[1.02]'
              }`}
            style={{ willChange: 'transform' }}
          >
            <img
              src={meta.poster}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${videoLoaded[cat] && !videoError[cat] ? 'opacity-0' : 'opacity-100'}`}
              alt=""
            />

            {!videoLoaded[cat] && !videoError[cat] && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-950/20 z-10">
                <Loader2 className="w-5 h-5 text-amber-500/30 animate-spin" />
              </div>
            )}

            {!videoError[cat] && (
              <VideoPlayer
                src={meta.video}
                poster={meta.poster}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${videoLoaded[cat] ? 'opacity-100' : 'opacity-0'} brightness-[0.8] group-hover:brightness-100 group-hover:scale-105`}
                style={{ willChange: 'transform, opacity' }}
                onCanPlay={() => handleVideoLoad(cat)}
                onError={() => handleVideoError(cat)}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60"></div>

            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                <Play className="w-2.5 h-2.5 text-amber-500 fill-current" />
                <span className="text-[6px] sm:text-[7px] font-black uppercase tracking-[0.3em] text-amber-500">Live Look</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight tracking-tight">{cat}</h3>
              <div className="flex items-center gap-1">
                <ArrowRight className="w-2.5 h-2.5 text-stone-500 group-hover:text-amber-500 transition-all duration-500 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {
        spotlightCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10 animate-in fade-in duration-[600ms]">
            <div className="absolute inset-0 bg-stone-900/95 backdrop-blur-3xl" onClick={closeSpotlight} />

            <div className="relative w-full max-w-4xl bg-stone-900 md:rounded-2xl overflow-hidden flex flex-col lg:flex-row h-full md:max-h-[80vh] shadow-2xl border-0 md:border border-stone-800/50 animate-in zoom-in-95 duration-500 ease-out">
              <button onClick={closeSpotlight} className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-stone-950/50 text-stone-500 hover:text-white border border-stone-800 transition-all duration-300">
                <X className="w-4 h-4" />
              </button>

              <div className="lg:w-3/5 relative bg-stone-950 flex items-center justify-center overflow-hidden h-[30%] sm:h-1/2 lg:h-full">
                <img src={CATEGORY_META[spotlightCategory].poster} className={`absolute inset-0 w-full h-full object-cover ${!videoError[spotlightCategory] ? 'opacity-30 blur-xl scale-110' : 'opacity-100 scale-100'}`} alt="" />
                {!videoError[spotlightCategory] ? (
                  <video autoPlay loop muted playsInline poster={CATEGORY_META[spotlightCategory].poster} className="w-full h-full object-cover opacity-90 relative z-10 transition-opacity duration-1000">
                    <source src={CATEGORY_META[spotlightCategory].video} type="video/mp4" />
                  </video>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center relative z-10 bg-stone-900/40">
                    <ImageIcon className="w-8 h-8 text-stone-800 mb-2" />
                    <span className="text-[6px] font-black uppercase tracking-widest text-stone-600">Preview Unavailable</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-stone-900 hidden lg:block z-20"></div>
              </div>

              <div className="lg:w-2/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-stone-900 relative h-[70%] sm:h-1/2 lg:h-full overflow-y-auto no-scrollbar">
                <div className="space-y-4 sm:space-y-6 relative z-10">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.2em] text-amber-500/80">{CATEGORY_META[spotlightCategory].heritage}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">{CATEGORY_META[spotlightCategory].title}</h3>
                  </div>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed italic opacity-90 transition-opacity duration-700">"{CATEGORY_META[spotlightCategory].desc}"</p>
                  <div className="space-y-2.5 pt-4">
                    <button onClick={() => exploreCategory(spotlightCategory)} className="w-full py-3 rounded-lg gold-gradient text-stone-950 font-black uppercase tracking-[0.1em] text-[8px] flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all duration-500">
                      Explore Collection
                    </button>
                    <button onClick={closeSpotlight} className="w-full py-3 rounded-lg bg-stone-950 border border-stone-800 text-stone-500 font-black uppercase tracking-[0.1em] text-[8px] hover:text-white transition-all duration-500">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </section >
  );
};

export default CollectionReels;