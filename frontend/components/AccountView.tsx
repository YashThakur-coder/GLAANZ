
import React, { useState } from 'react';
import { User, Package, Settings, LogOut, MapPin, CreditCard, ChevronRight, Star, Heart, Check, Save } from 'lucide-react';
import { useAuth } from '../src/contexts/AuthContext';
import { UserProfile } from '../types';

interface AccountViewProps {
  wishlistCount: number;
  onLogout: () => void;
}

const MOCK_USER: UserProfile = {
  name: "Anjali Sharma",
  email: "anjali.s@example.com",
  phone: "+91 98765 43210",
  address: "102, Heritage Residency, Civil Lines, Jaipur, Rajasthan - 302001",
  orders: [
    {
      id: "GLZ-82734",
      date: "Oct 12, 2024",
      total: 4999,
      status: 'Delivered',
      items: ["Royal Kundan Choker Set"]
    },
    {
      id: "GLZ-81002",
      date: "Sep 28, 2024",
      total: 1599,
      status: 'Delivered',
      items: ["Designer CZ Gold-Plated Bangles"]
    }
  ]
};

const AccountView: React.FC<AccountViewProps> = ({ wishlistCount, onLogout }) => {
  const { userInfo, login, register, logout, error, clearError } = useAuth();
  const [activeSubView, setActiveSubView] = useState<'profile' | 'orders' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(MOCK_USER);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  const handleSave = () => {
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLoginView) {
        await login(authEmail, authPassword);
      } else {
        await register(authName, authEmail, authPassword);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = () => {
    logout();
    onLogout();
  };

  if (!userInfo) {
    return (
      <div className="max-w-md mx-auto px-4 py-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-8 bg-stone-900 rounded-3xl border border-stone-800 text-center">
          <h2 className="text-2xl font-serif font-bold text-white mb-6">{isLoginView ? 'Member Login' : 'Create Account'}</h2>
          {error && <p className="text-rose-500 text-xs mb-4">{error}</p>}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {!isLoginView && (
              <input
                type="text"
                placeholder="Full Name"
                value={authName}
                onChange={(e) => setAuthName(e.target.value)}
                required
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={authEmail}
              onChange={(e) => { setAuthEmail(e.target.value); clearError(); }}
              required
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={authPassword}
              onChange={(e) => { setAuthPassword(e.target.value); clearError(); }}
              required
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
            />
            <button type="submit" className="w-full py-3 gold-gradient text-stone-950 rounded-xl font-black uppercase tracking-widest text-xs">
              {isLoginView ? 'Sign In' : 'Register'}
            </button>
          </form>
          <div className="mt-6">
            <button onClick={() => { setIsLoginView(!isLoginView); clearError(); }} className="text-amber-500 text-xs hover:underline">
              {isLoginView ? 'Need an account? Sign up' : 'Already a member? Sign in'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className="lg:w-1/4 space-y-2">
          <div className="p-8 bg-stone-900 rounded-3xl border border-stone-800 mb-8 text-center">
            <div className="w-20 h-20 rounded-full gold-gradient mx-auto mb-4 flex items-center justify-center text-stone-950 font-serif text-3xl font-bold shadow-xl">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-serif font-bold text-white">{userInfo.name}</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mt-1">GLAANZ Premium Member</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveSubView('profile')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${activeSubView === 'profile' ? 'bg-amber-500 text-stone-950 shadow-lg' : 'text-stone-400 hover:bg-stone-900'}`}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">My Profile</span>
            </button>
            <button
              onClick={() => setActiveSubView('orders')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${activeSubView === 'orders' ? 'bg-amber-500 text-stone-950 shadow-lg' : 'text-stone-400 hover:bg-stone-900'}`}
            >
              <Package className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Order History</span>
            </button>
            <button
              onClick={() => setActiveSubView('settings')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${activeSubView === 'settings' ? 'bg-amber-500 text-stone-950 shadow-lg' : 'text-stone-400 hover:bg-stone-900'}`}
            >
              <Settings className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Settings</span>
            </button>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:w-3/4">
          {activeSubView === 'profile' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex justify-between items-center border-b border-stone-800 pb-6">
                <h3 className="text-3xl font-serif font-bold text-white">Profile Overview</h3>
                <div className="flex items-center gap-4">
                  {saveSuccess && (
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 animate-in slide-in-from-right-2">
                      <Check className="w-3 h-3" /> Changes Saved
                    </span>
                  )}
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="text-[10px] font-black uppercase tracking-widest text-amber-500 hover:text-amber-400 flex items-center gap-2"
                  >
                    {isEditing ? <><Save className="w-3 h-3" /> Save Changes</> : "Edit Details"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-stone-900/50 rounded-3xl border border-stone-800 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-500 flex items-center gap-2">
                    <User className="w-3.5 h-3.5" /> Basic Information
                  </h4>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-stone-600 uppercase">Full Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="bg-stone-950 border border-stone-800 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-amber-500 w-full"
                      />
                    ) : (
                      <p className="text-white font-medium">{user.name}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-stone-600 uppercase">Email Address</p>
                    <p className="text-white font-medium">{userInfo.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-stone-600 uppercase">Mobile</p>
                    <p className="text-white font-medium">{user.phone}</p>
                  </div>
                </div>

                <div className="p-8 bg-stone-900/50 rounded-3xl border border-stone-800 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-500 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> Shipping Address
                  </h4>
                  {isEditing ? (
                    <textarea
                      value={user.address}
                      onChange={(e) => setUser({ ...user, address: e.target.value })}
                      className="bg-stone-950 border border-stone-800 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-amber-500 w-full h-24"
                    />
                  ) : (
                    <p className="text-white font-medium leading-relaxed">{user.address}</p>
                  )}
                  <button
                    onClick={() => alert("Address manager opened")}
                    className="text-[10px] font-black uppercase tracking-widest text-amber-500 border border-amber-500/20 px-4 py-2 rounded-xl mt-2 hover:bg-amber-500/5 transition-colors"
                  >
                    Manage Addresses
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/20 text-center">
                  <Star className="text-amber-500 w-6 h-6 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">450</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-stone-500">Loyalty Points</p>
                </div>
                <div className="p-6 bg-rose-500/5 rounded-3xl border border-rose-500/20 text-center">
                  <Heart className="text-rose-500 w-6 h-6 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{wishlistCount}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-stone-500">Wishlist Items</p>
                </div>
                <div className="p-6 bg-amber-500/5 rounded-3xl border border-amber-500/20 text-center">
                  <CreditCard className="text-amber-500 w-6 h-6 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">1</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-stone-500">Saved Cards</p>
                </div>
              </div>
            </div>
          )}

          {activeSubView === 'orders' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex justify-between items-center border-b border-stone-800 pb-6">
                <h3 className="text-3xl font-serif font-bold text-white">Recent Orders</h3>
              </div>

              <div className="space-y-4">
                {user.orders.map(order => (
                  <div key={order.id} className="p-6 bg-stone-900 border border-stone-800 rounded-3xl group hover:border-amber-500/30 transition-all">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-stone-950 rounded-2xl flex items-center justify-center text-amber-500">
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Order #{order.id}</p>
                          <h4 className="text-white font-bold">{order.items.join(', ')}</h4>
                          <p className="text-[10px] text-stone-600 font-bold">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-8">
                        <div className="text-right">
                          <p className="text-white font-bold">₹{order.total.toLocaleString('en-IN')}</p>
                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{order.status}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-stone-700 group-hover:text-amber-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubView === 'settings' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex justify-between items-center border-b border-stone-800 pb-6">
                <h3 className="text-3xl font-serif font-bold text-white">Account Settings</h3>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-stone-900 rounded-3xl border border-stone-800 flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-bold">Email Notifications</h4>
                    <p className="text-xs text-stone-500">Receive updates about new drops and order status.</p>
                  </div>
                  <div className="w-12 h-6 bg-amber-500 rounded-full relative p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                  </div>
                </div>

                <div className="p-6 bg-stone-900 rounded-3xl border border-stone-800 flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-bold">Two-Factor Authentication</h4>
                    <p className="text-xs text-stone-500">Add an extra layer of security to your account.</p>
                  </div>
                  <button
                    onClick={() => alert("2FA Setup initiated")}
                    className="text-[10px] font-black uppercase tracking-widest text-amber-500 border border-amber-500/20 px-4 py-2 rounded-xl"
                  >
                    Enable
                  </button>
                </div>

                <div className="pt-8 space-y-4">
                  <h4 className="text-rose-500 text-[10px] font-black uppercase tracking-widest">Danger Zone</h4>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete your account? This action is irreversible.")) {
                        onLogout();
                      }
                    }}
                    className="w-full text-left p-6 bg-rose-500/5 border border-rose-500/20 rounded-3xl text-rose-500 hover:bg-rose-500/10 transition-colors"
                  >
                    <p className="font-bold">Delete Account</p>
                    <p className="text-xs opacity-70">Permanently remove your account and all associated data.</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountView;
