
import React, { useMemo } from 'react';
import { YouTubeVideo, VideoCategory } from '../types';
import { ExternalLink, PlayCircle, Filter, Search, X, Youtube, Instagram, Tag, ShoppingCart, Sparkles, Clock } from 'lucide-react';
import CustomVideoPlayer from './CustomVideoPlayer';

interface VideoGalleryProps {
  videos: YouTubeVideo[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: VideoCategory;
  setSelectedCategory: (cat: VideoCategory) => void;
}

const CATEGORY_LIST: Exclude<VideoCategory, 'All'>[] = [
  'Bridal',
  'Everyday Wear',
  'Styling Tips',
  'Behind the Scenes'
];

const CATEGORY_ICONS: Record<Exclude<VideoCategory, 'All'>, React.ReactNode> = {
  'Bridal': <Sparkles className="w-4 h-4" />,
  'Everyday Wear': <Tag className="w-4 h-4" />,
  'Styling Tips': <PlayCircle className="w-4 h-4" />,
  'Behind the Scenes': <Clock className="w-4 h-4" />
};

const VideoPlaceholderCard: React.FC<{ category: string }> = ({ category }) => (
  <div className="group flex flex-col h-full animate-in fade-in duration-700">
    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-900 flex items-center justify-center group-hover:bg-stone-800/50 transition-colors">
      <img
        src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800"
        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale transition-all group-hover:scale-110"
        alt="Coming Soon"
      />
      <div className="relative z-10 flex flex-col items-center gap-3 text-stone-600 group-hover:text-amber-500 transition-colors">
        <div className="w-16 h-16 rounded-full border-2 border-current border-dashed flex items-center justify-center animate-[spin_10s_linear_infinite]">
          <Sparkles className="w-8 h-8" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Cinematic Reveal Soon</span>
      </div>
    </div>
    <div className="px-2 pb-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] font-black uppercase tracking-tighter bg-stone-800 text-stone-500 px-2.5 py-1 rounded-md">
          {category}
        </span>
      </div>
      <h3 className="font-serif text-2xl font-bold leading-tight text-stone-700 group-hover:text-stone-500 transition-colors h-14 line-clamp-2">
        Curating New Heritage Moments
      </h3>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-900/50 opacity-40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-stone-800 flex items-center justify-center">
            <span className="text-[9px] font-black text-stone-600">G</span>
          </div>
          <span className="text-[10px] text-stone-600 font-black uppercase tracking-wider">GLAANZ Vault</span>
        </div>
      </div>
    </div>
  </div>
);

const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) => {
  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  const renderVideoCard = (video: YouTubeVideo) => (
    <div
      key={video.id}
      className="group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="relative">
        <CustomVideoPlayer videoId={video.videoId} title={video.title} thumbnail={video.thumbnail} />

        {video.approxValue && (
          <div className="absolute top-4 right-4 z-10 animate-in zoom-in fade-in duration-500 delay-300">
            <div className="gold-gradient p-px rounded-full shadow-2xl">
              <div className="bg-stone-950 text-white px-4 py-1.5 rounded-full flex items-center gap-2">
                <Tag className="w-3 h-3 text-amber-500" />
                <span className="text-[10px] font-black tracking-widest uppercase">
                  Featured: ₹{video.approxValue.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1.5">
          <span className="text-[9px] text-amber-500/80 font-black uppercase tracking-[0.2em]">
            {video.category}
          </span>
          {video.relatedProductId && (
            <div className="flex items-center gap-1.5 text-stone-500/60 text-[8px] font-bold uppercase tracking-widest">
              <ShoppingCart className="w-3 h-3" />
              In Stock
            </div>
          )}
        </div>
        <h3 className="font-serif text-lg text-stone-100 mb-2 leading-tight transition-colors group-hover:text-amber-400 line-clamp-1">
          {video.title}
        </h3>

        {video.approxValue && (
          <p className="text-[10px] text-stone-500 font-medium italic opacity-80">
            Styling pieces valued at approx. ₹{video.approxValue.toLocaleString('en-IN')}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center">
              <span className="text-[7px] font-black text-amber-500">G</span>
            </div>
            <span className="text-[8px] text-stone-600 font-bold uppercase tracking-widest">GLAANZ Channel</span>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link text-stone-500 hover:text-amber-500 transition-colors flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest"
          >
            YouTube
            <ExternalLink className="w-2.5 h-2.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );

  const sectionsToRender = useMemo(() => {
    if (searchQuery) {
      const filtered = videos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return [{ title: 'Search Results', category: 'All' as VideoCategory, videos: filtered }];
    }

    if (selectedCategory !== 'All') {
      const filtered = videos.filter(v => v.category === selectedCategory);
      return [{ title: selectedCategory, category: selectedCategory, videos: filtered }];
    }

    return CATEGORY_LIST.map(cat => ({
      title: cat,
      category: cat as VideoCategory,
      videos: videos.filter(v => v.category === cat)
    }));
  }, [videos, searchQuery, selectedCategory]);

  return (
    <div className="space-y-12 sm:space-y-20">
      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-stone-900/40 p-3 rounded-3xl border border-stone-800/50 backdrop-blur-md shadow-2xl">

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="px-4 py-2 flex items-center gap-2 border-r border-stone-800 mr-2 hidden xl:flex">
            <Filter className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">Filter</span>
          </div>
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-5 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${selectedCategory === 'All'
              ? 'gold-gradient text-stone-900 border-transparent shadow-lg shadow-amber-900/20 scale-105'
              : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:border-stone-600 hover:text-stone-200 hover:bg-stone-900/80'
              }`}
          >
            All
          </button>
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${selectedCategory === cat
                ? 'gold-gradient text-stone-900 border-transparent shadow-lg shadow-amber-900/20 scale-105'
                : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:border-stone-600 hover:text-stone-200 hover:bg-stone-900/80'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-72 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 group-focus-within:text-amber-500 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the film vault..."
            className="w-full bg-stone-950/80 border border-stone-800 rounded-2xl py-3 pl-11 pr-11 text-xs font-medium text-stone-200 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-stone-800 rounded-full text-stone-500 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Sections Rendering */}
      <div className="space-y-16 sm:space-y-24">
        {sectionsToRender.map((section, idx) => (
          <div key={idx} className="space-y-8 sm:space-y-12 animate-in fade-in duration-1000">
            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-stone-900 pb-6 sm:pb-8">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-stone-900/50 border border-stone-800 flex items-center justify-center text-amber-500 shadow-xl">
                  {section.category !== 'All' ? CATEGORY_ICONS[section.category] : <Sparkles className="w-5 h-5 sm:w-6 h-6" />}
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">{section.title}</h2>
                  <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-stone-500">
                    {section.videos.length} Cinema {section.videos.length === 1 ? 'Piece' : 'Pieces'} Available
                  </p>
                </div>
              </div>


            </div>

            {/* Section Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
              {section.videos.length > 0 ? (
                section.videos.map(v => renderVideoCard(v))
              ) : (
                <VideoPlaceholderCard category={section.category} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Call to Action */}
      <div className="md:col-span-2 lg:col-span-3 py-20 flex flex-col items-center justify-center text-center space-y-8 border border-stone-800/30 rounded-[3rem] bg-gradient-to-br from-stone-900/40 via-stone-950/40 to-stone-900/40 backdrop-blur-xl relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full"></div>

        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-stone-950 flex items-center justify-center shadow-2xl border border-stone-800 group-hover:border-amber-500/50 transition-colors duration-500">
            <span className="text-5xl font-serif font-black gold-gradient bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-500">G</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-stone-900 font-black text-sm shadow-xl border-4 border-stone-950">
            ★
          </div>
        </div>

        <div className="space-y-4 relative px-6">
          <h2 className="text-4xl font-serif font-bold text-stone-100">Immerse in GLAANZ</h2>
          <p className="text-stone-500 text-sm max-w-lg mx-auto leading-relaxed font-medium">
            Discover a world of luxury and craftsmanship. Join thousands of jewelry enthusiasts on our journey to redefine elegance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 z-10">
          <a
            href="https://youtube.com/@glaanz.com1?si=6dDc_4EXrTapu1Qy"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-8 sm:px-10 py-5 bg-stone-900 border border-stone-800 text-stone-300 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:border-amber-500/50 hover:text-white transition-all shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] flex items-center gap-3 active:scale-95 group/btn overflow-hidden"
          >
            <Youtube className="w-5 h-5 text-red-500 group-hover/btn:scale-110 transition-transform duration-300" />
            <span className="relative z-10">YouTube</span>
            <div className="absolute inset-0 bg-stone-800/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
          </a>

          <a
            href="https://www.instagram.com/glaanz.com1?igsh=MThjbGJyeWlkdjl1eA=="
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-8 sm:px-10 py-5 bg-stone-900 border border-stone-800 text-stone-300 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:border-amber-500/50 hover:text-white transition-all shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] flex items-center gap-3 active:scale-95 group/btn overflow-hidden"
          >
            <Instagram className="w-5 h-5 text-pink-500 group-hover/btn:scale-110 transition-transform duration-300" />
            <span className="relative z-10">Instagram</span>
            <div className="absolute inset-0 bg-stone-800/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
