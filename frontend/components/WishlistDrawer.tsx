
import React from 'react';
import { X, Heart, Trash2, ShoppingBag, Plus } from 'lucide-react';
import { WishlistItem, Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose, items, onRemove, onAddToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-stone-900 h-full shadow-2xl flex flex-col border-l border-stone-800">
        <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-stone-950">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <h2 className="font-serif text-xl font-bold text-stone-50">Wishlist ({items.length})</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-800 rounded-full transition-colors">
            <X className="w-6 h-6 text-stone-400" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-stone-900">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-600 space-y-4">
              <Heart className="w-16 h-16 stroke-1" />
              <p className="text-lg">Your wishlist is empty</p>
              <button 
                onClick={onClose}
                className="text-amber-500 font-bold uppercase tracking-widest text-xs hover:underline"
              >
                Browse Designs
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-24 h-32 flex-shrink-0 bg-stone-950 rounded-lg overflow-hidden border border-stone-800">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-stone-100 line-clamp-1">{item.name}</h3>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-stone-600 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest mb-2">{item.category}</span>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold text-stone-50">₹{item.price.toLocaleString('en-IN')}</span>
                    <button 
                      onClick={() => {
                        onAddToCart(item);
                        onRemove(item.id);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 text-stone-100 hover:gold-gradient hover:text-stone-900 transition-all duration-300 border border-stone-700 hover:border-transparent text-[10px] font-bold uppercase"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-stone-800 bg-stone-950">
            <p className="text-[10px] text-center text-stone-500 uppercase tracking-widest">Items in your wishlist are saved for 30 days</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
