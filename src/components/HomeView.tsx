import React from 'react';
import {
  CheckSquare,
  Package,
  PackageCheck,
  Truck,
  Globe,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  Headset,
  type LucideIcon,
} from 'lucide-react';
import { CATEGORIES, BRAND_INFO, type CategoryId } from '../data/catalog';
import { CategoryIcon } from './CategoryIcon';
import { Testimonials } from './Testimonials';
import type { PageView } from './Navbar';

interface HomeViewProps {
  onSelectCategory: (categoryId: CategoryId) => void;
  onNavigate: (page: PageView) => void;
  onOpenCart: () => void;
}

const TRUST_METRICS = [
  { value: '16+ Years', label: 'Industry Experience' },
  { value: '1000+ Daily', label: 'Orders Shipped' },
  { value: '7–15 Days', label: 'Global Delivery' },
  { value: '100% Genuine', label: 'Verified Products' },
];

interface TrustIndicatorItem {
  title: string;
  description: string;
  highlights: string;
  icon: LucideIcon;
  iconStyle: string;
  actionLabel: string;
  targetPage: PageView;
}

const TRUST_INDICATORS: TrustIndicatorItem[] = [
  {
    title: 'Secure Payments',
    description:
      'Protected international settlement via Wise, Remitly, Bank Transfer, Revolut, Western Union, MoneyGram, or Crypto.',
    highlights: 'Wise · Remitly · Bank Transfer · Crypto',
    icon: ShieldCheck,
    iconStyle: 'bg-amber-50 text-amber-700 border-amber-200',
    actionLabel: 'Build Your Quote →',
    targetPage: 'quote',
  },
  {
    title: 'Discreet Packaging',
    description:
      'Plain, unbranded, tamper-evident parcels prepared using specialised export protocols refined over 16+ years.',
    highlights: 'Plain Outer Box · Tamper-Evident · Customs Ready',
    icon: PackageCheck,
    iconStyle: 'bg-sky-50 text-[#0284C7] border-sky-200',
    actionLabel: 'Shipping Policy →',
    targetPage: 'shipping',
  },
  {
    title: '24/7 Customer Support',
    description:
      'Round-the-clock order guidance from inquiry to delivery across WhatsApp, Telegram (@dkmedimart), Signal, and iMessage.',
    highlights: 'WhatsApp · Telegram · Signal · iMessage',
    icon: Headset,
    iconStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    actionLabel: 'Contact Support →',
    targetPage: 'contact',
  },
];

const WHY_CHOOSE_ITEMS = [
  {
    title: '100% Genuine Products',
    description:
      'India is the #2 exporter of medicines in the world. We source only from verified manufacturers.',
    icon: CheckSquare,
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  {
    title: 'Specialised Packing',
    description:
      'Refined over 16+ years of export experience — designed for safe, discreet global transit.',
    icon: Package,
    iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    title: 'Same-Day Dispatch',
    description:
      'Orders ship the same day payment is confirmed, with tracking provided immediately.',
    icon: Truck,
    iconBg: 'bg-sky-50 text-sky-600 border-sky-200',
  },
  {
    title: 'Global Delivery',
    description:
      'We ship worldwide across North America, Europe, and APAC — with a strong track record on international routes.',
    icon: Globe,
    iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    title: 'Dedicated Support',
    description:
      'We stay with you from inquiry to delivery. Available on WhatsApp, Telegram, iMessage, and Signal.',
    icon: MessageSquare,
    iconBg: 'bg-slate-100 text-slate-700 border-slate-200',
  },
  {
    title: 'Reshipment Policy',
    description:
      'If a parcel is stuck in customs for 10 days, we offer free reshipment. No hidden surprises.',
    icon: RefreshCw,
    iconBg: 'bg-sky-50 text-sky-700 border-sky-200',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectCategory,
  onNavigate,
  onOpenCart,
}) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#081F3D] via-[#0B2545] to-[#0E2D54] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(2,132,199,0.22),_transparent_65%)]"
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h1
            className="font-bold tracking-tight text-white mx-auto max-w-3xl text-balance leading-[1.15]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.15rem)' }}
          >
            Trusted Pharmaceutical Exporter Delivering Worldwide Since 2009
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Genuine medications, specialised packing, and reliable global shipping — trusted by thousands of customers across the USA, UK, Australia, and beyond.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('products')}
              className="px-6 py-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              Browse Products
            </button>
            <a
              href={`${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hello DK MEDIMART, I would like to inquire about a pharmaceutical export order.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 4-Column Trust KPI Strip */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200 text-center">
            {TRUST_METRICS.map((metric) => (
              <div key={metric.label} className="px-4">
                <div className="text-xl sm:text-2xl font-bold text-[#0B2545] tabular-nums tracking-tight">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section aria-labelledby="trust-indicators-heading" className="bg-white py-12 sm:py-14 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
            <div>
              <h2
                id="trust-indicators-heading"
                className="text-xl sm:text-2xl font-bold text-[#0B2545] tracking-tight"
              >
                Trust Indicators
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Every international shipment is backed by verified payment security, unmarked export packing, and 24/7 specialist support.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('reshipment')}
              className="text-xs sm:text-sm font-semibold text-[#0284C7] hover:text-[#0369A1] whitespace-nowrap self-start sm:self-auto transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded"
            >
              Read Reshipment Guarantee →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
            {TRUST_INDICATORS.map((indicator) => {
              const IconComponent = indicator.icon;
              return (
                <div key={indicator.title} className="p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div
                      className={`w-11 h-11 rounded-xl border inline-flex items-center justify-center mb-4 ${indicator.iconStyle}`}
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-[#0B2545] tracking-tight">
                      {indicator.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {indicator.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-medium text-slate-500 truncate">
                      {indicator.highlights}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        indicator.targetPage === 'quote'
                          ? onOpenCart()
                          : onNavigate(indicator.targetPage)
                      }
                      className="text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] whitespace-nowrap shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded"
                    >
                      {indicator.actionLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
              Product Categories
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              A wide range of pharmaceutical products, sourced from trusted manufacturers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className="group text-left bg-white rounded-xl border border-slate-200 hover:border-[#0284C7] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              >
                <div className="mb-3.5">
                  <CategoryIcon id={category.id} className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-bold text-[#0B2545] group-hover:text-[#0284C7] transition-colors">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {category.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose DK MEDIMART */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
              Why Choose DK MEDIMART
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              We&apos;ve built our reputation on trust, quality, and consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CHOOSE_ITEMS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#F8FAFC] rounded-xl border border-slate-200 hover:border-[#0284C7]/40 hover:bg-white hover:shadow-sm p-6 transition-all duration-150"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border ${item.iconBg}`}
                    >
                      <IconComponent className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-sm font-bold text-[#0B2545]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verified Customer Reviews */}
      <Testimonials />

      {/* Ready to Place Your Order? CTA Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#081F3D] via-[#0B2545] to-[#0D3363] text-white py-14 sm:py-16 border-t border-white/10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(2,132,199,0.22),_transparent_60%)]"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Ready to Place Your Order?
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-300">
            Build your own quote in seconds — select products, calculate shipping, and send your inquiry on WhatsApp.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenCart}
              className="px-7 py-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold whitespace-nowrap shrink-0 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              Build Your Quote
            </button>
            <button
              type="button"
              onClick={() => onNavigate('products')}
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/25 text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Browse Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
