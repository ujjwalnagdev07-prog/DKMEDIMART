import React, { useEffect, useState } from 'react';
import { X, Send } from 'lucide-react';
import { BRAND_INFO } from '../data/catalog';
import type { CartItem } from './ProductsView';

interface WhatsAppWidgetProps {
  cart: CartItem[];
}

const QUICK_TOPICS = [
  {
    label: 'Product Price & Stock',
    text: 'Hello DK MEDIMART, I would like to check pricing and stock availability for:',
  },
  {
    label: 'Shipping & Tracking',
    text: 'Hello DK MEDIMART, I have a question regarding shipping timelines / parcel tracking.',
  },
  {
    label: 'Bulk / Dropship Order',
    text: 'Hello DK MEDIMART, I am interested in bulk / dropship pricing.',
  },
];

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(
    'Hello DK MEDIMART, I would like to inquire about an export order.'
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLoadCartSummary = () => {
    if (cart.length === 0) return;
    const lines = cart.map(
      (item, idx) =>
        `${idx + 1}. ${item.productName} (${item.packLabel}) x ${item.quantity} = $${(
          item.unitPrice * item.quantity
        ).toFixed(2)}`
    );
    setMessage(
      `Hello DK MEDIMART, I would like a quote for:\n${lines.join('\n')}`
    );
  };

  const whatsappHref = `${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(
    message.trim() || 'Hello DK MEDIMART, I would like to place an order.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* Chat Interface Popover */}
      {isOpen && (
        <div
          className="w-[calc(100vw-2.5rem)] sm:w-88 bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden"
          role="dialog"
          aria-label="WhatsApp chat with DK MEDIMART"
        >
          {/* Header */}
          <div className="bg-[#0B2545] text-white px-4 py-3.5 flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold tracking-tight">
                {BRAND_INFO.name} WhatsApp
              </div>
              <div className="text-xs text-sky-200/90 font-mono tabular-nums">
                {BRAND_INFO.phoneDisplay}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="bg-[#F8FAFC] p-4 space-y-3">
            <div className="bg-white rounded-lg border border-slate-200 p-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              Welcome to <strong className="text-[#0B2545]">{BRAND_INFO.name}</strong>. Share your product name, quantity, and destination country — our export desk replies promptly.
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-slate-500">
                Quick Topics
              </div>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_TOPICS.map((topic) => (
                  <button
                    key={topic.label}
                    type="button"
                    onClick={() => setMessage(topic.text)}
                    className="px-2.5 py-1.5 rounded-md bg-white border border-slate-200 hover:border-[#0284C7] text-xs font-medium text-[#0B2545] transition-colors"
                  >
                    {topic.label}
                  </button>
                ))}
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={handleLoadCartSummary}
                    className="px-2.5 py-1.5 rounded-md bg-sky-50 border border-sky-200 hover:border-[#0284C7] text-xs font-semibold text-[#0284C7] transition-colors"
                  >
                    Include Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Message Input & Launch Action */}
          <div className="bg-white p-3.5 border-t border-slate-200 space-y-2.5">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              aria-label="WhatsApp message"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
            />

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>Start WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Buttons (Telegram + WhatsApp) */}
      {!isOpen && (
        <a
          href={BRAND_INFO.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-[#229ED9] hover:bg-[#1B87BB] text-white shadow-lg flex items-center justify-center transition-transform duration-150 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#229ED9]"
          aria-label={`Chat on Telegram (${BRAND_INFO.telegram})`}
          title={`Telegram: ${BRAND_INFO.telegram}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 -translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
        </a>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-13 h-13 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white shadow-lg flex items-center justify-center transition-transform duration-150 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#16A34A]"
        aria-label={isOpen ? 'Close WhatsApp chat interface' : 'Chat on WhatsApp (+91 8010814430)'}
        aria-expanded={isOpen}
        title={`WhatsApp: ${BRAND_INFO.phoneDisplay}`}
      >
        {isOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.76 14.07c-.24.67-1.4 1.28-1.94 1.36-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.91-1.26-4.81-4.19-4.96-4.38-.14-.2-1.18-1.57-1.18-3 0-1.43.75-2.13 1.01-2.42.27-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.46.12.63-.07.17-.2.73-.85.92-1.14.2-.29.39-.24.66-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.7-.17 1.37Z" />
          </svg>
        )}
      </button>
    </div>
  );
};
