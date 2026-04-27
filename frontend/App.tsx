import React, { useState, useMemo, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import CollectionReels from './components/CollectionReels';
import VideoGallery from './components/VideoGallery';
import AIStylist from './components/AIStylist';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import AboutView from './components/AboutView';
import AccountView from './components/AccountView';
import ShowcaseSection from './components/ShowcaseSection';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import { SupportLegalViews } from './components/SupportLegalViews';
import { Product, CartItem, WishlistItem, Category, ViewState, VideoCategory } from './types';
import { PRODUCTS, CATEGORIES, VIDEOS } from './constants';
import {
  Star, ShieldCheck, Truck, RefreshCw,
  SlidersHorizontal, ChevronDown, IndianRupee, X, Zap, Instagram, Youtube, ExternalLink, Play, Search,
  MessageCircle, Gift, HeartHandshake, Sparkles, PartyPopper, Calendar, Package, Shield
} from 'lucide-react';
import { useCart } from './src/contexts/CartContext';
import { useAuth } from './src/contexts/AuthContext';

interface FlyingItem {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  imageUrl: string;
}

const App: React.FC = () => {
  const { cart, addToCart: contextAddToCart, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();
  const { userInfo } = useAuth();
  const [productsDb, setProductsDb] = useState<Product[]>(PRODUCTS);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('Products');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const [globalSearch, setGlobalSearch] = useState('');
  const [videoSearchQuery, setVideoSearchQuery] = useState('');
  const [videoCategory, setVideoCategory] = useState<VideoCategory>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'Featured' | 'Price: Low to High' | 'Price: High to Low' | 'Newest Arrivals'>('Featured');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Animation state
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [isHeaderShimmering, setIsHeaderShimmering] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...productsDb];
    if (currentView === 'Bestsellers') result = result.filter(p => p.isBestseller);
    if (selectedCategory !== 'All') result = result.filter(p => p.category === selectedCategory);
    if (typeof minPrice === 'number') result = result.filter(p => p.price >= minPrice);
    if (typeof maxPrice === 'number') result = result.filter(p => p.price <= maxPrice);
    if (globalSearch.trim()) {
      const query = globalSearch.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    }

    // Apply Sorting
    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Newest Arrivals':
        // Assuming higher ID numbers or specific markers indicate newer arrivals in mock data, 
        // falling back to isNewArrival if present, otherwise reverse original order for mockup purpose
        result.sort((a, b) => {
          if (a.isNewArrival && !b.isNewArrival) return -1;
          if (!a.isNewArrival && b.isNewArrival) return 1;
          return -1; // General newest mock
        });
        break;
      default: // 'Featured'
        // Maintain original DB order which is curated
        break;
    }

    return result;
  }, [currentView, selectedCategory, minPrice, maxPrice, globalSearch, sortBy, productsDb]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          const mergedProducts = res.data.map((dbProduct: Product) => {
            const localProduct = PRODUCTS.find(p => p.id === dbProduct.id);
            return {
              ...dbProduct,
              arAsset: localProduct?.arAsset || dbProduct.arAsset
            };
          });
          setProductsDb(mergedProducts);
        }
      })
      .catch(err => {
        console.warn('Backend API not available, using 25 static products instead.', err);
      });
  }, []);

  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      if (e.target instanceof HTMLImageElement) e.target.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400';
    };
    window.addEventListener('error', handleError as any, true);
    return () => window.removeEventListener('error', handleError as any, true);
  }, []);

  const scrollToGrid = () => {
    setTimeout(() => {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo('#product-grid-header', { offset: window.innerWidth < 640 ? -180 : -200 });
      } else {
        const grid = document.getElementById('product-grid-header');
        if (grid) {
          const offset = window.innerWidth < 640 ? 180 : 200;
          const offsetPosition = grid.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
      setIsHeaderShimmering(true);
      setTimeout(() => setIsHeaderShimmering(false), 2000);
    }, 50);
  };

  const handleSearchChange = (query: string) => {
    setGlobalSearch(query);
    if (query.trim() !== '' && !['Products', 'Bestsellers', 'Videos'].includes(currentView)) {
      setCurrentView('Products');
    }
  };

  const addToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) {
      const cartIcon = document.getElementById('cart-icon-wrapper');
      if (cartIcon) {
        const rect = cartIcon.getBoundingClientRect();
        // Adjust for item size to center it on the icon
        const newItem: FlyingItem = {
          id: Date.now(),
          startX: e.clientX - 25,
          startY: e.clientY - 25,
          targetX: rect.left + rect.width / 2 - 10,
          targetY: rect.top + rect.height / 2 - 10,
          imageUrl: product.imageUrl
        };
        setFlyingItems(prev => [...prev, newItem]);

        // Duration matches the CSS animation
        setTimeout(() => {
          setFlyingItems(prev => prev.filter(item => item.id !== newItem.id));
          updateCartState(product);
        }, 850);
        return;
      }
    }
    updateCartState(product);
  };

  const updateCartState = (product: Product) => {
    contextAddToCart(product);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const isExist = prev.find(item => item.id === product.id);
      return isExist ? prev.filter(item => item.id !== product.id) : [...prev, product];
    });
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleShopLook = (product: Product) => {
    setVideoSearchQuery(product.category);
    setVideoCategory('All');
    setCurrentView('Videos');
    if ((window as any).lenis) (window as any).lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeFromWishlist = (id: string) => setWishlist(prev => prev.filter(item => item.id !== id));
  const wishlistCount = wishlist.length;

  const handleViewChange = (view: ViewState) => {
    setCurrentView(view);
    if (view === 'Bestsellers') {
      scrollToGrid();
    } else {
      if ((window as any).lenis) (window as any).lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isInfoView = ['TrackOrder', 'Returns', 'Contact', 'Terms', 'Privacy', 'Shipping', 'Refund'].includes(currentView);

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col selection:bg-amber-500/30">
        <Header cartCount={cartCount} wishlistCount={wishlistCount} onCartClick={() => setIsCartOpen(true)} onWishlistClick={() => setIsWishlistOpen(true)} onStylistClick={() => setIsStylistOpen(true)} currentView={currentView} onViewChange={handleViewChange} searchQuery={globalSearch} onSearchChange={handleSearchChange} />

        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {flyingItems.map(item => (
            <div
              key={item.id}
              className="w-14 h-14 rounded-full overflow-hidden gold-gradient p-0.5 shadow-2xl animate-fly-to-cart flex items-center justify-center"
              style={{
                '--start-x': `${item.startX}px`,
                '--start-y': `${item.startY}px`,
                '--target-x': `${item.targetX}px`,
                '--target-y': `${item.targetY}px`
              } as any}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-stone-900 border border-white/10">
                <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
              </div>
            </div>
          ))}
        </div>

        <main className="flex-grow">
          {(currentView === 'Products' || currentView === 'Bestsellers') && !globalSearch && <HeroSection />}

          {(currentView === 'Products' || currentView === 'Bestsellers') && (
            <>
              {!globalSearch && <CollectionReels selectedCategory={selectedCategory} onCategorySelect={(cat) => { setSelectedCategory(cat); scrollToGrid(); }} />}

              <section className="py-4 sm:py-6 bg-stone-900/60 backdrop-blur-3xl border-b border-stone-800/50 sticky top-[80px] sm:top-[104px] z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap justify-end items-center gap-4 sm:gap-6">
                  <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                    {selectedCategory !== 'All' && (
                      <button onClick={() => setSelectedCategory('All')} className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-stone-600 hover:text-amber-500 transition-colors flex items-center gap-1.5 whitespace-nowrap"><X className="w-3 h-3 sm:w-3.5 h-3.5" />Clear</button>
                    )}
                    <div className="relative">
                      <button onClick={() => { setIsPriceDropdownOpen(!isPriceDropdownOpen); setIsSortDropdownOpen(false); }} className={`px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all border flex items-center gap-2 sm:gap-3 ${(minPrice !== '' || maxPrice !== '') ? 'gold-gradient text-stone-950 shadow-2xl border-transparent' : 'bg-stone-950/50 border-stone-800 text-stone-500 hover:border-stone-600'}`}>
                        <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 h-4" /> Filter <ChevronDown className={`w-3 h-3 sm:w-3.5 h-3.5 transition-transform duration-500 ${isPriceDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isPriceDropdownOpen && (
                        <div className="absolute top-full right-0 lg:right-auto lg:left-0 mt-4 sm:mt-6 p-6 sm:p-8 bg-stone-900/98 backdrop-blur-3xl border border-stone-800 rounded-2xl sm:rounded-[2.5rem] shadow-2xl w-64 sm:w-80 z-50 animate-in fade-in zoom-in-95 duration-300">
                          <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-stone-400">Budget</h4>
                            {(minPrice !== '' || maxPrice !== '') && <button onClick={() => { setMinPrice(''); setMaxPrice(''); setIsPriceDropdownOpen(false); }} className="text-amber-500 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Reset</button>}
                          </div>
                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))} className="w-full bg-stone-950 border border-stone-800 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs text-stone-100 placeholder:text-stone-700" placeholder="Min ₹" />
                            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))} className="w-full bg-stone-950 border border-stone-800 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs text-stone-100 placeholder:text-stone-700" placeholder="Max ₹" />
                          </div>
                          <button onClick={() => setIsPriceDropdownOpen(false)} className="w-full mt-4 sm:mt-6 py-3 rounded-lg sm:rounded-xl gold-gradient text-stone-950 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Apply</button>
                        </div>
                      )}
                    </div>

                    <div className="relative hidden sm:block">
                      <button onClick={() => { setIsSortDropdownOpen(!isSortDropdownOpen); setIsPriceDropdownOpen(false); }} className={`px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all border flex items-center gap-2 sm:gap-3 bg-stone-950/50 border-stone-800 text-stone-500 hover:border-stone-600`}>
                        Sort By: <span className="text-stone-200">{sortBy === 'Featured' ? 'Featured' : sortBy.split(':')[0]}</span> <ChevronDown className={`w-3 h-3 sm:w-3.5 h-3.5 transition-transform duration-500 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isSortDropdownOpen && (
                        <div className="absolute top-full right-0 mt-4 sm:mt-6 p-4 sm:p-6 bg-stone-900/98 backdrop-blur-3xl border border-stone-800 rounded-2xl sm:rounded-[2rem] shadow-2xl w-56 z-50 animate-in fade-in zoom-in-95 duration-300">
                          <div className="flex flex-col gap-2">
                            {['Featured', 'Newest Arrivals', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                              <button
                                key={option}
                                onClick={() => { setSortBy(option as any); setIsSortDropdownOpen(false); }}
                                className={`text-left px-4 py-3 rounded-xl text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all ${sortBy === option ? 'bg-amber-500/10 text-amber-500' : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200'}`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="py-16 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6">
                {currentView === 'Bestsellers' ? (
                  <div id="product-grid-header" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-24 gap-6 sm:gap-8 relative">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-8 sm:w-12 h-px bg-amber-500"></div>
                        <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-amber-500 foil-shadow">Most Loved</span>
                      </div>
                      <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-white leading-none tracking-tight">
                        Our <br />Bestsellers
                      </h2>
                    </div>
                    <div className="md:max-w-xs text-stone-400 text-xs sm:text-sm font-medium leading-relaxed">
                      Discover the pieces our community loves the most. Handcrafted perfection curated just for you.
                    </div>
                  </div>
                ) : (
                  <div id="product-grid-header" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-24 gap-6 sm:gap-8 relative">
                    {isHeaderShimmering && <div className="absolute -inset-x-10 sm:-inset-x-20 -inset-y-8 gold-gradient animate-header-shimmer pointer-events-none blur-3xl z-[-1]" />}
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-8 sm:w-12 h-px bg-amber-500"></div>
                        <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-amber-500 foil-shadow">Signature Series</span>
                      </div>
                      <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-stone-50 leading-tight md:leading-[0.9]">
                        {globalSearch ? `Vault Search: "${globalSearch}"` : selectedCategory === 'All' ? 'Complete Anthology' : `${selectedCategory} Collection`}
                      </h2>
                    </div>
                    <div className="text-[8px] sm:text-[11px] text-stone-400 font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] bg-stone-900/50 px-5 sm:px-8 py-2 sm:py-3 rounded-full border border-stone-800/50 backdrop-blur-md">
                      {filteredProducts.length} DESIGNS AVAILABLE
                    </div>
                  </div>
                )}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} isWishlisted={!!wishlist.find(item => item.id === product.id)} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onOpenDetail={openProductDetail} onShopLook={handleShopLook} />
                    ))}
                  </div>
                ) : (
                  <div className="py-32 sm:py-56 text-center space-y-6 sm:space-y-8 animate-in fade-in duration-1000">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-stone-900 rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 sm:mb-10 border border-stone-800 shadow-[0_0_64px_rgba(0,0,0,0.5)]">
                      <Search className="w-8 h-8 sm:w-10 h-10 text-stone-700" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-400">Vault empty for this query</h3>
                    <button onClick={() => { handleSearchChange(''); setSelectedCategory('All'); setMinPrice(''); setMaxPrice(''); }} className="text-amber-500 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors">Reset All Filters</button>
                  </div>
                )}
              </section>
              {!globalSearch && <ShowcaseSection onProductClick={openProductDetail} onAddToCart={addToCart} />}
            </>
          )}

          {currentView === 'Videos' && (
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
              <div className="mb-12 sm:mb-20 text-center space-y-4 sm:space-y-6 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-64 h-32 sm:h-64 bg-amber-500/10 blur-[100px] rounded-full"></div>
                <div className="inline-flex items-center gap-3 bg-stone-900/50 border border-stone-800 rounded-full pr-6 p-1.5 shadow-xl relative z-10 backdrop-blur-xl hover:border-amber-500/30 transition-colors">
                  <div className="w-6 h-6 sm:w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
                    <Play className="w-3 h-3 sm:w-4 h-4 text-stone-950 ml-0.5" />
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Live Look</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white leading-none relative z-10">
                  Cinema Vault
                </h1>
                <p className="text-stone-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-medium relative z-10 px-4">
                  Experience the brilliance, movement, and intricate details of our masterpieces in motion before they reach your hands.
                </p>
              </div>
              <VideoGallery
                videos={VIDEOS}
                searchQuery={videoSearchQuery}
                setSearchQuery={setVideoSearchQuery}
                selectedCategory={videoCategory}
                setSelectedCategory={setVideoCategory}
              />
            </div>
          )}

          {currentView === 'About' && <AboutView />}
          {currentView === 'Account' && <AccountView wishlistCount={wishlistCount} onLogout={() => handleViewChange('Products')} />}
          {isInfoView && <SupportLegalViews currentView={currentView} onBack={() => handleViewChange('Products')} />}
        </main>

        <a href="https://wa.me/919819010080" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] group">
          <div className="absolute -inset-3 sm:-inset-4 bg-emerald-500/20 blur-xl sm:blur-2xl rounded-full animate-pulse group-hover:bg-emerald-500/40 transition-all"></div>
          <div className="relative bg-emerald-600 hover:bg-emerald-500 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90 flex items-center justify-center border-2 sm:border-4 border-white/10">
            <MessageCircle className="w-6 h-6 sm:w-7 h-7" />
            <div className="absolute right-full mr-4 bg-stone-900 border border-stone-800 py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl hidden sm:block">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 whitespace-nowrap block mb-0.5">Contact Support</span>
              <span className="text-[8px] text-stone-500 uppercase font-bold block whitespace-nowrap tracking-tighter">Jaipur Office • Online</span>
            </div>
          </div>
        </a>

        <ScrollToTop />

        <footer className="bg-stone-950 text-stone-500 py-16 sm:py-32 border-t border-stone-900 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-16 lg:gap-20 text-center sm:text-left mb-16 sm:mb-24">
              <div className="space-y-6 sm:space-y-8 flex flex-col items-center sm:items-start lg:col-span-1">
                <div className="flex items-center gap-3 sm:gap-4 cursor-pointer group" onClick={() => handleViewChange('Products')}>
                  <div className="w-10 h-10 sm:w-12 h-12 flex items-center justify-center rounded-full gold-gradient shadow-xl border border-amber-400/20 group-hover:scale-105 transition-transform duration-500">
                    <span className="text-stone-950 font-serif text-xl sm:text-2xl font-black">G</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className="text-white font-serif text-2xl sm:text-4xl font-black tracking-tighter leading-none mb-0.5 sm:mb-1"><span className="gold-gradient bg-clip-text text-transparent">GLAANZ</span></h3>
                    <span className="text-[7px] sm:text-[9px] font-sans font-black tracking-[0.2em] sm:tracking-[0.25em] text-amber-500 uppercase leading-none">SHINE FOREVER</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed max-w-xs opacity-60 font-medium italic text-center sm:text-left">"Preserving the brilliance of Indian heritage for the modern world. Shine with authenticity."</p>
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <h4 className="text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-6 sm:mb-10 border-b border-stone-900 pb-3 sm:pb-4 inline-block">The Vault</h4>
                <ul className="space-y-4 sm:space-y-5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
                  <li><button onClick={() => handleViewChange('Products')} className="hover:text-amber-500 transition-colors">Our Anthology</button></li>
                  <li><button onClick={() => handleViewChange('Bestsellers')} className="hover:text-amber-500 transition-colors">Most Wanted</button></li>
                  <li><button onClick={() => handleViewChange('About')} className="hover:text-amber-500 transition-colors">The Philosophy</button></li>
                  <li><button onClick={() => handleViewChange('Account')} className="hover:text-amber-500 transition-colors">Member Portal</button></li>
                </ul>
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <h4 className="text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-6 sm:mb-10 border-b border-stone-900 pb-3 sm:pb-4 inline-block">Support</h4>
                <ul className="space-y-4 sm:space-y-5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
                  <li><button onClick={() => handleViewChange('TrackOrder')} className="hover:text-amber-500 transition-colors">TRACK ORDER</button></li>
                  <li><button onClick={() => handleViewChange('Returns')} className="hover:text-amber-500 transition-colors">RETURN / EXCHANGE</button></li>
                  <li><button onClick={() => handleViewChange('Contact')} className="hover:text-amber-500 transition-colors">CONTACT US</button></li>
                </ul>
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <h4 className="text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-6 sm:mb-10 border-b border-stone-900 pb-3 sm:pb-4 inline-block">Legal</h4>
                <ul className="space-y-4 sm:space-y-5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
                  <li><button onClick={() => handleViewChange('Terms')} className="hover:text-amber-500 transition-colors">TERMS OF SERVICE</button></li>
                  <li><button onClick={() => handleViewChange('Privacy')} className="hover:text-amber-500 transition-colors">PRIVACY POLICY</button></li>
                  <li><button onClick={() => handleViewChange('Shipping')} className="hover:text-amber-500 transition-colors">SHIPPING POLICY</button></li>
                  <li><button onClick={() => handleViewChange('Refund')} className="hover:text-amber-500 transition-colors">REFUND POLICY</button></li>
                </ul>
              </div>

              <div className="flex flex-col items-center sm:items-start lg:col-span-1">
                <h4 className="text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-6 sm:mb-10 border-b border-stone-900 pb-3 sm:pb-4 inline-block">Elegance Club</h4>
                <div className="space-y-4 sm:space-y-6 w-full max-w-xs">
                  <p className="text-[10px] sm:text-xs opacity-60 font-medium text-center sm:text-left">Join for exclusive early access to heritage drops.</p>
                  <div className="flex p-1.5 bg-stone-900 border border-stone-800 rounded-2xl shadow-inner group focus-within:border-amber-500/30 transition-all">
                    <input type="email" placeholder="Email" className="bg-transparent border-none px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs focus:outline-none w-full text-white placeholder:text-stone-700" />
                    <button className="gold-gradient text-stone-950 px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest active:scale-95 transition-transform shadow-lg">Join</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center pt-12 sm:pt-16 border-t border-stone-900/50">
              <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-black text-stone-700 leading-relaxed px-4">&copy; 2024 GLAANZ JEWELRY INDIA • ALL MASTERPIECES PROTECTED • SHINE FOREVER</p>
            </div>
          </div>
        </footer>

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onClearCart={clearCart}
        />
        <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} items={wishlist} onRemove={removeFromWishlist} onAddToCart={addToCart} />
        <ProductDetailModal product={selectedProduct} isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} isWishlisted={!!wishlist.find(item => item.id === selectedProduct?.id)} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} />
        <AIStylist isOpen={isStylistOpen} onClose={() => setIsStylistOpen(false)} onProductClick={openProductDetail} />
      </div>
    </SmoothScroll>
  );
};

export default App;