import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Sparkles, Youtube, Heart, X } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onStylistClick: () => void;
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const LogoEmblem = () => (
  <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full gold-gradient shadow-xl border border-amber-400/20 group-hover:scale-105 transition-transform duration-500">
    <span className="text-stone-950 font-serif text-xl sm:text-2xl font-black">G</span>
  </div>
);

const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  onStylistClick,
  currentView,
  onViewChange,
  searchQuery,
  onSearchChange
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCartPopping, setIsCartPopping] = useState(false);

  // Trigger pop effect when cartCount changes (arrival of flying item)
  useEffect(() => {
    if (cartCount > 0) {
      setIsCartPopping(true);
      const timer = setTimeout(() => setIsCartPopping(false), 550);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <div className="sticky top-0 z-50">
      {/* Promo Announcement Bar */}
      <div className="bg-amber-500 text-stone-900 py-1.5 sm:py-2 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] font-black uppercase tracking-[0.3em] text-[8px] sm:text-[10px]">
          <span className="mx-8 sm:mx-12 flex items-center gap-2">✨ Buy 3 items and get 20% OFF automatically! ✨</span>
          <span className="mx-8 sm:mx-12 flex items-center gap-2">✨ Exclusive Jaipur Heritage Designs - Free Shipping in India ✨</span>
          <span className="mx-8 sm:mx-12 flex items-center gap-2">✨ Luxury Packaging & Insured Delivery ✨</span>
          <span className="mx-8 sm:mx-12 flex items-center gap-2">✨ Buy 3 items and get 20% OFF automatically! ✨</span>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      <header className="bg-stone-950/90 backdrop-blur-xl border-b border-stone-800/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            <div
              className="flex-shrink-0 flex items-center gap-2 sm:gap-4 cursor-pointer group"
              onClick={() => onViewChange('Products')}
            >
              <LogoEmblem />
              <div className="flex flex-col justify-center">
                <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tighter leading-none mb-0.5 sm:mb-1">
                  <span className="gold-gradient bg-clip-text text-transparent">GLAANZ</span>
                </h1>
                <span className="text-[7px] sm:text-[10px] font-sans font-black tracking-[0.2em] sm:tracking-[0.25em] text-amber-500 uppercase leading-none">SHINE FOREVER</span>
              </div>
            </div>

            <nav className="hidden xl:flex space-x-10 text-[10px] font-black uppercase tracking-[0.25em]">
              <button
                onClick={() => onViewChange('Products')}
                className={`transition-all hover:text-amber-500 relative ${currentView === 'Products' ? 'text-amber-500' : 'text-stone-400'}`}
              >
                Collections
                {currentView === 'Products' && <span className="absolute -bottom-2 left-0 right-0 h-0.5 gold-gradient rounded-full"></span>}
              </button>
              <button
                onClick={() => onViewChange('Bestsellers')}
                className={`transition-all hover:text-amber-500 relative ${currentView === 'Bestsellers' ? 'text-amber-500' : 'text-stone-400'}`}
              >
                Bestsellers
                {currentView === 'Bestsellers' && <span className="absolute -bottom-2 left-0 right-0 h-0.5 gold-gradient rounded-full"></span>}
              </button>
              <button
                onClick={() => onViewChange('Videos')}
                className={`flex items-center gap-2 transition-all hover:text-amber-500 relative ${currentView === 'Videos' ? 'text-amber-500' : 'text-stone-400'}`}
              >
                <Youtube className="w-4 h-4 text-red-500" />
                Live Look
                {currentView === 'Videos' && <span className="absolute -bottom-2 left-0 right-0 h-0.5 gold-gradient rounded-full"></span>}
              </button>
              <button
                onClick={() => onViewChange('About')}
                className={`transition-all hover:text-amber-500 relative ${currentView === 'About' ? 'text-amber-500' : 'text-stone-400'}`}
              >
                Heritage
                {currentView === 'About' && <span className="absolute -bottom-2 left-0 right-0 h-0.5 gold-gradient rounded-full"></span>}
              </button>
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-5">
              <button
                onClick={onStylistClick}
                className="hidden sm:flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full bg-stone-100 text-stone-900 hover:bg-white transition-all shadow-xl hover:shadow-stone-100/10 group active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 h-4 text-amber-600 group-hover:animate-pulse" />
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest">AI Stylist</span>
              </button>

              <div className="h-5 w-px bg-stone-800 mx-1 hidden sm:block"></div>

              <button
                className={`p-2 transition-colors ${isSearchVisible ? 'text-amber-500' : 'text-stone-400 hover:text-amber-500'}`}
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <Search className="w-5 h-5 sm:w-6 h-6" />
              </button>

              <button className="p-2 text-stone-400 hover:text-rose-500 relative transition-colors" onClick={onWishlistClick}>
                <Heart className={`w-5 h-5 sm:w-6 h-6 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 sm:-top-1 sm:-right-1 bg-rose-600 text-white text-[7px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-stone-950 shadow-lg">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <div id="cart-icon-wrapper" className="relative">
                <button
                  id="cart-icon"
                  className={`p-2 text-stone-400 hover:text-amber-500 relative transition-all ${isCartPopping ? 'animate-cart-pop' : ''}`}
                  onClick={onCartClick}
                >
                  <ShoppingBag className={`w-5 h-5 sm:w-6 h-6 ${cartCount > 0 ? 'text-amber-500' : ''}`} />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 sm:-top-1 sm:-right-1 bg-amber-600 text-white text-[7px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-stone-950 shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              <button
                className={`hidden md:block transition-colors p-1.5 rounded-full border ${currentView === 'Account' ? 'border-amber-500/50 text-amber-500' : 'border-transparent text-stone-400 hover:text-amber-500'}`}
                onClick={() => onViewChange('Account')}
              >
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Global Search Interface */}
          {isSearchVisible && (
            <div className="py-4 sm:py-8 border-t border-stone-800/50 animate-in slide-in-from-top duration-500">
              <div className="relative max-w-4xl mx-auto px-2">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Kundan, Bangles, Necklaces..."
                  className="w-full bg-stone-900/50 border border-stone-800 rounded-2xl sm:rounded-3xl py-3 sm:py-5 pl-12 sm:pl-14 pr-12 sm:pr-14 text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500/50 transition-all text-xs sm:text-sm font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-stone-800 rounded-full text-stone-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;