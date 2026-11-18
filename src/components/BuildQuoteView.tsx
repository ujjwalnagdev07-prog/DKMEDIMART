import React, { useEffect, useMemo, useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Check,
  Copy,
  Search,
  MessageCircle,
} from 'lucide-react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import {
  BRAND_INFO,
  COUNTRIES,
  CURRENCIES,
  PAYMENT_METHODS,
  PRODUCTS,
  SHIPPING_RATES,
  formatCurrencyPrice,
  type CurrencyCode,
  type PackOption,
  type Product,
} from '../data/catalog';
import { useFirebase } from '../contexts/FirebaseContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import type { CartItem } from './ProductsView';
import type { PageView } from './Navbar';

interface BuildQuoteViewProps {
  cart: CartItem[];
  onAddToCart: (product: Product, pack: PackOption) => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
  onNavigate: (page: PageView) => void;
  currency: CurrencyCode;
}

function estimateTabletEquivalent(packLabel: string): number {
  const lower = packLabel.toLowerCase();
  const multiMatch = lower.match(/(\d+)\s*x\s*(\d+)/);
  if (
    multiMatch &&
    !/(vial|ampoule|pen|tube|sachet|inj|ml)/i.test(lower)
  ) {
    return parseInt(multiMatch[1], 10) * parseInt(multiMatch[2], 10);
  }
  const tabMatch = lower.match(
    /(\d+)\s*(?:tabs?|tablets?|caps?|capsules?|pills?)/i
  );
  if (tabMatch) {
    return parseInt(tabMatch[1], 10);
  }
  // Per policy: For vials, pens, bottles and other non-tablet forms, each unit counts as 50 tablets.
  const unitMatch = lower.match(
    /^(\d+)\s*(?:pens?|vials?|ampoules?|tubes?|sachets?|bottles?)/i
  );
  const unitCount = unitMatch ? parseInt(unitMatch[1], 10) : 1;
  return unitCount * 50;
}

