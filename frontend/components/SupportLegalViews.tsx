
import React, { useState } from 'react';
// Added Loader2 to the imports from lucide-react
import { Package, RefreshCw, MessageCircle, Shield, ShieldCheck, Truck, IndianRupee, Search, Send, MapPin, Phone, Mail, Clock, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { ViewState } from '../types';

interface ViewProps {
  currentView: ViewState;
  onBack: () => void;
}

export const SupportLegalViews: React.FC<ViewProps> = ({ currentView, onBack }) => {
  const [orderId, setOrderId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackResult, setTrackResult] = useState<any>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    setIsTracking(true);
    // Mock professional tracking logic
    setTimeout(() => {
      setTrackResult({
        id: orderId,
        status: 'In Transit',
        location: 'Jaipur Central Sorting Hub',
        estimatedDelivery: 'Oct 30, 2024',
        lastUpdated: '2 hours ago',
        steps: [
          { label: 'Order Confirmed', completed: true, date: 'Oct 24' },
          { label: 'Artisan Polishing QC', completed: true, date: 'Oct 25' },
          { label: 'Shipped from Jaipur', completed: true, date: 'Oct 26' },
          { label: 'In Transit', completed: false, date: 'Current' }
        ]
      });
      setIsTracking(false);
    }, 1500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const renderHeader = (icon: React.ReactNode, title: string, subtitle: string) => (
    <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-stone-900 rounded-2xl flex items-center justify-center mx-auto border border-stone-800 text-amber-500 shadow-xl">
        {icon}
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-white">{title}</h1>
      <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-stone-500">{subtitle}</p>
    </div>
  );

  const renderLegalContent = (title: string, sections: { h: string, p: string }[]) => (
    <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12 animate-in fade-in duration-700">
      {renderHeader(<Shield className="w-6 h-6 sm:w-8 sm:h-8" />, title, "Official GLAANZ Policy")}
      <div className="space-y-8 sm:space-y-10">
        {sections.map((s, i) => (
          <div key={i} className="space-y-3 sm:space-y-4">
            <h3 className="text-amber-500 font-serif text-xl sm:text-2xl font-bold border-l-2 border-amber-500/30 pl-4 sm:pl-6">{s.h}</h3>
            <p className="text-stone-400 leading-relaxed text-sm md:text-base pl-4 sm:pl-6 whitespace-pre-line">{s.p}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <button
        onClick={onBack}
        className="mb-8 sm:mb-12 flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-stone-500 hover:text-amber-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Collections
      </button>

      {currentView === 'TrackOrder' && (
        <div className="max-w-3xl mx-auto space-y-10 sm:space-y-12 animate-in fade-in duration-700">
          {renderHeader(<Package className="w-6 h-6 sm:w-8 sm:h-8" />, "Track Your Order", "Real-Time Heritage Logistics")}

          <form onSubmit={handleTrack} className="bg-stone-900/50 p-6 sm:p-10 rounded-[2.5rem] border border-stone-800 space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Global Tracking Number</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., GLZ-82734"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                  className="w-full bg-stone-950 border border-stone-800 rounded-2xl py-4 sm:py-5 px-6 text-white focus:outline-none focus:border-amber-500 transition-all font-bold tracking-widest text-sm"
                />
                <button
                  type="submit"
                  disabled={isTracking}
                  className="absolute right-2 top-2 bottom-2 bg-amber-500 text-stone-950 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-white transition-all disabled:opacity-50"
                >
                  {isTracking ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Search className="w-4 h-4" /> Track</>}
                </button>
              </div>
            </div>
          </form>

          {trackResult && (
            <div className="bg-stone-900 border border-stone-800 rounded-[2.5rem] overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="p-8 sm:p-12 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Shipment status</span>
                    <h3 className="text-3xl font-serif font-bold text-white mt-2">{trackResult.status}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Est. Delivery</span>
                    <p className="text-stone-100 font-bold mt-2">{trackResult.estimatedDelivery}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {trackResult.steps.map((step: any, i: number) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${step.completed ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-800 text-transparent'}`}>
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        {i < trackResult.steps.length - 1 && <div className={`w-0.5 h-12 my-1 transition-colors ${step.completed ? 'bg-amber-500' : 'bg-stone-800'}`} />}
                      </div>
                      <div className="pt-0.5">
                        <h4 className={`text-sm font-bold uppercase tracking-wider ${step.completed ? 'text-white' : 'text-stone-600'}`}>{step.label}</h4>
                        <p className="text-[10px] text-stone-500 mt-1 font-medium">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {currentView === 'Returns' && (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
          {renderHeader(<RefreshCw className="w-6 h-6 sm:w-8 sm:h-8" />, "Return / Exchange", "Hassle-Free 7-Day Window")}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-stone-900/50 p-10 rounded-[2.5rem] border border-stone-800 space-y-6">
              <h3 className="text-2xl font-serif font-bold text-white">Initiate a Return</h3>
              <p className="text-stone-400 text-sm leading-relaxed">Changed your mind? We understand. Our return process is simple and respects your time.</p>
              <ul className="space-y-4">
                {[
                  "Self-service via member portal",
                  "Pack in original heritage box",
                  "Free pickup within 48 hours",
                  "Instant refund to original wallet"
                ].map((t, i) => (
                  <li key={i} className="flex gap-4 items-start text-stone-300 text-xs">
                    <span className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center text-[10px] font-black text-amber-500 flex-shrink-0">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 gold-gradient text-stone-950 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl">Proceed to Return Portal</button>
            </div>
            <div className="p-10 bg-amber-500/5 border border-amber-500/10 rounded-[2.5rem] flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h4 className="text-xl font-serif font-bold text-white">Artisan Quality Guarantee</h4>
                <p className="text-stone-500 text-xs leading-relaxed">Every GLAANZ piece undergoes a 3-stage QC in our Jaipur atelier. If you find even a minor imperfection, we offer a no-questions-asked immediate replacement.</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-amber-500">
                <ShieldCheck className="w-6 h-6" /> Lifetime Re-polishing Service
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'Contact' && (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
          {renderHeader(<MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />, "Contact Us", "Personal Styling & Support")}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl font-serif font-bold text-white leading-tight">Visit the <br /><span className="italic gold-gradient bg-clip-text text-transparent">Jaipur Atelier</span></h2>
                <p className="text-stone-500 text-sm leading-relaxed">Our master artisans are available for private bridal consultations and custom design commissions.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { i: <MapPin className="w-5 h-5" />, t: "Location", v: "Heritage Row, Jaipur, RJ" },
                  { i: <Phone className="w-5 h-5" />, t: "Concierge", v: "+91 98765 43210" },
                  { i: <Mail className="w-5 h-5" />, t: "Inquiries", v: "care@glaanz.com" },
                  { i: <Clock className="w-5 h-5" />, t: "Hours", v: "10 AM - 8 PM IST" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="w-12 h-12 bg-stone-900 rounded-xl flex items-center justify-center text-amber-500 border border-stone-800">
                      {item.i}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-600 mb-0.5">{item.t}</p>
                      <p className="text-stone-200 font-bold text-xs">{item.v}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-stone-900/50 p-10 rounded-[3rem] border border-stone-800">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Inquiry Received</h3>
                  <p className="text-stone-500 text-sm">One of our stylists will contact you within 4 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-stone-600">Full Name</label>
                      <input required type="text" className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3.5 px-5 text-white focus:border-amber-500 outline-none text-xs" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-stone-600">Subject</label>
                      <select className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3.5 px-5 text-white focus:border-amber-500 outline-none text-xs appearance-none">
                        <option>General Inquiry</option>
                        <option>Bridal Consultation</option>
                        <option>Order Support</option>
                        <option>Wholesale</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-600">Email Address</label>
                    <input required type="email" className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3.5 px-5 text-white focus:border-amber-500 outline-none text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-600">Message</label>
                    <textarea required rows={4} className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3.5 px-5 text-white focus:border-amber-500 outline-none text-xs resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 gold-gradient text-stone-950 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {currentView === 'Terms' && renderLegalContent("Terms of Service", [
        { h: "Agreement to Terms", p: "By using GLAANZ services, you acknowledge that our imitation jewelry is handcrafted using high-grade base metals and semi-precious stones. All intellectual property related to our 'Heritage Series' is strictly protected." },
        { h: "Account & Purchase", p: "Placing an order constitutes a legal offer. While we maintain artisan inventory, we reserve the right to cancel orders due to sudden raw material unavailability or pricing errors." },
        { h: "Liability", p: "GLAANZ is not liable for skin reactions typical of base metal jewelry. We recommend following our 'Jewelry Care' guide provided with every delivery." }
      ])}

      {currentView === 'Privacy' && renderLegalContent("Privacy Policy", [
        { h: "Data Encryption", p: "Your stylistic preferences and purchase history are stored using bank-grade 256-bit SSL encryption. We never share your data with 3rd party marketers." },
        { h: "AI Stylist Learning", p: "Interactions with GLAANZ AI are used solely to improve your personalized recommendations. No voice or facial data is recorded during virtual consultations unless explicitly authorized." },
        { h: "Financial Security", p: "We do not store complete card details. All transactions are processed via PCI-DSS compliant gateways like Razorpay or Stripe." }
      ])}

      {currentView === 'Shipping' && renderLegalContent("Shipping Policy", [
        { h: "Dispatch Timeline", p: "Orders are processed within 24 hours. Since every piece undergoes a final artisan polish before shipping, dispatch typically takes 1-2 business days from our Jaipur center." },
        { h: "Insured Delivery", p: "All shipments are 100% insured. If a package is lost in transit, we provide an immediate replacement or full refund." },
        { h: "Eco-Luxury Packaging", p: "Every order is shipped in our FSC-certified sustainable velvet-lined heritage box, designed for lifelong storage." }
      ])}

      {currentView === 'Refund' && renderLegalContent("Refund Policy", [
        { h: "Eligibility", p: "Refunds are processed for items returned within 7 days in original condition. For hygiene reasons, nose pins and custom-sized rings are non-refundable unless defective." },
        { h: "Processing Time", p: "Once your return passes our heritage quality check, refunds are initiated within 48 business hours to your original payment method." },
        { h: "Exchange Credit", p: "Opt for 'Atelier Credit' for your next purchase and receive an additional 5% bonus value on your returned item's price." }
      ])}
    </div>
  );
};
