
import React, { useState, useMemo, useEffect } from 'react';
import { X, Heart, ShoppingBag, Star, ShieldCheck, Truck, BadgeCheck, Image as ImageIcon, Loader2, User, Play, Youtube, ExternalLink, Camera } from 'lucide-react';
import { Product, Review } from '../types';
import { SHORTS, PRODUCTS } from '../constants';
import VirtualTryOn from './VirtualTryOn';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (product: Product) => void;
  onShopLook?: (product: Product) => void; // Added for internal product cards
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    user: 'Meera Kapoor',
    rating: 5,
    comment: 'The craftsmanship is exquisite. It looks even better in person than in the photos. The matte gold finish is so realistic, no one could tell it was imitation. Wore it to my cousin\'s wedding and received so many compliments!',
    date: 'Oct 24, 2024'
  },
  {
    id: 'r2',
    user: 'Ananya Sharma',
    rating: 5,
    comment: 'Absolutely stunning piece! The packaging was so premium, it felt like opening a piece of fine jewelry. The weight is perfect—not too heavy, but substantial enough to sit beautifully.',
    date: 'Sep 12, 2024'
  },
  {
    id: 'r3',
    user: 'Priya Patel',
    rating: 4,
    comment: 'Beautiful design and great finish. Deducting one star only because delivery took a week, but the wait was totally worth it. Will definitely purchase again from Glaanz.',
    date: 'Aug 05, 2024'
  }
];

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onShopLook
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'purity' | 'showcase' | 'reviews'>('details');
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAROpen, setIsAROpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (product) {
      setActiveImage(0);
      setImageLoaded({});
      setImageErrors({});
      setActiveTab('details');
    }
  }, [product?.id]);

  const images = useMemo(() => {
    if (!product) return [];
    const list = product.detailImages && product.detailImages.length > 0
      ? [product.imageUrl, ...product.detailImages]
      : [product.imageUrl];
    return Array.from(new Set(list));
  }, [product?.id, product?.imageUrl, product?.detailImages]);

  // Strictly filter SHORTS to find one unique link for this product
  const productShort = useMemo(() => {
    if (!product) return null;
    return SHORTS.find(s => s.productId === product.id) || SHORTS[0];
  }, [product?.id]);

  // Find related products (same category, exclude current)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product?.id, product?.category]);

  if (!product || !isOpen) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  const productReviews = product.reviews || MOCK_REVIEWS;

  return (
    <>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-0 sm:p-6 lg:p-8 overflow-hidden">
        <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-xl" onClick={onClose} />

        <div className="relative w-full max-w-6xl bg-stone-900 h-full sm:h-auto sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-screen sm:max-h-[90vh] border-0 sm:border border-stone-800 animate-in fade-in zoom-in duration-300">

          <div className="sm:hidden sticky top-0 z-50 flex justify-between items-center p-4 bg-stone-900/80 backdrop-blur-md border-b border-stone-800">
            <h3 className="text-white font-serif font-bold truncate pr-10">{product.name}</h3>
            <button onClick={onClose} className="p-2 rounded-full bg-stone-800 text-stone-400"><X className="w-5 h-5" /></button>
          </div>

          <button onClick={onClose} className="hidden sm:block absolute top-6 right-6 z-50 p-3 rounded-full bg-stone-950/50 text-stone-400 hover:text-white hover:bg-stone-800 transition-all border border-stone-800"><X className="w-6 h-6" /></button>

          <div className="w-full lg:w-1/2 relative bg-stone-950 flex flex-col shrink-0">
            <div className="aspect-square sm:aspect-auto flex-grow relative group overflow-hidden cursor-zoom-in" onClick={() => !imageErrors[activeImage] && setIsZoomed(true)}>
              {!imageLoaded[activeImage] && !imageErrors[activeImage] && (
                <div className="absolute inset-0 flex items-center justify-center bg-stone-900 z-10">
                  <Loader2 className="w-10 h-10 text-stone-700 animate-spin" />
                </div>
              )}

              {imageErrors[activeImage] ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-stone-700 gap-4">
                  <ImageIcon className="w-16 h-16 opacity-20" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Preview Unreachable</span>
                </div>
              ) : images[activeImage]?.endsWith('.mp4') ? (
                <video
                  key={`${product.id}-${activeImage}`}
                  src={images[activeImage]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={() => handleImageLoad(activeImage)}
                  onError={() => handleImageError(activeImage)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded[activeImage] ? 'opacity-100' : 'opacity-0'}`}
                />
              ) : (
                <img
                  key={`${product.id}-${activeImage}`}
                  src={images[activeImage]}
                  alt={product.name}
                  onLoad={() => handleImageLoad(activeImage)}
                  onError={() => handleImageError(activeImage)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded[activeImage] ? 'opacity-100' : 'opacity-0'}`}
                />
              )}
            </div>

            <div className="p-3 sm:p-4 flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar border-t border-stone-800 bg-stone-900/50">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-14 sm:w-20 h-16 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all relative ${activeImage === idx ? 'border-amber-500 scale-105 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  {img.endsWith('.mp4') ? (
                    <>
                      <video src={img} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="w-4 h-4 text-white fill-white shadow-sm" />
                      </div>
                    </>
                  ) : (
                    <img src={img} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=200'; }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col h-full bg-stone-900 relative pb-24 sm:pb-0 overflow-y-auto no-scrollbar">
            <div className="p-6 lg:p-12 space-y-6 md:space-y-8">
              <div className="space-y-3">
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">{product.category}</span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-50 leading-tight">{product.name}</h1>
                <div className="flex items-center justify-between">
                  <span className="text-2xl md:text-3xl font-bold silver-gradient bg-clip-text text-transparent">₹{product.price.toLocaleString('en-IN')}</span>
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold tracking-widest uppercase">5.0 / 5</span>
                  </div>
                </div>
                {product.arAsset && (
                  <button
                    onClick={() => setIsAROpen(true)}
                    className="w-full mt-4 py-3 sm:py-4 rounded-2xl bg-stone-950/80 border border-amber-500/30 text-amber-500 font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs flex items-center justify-center gap-3 shadow-2xl hover:bg-amber-500/10 active:scale-95 transition-all group"
                  >
                    <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Live Virtual Try-On
                  </button>
                )}
              </div>

              {/* Exact tab order: DETAILS | PURITY | SHOWCASE | REVIEWS */}
              <div className="flex border-b border-stone-800/50 overflow-x-auto no-scrollbar shrink-0 gap-8 sm:gap-12">
                {['details', 'purity', 'showcase', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-4 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative shrink-0 ${activeTab === tab ? 'text-amber-500' : 'text-stone-600'
                      }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500 animate-in fade-in" />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[250px]">
                {activeTab === 'details' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <p className="text-stone-400 text-sm leading-relaxed font-medium">{product.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-stone-300 bg-stone-950/40 p-5 rounded-2xl border border-stone-800">
                        <ShieldCheck className="w-5 h-5 text-amber-500" /> Artisan Hand-crafted Piece
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-stone-300 bg-stone-950/40 p-5 rounded-2xl border border-stone-800">
                        <Truck className="w-5 h-5 text-amber-500" /> Premium Insured Shipping
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'purity' && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="p-6 bg-amber-500/5 rounded-[2rem] border border-amber-500/10 flex items-center gap-5">
                      <BadgeCheck className="w-10 h-10 text-amber-500" />
                      <div>
                        <span className="block text-[10px] text-white font-black uppercase tracking-[0.2em]">Heritage Quality</span>
                        <span className="block text-xs text-stone-500 font-medium">Certified Jaipur Craftsmanship</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-2xl bg-stone-800/50 border border-stone-700 text-center space-y-2">
                        <span className="block text-amber-500 font-black text-lg tracking-tighter">22K</span>
                        <span className="block text-[8px] text-stone-500 uppercase font-black tracking-widest">Gold Polished</span>
                      </div>
                      <div className="p-6 rounded-2xl bg-stone-800/50 border border-stone-700 text-center space-y-2">
                        <span className="block text-amber-500 font-black text-lg tracking-tighter">AAA+</span>
                        <span className="block text-[8px] text-stone-500 uppercase font-black tracking-widest">Zirconia Grade</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'showcase' && (
                  <div className="space-y-4 animate-in fade-in">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-500">Video Lookbook</h4>

                    {productShort && (
                      <div className="flex flex-col items-center sm:items-start gap-4">
                        <a
                          href={`https://www.youtube.com/shorts/${productShort.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative block aspect-[4/3] w-[250px] rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 shadow-xl transition-all hover:scale-[1.02] hover:border-amber-500/30"
                        >
                          <img
                            src={productShort.thumbnail}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700"
                            alt={productShort.title}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                              <Play className="w-6 h-6 text-white fill-white" />
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-5 right-5">
                            <p className="text-[9px] font-black uppercase tracking-widest text-white leading-tight mb-1">{productShort.title}</p>
                            <div className="flex items-center gap-1.5">
                              <Youtube className="w-3 h-3 text-red-500 fill-current" />
                              <span className="text-[7px] font-bold text-stone-400 uppercase tracking-widest">Open YouTube Short</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-8 animate-in fade-in">
                    {productReviews.map((review) => (
                      <div key={review.id} className="group space-y-4 pb-8 border-b border-stone-800 last:border-0">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center border border-stone-700">
                              <User className="w-5 h-5 text-stone-500" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider">{review.user}</h4>
                              <div className="flex gap-0.5 mt-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-2 h-2 text-amber-500 fill-current" />)}
                              </div>
                            </div>
                          </div>
                          <span className="text-[9px] font-bold text-stone-600 uppercase tracking-widest">{review.date}</span>
                        </div>
                        <p className="text-stone-400 text-xs leading-relaxed italic font-medium px-2 border-l-2 border-stone-800 ml-5">
                          "{review.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Related Products Section */}
              {relatedProducts.length > 0 && (
                <div className="pt-12 border-t border-stone-800/50 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-amber-500"></div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-stone-300">Complete The Look</h3>
                  </div>
                  <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4">
                    {relatedProducts.map(related => (
                      <div
                        key={related.id}
                        className="w-40 sm:w-48 shrink-0 group cursor-pointer border border-stone-800 rounded-2xl overflow-hidden bg-stone-950/50 hover:border-amber-500/30 transition-all"
                      >
                        <div className="aspect-[3/4] overflow-hidden relative">
                          <img
                            src={related.imageUrl}
                            alt={related.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-stone-950/20 group-hover:opacity-0 transition-opacity" />
                        </div>
                        <div className="p-4 space-y-1">
                          <h4 className="text-[10px] font-bold text-stone-200 uppercase tracking-wider truncate">{related.name}</h4>
                          <p className="text-[11px] font-black text-amber-500">₹{related.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <div className="fixed bottom-0 left-0 right-0 sm:relative p-4 sm:p-10 border-t border-stone-800 bg-stone-950 sm:bg-stone-950/50 backdrop-blur-xl flex gap-4 z-[60]">
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-5 rounded-2xl border transition-all active:scale-95 ${isWishlisted ? 'bg-rose-600/10 border-rose-600/20 text-rose-500' : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white hover:border-stone-600'}`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={(e) => onAddToCart(product, e)}
                className="flex-grow py-5 rounded-2xl gold-gradient text-stone-950 font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>

      {isZoomed && (
        <div className="fixed inset-0 z-[100] bg-stone-950 flex items-center justify-center animate-in fade-in duration-300 overflow-hidden cursor-zoom-out" onClick={() => setIsZoomed(false)}>
          <div className="w-full h-full relative" onMouseMove={handleMouseMove}>
            <div className="absolute inset-0 bg-no-repeat bg-center bg-contain transition-transform duration-200" style={{ backgroundImage: `url(${images[activeImage]})`, transform: `scale(2.5)`, transformOrigin: `${mousePos.x}% ${mousePos.y}%` }} />
          </div>
          <button onClick={() => setIsZoomed(false)} className="absolute top-10 right-10 p-4 rounded-full bg-white/10 text-white backdrop-blur-md">
            <X className="w-8 h-8" />
          </button>
        </div>
      )}

      <VirtualTryOn
        product={product}
        isOpen={isAROpen}
        onClose={() => setIsAROpen(false)}
      />
    </>
  );
};

export default ProductDetailModal;
