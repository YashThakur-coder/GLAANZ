
import React, { useState } from 'react';
import { Play, Sparkles, Loader2 } from 'lucide-react';
import IntersectionVideo from './IntersectionVideo';

const HeritageCinema: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] bg-stone-950 overflow-hidden flex items-center justify-center">
      {!isPlaying && !error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-stone-950">
          <Loader2 className="w-10 h-10 text-stone-800 animate-spin" />
        </div>
      )}

      {!error ? (
        <IntersectionVideo
          autoPlay
          loop
          muted
          playsInline
          onPlay={() => setIsPlaying(true)}
          onError={() => setError(true)}
          className={`absolute inset-0 w-full h-full object-cover opacity-40 brightness-75 transition-opacity duration-[2s] ${isPlaying ? 'opacity-40' : 'opacity-0'}`}
        >
          <source src="https://player.vimeo.com/external/517651070.hd.mp4?s=18f8883626e2a22a6132d73199736c92a2a0d922&profile_id=175" type="video/mp4" />
        </IntersectionVideo>
      ) : (
        <img
          src="https://media.istockphoto.com/id/944588416/photo/beautiful-indian-young-women-portrait-with-indian-traditional-jewelry.jpg?s=2048x2048&w=is&k=20&c=PvuoMQd3a6bizxb9VRPQQ8itwVx-InsWZhonROmuu4Q="
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
          alt=""
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-transparent to-stone-950"></div>

      <div className="relative z-20 text-center max-w-4xl px-6">
        <div className="flex flex-col items-center gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-4 animate-pulse">
            <span className="w-8 md:w-12 h-px bg-amber-500/50"></span>
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
            <span className="w-8 md:w-12 h-px bg-amber-500/50"></span>
          </div>
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-stone-400">Cinematic Experience</span>
        </div>

        <h2 className="text-4xl md:text-8xl font-serif font-bold text-white mb-6 md:mb-10 leading-tight">
          Brilliance <br className="md:hidden" />
          <span className="italic gold-gradient bg-clip-text text-transparent">In Motion</span>
        </h2>

        <p className="text-stone-400 text-sm md:text-xl font-medium max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed opacity-80">
          Witness the interplay of light and shadow on our hand-set stones. Every movement tells a story of 400 years of Jaipur heritage.
        </p>

        <button className="px-8 md:px-12 py-4 md:py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] md:tracking-[0.3em] hover:bg-white hover:text-stone-950 transition-all shadow-2xl flex items-center gap-3 mx-auto group">
          <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
          Watch The Film
        </button>
      </div>
    </section>
  );
};

export default HeritageCinema;
