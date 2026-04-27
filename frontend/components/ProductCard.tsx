
import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, ShoppingBag, Eye, Star, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
  isWishlisted?: boolean;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (product: Product) => void;
  onOpenDetail: (product: Product) => void;
  onShopLook: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  isWishlisted = false,
  onAddToCart,
  onToggleWishlist,
  onOpenDetail,
  onShopLook
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Prioritize hoverImageUrl if it exists, otherwise fallback to first detail image or original image
  const hoverImage = product.hoverImageUrl
    ? product.hoverImageUrl
    : (product.detailImages && product.detailImages.length > 0
      ? product.detailImages[0]
      : product.imageUrl);

  return (
    <div
      className={`group relative flex flex-col h-full cursor-pointer transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{
        willChange: 'transform, opacity',
        transitionDelay: `${index * 50}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenDetail(product)}
    >
      {/* Image Container with Hover Actions */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-stone-900 border border-stone-800/50 shadow-lg group-hover:shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ willChange: 'transform' }}>

        {/* Main Image Layer */}
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isHovered ? 'opacity-0 scale-105 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
          style={{ willChange: 'transform, opacity, filter' }}
        />

        {/* Lifestyle/Hover Image Layer */}
        <img
          src={hoverImage}
          alt={`${product.name} lifestyle`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isHovered ? 'opacity-100 scale-110 blur-0' : 'opacity-0 scale-100 blur-sm'}`}
          style={{ visibility: isHovered ? 'visible' : 'hidden', willChange: 'transform, opacity, filter' }}
        />

        {/* Optional Blur Background effect on Hover */}
        <div className={`absolute inset-0 bg-stone-900/10 backdrop-blur-[2px] transition-opacity duration-700 ease-in-out pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all z-20 active:scale-90 border border-stone-800 ${isWishlisted ? 'bg-rose-600 text-white' : 'bg-stone-950/60 text-stone-400 hover:text-white'}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="silver-gradient text-stone-900 text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">New</span>
          )}
          {product.isBestseller && (
            <span className="gold-gradient text-stone-950 text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Bestseller</span>
          )}
        </div>

        {/* THE "JUMP UP" QUICK ACTION MODAL OVERLAY */}
        <div className="absolute inset-x-0 bottom-0 z-30 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onOpenDetail(product); }}
              className="w-full py-3 bg-white text-stone-950 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-stone-100 transition-colors shadow-2xl"
            >
              <Eye className="w-4 h-4" />
              Quick View
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(product, e); }}
              className="w-full py-3 gold-gradient text-stone-950 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-2xl"
            >
              <ShoppingBag className="w-4 h-4" />
              Add To Bag
            </button>
          </div>
        </div>

        {/* Gradient overlay for better text contrast if needed */}
        <div className={`absolute inset-0 bg-stone-950/20 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Product Information */}
      <div className="pt-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1.5">
          <span className="text-[9px] text-amber-500/80 font-black uppercase tracking-[0.2em]">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-2.5 h-2.5 text-amber-500 fill-current" />
            <span className="text-[10px] font-bold text-stone-500">5.0 / 5 (24)</span>
          </div>
        </div>

        <h3 className="font-serif text-lg text-stone-100 mb-2 leading-tight transition-colors group-hover:text-amber-400 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-3">
          <span className="text-xl font-bold silver-gradient bg-clip-text text-transparent">
            RS. {product.price.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-stone-600 line-through font-medium">
            RS. {(product.price * 2).toLocaleString('en-IN')}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex -space-x-1">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-200 border border-stone-800" title="Gold Finish"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-stone-300 border border-stone-800" title="Silver Finish"></div>
          </div>
          <span className="text-[8px] text-stone-600 font-bold uppercase tracking-widest">92.5 Silver • Zirconia Stones</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
