import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search,
  X,
  Check,
  Info,
  MessageCircle,
  FileText,
  Package,
  ShoppingCart,
} from 'lucide-react';
import {
  BRAND_INFO,
  CATEGORIES,
  CURRENCIES,
  PRODUCTS,
  formatCurrencyPrice,
  type CategoryId,
  type CurrencyCode,
  type PackOption,
  type Product,
} from '../data/catalog';
import { CategoryIcon } from './CategoryIcon';

export interface CartItem {
  key: string;
  productId: string;
  productName: string;
  generic: string;
  manufacturer: string;
  packLabel: string;
  unitPrice: number;
  quantity: number;
}

interface ProductsViewProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cart: CartItem[];
  onAddToCart: (product: Product, pack: PackOption) => void;
  onOpenCart: () => void;
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

function buildProductWhatsAppUrl(
  product: Product,
  mode: 'inquiry' | 'quote' | 'bulk'
): string {
  const priceLine = `$${product.unitPrice.toFixed(2)} ${product.unitLabel}${
    product.perPillPrice !== undefined
      ? ` ($${product.perPillPrice.toFixed(2)} per pill)`
      : ''
  }`;

  const message =
    mode === 'bulk'
      ? [
          `Hello ${BRAND_INFO.name}, I need BULK / DROPSHIP wholesale pricing:`,
          `Product: ${product.name}`,
          `Brand: ${product.manufacturer}`,
          `Packaging: ${product.packaging}`,
          `Standard Listed Rate: ${priceLine}`,
          `Bulk Quantity Needed (10+ packs): `,
          `Destination Country: `,
        ].join('\n')
      : mode === 'quote'
      ? [
          `Hello ${BRAND_INFO.name}, I would like to request a quote:`,
          `Product: ${product.name}`,
          `Brand: ${product.manufacturer}`,
          `Packaging: ${product.packaging}`,
          `Listed Rate: ${priceLine}`,
          `Quantity Needed: `,
          `Destination Country: `,
        ].join('\n')
      : [
          `Hello ${BRAND_INFO.name}, I am interested in:`,
          `${product.name} (${product.manufacturer}, ${product.packaging}) — ${priceLine}.`,
          `Please share availability and order steps.`,
        ].join('\n');

  return `${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

const BADGE_STYLES: Record<NonNullable<Product['badge']>, string> = {
  SUBLINGUAL: 'bg-amber-50 text-amber-800 border-amber-200',
  CHEWABLE: 'bg-amber-50 text-amber-800 border-amber-200',
  BRANDED: 'bg-sky-50 text-[#0369A1] border-sky-200',
  PREMIUM: 'bg-rose-50 text-rose-700 border-rose-200',
  GENERIC: 'bg-blue-50 text-blue-700 border-blue-200',
};

export const ProductsView: React.FC<ProductsViewProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cart,
  onAddToCart,
  onOpenCart,
  currency,
  onCurrencyChange,
}) => {
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const addedTimerRef = useRef<number | null>(null);
  const currencyOptions: CurrencyCode[] = ['USD', 'EUR', 'GBP'];

  useEffect(() => {
    return () => {
      if (addedTimerRef.current !== null) {
        window.clearTimeout(addedTimerRef.current);
      }
    };
  }, []);

  const handleAnimatedAddToCart = (product: Product) => {
    onAddToCart(product, product.packs[0]);
    setRecentlyAddedId(product.id);
    if (addedTimerRef.current !== null) {
      window.clearTimeout(addedTimerRef.current);
    }
    addedTimerRef.current = window.setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1400);
  };

  const getProductCartQty = (product: Product) => {
    const key = `${product.id}::${product.packs[0].label}`;
    return cart.find((item) => item.key === key)?.quantity ?? 0;
  };

  const categoryCounts = useMemo(() => {
    const map = new Map<CategoryId, number>();
    for (const p of PRODUCTS) {
      map.set(p.categoryId, (map.get(p.categoryId) ?? 0) + 1);
    }
    return map;
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCat =
        selectedCategory === 'all' || product.categoryId === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        product.name.toLowerCase().includes(q) ||
        product.generic.toLowerCase().includes(q) ||
        product.manufacturer.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-16rem)]">
      {/* Top Banner */}
      <div className="bg-[#0B2545] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Our Products
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
                Search or filter by category. Add products to your quote cart, or message us directly on WhatsApp.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>Multi-Item Quote Form</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search for a product, generic ingredient, or manufacturer..."
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-between sm:justify-end">
              <div
                className="inline-flex items-center rounded-lg bg-slate-100 border border-slate-200 p-0.5"
                role="group"
                aria-label="Estimate currency"
              >
                {currencyOptions.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onCurrencyChange(code)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors ${
                      currency === code
                        ? 'bg-[#0B2545] text-white'
                        : 'text-slate-600 hover:text-[#0B2545]'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium whitespace-nowrap tabular-nums">
                Showing {filteredProducts.length} of {PRODUCTS.length} products
              </div>
            </div>
          </div>

          {/* Bulk / Dropship & Currency Notice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg bg-sky-50/70 border border-sky-200/80 px-3.5 py-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#0284C7] shrink-0" aria-hidden="true" />
              <span>
                <strong className="text-[#0B2545]">Bulk &amp; Dropship Rates:</strong> Ordering 10+ packs? Click any item&apos;s <strong className="text-[#0B2545]">Info (i)</strong> icon or <strong className="text-[#0B2545]">WhatsApp</strong> for wholesale pricing.
              </span>
            </div>
            {currency !== 'USD' && (
              <span className="text-[11px] font-medium text-[#0369A1] whitespace-nowrap">
                Estimated in {CURRENCIES[currency].label} · Invoiced in USD
              </span>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors tabular-nums ${
                selectedCategory === 'all'
                  ? 'bg-[#0B2545] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts.get(cat.id) ?? 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors tabular-nums ${
                    isSelected
                      ? 'bg-[#0284C7] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-base font-semibold text-[#0B2545]">
              No matching pharmaceutical products found
            </p>
            <p className="mt-1.5 text-sm text-slate-500">
              Try clearing your search filter or selecting a different therapeutic category.
            </p>
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
              }}
              className="mt-5 px-5 py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-semibold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-[#0284C7]/45 hover:shadow-md p-5 flex flex-col justify-between gap-4 transition-all duration-150"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-[#0B2545] leading-snug">
                      {product.name}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveProductModal(product)}
                      className="text-slate-400 hover:text-[#0284C7] p-0.5 rounded shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
                      aria-label={`View specifications for ${product.name}`}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-1.5 space-y-0.5 text-xs text-slate-500">
                    <div>
                      Brand: <span className="text-slate-700 font-medium">{product.manufacturer}</span>
                    </div>
                    <div>
                      Packaging: <span className="text-slate-700 font-medium">{product.packaging}</span>
                    </div>
                  </div>

                  {product.badge && (
                    <div className="mt-2">
                      <span
                        className={`inline-block rounded border px-1.5 py-0.5 text-[10px] font-bold tracking-wider ${BADGE_STYLES[product.badge]}`}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  {/* 4x Pricing Row */}
                  <div className="flex items-end justify-between gap-2 mb-3.5 rounded-lg bg-slate-50/90 border border-slate-100 px-3 py-2.5">
                    <div>
                      <div className="text-base sm:text-lg font-bold text-[#0284C7] font-mono tabular-nums leading-tight">
                        {formatCurrencyPrice(product.unitPrice, currency)}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {product.unitLabel}
                      </div>
                    </div>

                    {product.perPillPrice !== undefined && (
                      <div className="text-right">
                        <div className="text-xs sm:text-sm font-bold text-[#0B2545] font-mono tabular-nums leading-tight">
                          {formatCurrencyPrice(product.perPillPrice, currency)}
                        </div>
                        <div className="text-[11px] text-slate-500">per pill</div>
                      </div>
                    )}
                  </div>

                  {/* Direct WhatsApp, Quote & Animated Add to Cart Actions */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={buildProductWhatsAppUrl(product, 'inquiry')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-semibold whitespace-nowrap transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={buildProductWhatsAppUrl(product, 'quote')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-[#0B2545] text-[#0B2545] hover:text-white border border-slate-200 hover:border-[#0B2545] text-xs font-semibold whitespace-nowrap transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>Quote</span>
                      </a>
                    </div>

                    {(() => {
                      const justAdded = recentlyAddedId === product.id;
                      const qtyInCart = getProductCartQty(product);
                      return (
                        <button
                          type="button"
                          onClick={() => handleAnimatedAddToCart(product)}
                          className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
                            justAdded
                              ? 'bg-[#16A34A] text-white ring-2 ring-emerald-500/30 scale-[1.01] shadow-sm'
                              : 'bg-[#0284C7] hover:bg-[#0369A1] text-white'
                          }`}
                        >
                          {justAdded ? (
                            <>
                              <Check
                                className="w-3.5 h-3.5 shrink-0 animate-[cartPop_280ms_ease-out]"
                                aria-hidden="true"
                              />
                              <span>
                                Added to Cart{qtyInCart > 1 ? ` (${qtyInCart})` : '!'}
                              </span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                              <span>
                                {qtyInCart > 0
                                  ? `Add to Cart · In Cart (${qtyInCart})`
                                  : 'Add to Cart'}
                              </span>
                            </>
                          )}
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Product Specification Modal */}
      {activeProductModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-[2px]"
          onClick={() => setActiveProductModal(null)}
        >
          <div
            className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-product-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <CategoryIcon id={activeProductModal.categoryId} className="w-4 h-4 shrink-0" />
                  <span>{activeProductModal.categoryName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProductModal.manufacturer}</span>
                </div>
                <h3
                  id="modal-product-title"
                  className="mt-1 text-xl font-bold text-[#0B2545]"
                >
                  {activeProductModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProductModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                aria-label="Close specifications"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p className="leading-relaxed">{activeProductModal.description}</p>
              <dl className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <dt className="text-slate-400 font-medium">Active Ingredient</dt>
                  <dd className="mt-0.5 text-[#0B2545] font-semibold">
                    {activeProductModal.generic}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-medium">Strength</dt>
                  <dd className="mt-0.5 text-[#0B2545] font-semibold">
                    {activeProductModal.strength}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-medium">Packaging</dt>
                  <dd className="mt-0.5 text-[#0B2545] font-semibold">
                    {activeProductModal.packaging}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-medium">Availability</dt>
                  <dd className="mt-0.5 text-emerald-700 font-semibold inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Ready for Same-Day Dispatch
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500">Export Price ({currency})</div>
                <div className="text-xl font-bold text-[#0B2545] font-mono tabular-nums">
                  {formatCurrencyPrice(activeProductModal.unitPrice, currency)}{' '}
                  <span className="text-xs font-sans font-normal text-slate-500">
                    {activeProductModal.unitLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {(() => {
                  const justAdded = recentlyAddedId === activeProductModal.id;
                  const qtyInCart = getProductCartQty(activeProductModal);
                  return (
                    <button
                      type="button"
                      onClick={() => handleAnimatedAddToCart(activeProductModal)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                        justAdded
                          ? 'bg-[#16A34A] text-white ring-2 ring-emerald-500/30'
                          : 'bg-[#0284C7] hover:bg-[#0369A1] text-white'
                      }`}
                    >
                      {justAdded ? (
                        <>
                          <Check className="w-4 h-4 animate-[cartPop_280ms_ease-out]" aria-hidden="true" />
                          <span>Added{qtyInCart > 1 ? ` (${qtyInCart})` : '!'}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                          <span>Add to Cart{qtyInCart > 0 ? ` (${qtyInCart})` : ''}</span>
                        </>
                      )}
                    </button>
                  );
                })()}
                <a
                  href={buildProductWhatsAppUrl(activeProductModal, 'bulk')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#0B2545] hover:bg-[#13335A] text-white text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors"
                >
                  <Package className="w-4 h-4" aria-hidden="true" />
                  <span>Bulk / Dropship</span>
                </a>
                <a
                  href={buildProductWhatsAppUrl(activeProductModal, 'quote')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Quote on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
