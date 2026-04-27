
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, Bot, Loader2, ExternalLink, ShoppingBag } from 'lucide-react';
import { ChatMessage, Product } from '../types';
import { getStylingAdvice } from '../services/geminiService';
import { PRODUCTS } from '../constants';

interface AIStylistProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

const AIStylist: React.FC<AIStylistProps> = ({ isOpen, onClose, onProductClick }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: "Namaste! I'm GLAANZ, your personal jewelry stylist. What are you wearing today, or what's the occasion? I'll help you pick the perfect pieces from our collection!",
      recommendedProductIds: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    const userMsg = input.trim();
    if (!userMsg || isLoading) return;

    // Clear input immediately for better UX
    setInput('');
    
    // Create the updated message list immediately to pass to the service
    // instead of relying on stale state
    const userMessage: ChatMessage = { role: 'user', text: userMsg };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Pass the current history + the new user message to the service
      const result = await getStylingAdvice(messages, userMsg);
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: result.text, 
        recommendedProductIds: result.productIds 
      }]);
    } catch (err) {
      console.error("Stylist call failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-stone-900 h-full shadow-2xl flex flex-col border-l border-stone-800">
        <div className="p-6 border-b border-stone-800 royal-gradient text-white flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-stone-900 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">
                <span className="gold-gradient bg-clip-text text-transparent">GLAANZ</span> AI Stylist
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Curated Heritage Style</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-8 bg-stone-950 no-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
              <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-md ${
                  msg.role === 'user' ? 'bg-amber-900 text-amber-200' : 'bg-stone-100 text-stone-900'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className="flex flex-col gap-3">
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-amber-700 text-white rounded-tr-none' 
                      : 'bg-stone-800 border border-stone-700 text-stone-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  
                  {/* Product Recommendations */}
                  {msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
                    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-grow bg-stone-800"></div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] gold-gradient bg-clip-text text-transparent">Suggested for you</span>
                        <div className="h-px flex-grow bg-stone-800"></div>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                        {msg.recommendedProductIds.map(id => {
                          const p = PRODUCTS.find(prod => prod.id === id);
                          if (!p) return null;
                          return (
                            <div 
                              key={p.id}
                              onClick={() => onProductClick(p)}
                              className="w-40 flex-shrink-0 bg-stone-900 border border-stone-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all group cursor-pointer shadow-lg active:scale-95"
                            >
                              <div className="h-32 relative overflow-hidden">
                                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent"></div>
                                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                                   <span className="text-[9px] font-bold text-white shadow-sm">₹{p.price.toLocaleString('en-IN')}</span>
                                   <div className="p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                      <ShoppingBag className="w-2.5 h-2.5 text-amber-500" />
                                   </div>
                                </div>
                              </div>
                              <div className="p-2.5">
                                <h4 className="text-[10px] font-bold text-stone-200 line-clamp-1 group-hover:text-amber-400 transition-colors uppercase tracking-wider">{p.name}</h4>
                                <div className="mt-1 flex items-center gap-1">
                                  <span className="text-[8px] text-stone-500 font-bold uppercase tracking-tighter">{p.category}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-900 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 bg-stone-800 border border-stone-700 rounded-2xl rounded-tl-none shadow-md">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-stone-800 bg-stone-900 shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">
          <div className="flex gap-3">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Style me for a wedding..."
              className="flex-grow px-4 py-3.5 rounded-2xl bg-stone-950 border border-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm text-stone-100 placeholder:text-stone-700 transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-3.5 rounded-2xl bg-stone-100 text-stone-900 hover:bg-amber-500 hover:text-stone-950 transition-all disabled:opacity-30 disabled:hover:bg-stone-100 shadow-xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
             <p className="text-[10px] text-stone-600 font-black uppercase tracking-[0.2em]">Stylist Online & Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStylist;
