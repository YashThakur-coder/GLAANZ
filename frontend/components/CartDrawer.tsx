import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles, Search, Sparkle, CheckCircle2, MessageCircle, ExternalLink, Gift, Zap } from 'lucide-react';
import { CartItem } from '../types';
import { useAuth } from '../src/contexts/AuthContext';
import axios from 'axios';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClearCart?: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onClearCart }) => {
  const { userInfo } = useAuth();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Shipping & Discount Logic
  const SHIPPING_THRESHOLD = 2000;
  const SHIPPING_FEE = 100;

  const hasPromoDiscount = totalQuantity >= 3;
  const discountAmount = hasPromoDiscount ? subtotal * 0.2 : 0;

  const shippingCharge = subtotal >= SHIPPING_THRESHOLD ? 0 : (items.length > 0 ? SHIPPING_FEE : 0);
  const finalTotal = subtotal - discountAmount + shippingCharge;

  // Calculate progress to 3 items
  const progressPercent = Math.min((totalQuantity / 3) * 100, 100);
  const itemsNeeded = Math.max(0, 3 - totalQuantity);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400';
  };

  const generateOrderId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `GLZ-${year}-${random}`;
  };

  const handleWhatsAppCheckout = async () => {
    if (!userInfo) {
      alert('Please sign in to place an order.');
      return;
    }

    setIsProcessing(true);

    // Fallback info for demo
    const customerName = userInfo.name || "Customer";
    const customerPhone = "+91 98765 43210";
    const shippingAddressObj = {
      address: "102, Heritage Residency, Civil Lines",
      city: "Jaipur",
      postalCode: "302001",
      country: "India"
    };

    try {
      const orderData = {
        orderItems: items.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.imageUrl,
          price: item.price,
          product: item._id || item.id // Use exact Mongo ID if exists
        })),
        shippingAddress: shippingAddressObj,
        paymentMethod: 'WhatsApp',
        itemsPrice: subtotal,
        taxPrice: 0,
        shippingPrice: shippingCharge,
        totalPrice: finalTotal,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`${(import.meta as any).env?.VITE_API_URL || 'http://localhost:5000'}/api/orders`, orderData, config);

      const orderId = data._id;
      setLastOrderId(orderId);

      const productLines = items.map((item, index) =>
        `${index + 1}. ${item.name} – Qty: ${item.quantity} – ₹${item.price.toLocaleString('en-IN')}`
      ).join('\n');

      const message = `🛍️ New Order – Glaanz\n\nOrder ID: ${orderId}\nCustomer: ${customerName}\n\nOrder Details:\n${productLines}\n\nFinal Total: ₹${finalTotal.toLocaleString('en-IN')}\n\nPlease confirm the order to proceed.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "919819010080";

      setIsOrderConfirmed(true);
      setIsProcessing(false);

      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
      }, 500);

    } catch (error: any) {
      setIsProcessing(false);
      alert(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
  };

  const handleClose = () => {
    if (isOrderConfirmed) {
      setIsOrderConfirmed(false);
      if (onClearCart) onClearCart();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-stone-900 h-full shadow-2xl flex flex-col border-l border-stone-800 transition-transform duration-500">

        {isOrderConfirmed ? (
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full animate-pulse"></div>
              <div className="relative w-32 h-32 rounded-full border border-emerald-500/30 bg-stone-950/50 flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-500" />
              </div>
            </div>

            <h2 className="text-3xl font-serif font-bold text-white mb-4">Order Created! 💎</h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-8 max-w-xs">
              Thank you for shopping with Glaanz. Your order <span className="text-amber-500 font-bold">{lastOrderId}</span> is being processed.
            </p>

            <div className="w-full p-6 bg-stone-950/50 rounded-2xl border border-stone-800 mb-8 space-y-4">
              <div className="flex items-center gap-3 text-left">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Next Step</p>
                  <p className="text-xs text-stone-200 font-medium">Please confirm your order on WhatsApp to proceed with shipping.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const whatsappNumber = "919819010080";
                window.open(`https://wa.me/${whatsappNumber}`, '_blank');
              }}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all mb-4"
            >
              Continue to WhatsApp <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={handleClose}
              className="text-stone-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
            >
              Return to Gallery
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-stone-950">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-amber-500" />
                <h2 className="font-serif text-xl font-bold text-stone-50">Your Bag ({totalQuantity})</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-stone-800 rounded-full transition-colors">
                <X className="w-6 h-6 text-stone-400" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-stone-900 no-scrollbar flex flex-col">
              {items.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center px-6 animate-in fade-in duration-700">
                  <div className="relative mb-12">
                    <div className="absolute inset-0 bg-amber-500/10 blur-[60px] rounded-full animate-pulse"></div>
                    <div className="relative w-48 h-48 rounded-full border border-stone-800 bg-stone-950/50 flex items-center justify-center group">
                      <div className="absolute inset-4 rounded-full border border-dashed border-stone-700/50 group-hover:rotate-180 transition-transform duration-[10s] linear infinite"></div>
                      <div className="relative flex flex-col items-center">
                        <Sparkle className="w-12 h-12 text-amber-500 mb-2 opacity-50" />
                        <ShoppingBag className="w-16 h-16 text-stone-800 stroke-[1]" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 max-w-xs mx-auto">
                    <h3 className="text-3xl font-serif font-bold text-stone-100">The Vault is Empty</h3>
                    <p className="text-stone-500 text-sm leading-relaxed font-medium">
                      Your curated collection of heritage jewelry awaits its first masterpiece.
                    </p>
                  </div>

                  <div className="w-full mt-12">
                    <button
                      onClick={onClose}
                      className="w-full py-5 gold-gradient text-stone-950 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      <Search className="w-4 h-4" />
                      Discover Masterpieces
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* LUXURY REWARDS METER */}
                  <div className={`p-6 rounded-[2rem] border transition-all duration-700 relative overflow-hidden group ${hasPromoDiscount
                    ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                    : 'bg-stone-950/50 border-stone-800'
                    }`}>
                    {hasPromoDiscount && (
                      <div className="absolute inset-0 gold-gradient opacity-[0.03] animate-pulse"></div>
                    )}

                    <div className="flex justify-between items-end mb-4 relative z-10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {hasPromoDiscount ? (
                            <Zap className="w-4 h-4 text-amber-500 animate-bounce" />
                          ) : (
                            <Gift className="w-4 h-4 text-amber-500" />
                          )}
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${hasPromoDiscount ? 'text-amber-500' : 'text-amber-500/80'}`}>
                            {hasPromoDiscount ? 'Vault Unlocked' : 'Heritage Reward'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">
                          {hasPromoDiscount
                            ? '20% Vault Discount Applied!'
                            : itemsNeeded === 1
                              ? 'Just 1 more piece to unlock 20% OFF'
                              : `Add ${itemsNeeded} more pieces for 20% OFF`
                          }
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-black ${hasPromoDiscount ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {totalQuantity}/3
                        </span>
                      </div>
                    </div>

                    <div className="relative h-2.5 w-full bg-stone-950 rounded-full overflow-hidden border border-white/5 shadow-inner z-10">
                      <div
                        className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out rounded-full ${hasPromoDiscount
                          ? 'gold-gradient shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                          : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                          }`}
                        style={{ width: `${progressPercent}%` }}
                      >
                        {hasPromoDiscount && (
                          <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                        )}
                      </div>
                    </div>

                    {hasPromoDiscount && (
                      <div className="mt-4 flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2 relative z-10">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                          You are saving ₹{discountAmount.toLocaleString('en-IN')} today
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 group animate-fade-in-up">
                        <div className="w-24 h-28 flex-shrink-0 bg-stone-800 rounded-xl overflow-hidden border border-stone-700 relative shadow-inner">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            onError={handleImageError}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div className="flex-grow flex flex-col py-0.5">
                          <div className="flex justify-between items-start gap-2 mb-0.5">
                            <h3 className="text-sm font-bold text-stone-100 line-clamp-1 group-hover:text-amber-400 transition-colors">{item.name}</h3>
                            <button
                              onClick={() => onRemove(item.id)}
                              className="text-stone-600 hover:text-rose-500 transition-all p-1 hover:bg-rose-500/10 rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[9px] text-stone-500 uppercase tracking-widest font-black">{item.category}</span>
                            {hasPromoDiscount && (
                              <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20 font-black">-20%</span>
                            )}
                          </div>

                          <div className="flex justify-between items-center mt-auto">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center border border-stone-800 rounded-lg bg-stone-950 overflow-hidden shadow-inner">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, -1)}
                                  className="p-1.5 hover:bg-stone-800 text-stone-500 hover:text-amber-500 transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <div className="w-6 text-center text-[10px] font-black text-stone-200 bg-stone-900/50 py-1 border-x border-stone-800/50">
                                  {item.quantity}
                                </div>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, 1)}
                                  className="p-1.5 hover:bg-stone-800 text-stone-500 hover:text-amber-500 transition-colors"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              {hasPromoDiscount ? (
                                <div className="flex flex-col items-end">
                                  <span className="text-[10px] text-stone-500 line-through">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                  <span className="text-xs font-bold text-emerald-500">₹{((item.price * item.quantity) * 0.8).toLocaleString('en-IN')}</span>
                                </div>
                              ) : (
                                <span className="block text-xs font-bold text-stone-100">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-stone-800 bg-stone-950 space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div className="space-y-3">
                  <div className="flex justify-between text-stone-500 text-[11px] font-bold uppercase tracking-wider">
                    <span>Cart Subtotal</span>
                    <span className="text-stone-300">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {hasPromoDiscount && (
                    <div className="flex justify-between text-emerald-500 text-[11px] font-black uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> Vault Savings (20%)</span>
                      <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-500 text-[11px] font-bold uppercase tracking-wider">
                    <span>Shipping</span>
                    <span className={shippingCharge === 0 ? "text-emerald-500" : "text-stone-300"}>
                      {shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-50 text-xl font-serif font-bold pt-4 border-t border-stone-800/50">
                    <span>Final Total</span>
                    <span className="gold-gradient bg-clip-text text-transparent">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppCheckout}
                    disabled={isProcessing}
                    className="w-full py-5 bg-stone-100 text-stone-900 rounded-2xl font-black uppercase tracking-[0.25em] text-[10px] flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl active:scale-95 group"
                  >
                    {isProcessing ? 'Processing...' : 'Begin Secure Checkout'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;