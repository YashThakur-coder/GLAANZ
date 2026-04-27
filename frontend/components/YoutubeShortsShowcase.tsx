
import React from 'react';
import { Play, Youtube, Sparkles, ArrowRight } from 'lucide-react';
import { SHORTS } from '../constants';

const YoutubeShortsShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-stone-950 border-y border-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-1.5 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                <Youtube className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-500">Visual Anthology</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              Showcase <span className="gold-gradient bg-clip-text text-transparent italic">Shorts</span>
            </h2>
          </div>
          <p className="text-stone-400 text-sm max-w-sm font-medium leading-relaxed md:text-right border-l md:border-l-0 md:border-r border-stone-800 pl-6 md:pl-0 md:pr-6">
            Witness the masterpiece collection in motion. A curation of 25+ cinematic reveals from our Jaipur atelier.
          </p>
        </div>

        {/* Responsive Grid with NO Sticky issues */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {SHORTS.map((short) => (
            <a
              key={short.id}
              href={`https://www.youtube.com/shorts/${short.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[9/16] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-stone-800 bg-stone-900 transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/50 shadow-2xl"
            >
              <img
                src={short.thumbnail}
                alt={short.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1s]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-transparent to-transparent"></div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">Heritage Look</span>
                </div>
                <h3 className="text-[9px] font-black uppercase tracking-widest text-white leading-tight line-clamp-2">
                  {short.title}
                </h3>
              </div>

              <div className="absolute top-4 right-4 bg-red-600/20 backdrop-blur-md p-1.5 rounded-lg border border-red-600/30">
                <Youtube className="w-3 h-3 text-red-500 fill-current" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <a
            href="https://youtube.com/@glaanz.com1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-10 py-5 rounded-2xl bg-stone-900 border border-stone-800 text-[10px] font-black uppercase tracking-widest text-stone-300 hover:text-white hover:border-red-600/50 transition-all group shadow-xl active:scale-95"
          >
            <Youtube className="w-5 h-5 text-red-600" />
            Visit Youtube Vault
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default YoutubeShortsShowcase;
