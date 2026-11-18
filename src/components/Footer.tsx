import React from 'react';
import { BRAND_INFO } from '../data/catalog';
import type { PageView } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenCart: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCart }) => {
  const handleNav = (page: PageView) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#081B33] text-slate-300 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand Summary */}
          <div>
            <div className="text-base font-bold text-white tracking-tight mb-3">
              {BRAND_INFO.name}
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Trusted pharmaceutical export company with over {BRAND_INFO.experienceYears} years of experience, supplying genuine medications worldwide.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('home')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('products')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCart}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Build Your Quote
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('shipping')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('reshipment')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Reshipment Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('faq')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                WhatsApp:{' '}
                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors tabular-nums"
                >
                  {BRAND_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                Telegram:{' '}
                <a
                  href={BRAND_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {BRAND_INFO.telegram}
                </a>
              </li>
              <li>
                iMessage:{' '}
                <a
                  href={BRAND_INFO.imessageUrl}
                  className="hover:text-white transition-colors tabular-nums"
                >
                  {BRAND_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                Signal:{' '}
                <a
                  href={BRAND_INFO.signalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {BRAND_INFO.signal}
                </a>
              </li>
              <li>
                Email:{' '}
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {BRAND_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Export Profile */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Export Desk</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <button
                type="button"
                onClick={() => handleNav('contact')}
                className="text-sky-400 hover:text-sky-300 font-medium transition-colors block"
              >
                Request Wholesale Quote
              </button>
              <p className="leading-relaxed">
                Exporter of pharmaceutical tablets, capsules, and specialty injections from WHO-GMP certified Indian manufacturers.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
          © 2026 {BRAND_INFO.name}. All rights reserved. | For export only. Not for sale within India.
        </div>
      </div>
    </footer>
  );
};