function triggerWhatsAppLink(url: string) {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const BuildQuoteView: React.FC<BuildQuoteViewProps> = ({
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
  currency,
}) => {
  const { user, authLoading, signInWithGoogle } = useFirebase();
  const [savedQuotes, setSavedQuotes] = useState<
    {
      id: string;
      refId: string;
      country: string;
      shippingMethod: string;
      paymentMethod: string;
      grandTotal: number;
      itemCount: number;
      itemsSummary: string;
    }[]
  >([]);

  const [productPickerQuery, setProductPickerQuery] = useState('');
  const [customItemsNote, setCustomItemsNote] = useState('');

  const [fullName, setFullName] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');

  const [shippingMethod, setShippingMethod] = useState<'ems' | 'itps' | 'triangle' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('Wise');

  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [submittingQuote, setSubmittingQuote] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<{
    refId: string;
    total: number;
    methodName: string;
    countryName: string;
    savedToCloud: boolean;
    whatsappUrl: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      if (!fullName && user.displayName) setFullName(user.displayName);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user, fullName, email]);

  useEffect(() => {
    if (!user) {
      setSavedQuotes([]);
      return;
    }
    const q = query(
      collection(db, 'quotes'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setSavedQuotes(
          snap.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              refId: String(data.refId ?? ''),
              country: String(data.country ?? ''),
              shippingMethod: String(data.shippingMethod ?? 'itps'),
              paymentMethod: String(data.paymentMethod ?? ''),
              grandTotal: Number(data.grandTotal ?? 0),
              itemCount: Number(data.itemCount ?? 0),
              itemsSummary: String(data.itemsSummary ?? ''),
            };
          })
        );
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.LIST, 'quotes');
        } catch {
          // Handled cleanly
        }
      }
    );
    return () => unsub();
  }, [user]);

  const pickerMatches = useMemo(() => {
    const q = productPickerQuery.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.generic.toLowerCase().includes(q) ||
        p.manufacturer.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [productPickerQuery]);

  const handleCountryChange = (selectedName: string) => {
    setCountry(selectedName);
    const found = COUNTRIES.find((c) => c.name === selectedName);
    if (found) {
      setDialCode(found.code);
    }
  };

  const subtotal = useMemo(
    () =>
      Math.round(
        cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) * 100
      ) / 100,
    [cart]
  );

  const totalTabletEquivalent = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + estimateTabletEquivalent(item.packLabel) * item.quantity,
        0
      ),
    [cart]
  );

  const hasAnyItems = cart.length > 0 || customItemsNote.trim().length > 0;
  const selectedCountryObj = COUNTRIES.find((c) => c.name === country);
  const isUsa = country === 'United States';
  const isEurope = Boolean(selectedCountryObj?.isEurope);

  // EMS = $60, ITPS = $35/parcel, Europe Triangle = €125/parcel (~$136 USD) up to 1000 tablets per parcel
  const parcelCount =
    !hasAnyItems || !shippingMethod
      ? 0
      : shippingMethod === 'itps' || shippingMethod === 'triangle'
      ? Math.max(1, Math.ceil(totalTabletEquivalent / 1000))
      : 1;

  const shippingCharge =
    !hasAnyItems || !shippingMethod
      ? 0
      : shippingMethod === 'ems'
      ? SHIPPING_RATES.ems.price
      : shippingMethod === 'itps'
      ? SHIPPING_RATES.itps.price * parcelCount
      : SHIPPING_RATES.triangle.price * parcelCount;

  const usaTariff = isUsa && cart.length > 0 ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const grandTotal = Math.round((subtotal + shippingCharge + usaTariff) * 100) / 100;

  const buildQuoteText = (refId?: string) => {
    const itemsText = cart.map(
      (item, idx) =>
        `${idx + 1}. ${item.productName} (${item.packLabel}) x ${item.quantity} = $${(
          item.unitPrice * item.quantity
        ).toFixed(2)}`
    );
    const methodLabel =
      shippingMethod === 'ems'
        ? `EMS ($${SHIPPING_RATES.ems.price})`
        : shippingMethod === 'itps'
        ? `ITPS ($${SHIPPING_RATES.itps.price} x ${parcelCount} parcel = $${shippingCharge})`
        : shippingMethod === 'triangle'
        ? `Europe Triangle (€${SHIPPING_RATES.triangle.eurPrice} x ${parcelCount} parcel / ~$${shippingCharge} USD)`
        : 'Not selected yet';

    return [
      `${BRAND_INFO.name} — Quote Inquiry${refId ? ` (#${refId})` : ''}`,
      '----------------------------------',
      ...itemsText,
      customItemsNote.trim() ? `Requested Products / Notes: ${customItemsNote.trim()}` : '',
      `Products Subtotal: $${subtotal.toFixed(2)} USD`,
      `Shipping Method: ${methodLabel}`,
      isUsa ? `USA 10% Tariff: $${usaTariff.toFixed(2)}` : '',
      `Estimated Total: $${grandTotal.toFixed(2)} USD${
        currency !== 'USD' ? ` (~${formatCurrencyPrice(grandTotal, currency)} ${currency})` : ''
      }`,
      `Payment Method: ${paymentMethod}`,
      '--- Customer Details ---',
      fullName ? `Name: ${fullName}` : '',
      phone ? `Phone: +${dialCode} ${phone}`.trim() : '',
      country ? `Country: ${country}` : '',
      houseNumber || street || city || zipCode
        ? `Address: ${[houseNumber, street, city, zipCode].filter(Boolean).join(', ')}`
        : '',
      email ? `Email: ${email}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildQuoteText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (cart.length === 0 && customItemsNote.trim().length < 2) {
      setErrorMsg(
        'Please select at least one product above or write the products you want in your quote.'
      );
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg('Please enter your Full Name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your Phone Number.');
      return;
    }
    if (!country) {
      setErrorMsg('Please select your Country.');
      return;
    }
    if (!houseNumber.trim() || !street.trim() || !city.trim() || !zipCode.trim()) {
      setErrorMsg('Please complete all required address fields.');
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!shippingMethod) {
      setErrorMsg('Please select a shipping method (EMS, ITPS, or Europe Triangle) in Step 3.');
      return;
    }

    const refId = `DK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const inquiryWhatsappUrl = `${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(
      buildQuoteText(refId)
    )}`;
    let savedToCloud = false;

    if (user && user.emailVerified) {
      setSubmittingQuote(true);
      try {
        const cartSummary = cart
          .map((item) => `${item.productName} (${item.packLabel}) x ${item.quantity}`)
          .join('; ');
        const combinedSummary = [cartSummary, customItemsNote.trim()]
          .filter(Boolean)
          .join(' | ')
          .slice(0, 1500);
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const addressSummary = `${houseNumber.trim()}, ${street.trim()}, ${city.trim()}, ${zipCode.trim()}`.slice(
          0,
          250
        );
        await addDoc(collection(db, 'quotes'), {
          userId: user.uid,
          refId: refId.slice(0, 40),
          fullName: fullName.trim().slice(0, 100),
          phone: `+${dialCode} ${phone.trim()}`.trim().slice(0, 35),
          country: country.slice(0, 80),
          addressSummary,
          email: email.trim().slice(0, 150),
          shippingMethod,
          paymentMethod: paymentMethod.slice(0, 50),
          itemCount: Math.max(1, itemCount),
          itemsSummary: combinedSummary || 'Export order inquiry',
          subtotal,
          shippingCharge,
          usaTariff,
          grandTotal,
          createdAt: serverTimestamp(),
        });
        savedToCloud = true;
      } catch (error) {
        try {
          handleFirestoreError(error, OperationType.CREATE, 'quotes');
        } catch {
          // Continue sending inquiry to WhatsApp even if cloud write fails
        }
      } finally {
        setSubmittingQuote(false);
      }
    }

    triggerWhatsAppLink(inquiryWhatsappUrl);

    setSubmittedQuote({
      refId,
      total: grandTotal,
      methodName:
        shippingMethod === 'ems'
          ? 'EMS'
          : shippingMethod === 'itps'
          ? 'ITPS'
          : 'Europe Triangle',
      countryName: country,
      savedToCloud,
      whatsappUrl: inquiryWhatsappUrl,
    });
    onClearCart();
    setCustomItemsNote('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(buildQuoteText())}`;

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-16rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
              Cart &amp; WhatsApp Quote Inquiry
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-slate-500">
              Select products below, enter your shipping details, and send your inquiry directly to us on WhatsApp.
            </p>
          </div>
          {!user ? (
            <button
              type="button"
              disabled={authLoading}
              onClick={signInWithGoogle}
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:border-[#0284C7] text-xs font-semibold text-[#0B2545] whitespace-nowrap shrink-0 transition-colors"
            >
              {authLoading ? 'Signing in...' : 'Sign in with Google to Save Quotes'}
            </button>
          ) : (
            <div className="text-xs text-slate-600 font-medium">
              Signed in as <strong className="text-[#0B2545]">{user.displayName || user.email}</strong>
            </div>
          )}
        </header>

        {submittedQuote ? (
          <div className="bg-white rounded-xl border border-emerald-200 p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#0B2545]">
              Quote Inquiry #{submittedQuote.refId} Ready for WhatsApp
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your quote inquiry for <strong className="font-mono text-[#0B2545]">{formatCurrencyPrice(submittedQuote.total, currency)} {currency}</strong> via{' '}
              <strong>{submittedQuote.methodName}</strong> to <strong>{submittedQuote.countryName}</strong> ({paymentMethod}) is ready. Click below if WhatsApp didn&apos;t open automatically to send your inquiry directly to <strong>{BRAND_INFO.phoneDisplay}</strong>.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={submittedQuote.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open Inquiry in WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setSubmittedQuote(null);
                  onNavigate('products');
                }}
                className="px-5 py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-semibold"
              >
                Browse Products
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmittedQuote(null);
                  onNavigate('home');
                }}
                className="px-5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50"
              >
                Return Home
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Your Products */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#0284C7] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#0B2545]">
                    Your Products
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="text-xs font-semibold text-[#0284C7] hover:underline whitespace-nowrap"
                >
                  Browse Full Catalog
                </button>
              </div>

              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Search and select medicines below to calculate your quote, or type your product request directly before sending your inquiry on WhatsApp.
              </p>

              {/* Inline Product Selector */}
              <div className="mt-4">
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={productPickerQuery}
                    onChange={(e) => setProductPickerQuery(e.target.value)}
                    placeholder="Search medicine by name, salt, or brand (e.g. Cenforce, Modalert, Retatrutide)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                {productPickerQuery.trim() && (
                  <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50/60 divide-y divide-slate-200 max-h-72 overflow-y-auto">
                    {pickerMatches.length === 0 ? (
                      <div className="px-4 py-3 text-xs text-slate-500">
                        No exact catalog match for &quot;{productPickerQuery}&quot;. You can still write it in the custom product note below.
                      </div>
                    ) : (
                      pickerMatches.map((prod) => (
                        <div
                          key={prod.id}
                          className="px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-white transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-[#0B2545] truncate">
                              {prod.name}
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              {prod.manufacturer} · {prod.packaging} · {prod.generic}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-mono text-sm font-bold text-[#0284C7] tabular-nums">
                              {formatCurrencyPrice(prod.unitPrice, currency)}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                onAddToCart(prod, prod.packs[0]);
                                setProductPickerQuery('');
                              }}
                              className="px-3 py-1.5 rounded-md bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold transition-colors"
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="py-8 text-center space-y-2 border-t border-slate-100 mt-5">
                  <ShoppingCart
                    className="w-8 h-8 text-slate-300 mx-auto"
                    aria-hidden="true"
                  />
                  <div className="text-sm font-semibold text-slate-600">
                    No catalog products selected yet.
                  </div>
                  <p className="text-xs text-slate-500">
                    Use the search bar above to select medicines, or describe them in the box below.
                  </p>
                </div>
              ) : (
                <div className="mt-5 divide-y divide-slate-200 border-t border-slate-200">
                  {cart.map((item) => (
                    <div
                      key={item.key}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="text-sm font-bold text-[#0B2545]">
                          {item.productName}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {item.packLabel} · {formatCurrencyPrice(item.unitPrice, currency)} per unit · {item.manufacturer}
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="inline-flex items-center gap-1 bg-slate-100 rounded-md p-0.5 border border-slate-200">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.key, -1)}
                            className="w-7 h-7 flex items-center justify-center rounded bg-white text-[#0B2545] hover:bg-slate-50"
                            aria-label={`Decrease ${item.productName}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.key, 1)}
                            className="w-7 h-7 flex items-center justify-center rounded bg-white text-[#0B2545] hover:bg-slate-50"
                            aria-label={`Increase ${item.productName}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="w-20 text-right font-mono text-sm font-bold text-[#0B2545] tabular-nums">
                          {formatCurrencyPrice(item.unitPrice * item.quantity, currency)}
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded"
                          aria-label={`Remove ${item.productName}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Optional manual inquiry box */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                  Additional Products / Custom Quantity Request (optional)
                </label>
                <textarea
                  rows={2}
                  value={customItemsNote}
                  onChange={(e) => setCustomItemsNote(e.target.value)}
                  placeholder="Write any additional product names, strengths, or custom quantities for your WhatsApp inquiry..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                />
              </div>
            </section>

            {/* Step 2: Your Details */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#0284C7] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#0B2545]">
                    Your Details
                  </h2>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  So we know who we&apos;re speaking with.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                    Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <div className="w-16 px-2.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-sm text-slate-600 flex items-center justify-center font-mono tabular-nums shrink-0">
                      +{dialCode || ''}
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your number"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                  Country *
                </label>
                <select
                  value={country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#0284C7]"
                >
                  <option value="">Select country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-[11px] text-slate-500">
                  We ship worldwide — except <strong className="text-slate-700">Pakistan</strong> (not served) and <strong className="text-slate-700">Israel</strong> (restricted).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                    House Name / Number *
                  </label>
                  <input
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                    Street / Area *
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                  Email (optional — used to contact you)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                />
              </div>
            </section>

            {/* Step 3: Choose Shipping Method */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#0284C7] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#0B2545]">
                    Choose Shipping Method
                  </h2>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Rates are calculated automatically from your total tablet count. For vials, pens, bottles and other non-tablet forms, each unit counts as 50 tablets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setShippingMethod((prev) => (prev === 'ems' ? null : 'ems'))
                  }
                  aria-pressed={shippingMethod === 'ems'}
                  className={`px-4 py-3.5 rounded-lg border text-sm font-bold text-center transition-colors ${
                    shippingMethod === 'ems'
                      ? 'border-[#0284C7] bg-sky-50/70 text-[#0B2545]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>{SHIPPING_RATES.ems.label}</div>
                  {shippingMethod === 'ems' && (
                    <div className="mt-1 text-xs font-mono font-bold text-[#0284C7] tabular-nums">
                      ${SHIPPING_RATES.ems.price} shipping charge
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShippingMethod((prev) => (prev === 'itps' ? null : 'itps'))
                  }
                  aria-pressed={shippingMethod === 'itps'}
                  className={`px-4 py-3.5 rounded-lg border text-sm font-bold text-center transition-colors ${
                    shippingMethod === 'itps'
                      ? 'border-[#0284C7] bg-sky-50/70 text-[#0B2545]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>{SHIPPING_RATES.itps.label}</div>
                  {shippingMethod === 'itps' && (
                    <div className="mt-1 text-xs font-mono font-bold text-[#0284C7] tabular-nums">
                      ${SHIPPING_RATES.itps.price} per parcel
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShippingMethod((prev) => (prev === 'triangle' ? null : 'triangle'))
                  }
                  aria-pressed={shippingMethod === 'triangle'}
                  className={`px-4 py-3.5 rounded-lg border text-sm font-bold text-center transition-colors ${
                    shippingMethod === 'triangle'
                      ? 'border-[#0284C7] bg-sky-50/70 text-[#0B2545]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>{SHIPPING_RATES.triangle.label}</div>
                  {shippingMethod === 'triangle' && (
                    <div className="mt-1 text-xs font-mono font-bold text-[#0284C7] tabular-nums">
                      €{SHIPPING_RATES.triangle.eurPrice} per parcel (~${SHIPPING_RATES.triangle.price})
                    </div>
                  )}
                </button>
              </div>

              <div className="rounded-lg bg-slate-100 px-4 py-2.5 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
                <span>
                  Estimated tablet count:{' '}
                  <strong className="font-mono text-[#0B2545] tabular-nums">
                    {totalTabletEquivalent}
                  </strong>
                  {(shippingMethod === 'itps' || shippingMethod === 'triangle') && hasAnyItems && (
                    <> · {parcelCount} parcel(s)</>
                  )}
                </span>
                {shippingMethod ? (
                  <span className="font-mono font-bold text-[#0B2545] tabular-nums">
                    Shipping Charge: {formatCurrencyPrice(shippingCharge, currency)}
                  </span>
                ) : (
                  <span className="text-slate-500 font-medium">
                    Click a shipping option above to view shipping charge
                  </span>
                )}
              </div>

              {isEurope && (
                <p className="text-xs text-slate-600">
                  <strong className="text-[#0B2545]">Europe Note:</strong> Europe can also be served via <strong className="text-[#0B2545]">Triangle Shipping</strong> — up to 1000 tablets per parcel at <strong className="text-[#0B2545]">€125 per parcel</strong>.
                </p>
              )}
              {isUsa && (
                <p className="text-xs text-slate-600">
                  <strong className="text-[#0B2545]">USA Orders:</strong> A <strong className="text-[#0B2545]">10% tariff</strong> applies to all orders shipped to the USA in accordance with current regulations.
                </p>
              )}
            </section>

            {/* Step 4: How would you like to pay? */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#0284C7] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#0B2545]">
                    How would you like to pay?
                  </h2>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Pick your preferred method — our representative will send you the details.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {PAYMENT_METHODS.map((method) => {
                  const isActive = paymentMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`px-3 py-2.5 rounded-lg border text-xs sm:text-sm font-semibold text-center whitespace-nowrap transition-colors ${
                        isActive
                          ? 'border-[#0284C7] bg-sky-50/70 text-[#0B2545]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {method}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Total Summary & Submit */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Products Subtotal</span>
                  <span className="font-mono font-semibold text-[#0B2545] tabular-nums">
                    {formatCurrencyPrice(subtotal, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>
                    {shippingMethod === 'ems'
                      ? 'Shipping (EMS — $60)'
                      : shippingMethod === 'itps'
                      ? `Shipping (ITPS — $35 × ${parcelCount || 1})`
                      : shippingMethod === 'triangle'
                      ? `Shipping (Europe Triangle — €125 × ${parcelCount || 1})`
                      : 'Shipping'}
                  </span>
                  {shippingMethod ? (
                    <span className="font-mono font-semibold text-[#0B2545] tabular-nums">
                      {formatCurrencyPrice(shippingCharge, currency)}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-500">
                      Select shipping method
                    </span>
                  )}
                </div>
                {isUsa && (
                  <div className="flex justify-between text-slate-600">
                    <span>USA Import Tariff (10%)</span>
                    <span className="font-mono font-semibold text-[#0B2545] tabular-nums">
                      {formatCurrencyPrice(usaTariff, currency)}
                    </span>
                  </div>
                )}
                <div className="pt-2.5 border-t border-slate-200 flex justify-between text-base font-bold text-[#0B2545]">
                  <span>Estimated Total ({currency})</span>
                  <span className="font-mono tabular-nums">
                    {formatCurrencyPrice(grandTotal, currency)}
                  </span>
                </div>
                {currency !== 'USD' && (
                  <p className="text-[11px] text-slate-500 text-right">
                    Converted estimate in {CURRENCIES[currency].label} — USD total: ${grandTotal.toFixed(2)}
                  </p>
                )}
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  disabled={submittingQuote}
                  className="w-full py-3.5 px-4 rounded-lg bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-60 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {submittingQuote
                      ? 'Preparing WhatsApp Inquiry...'
                      : `Send Quote Inquiry on WhatsApp (${formatCurrencyPrice(grandTotal, currency)})`}
                  </span>
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-lg bg-[#0B2545] hover:bg-[#13335A] text-white text-xs font-semibold text-center transition-colors"
                  >
                    Quick Chat on WhatsApp ({BRAND_INFO.phoneDisplay})
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="py-2.5 px-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied Summary</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Quote Summary</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>
          </form>
        )}

        {/* Saved Quotes History for Authenticated Users */}
        {user && savedQuotes.length > 0 && (
          <section className="mt-8 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-[#0B2545]">
              Your Saved Quote History
            </h2>
            <div className="divide-y divide-slate-200">
              {savedQuotes.map((sq) => (
                <div
                  key={sq.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#0B2545]">
                      <span className="font-mono">#{sq.refId}</span>
                      <span aria-hidden="true">·</span>
                      <span>{sq.country}</span>
                      <span aria-hidden="true">·</span>
                      <span className="uppercase">{sq.shippingMethod}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {sq.itemsSummary}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-mono font-bold text-[#0B2545] tabular-nums">
                      ${sq.grandTotal.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await deleteDoc(doc(db, 'quotes', sq.id));
                        } catch (error) {
                          try {
                            handleFirestoreError(error, OperationType.DELETE, `quotes/${sq.id}`);
                          } catch {
                            // Handled
                          }
                        }
                      }}
                      className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50"
                      aria-label={`Delete saved quote ${sq.refId}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
