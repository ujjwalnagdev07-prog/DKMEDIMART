import React, { useState } from 'react';
import {
  X,
  Plus,
  Smartphone,
  MessageCircle,
  Lock,
  Check,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { BRAND_INFO, COUNTRIES, FAQ_ITEMS } from '../data/catalog';
import { useFirebase } from '../contexts/FirebaseContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import type { PageView } from './Navbar';

interface PolicyNavProps {
  onNavigate: (page: PageView) => void;
}

export const ShippingPolicyView: React.FC<PolicyNavProps> = ({ onNavigate }) => {
  const [showEmsPrice, setShowEmsPrice] = useState(false);
  const [showItpsPrice, setShowItpsPrice] = useState(false);

  return (
    <div className="bg-white min-h-[calc(100vh-16rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-9">
        <header>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
            Shipping Policy
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Last updated: October 2026
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            Dispatch &amp; Delivery
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            All orders are dispatched the <strong className="font-bold text-[#0B2545]">same day</strong> payment is confirmed. <strong className="font-bold text-[#0B2545]">Tracking details</strong> are shared with you on the day of dispatch.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Standard delivery timelines are <strong className="font-bold text-[#0B2545]">7–15 business days</strong> for most destinations, with the <strong className="font-bold text-[#0B2545]">UK</strong> being our <strong className="font-bold text-[#0B2545]">fastest route</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            Shipping Methods
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            We use the following carriers depending on <strong className="font-bold text-[#0B2545]">product type, quantity, weight, and destination</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>
              <button
                type="button"
                onClick={() => setShowEmsPrice((prev) => !prev)}
                className="text-left hover:text-[#0284C7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded"
                aria-expanded={showEmsPrice}
              >
                <strong className="font-bold text-[#0B2545]">EMS</strong>
                {showEmsPrice ? (
                  <span>
                    {' '}— works worldwide (<strong className="font-bold text-[#0B2545] tabular-nums">$60</strong> shipping charge)
                  </span>
                ) : (
                  <span className="text-slate-500"> — works worldwide</span>
                )}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setShowItpsPrice((prev) => !prev)}
                className="text-left hover:text-[#0284C7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded"
                aria-expanded={showItpsPrice}
              >
                <strong className="font-bold text-[#0B2545]">ITPS</strong>
                {showItpsPrice ? (
                  <span>
                    {' '}— cheaper route, up to <strong className="font-bold text-[#0B2545]">1000 tablets per parcel</strong> (<strong className="font-bold text-[#0B2545] tabular-nums">$35</strong> shipping charge)
                  </span>
                ) : (
                  <span className="text-slate-500"> — cheaper route, up to 1000 tablets per parcel</span>
                )}
              </button>
            </li>
            <li>
              <strong className="font-bold text-[#0B2545]">CMS</strong>
            </li>
            <li>
              <strong className="font-bold text-[#0B2545]">DHL</strong>
            </li>
            <li>
              <strong className="font-bold text-[#0B2545]">FedEx</strong>
            </li>
            <li>
              <strong className="font-bold text-[#0B2545]">Aramex</strong>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            Regions Served
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            We ship to almost every country worldwide — with two exceptions:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
            <li>
              <strong className="font-bold text-[#0B2545]">Pakistan</strong> — not served
            </li>
            <li>
              <strong className="font-bold text-[#0B2545]">Israel</strong> — restricted
            </li>
          </ul>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1">
            <strong className="font-bold text-[#0B2545]">Europe:</strong> Served via{' '}
            <strong className="font-bold text-[#0B2545]">Triangle Shipping</strong> — up to{' '}
            <strong className="font-bold text-[#0B2545]">1000 tablets per parcel</strong>, priced at{' '}
            <strong className="font-bold text-[#0B2545] tabular-nums">€125 per parcel</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            USA Orders
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            A <strong className="font-bold text-[#0B2545]">10% tariff</strong> applies to all orders shipped to the <strong className="font-bold text-[#0B2545]">USA</strong> in accordance with current regulations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            Packaging
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Every parcel is packed using our <strong className="font-bold text-[#0B2545]">specialised packing protocols</strong> — refined over <strong className="font-bold text-[#0B2545]">{BRAND_INFO.experienceYears} years</strong> of export experience.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            Customs
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            International shipments may be subject to <strong className="font-bold text-[#0B2545]">customs inspection</strong> in the destination country. While we take every precaution, customs procedures are ultimately outside our control.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            Tracking
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            <strong className="font-bold text-[#0B2545]">Tracking</strong> is provided the <strong className="font-bold text-[#0B2545]">same day</strong> your order is dispatched. If tracking does not appear active within <strong className="font-bold text-[#0B2545]">3–4 days</strong>, please contact us.
          </p>
          <div className="pt-2 flex flex-wrap gap-2.5">
            <a
              href="https://www.17track.net/en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0B2545] text-xs font-semibold border border-slate-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#0284C7]" aria-hidden="true" />
              <span>Track on 17TRACK (ITPS / Global)</span>
            </a>
            <a
              href="https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0B2545] text-xs font-semibold border border-slate-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#0284C7]" aria-hidden="true" />
              <span>India Post / EMS Tracking</span>
            </a>
            <a
              href="https://www.dhl.com/global-en/home/tracking.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0B2545] text-xs font-semibold border border-slate-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#0284C7]" aria-hidden="true" />
              <span>DHL Express Tracking</span>
            </a>
          </div>
        </section>

        <section className="space-y-3 pt-2 border-t border-slate-200">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            Questions?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            For any shipping-related queries, please reach out on <strong className="font-bold text-[#0B2545]">WhatsApp</strong> at{' '}
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0284C7] hover:underline tabular-nums"
            >
              {BRAND_INFO.phoneDisplay}
            </a>
            ,{' '}
            <strong className="font-bold text-[#0B2545]">Telegram</strong> at{' '}
            <a
              href={BRAND_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0284C7] hover:underline"
            >
              {BRAND_INFO.telegram}
            </a>
            , <strong className="font-bold text-[#0B2545]">Signal</strong> at{' '}
            <a
              href={BRAND_INFO.signalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0284C7] hover:underline"
            >
              {BRAND_INFO.signal}
            </a>
            , or email{' '}
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="font-bold text-[#0284C7] hover:underline"
            >
              {BRAND_INFO.email}
            </a>
            .
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('products')}
              className="px-5 py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-semibold transition-colors"
            >
              Browse Products &amp; Build Quote
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export const ReshipmentPolicyView: React.FC<PolicyNavProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-[calc(100vh-16rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-9">
        <header>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
            Reshipment Policy
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Last updated: October 2026
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            Our Commitment
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            We stand behind every shipment. If your parcel encounters <strong className="font-bold text-[#0B2545]">customs issues</strong>, we offer <strong className="font-bold text-[#0B2545]">reshipment</strong> under the terms below.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            When Reshipment Applies
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700">
            <li>
              If your parcel is <strong className="font-bold text-[#0B2545]">stuck in customs for 10 days</strong> or more without movement, we will offer a reshipment.
            </li>
            <li>
              If your parcel is <strong className="font-bold text-[#0B2545]">returned to us</strong>, we will reship it to you.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            Reshipment Cost
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            For parcels stuck in customs, the customer pays approximately <strong className="font-bold text-[#0B2545]">80% of the order value</strong> for the reshipment.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            For parcels returned to us, the customer pays only the <strong className="font-bold text-[#0B2545]">shipping fee</strong> for the reshipment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            What Is Eligible
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Reshipment applies primarily to <strong className="font-bold text-[#0B2545]">generic products and tablets</strong>.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            <strong className="font-bold text-[#0B2545]">Not eligible for reshipment:</strong> High-value products priced above <strong className="font-bold text-[#0B2545]">$100 per unit</strong> (for example, Mounjaro, Erdanat, and other premium medications).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            What We Cannot Cover
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700">
            <li>
              <strong className="font-bold text-[#0B2545]">Customs seizure decisions</strong> — these are made by your local authorities and are beyond our control.
            </li>
            <li>
              Delays caused by <strong className="font-bold text-[#0B2545]">local postal networks or strikes</strong>.
            </li>
            <li>
              <strong className="font-bold text-[#0B2545]">Refunds after dispatch</strong> — we offer reshipment, not refunds.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            How to Request Reshipment
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            If your parcel qualifies, simply message us on <strong className="font-bold text-[#0B2545]">WhatsApp</strong> at{' '}
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0284C7] hover:underline tabular-nums"
            >
              {BRAND_INFO.phoneDisplay}
            </a>{' '}
            or <strong className="font-bold text-[#0B2545]">Telegram</strong> at{' '}
            <a
              href={BRAND_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0284C7] hover:underline"
            >
              {BRAND_INFO.telegram}
            </a>{' '}
            / <strong className="font-bold text-[#0B2545]">Signal</strong> at{' '}
            <a
              href={BRAND_INFO.signalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0284C7] hover:underline"
            >
              {BRAND_INFO.signal}
            </a>{' '}
            with your <strong className="font-bold text-[#0B2545]">order details and tracking number</strong>.
          </p>
        </section>

        <section className="space-y-3 pt-2 border-t border-slate-200">
          <h2 className="text-xl font-bold text-[#0B2545] tracking-tight">
            Our Promise
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            We are committed to building <strong className="font-bold text-[#0B2545]">long-term relationships</strong>. If you ever face an issue, please reach out.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 rounded-lg bg-[#0B2545] hover:bg-[#13335A] text-white text-sm font-semibold transition-colors"
            >
              Contact Support
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export const FaqView: React.FC<PolicyNavProps> = ({ onNavigate }) => {
  // All FAQs collapsed by default; clicking + expands the answer
  const [openIndices, setOpenIndices] = useState<Record<number, boolean>>({});

  const toggleItem = (idx: number) => {
    setOpenIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="bg-white min-h-[calc(100vh-16rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-slate-500">
            Quick answers to the questions we hear most often.
          </p>
        </header>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = Boolean(openIndices[idx]);
            return (
              <div
                key={item.question}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#0B2545]">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <X className="w-4 h-4 text-[#0284C7] shrink-0" aria-hidden="true" />
                  ) : (
                    <Plus className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => onNavigate('quote')}
            className="px-6 py-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-semibold transition-colors"
          >
            Build Your Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const { user } = useFirebase();
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [note, setNote] = useState('');
  const [canCall, setCanCall] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [sentWhatsappUrl, setSentWhatsappUrl] = useState('');

  const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );

  const channels = [
    {
      label: 'WhatsApp',
      value: BRAND_INFO.phoneDisplay,
      href: BRAND_INFO.whatsappUrl,
      actionLabel: 'Open WhatsApp',
      isExternal: true,
      icon: Smartphone,
      iconColor: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      label: 'Telegram',
      value: BRAND_INFO.telegram,
      href: BRAND_INFO.telegramUrl,
      actionLabel: 'Open Telegram',
      isExternal: true,
      icon: TelegramIcon,
      iconColor: 'text-[#229ED9] bg-sky-50 border-sky-200',
    },
    {
      label: 'iMessage',
      value: BRAND_INFO.phoneDisplay,
      href: BRAND_INFO.imessageUrl,
      actionLabel: 'Open iMessage',
      isExternal: false,
      icon: MessageCircle,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      label: 'Signal',
      value: BRAND_INFO.signal,
      href: BRAND_INFO.signalUrl,
      actionLabel: 'Open Signal',
      isExternal: true,
      icon: Lock,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
    },
  ];

  const handleCountryChange = (val: string) => {
    setCountry(val);
    const match = COUNTRIES.find((c) => c.name === val);
    if (match && match.code) {
      setDialCode(match.code);
    }
  };

  const handleCopy = async (label: string, val: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopiedChannel(label);
      setTimeout(() => setCopiedChannel(null), 2000);
    } catch {
      setCopiedChannel(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!country) {
      setError('Please select your country.');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!product.trim()) {
      setError('Please enter the product name you are looking for.');
      return;
    }
    if (!quantity.trim()) {
      setError('Please specify the required quantity.');
      return;
    }

    if (user && user.emailVerified) {
      try {
        await addDoc(collection(db, 'inquiries'), {
          userId: user.uid,
          name: name.trim().slice(0, 100),
          country: country.slice(0, 80),
          phone: `+${dialCode} ${phone.trim()}`.trim().slice(0, 35),
          email: email.trim().slice(0, 150),
          product: product.trim().slice(0, 150),
          quantity: quantity.trim().slice(0, 80),
          note: note.trim().slice(0, 600),
          canCall,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        try {
          handleFirestoreError(err, OperationType.CREATE, 'inquiries');
        } catch {
          // Handled cleanly
        }
      }
    }

    const inquiryMessage = [
      `${BRAND_INFO.name} — Product Inquiry`,
      '----------------------------------',
      `Product: ${product.trim()}`,
      `Quantity: ${quantity.trim()}`,
      `Name: ${name.trim()}`,
      `Country: ${country}`,
      `Phone: +${dialCode} ${phone.trim()}`.trim(),
      email.trim() ? `Email: ${email.trim()}` : '',
      note.trim() ? `Note: ${note.trim()}` : '',
      `Can call: ${canCall ? 'Yes' : 'No'}`,
    ]
      .filter(Boolean)
      .join('\n');

    const waUrl = `${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(inquiryMessage)}`;
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSentWhatsappUrl(waUrl);
    setSent(true);
    setName('');
    setCountry('');
    setDialCode('');
    setPhone('');
    setEmail('');
    setProduct('');
    setQuantity('');
    setNote('');
    setCanCall(false);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-16rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-slate-500">
            Reach us on any channel — or send us an inquiry using the form below. Email:{' '}
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="font-semibold text-[#0284C7] hover:underline"
            >
              {BRAND_INFO.email}
            </a>
          </p>
        </header>

        {/* 4 Channel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((ch) => {
            const IconComponent = ch.icon;
            return (
              <div
                key={ch.label}
                className="bg-white rounded-xl border border-slate-200 hover:border-[#0284C7] p-5 text-center transition-colors flex flex-col items-center justify-between"
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center mx-auto mb-3 ${ch.iconColor}`}
                  >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="text-sm font-bold text-[#0B2545]">{ch.label}</div>
                  <a
                    href={ch.href}
                    {...(ch.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mt-1 inline-block text-xs font-semibold text-[#0284C7] hover:underline tabular-nums"
                  >
                    {ch.value}
                  </a>
                </div>

                <div className="mt-3 flex flex-col items-center gap-1.5">
                  <a
                    href={ch.href}
                    {...(ch.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] hover:underline"
                  >
                    <span>{ch.actionLabel}</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(ch.label, ch.value)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded px-1.5 py-0.5"
                    title={`Click to copy ${ch.label}`}
                  >
                    {copiedChannel === ch.label ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Click to copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Send an Inquiry Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#0B2545]">Send an Inquiry</h2>
          <p className="mt-1 text-sm text-slate-500 mb-6">
            Fill in the details below and we&apos;ll respond within a few hours.
          </p>

          {sent ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">
                Inquiry Sent Successfully
              </h3>
              <p className="text-sm text-slate-600">
                Your inquiry is ready for WhatsApp. Click below if WhatsApp did not open automatically to send your message directly to our export team ({BRAND_INFO.phoneDisplay}).
              </p>
              <div className="flex flex-wrap justify-center gap-2.5 pt-1">
                {sentWhatsappUrl && (
                  <a
                    href={sentWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open Inquiry in WhatsApp</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="px-4 py-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                />
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

              <div>
                <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <div className="w-20 px-3 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-sm text-slate-600 flex items-center justify-center font-mono tabular-nums shrink-0">
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

              <div>
                <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                  Product *
                </label>
                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                  Quantity *
                </label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                  Note
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any additional information..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <label className="inline-flex items-center gap-2.5 text-sm text-[#0B2545] cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={canCall}
                  onChange={(e) => setCanCall(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
                />
                <span>You can call me</span>
              </label>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Inquiry on WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
