import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import type { CurrencyCode } from '../data/catalog';

export type PageView = 'home' | 'products' | 'shipping' | 'reshipment' | 'faq' | 'contact' | 'quote';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

const NAV_ITEMS: { id: PageView; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'shipping', label: 'Shipping Policy' },
  { id: 'reshipment', label: 'Reshipment Policy' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  currency,
  onCurrencyChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeAnimating, setBadgeAnimating] = useState(false);
  const prevCartCountRef = useRef(cartCount);
  const currencyOptions: CurrencyCode[] = ['USD', 'EUR', 'GBP'];

  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setBadgeAnimating(true);
      const timer = window.setTimeout(() => setBadgeAnimating(false), 320);
      prevCartCountRef.current = cartCount;
      return () => window.clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  const handleNav = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchInput = (value: string) => {
    onSearchChange(value);
    if (value.trim() && currentPage !== 'products') {
      onNavigate('products');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPage !== 'products') {
      onNavigate('products');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B2545] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 lg:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="text-lg sm:text-xl tracking-tight text-white whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
        >
          <span className="font-bold">DK</span>{' '}
          <span className="font-medium text-sky-200/80">MEDIMART</span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`text-sm whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isActive
                    ? 'text-white font-semibold border-sky-400'
                    : 'text-slate-300 hover:text-white border-transparent font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search Bar, Cart Action & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <form onSubmit={handleSearchSubmit} className="hidden md:block relative w-48 xl:w-60">
            <Search
              className="w-3.5 h-3.5 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search name or generic..."
              aria-label="Search products by name or generic name"
              className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-[#13335A] border border-white/15 text-xs sm:text-sm text-white placeholder:text-slate-300/75 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                aria-label="Clear product search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          <div
            className="hidden sm:inline-flex items-center rounded-lg bg-[#13335A] border border-white/15 p-0.5"
            role="group"
            aria-label="Display currency"
          >
            {currencyOptions.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => onCurrencyChange(code)}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-colors ${
                  currency === code
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#13335A] hover:bg-[#194170] border border-white/15 text-white text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label={`Open quote cart with ${cartCount} items`}
          >
            <ShoppingCart className="w-4 h-4 text-sky-300" aria-hidden="true" />
            <span>Cart</span>
            <span
              className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold tabular-nums transition-transform ${
                badgeAnimating ? 'animate-[cartPop_300ms_ease-out]' : ''
              }`}
            >
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A203D] border-t border-white/10 px-4 py-3 space-y-3">
          <form onSubmit={handleSearchSubmit} className="md:hidden relative">
            <Search
              className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search name or generic..."
              aria-label="Search products by name or generic name"
              className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#13335A] border border-white/15 text-sm text-white placeholder:text-slate-300/75 focus:outline-none focus:border-sky-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                aria-label="Clear product search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-[#13335A] text-white font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white font-medium'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="sm:hidden flex items-center justify-between px-3 pt-2 border-t border-white/10">
            <span className="text-xs font-medium text-slate-300">Currency</span>
            <div className="inline-flex items-center rounded-lg bg-[#13335A] border border-white/15 p-0.5">
              {currencyOptions.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onCurrencyChange(code)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors ${
                    currency === code
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
