export const BRAND_INFO = {
  name: 'DK MEDIMART',
  phoneDisplay: '+91 8010814430',
  phoneRaw: '918010814430',
  whatsappUrl: 'https://wa.me/918010814430',
  telegram: '@dkmedimart',
  telegramUrl: 'https://t.me/dkmedimart',
  signal: '@dkmedimart.76',
  signalUrl: 'https://signal.me/#p/+918010814430',
  imessageUrl: 'sms:+918010814430',
  email: 'dkmedimart208@gmail.com',
  experienceYears: '16+',
  dailyOrders: '1000+',
};

export const SHIPPING_METHODS = ['EMS', 'ITPS', 'CMS', 'DHL', 'FedEx', 'Aramex'];

export const SHIPPING_RATES = {
  ems: { id: 'ems', name: 'EMS', label: 'EMS — works everywhere', price: 60 },
  itps: {
    id: 'itps',
    name: 'ITPS',
    label: 'ITPS — cheaper, up to 1000 tablets per parcel',
    price: 35,
  },
  triangle: {
    id: 'triangle',
    name: 'Europe Triangle Shipping',
    label: 'Europe Triangle — EU route, up to 1000 tablets per parcel',
    eurPrice: 125,
    price: 136,
  },
} as const;

export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export const CURRENCIES: Record<
  CurrencyCode,
  { code: CurrencyCode; symbol: string; rate: number; label: string }
> = {
  USD: { code: 'USD', symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)' },
};

export function formatCurrencyPrice(amountUsd: number, currency: CurrencyCode): string {
  const cfg = CURRENCIES[currency];
  const converted = Math.round(amountUsd * cfg.rate * 100) / 100;
  return `${cfg.symbol}${converted.toFixed(2)}`;
}

export const PAYMENT_METHODS = [
  'Wise',
  'Remitly',
  'Bitcoin / Crypto',
  'Western Union',
  'MoneyGram',
  'Bank Transfer',
  'Revolut',
] as const;

export const COUNTRIES = [
  { name: 'United States', code: '1' },
  { name: 'United Kingdom', code: '44' },
  { name: 'Australia', code: '61' },
  { name: 'Canada', code: '1' },
  { name: 'Germany (EU)', code: '49', isEurope: true },
  { name: 'France (EU)', code: '33', isEurope: true },
  { name: 'Netherlands (EU)', code: '31', isEurope: true },
  { name: 'Spain (EU)', code: '34', isEurope: true },
  { name: 'Italy (EU)', code: '39', isEurope: true },
  { name: 'Other European Union', code: '', isEurope: true },
  { name: 'New Zealand', code: '64' },
  { name: 'Singapore', code: '65' },
  { name: 'United Arab Emirates', code: '971' },
  { name: 'Japan', code: '81' },
  { name: 'Other International', code: '' },
];

export type CategoryId =
  | 'ed-medicine'
  | 'sleep-aid'
  | 'pain-management'
  | 'moda-armoda'
  | 'trt-medicine'
  | 'anti-acne'
  | 'anti-cancer'
  | 'hair-growth'
  | 'weight-loss'
  | 'muscle-performance'
  | 'ivermectin-parasite'
  | 'sirolimus'
  | 'antibiotics'
  | 'adhd-medicine';

export type ProductBadge = 'SUBLINGUAL' | 'CHEWABLE' | 'BRANDED' | 'PREMIUM' | 'GENERIC';

export interface Category {
  id: CategoryId;
  name: string;
  subtitle: string;
}

export interface PackOption {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  generic: string;
  categoryId: CategoryId;
  categoryName: string;
  manufacturer: string;
  packaging: string;
  unitLabel: string;
  unitPrice: number;
  perPillPrice?: number;
  badge?: ProductBadge;
  strength: string;
  form: string;
  packs: PackOption[];
  description: string;
  inStock: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: 'ed-medicine',
    name: 'ED Medicine',
    subtitle: 'Sildenafil, Tadalafil, Vardenafil, Dapoxetine',
  },
  {
    id: 'sleep-aid',
    name: 'Sleep Aid',
    subtitle: 'Zopiclone, Melatonin, Eszopiclone',
  },
  {
    id: 'pain-management',
    name: 'Pain Management',
    subtitle: 'Pregabalin, Gabapentin, Tapentadol',
  },
  {
    id: 'moda-armoda',
    name: 'Moda & Armoda',
    subtitle: 'Modafinil, Armodafinil',
  },
  {
    id: 'trt-medicine',
    name: 'TRT Medicine',
    subtitle: 'Testosterone, Enclomiphene',
  },
  {
    id: 'anti-acne',
    name: 'Anti Acne',
    subtitle: 'Isotretinoin, Tretinoin',
  },
  {
    id: 'anti-cancer',
    name: 'Anti-Cancer',
    subtitle: 'Erdafitinib, Imatinib, Tamoxifen, more',
  },
  {
    id: 'hair-growth',
    name: 'Hair Growth',
    subtitle: 'Minoxidil, Finasteride, Dutasteride',
  },
  {
    id: 'weight-loss',
    name: 'Weight Loss',
    subtitle: 'Mounjaro, Rybelsus, Semaglutide',
  },
  {
    id: 'muscle-performance',
    name: 'Muscle & Performance',
    subtitle: 'Oxandrolone, Clenbuterol, Anabolics',
  },
  {
    id: 'ivermectin-parasite',
    name: 'Ivermectin & Parasite',
    subtitle: 'Ivermectin, Fenbendazole, Mebendazole',
  },
  {
    id: 'sirolimus',
    name: 'Sirolimus',
    subtitle: 'Immunosuppressant medication',
  },
  {
    id: 'antibiotics',
    name: 'Antibiotics',
    subtitle: 'Azithromycin, Amoxicillin, more',
  },
  {
    id: 'adhd-medicine',
    name: 'ADHD Medicine',
    subtitle: 'Atomoxetine',
  },
];

const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.id, c.name]));

const round2 = (n: number) => Math.round(n * 100) / 100;

interface RawProductTuple {
  name: string;
  generic: string;
  cat: CategoryId;
  brand: string;
  pack: string;
  basePrice: number;
  unitLabel: string;
  basePill?: number;
  badge?: ProductBadge;
}

const RAW_PRODUCTS: RawProductTuple[] = [
  // ED Medicine
  { name: 'Cenforce 25mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 0.4, unitLabel: 'per strip', basePill: 0.04 },
  { name: 'Cenforce 50mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 0.5, unitLabel: 'per strip', basePill: 0.05 },
  { name: 'Cenforce 100mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Cenforce 150mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Cenforce 200mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Cenforce Professional 100mg', generic: 'Sildenafil Citrate Sublingual', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06, badge: 'SUBLINGUAL' },
  { name: 'Cenforce FM 100mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Cenforce Soft 100mg', generic: 'Sildenafil Citrate Chewable', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06, badge: 'CHEWABLE' },
  { name: 'Fildena 25mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Fortune', pack: '1x10 Strip', basePrice: 0.4, unitLabel: 'per strip', basePill: 0.04 },
  { name: 'Fildena 50mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Fortune', pack: '1x10 Strip', basePrice: 0.5, unitLabel: 'per strip', basePill: 0.05 },
  { name: 'Fildena 100mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Fortune', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Fildena 150mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Fortune', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Fildena 200mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Fortune', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Blueforce 25mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Jeerima', pack: '1x10 Strip', basePrice: 0.4, unitLabel: 'per strip', basePill: 0.04 },
  { name: 'Blueforce 100mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Jeerima', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Blueforce 200mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Jeerima', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Blueforce 250mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Jeerima', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Malegra 25mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Sunrise', pack: '1x10 Strip', basePrice: 0.4, unitLabel: 'per strip', basePill: 0.04 },
  { name: 'Malegra 100mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Sunrise', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Malegra 200mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Sunrise', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Suhagra 25mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Cipla', pack: '1x4 Strip', basePrice: 0.32, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Suhagra 50mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Cipla', pack: '1x4 Strip', basePrice: 0.48, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Suhagra 100mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Cipla', pack: '1x4 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Kamagra 50mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Ajanta', pack: '1x4 Strip', basePrice: 0.88, unitLabel: 'per strip', basePill: 0.22 },
  { name: 'Kamagra 100mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Ajanta', pack: '1x4 Strip', basePrice: 1.12, unitLabel: 'per strip', basePill: 0.28 },
  { name: 'Kamagra Gold 50mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Ajanta', pack: '1x4 Strip', basePrice: 0.88, unitLabel: 'per strip', basePill: 0.22 },
  { name: 'Kamagra Gold 100mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Ajanta', pack: '1x4 Strip', basePrice: 1.12, unitLabel: 'per strip', basePill: 0.28 },
  { name: 'Super Kamagra 160mg', generic: 'Sildenafil 100mg + Dapoxetine 60mg', cat: 'ed-medicine', brand: 'Ajanta', pack: '1x4 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Kamagra Chewable (Polo) 100mg', generic: 'Sildenafil Citrate Chewable', cat: 'ed-medicine', brand: 'Ajanta', pack: '1x4 Strip', basePrice: 1.04, unitLabel: 'per strip', basePill: 0.26 },
  { name: 'Kamagra Effervescent 100mg', generic: 'Sildenafil Citrate Effervescent', cat: 'ed-medicine', brand: 'Ajanta', pack: '1x7 Bottle', basePrice: 1.12, unitLabel: 'per bottle', basePill: 0.16 },
  { name: 'Sildamax 100mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'Agron', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Super Sildamax 160mg', generic: 'Sildenafil 100mg + Dapoxetine 60mg', cat: 'ed-medicine', brand: 'Agron', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Vigore 100mg', generic: 'Sildenafil Citrate', cat: 'ed-medicine', brand: 'German', pack: '1x4 Strip', basePrice: 0.64, unitLabel: 'per strip', basePill: 0.16 },
  { name: 'Super P Force 160mg', generic: 'Sildenafil 100mg + Dapoxetine 60mg', cat: 'ed-medicine', brand: 'Sunrise', pack: '1x4 Strip', basePrice: 2.0, unitLabel: 'per strip', basePill: 0.5 },
  { name: 'Extra Super P Force 200mg', generic: 'Sildenafil 100mg + Dapoxetine 100mg', cat: 'ed-medicine', brand: 'Sunrise', pack: '1x4 Strip', basePrice: 2.2, unitLabel: 'per strip', basePill: 0.55 },
  { name: 'Sildalist 120mg', generic: 'Sildenafil 100mg + Tadalafil 20mg', cat: 'ed-medicine', brand: 'RSM', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Vidalista 10mg', generic: 'Tadalafil', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Vidalista 20mg', generic: 'Tadalafil', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Vidalista 40mg', generic: 'Tadalafil', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Vidalista 60mg', generic: 'Tadalafil', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Vidalista 80mg', generic: 'Tadalafil', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Vidalista CT 20mg', generic: 'Tadalafil Chewable', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 0.7, unitLabel: 'per strip', basePill: 0.07 },
  { name: 'Vidalista Professional 20mg', generic: 'Tadalafil Sublingual', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 0.7, unitLabel: 'per strip', basePill: 0.07, badge: 'SUBLINGUAL' },
  { name: 'Vidalista Black 80mg', generic: 'Tadalafil', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Super Vidalista 60mg', generic: 'Tadalafil 20mg + Dapoxetine 60mg', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.3 },
  { name: 'Extra Super Vidalista 100mg', generic: 'Tadalafil 40mg + Dapoxetine 60mg', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 4.2, unitLabel: 'per strip', basePill: 0.42 },
  { name: 'Megalis 5mg', generic: 'Tadalafil', cat: 'ed-medicine', brand: 'Macleods', pack: '1x4 Strip', basePrice: 3.2, unitLabel: 'per strip' },
  { name: 'Megalis 10mg', generic: 'Tadalafil', cat: 'ed-medicine', brand: 'Macleods', pack: '1x4 Strip', basePrice: 3.5, unitLabel: 'per strip' },
  { name: 'Megalis 20mg', generic: 'Tadalafil', cat: 'ed-medicine', brand: 'Macleods', pack: '1x4 Strip', basePrice: 7.0, unitLabel: 'per strip' },
  { name: 'Kamagra Oral Jelly 100mg', generic: 'Sildenafil Citrate Oral Jelly', cat: 'ed-medicine', brand: 'Ajanta', pack: '1x7 Box (7 sachets)', basePrice: 3.0, unitLabel: 'per box' },
  { name: 'Super Kamagra Oral Jelly 160mg', generic: 'Sildenafil 100mg + Dapoxetine 60mg Jelly', cat: 'ed-medicine', brand: 'Ajanta', pack: '1x7 Box (7 sachets)', basePrice: 4.5, unitLabel: 'per box' },
  { name: 'Valif Jelly 20mg', generic: 'Vardenafil Oral Jelly', cat: 'ed-medicine', brand: 'Ajanta', pack: '1x7 Box (7 sachets)', basePrice: 3.5, unitLabel: 'per box' },
  { name: 'Valif 20mg', generic: 'Vardenafil', cat: 'ed-medicine', brand: 'Ajanta', pack: '1x10 Strip', basePrice: 2.0, unitLabel: 'per strip', basePill: 0.2 },
  { name: 'Vilitra 10mg', generic: 'Vardenafil', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Vilitra 20mg', generic: 'Vardenafil', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 1.4, unitLabel: 'per strip', basePill: 0.14 },
  { name: 'Vilitra 40mg', generic: 'Vardenafil', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 2.5, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Vilitra 60mg', generic: 'Vardenafil', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 3.6, unitLabel: 'per strip', basePill: 0.35 },
  { name: 'Vilitra 80mg', generic: 'Vardenafil', cat: 'ed-medicine', brand: 'Centurion', pack: '1x10 Strip', basePrice: 4.4, unitLabel: 'per strip', basePill: 0.44 },
  { name: 'Snovitra Super Power 80mg', generic: 'Vardenafil 20mg + Dapoxetine 60mg', cat: 'ed-medicine', brand: 'RSM', pack: '1x10 Strip', basePrice: 3.8, unitLabel: 'per strip', basePill: 0.38 },
  { name: 'Poxet 30mg', generic: 'Dapoxetine', cat: 'ed-medicine', brand: 'Sunrise', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Poxet 60mg', generic: 'Dapoxetine', cat: 'ed-medicine', brand: 'Sunrise', pack: '1x10 Strip', basePrice: 2.5, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Poxet 90mg', generic: 'Dapoxetine', cat: 'ed-medicine', brand: 'Sunrise', pack: '1x10 Strip', basePrice: 3.5, unitLabel: 'per strip', basePill: 0.35 },

  // Sleep Aid
  { name: 'Zopimini 3.75mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Winlife', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Zopisign 7.5mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Signature', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Zopisign 10mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Signature', pack: '1x14 Strip', basePrice: 1.4, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Zopfresh 7.5mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Orange City', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Zopfresh 10mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Orange City', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Zopfresh 20mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Orange City', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Zop 7.5mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'HAB', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Zopicon 7.5mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Intas', pack: '1x10 Strip', basePrice: 2.0, unitLabel: 'per strip', basePill: 0.2 },
  { name: 'Zopinap 7.5mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Jeerima', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Zopinap 10mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Jeerima', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Zopinap 20mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Jeerima', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Zopdaily 7.5mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Winlife', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Zopdaily 10mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Zopimaxx 20mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Zopimaxx 25mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Zopanda Maxx 25mg', generic: 'Zopiclone', cat: 'sleep-aid', brand: 'Orange City', pack: '1x10 Strip', basePrice: 1.6, unitLabel: 'per strip', basePill: 0.16 },
  { name: 'Melaquick 3mg', generic: 'Melatonin', cat: 'sleep-aid', brand: 'Dr. Morepen', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Sleep-Ash 5mg', generic: 'Eszopiclone / Melatonin', cat: 'sleep-aid', brand: 'Asher', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Sleep-Ash 10mg', generic: 'Eszopiclone / Melatonin', cat: 'sleep-aid', brand: 'Asher', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Sleep-Ash 20mg', generic: 'Eszopiclone / Melatonin', cat: 'sleep-aid', brand: 'Asher', pack: '1x10 Strip', basePrice: 2.0, unitLabel: 'per strip', basePill: 0.2 },
  { name: 'Sleep-Ash 60mg', generic: 'Sleep Formula', cat: 'sleep-aid', brand: 'Asher', pack: '1x10 Strip', basePrice: 2.5, unitLabel: 'per strip', basePill: 0.25 },

  // Pain Management
  { name: 'Nervigesic 75mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Signature', pack: '1x15 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Nervigesic 150mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Signature', pack: '1x15 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Nervigesic 300mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Signature', pack: '1x15 Strip', basePrice: 2.25, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Nervigesic 450mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Signature', pack: '1x15 Strip', basePrice: 3.75, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Linegesic 150mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Jeerima', pack: '1x15 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Linegesic 300mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Jeerima', pack: '1x15 Strip', basePrice: 2.25, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Prebasun 150mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Sunrise', pack: '1x15 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Prebasun 300mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Sunrise', pack: '1x15 Strip', basePrice: 2.25, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Prebasun 450mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Sunrise', pack: '1x15 Strip', basePrice: 3.75, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Nerviguard 150mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Fortune', pack: '1x15 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Nerviguard 300mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Fortune', pack: '1x15 Strip', basePrice: 2.25, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Nerviguard 450mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Fortune', pack: '1x15 Strip', basePrice: 3.75, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Nerviash 300mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Asher', pack: '1x15 Strip', basePrice: 2.25, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Nerviash 450mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Asher', pack: '1x15 Strip', basePrice: 3.75, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Pregacare 300mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'CareClub', pack: '1x15 Strip', basePrice: 2.25, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Nervisign 300mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Signature', pack: '1x15 Strip', basePrice: 2.25, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Pregagesic 300mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Universal', pack: '1x15 Strip', basePrice: 2.25, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Pregafresh 150mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Orange City', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Pregafresh 300mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Orange City', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Nervi-Smart 300mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Healing', pack: '1x15 Strip', basePrice: 2.25, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Nervi-Smart 450mg', generic: 'Pregabalin', cat: 'pain-management', brand: 'Healing', pack: '1x15 Strip', basePrice: 3.75, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Gabatop 100mg', generic: 'Gabapentin', cat: 'pain-management', brand: 'Healing', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Gabatop 300mg', generic: 'Gabapentin', cat: 'pain-management', brand: 'Healing', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Gabatop 400mg', generic: 'Gabapentin', cat: 'pain-management', brand: 'Healing', pack: '1x10 Strip', basePrice: 1.4, unitLabel: 'per strip', basePill: 0.14 },
  { name: 'Gabapin 300mg', generic: 'Gabapentin', cat: 'pain-management', brand: 'Intas', pack: '1x15 Strip', basePrice: 5.5, unitLabel: 'per strip', basePill: 0.37 },
  { name: 'Gabimax 100mg', generic: 'Gabapentin', cat: 'pain-management', brand: 'Johnlee', pack: '1x10 Strip', basePrice: 1.4, unitLabel: 'per strip', basePill: 0.14 },
  { name: 'Gabasign 300mg', generic: 'Gabapentin', cat: 'pain-management', brand: 'Signature', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Gabasign 600mg', generic: 'Gabapentin', cat: 'pain-management', brand: 'Signature', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Gabasign 800mg', generic: 'Gabapentin', cat: 'pain-management', brand: 'Signature', pack: '1x10 Strip', basePrice: 1.6, unitLabel: 'per strip', basePill: 0.16 },
  { name: 'Gabafresh 1000mg', generic: 'Gabapentin', cat: 'pain-management', brand: 'Orange City', pack: '1x10 Strip', basePrice: 2.0, unitLabel: 'per strip', basePill: 0.2 },
  { name: 'Gabapin NT 100mg', generic: 'Gabapentin + Nortriptyline', cat: 'pain-management', brand: 'Intas', pack: '1x15 Strip', basePrice: 6.8, unitLabel: 'per strip', basePill: 0.45 },
  { name: 'Tapaday 100mg', generic: 'Tapentadol', cat: 'pain-management', brand: 'Orange City', pack: '1x10 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.3 },
  { name: 'Aspadol 50mg', generic: 'Tapentadol', cat: 'pain-management', brand: 'Signature', pack: '1x10 Strip', basePrice: 2.5, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Aspadol 100mg', generic: 'Tapentadol', cat: 'pain-management', brand: 'Signature', pack: '1x10 Strip', basePrice: 3.5, unitLabel: 'per strip', basePill: 0.35 },
  { name: 'Tap-Ash 100mg', generic: 'Tapentadol', cat: 'pain-management', brand: 'Asher', pack: '1x10 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.3 },

  // Moda & Armoda
  { name: 'Modalert 100mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Sun Pharma', pack: '1x10 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.35, badge: 'BRANDED' },
  { name: 'Modalert 200mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Sun Pharma', pack: '1x10 Strip', basePrice: 4.8, unitLabel: 'per strip', basePill: 0.48, badge: 'BRANDED' },
  { name: 'Modvigil 100mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Signature', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Modvigil 200mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Signature', pack: '1x10 Strip', basePrice: 1.6, unitLabel: 'per strip', basePill: 0.16 },
  { name: 'Modafocus 200mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 1.6, unitLabel: 'per strip', basePill: 0.16 },
  { name: 'Modaplus 200mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Shreen', pack: '1x10 Strip', basePrice: 1.6, unitLabel: 'per strip', basePill: 0.16 },
  { name: 'Vilafinil 200mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Fortune', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Vilafinil 300mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Fortune', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Vilafinil 400mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Fortune', pack: '1x10 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.3 },
  { name: 'Modaheal 100mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Healing', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Modaheal 200mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Healing', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Modafil MD 100mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Intas', pack: '1x10 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.3 },
  { name: 'Modafil MD 200mg', generic: 'Modafinil', cat: 'moda-armoda', brand: 'Intas', pack: '1x10 Strip', basePrice: 3.8, unitLabel: 'per strip', basePill: 0.38 },
  { name: 'Waklert 50mg', generic: 'Armodafinil', cat: 'moda-armoda', brand: 'Sun Pharma', pack: '1x10 Strip', basePrice: 2.0, unitLabel: 'per strip', basePill: 0.2, badge: 'BRANDED' },
  { name: 'Waklert 150mg', generic: 'Armodafinil', cat: 'moda-armoda', brand: 'Sun Pharma', pack: '1x10 Strip', basePrice: 4.5, unitLabel: 'per strip', basePill: 0.45, badge: 'BRANDED' },
  { name: 'Artvigil 150mg', generic: 'Armodafinil', cat: 'moda-armoda', brand: 'Signature', pack: '1x10 Strip', basePrice: 2.7, unitLabel: 'per strip', basePill: 0.27 },
  { name: 'Artvigil 250mg', generic: 'Armodafinil', cat: 'moda-armoda', brand: 'Signature', pack: '1x10 Strip', basePrice: 4.0, unitLabel: 'per strip', basePill: 0.4 },
  { name: 'Armogard 150mg', generic: 'Armodafinil', cat: 'moda-armoda', brand: 'Fortune', pack: '1x10 Strip', basePrice: 2.4, unitLabel: 'per strip', basePill: 0.24 },
  { name: 'Armogard 250mg', generic: 'Armodafinil', cat: 'moda-armoda', brand: 'Fortune', pack: '1x10 Strip', basePrice: 4.0, unitLabel: 'per strip', basePill: 0.4 },

  // TRT Medicine
  { name: 'Cernos Gel 1%', generic: 'Testosterone Gel', cat: 'trt-medicine', brand: 'Sun Pharma', pack: '5gm Sachet', basePrice: 1.5, unitLabel: 'per sachet' },
  { name: 'Cernos 40mg Capsule', generic: 'Testosterone Undecanoate', cat: 'trt-medicine', brand: 'Sun Pharma', pack: '1x10 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.3 },
  { name: 'Testosign Gel 1%', generic: 'Testosterone Gel', cat: 'trt-medicine', brand: 'Signature', pack: '5gm Sachet', basePrice: 0.25, unitLabel: 'per sachet' },
  { name: 'Testosign 40mg Capsule', generic: 'Testosterone Undecanoate', cat: 'trt-medicine', brand: 'Signature', pack: '1x10 Strip', basePrice: 1.6, unitLabel: 'per strip', basePill: 0.16 },
  { name: 'Testoheal 40mg Capsule', generic: 'Testosterone Undecanoate', cat: 'trt-medicine', brand: 'Healing', pack: '1x10 Strip', basePrice: 2.0, unitLabel: 'per strip', basePill: 0.2 },
  { name: 'Enclomy 25mg', generic: 'Enclomiphene Citrate', cat: 'trt-medicine', brand: 'Powerbolic', pack: '1x10 Strip', basePrice: 1.4, unitLabel: 'per strip', basePill: 0.14 },
  { name: 'Enclofert 50mg', generic: 'Enclomiphene Citrate', cat: 'trt-medicine', brand: 'Maneesh', pack: '1x10 Strip', basePrice: 2.8, unitLabel: 'per strip', basePill: 0.28 },
  { name: 'Enclomisign 50mg', generic: 'Enclomiphene Citrate', cat: 'trt-medicine', brand: 'Signature', pack: '1x5 Strip', basePrice: 0.9, unitLabel: 'per strip', basePill: 0.18 },

  // Anti Acne
  { name: 'Accuret 5mg', generic: 'Isotretinoin', cat: 'anti-acne', brand: 'Winlife', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Accuret 10mg', generic: 'Isotretinoin', cat: 'anti-acne', brand: 'Winlife', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Accuret 20mg', generic: 'Isotretinoin', cat: 'anti-acne', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Accuret 30mg', generic: 'Isotretinoin', cat: 'anti-acne', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Accuret 40mg', generic: 'Isotretinoin', cat: 'anti-acne', brand: 'Winlife', pack: '1x10 Strip', basePrice: 2.2, unitLabel: 'per strip', basePill: 0.22 },
  { name: 'Accufine 5mg', generic: 'Isotretinoin', cat: 'anti-acne', brand: 'Healing', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Accufine 10mg', generic: 'Isotretinoin', cat: 'anti-acne', brand: 'Healing', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Accufine 20mg', generic: 'Isotretinoin', cat: 'anti-acne', brand: 'Healing', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Accufine 30mg', generic: 'Isotretinoin', cat: 'anti-acne', brand: 'Healing', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'A-Ret 0.025% Gel', generic: 'Tretinoin', cat: 'anti-acne', brand: 'A. Menarini', pack: '20gm Tube', basePrice: 2.0, unitLabel: 'per tube' },
  { name: 'A-Ret 0.05% Gel', generic: 'Tretinoin', cat: 'anti-acne', brand: 'A. Menarini', pack: '20gm Tube', basePrice: 2.55, unitLabel: 'per tube' },
  { name: 'A-Ret 0.1% Gel', generic: 'Tretinoin', cat: 'anti-acne', brand: 'A. Menarini', pack: '20gm Tube', basePrice: 3.0, unitLabel: 'per tube' },
  { name: 'Tretiheal 0.025% Gel', generic: 'Tretinoin', cat: 'anti-acne', brand: 'Healing', pack: '20gm Tube', basePrice: 2.85, unitLabel: 'per tube' },
  { name: 'Tretiheal 0.05% Gel', generic: 'Tretinoin', cat: 'anti-acne', brand: 'Healing', pack: '20gm Tube', basePrice: 3.3, unitLabel: 'per tube' },
  { name: 'Tretiheal 0.1% Gel', generic: 'Tretinoin', cat: 'anti-acne', brand: 'Healing', pack: '20gm Tube', basePrice: 4.2, unitLabel: 'per tube' },

  // Anti-Cancer
  { name: 'Anaridex 1mg', generic: 'Anastrozole', cat: 'anti-cancer', brand: 'Healing', pack: '1x10 Strip', basePrice: 2.0, unitLabel: 'per strip', basePill: 0.2 },
  { name: 'Arimidex 1mg', generic: 'Anastrozole', cat: 'anti-cancer', brand: 'AstraZeneca', pack: '1x28 Strip', basePrice: 98.0, unitLabel: 'per strip', basePill: 3.5, badge: 'BRANDED' },
  { name: 'Erdanat 3mg', generic: 'Erdafitinib', cat: 'anti-cancer', brand: 'NATCO', pack: '28 tabs Bottle', basePrice: 158.0, unitLabel: 'per bottle' },
  { name: 'Erdanat 4mg', generic: 'Erdafitinib', cat: 'anti-cancer', brand: 'NATCO', pack: '28 tabs Bottle', basePrice: 197.0, unitLabel: 'per bottle' },
  { name: 'Imat 400mg', generic: 'Imatinib Mesylate', cat: 'anti-cancer', brand: 'Zydus', pack: '1x10 Strip', basePrice: 28.0, unitLabel: 'per strip', basePill: 2.8 },
  { name: 'Imatinib 400mg', generic: 'Imatinib Mesylate', cat: 'anti-cancer', brand: 'Cipla', pack: '1x10 Strip', basePrice: 24.0, unitLabel: 'per strip', basePill: 2.4 },
  { name: 'Imaford 400mg', generic: 'Imatinib Mesylate', cat: 'anti-cancer', brand: 'Leeford', pack: '1x10 Strip', basePrice: 4.0, unitLabel: 'per strip', basePill: 0.4 },
  { name: 'Tamodex 10mg', generic: 'Tamoxifen Citrate', cat: 'anti-cancer', brand: 'Zydus', pack: '1x10 Strip', basePrice: 0.7, unitLabel: 'per strip', basePill: 0.07 },
  { name: 'Tamodex 20mg', generic: 'Tamoxifen Citrate', cat: 'anti-cancer', brand: 'Zydus', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Tamoxican 10mg', generic: 'Tamoxifen Citrate', cat: 'anti-cancer', brand: 'Healing', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Bicatero 50mg', generic: 'Bicalutamide', cat: 'anti-cancer', brand: 'Hetero', pack: '1x10 Strip', basePrice: 5.5, unitLabel: 'per strip', basePill: 0.55 },
  { name: 'Xtane 25mg', generic: 'Exemestane', cat: 'anti-cancer', brand: 'Natco', pack: '30 per Bottle', basePrice: 13.0, unitLabel: 'per bottle', basePill: 0.43 },
  { name: 'Tagrisso 40mg', generic: 'Osimertinib', cat: 'anti-cancer', brand: 'AstraZeneca', pack: '1x10 Strip', basePrice: 1980.0, unitLabel: 'per strip', basePill: 198.0, badge: 'PREMIUM' },
  { name: 'Tagrisso 80mg', generic: 'Osimertinib', cat: 'anti-cancer', brand: 'AstraZeneca', pack: '1x10 Strip', basePrice: 1830.0, unitLabel: 'per strip', basePill: 183.0, badge: 'PREMIUM' },
  { name: 'Afanat 20mg', generic: 'Afatinib', cat: 'anti-cancer', brand: 'Natco', pack: '28 per Bottle', basePrice: 38.3, unitLabel: 'per bottle', basePill: 1.36 },
  { name: 'Afanat 30mg', generic: 'Afatinib', cat: 'anti-cancer', brand: 'Natco', pack: '28 per Bottle', basePrice: 52.1, unitLabel: 'per bottle', basePill: 1.86 },
  { name: 'Afanat 40mg', generic: 'Afatinib', cat: 'anti-cancer', brand: 'Natco', pack: '28 per Bottle', basePrice: 69.5, unitLabel: 'per bottle', basePill: 2.48 },
  { name: 'Cytomid 250mg', generic: 'Flutamide', cat: 'anti-cancer', brand: 'Cipla', pack: '1x10 Strip', basePrice: 2.0, unitLabel: 'per strip', basePill: 0.2 },
  { name: 'Leetrexate 2.5mg', generic: 'Methotrexate', cat: 'anti-cancer', brand: 'Johnlee', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Leetrexate 5mg', generic: 'Methotrexate', cat: 'anti-cancer', brand: 'Johnlee', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Leetrexate 10mg', generic: 'Methotrexate', cat: 'anti-cancer', brand: 'Johnlee', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Etibo 250mg', generic: 'Abiraterone Acetate', cat: 'anti-cancer', brand: 'Samarth', pack: '30 tabs Bottle', basePrice: 130.0, unitLabel: 'per bottle' },
  { name: 'Jakavi 5mg', generic: 'Ruxolitinib', cat: 'anti-cancer', brand: 'Novartis', pack: '1x10 Strip', basePrice: 321.0, unitLabel: 'per strip', basePill: 32.1, badge: 'PREMIUM' },
  { name: 'Jakavi 10mg', generic: 'Ruxolitinib', cat: 'anti-cancer', brand: 'Novartis', pack: '1x10 Strip', basePrice: 570.0, unitLabel: 'per strip', basePill: 57.0, badge: 'PREMIUM' },
  { name: 'Jakavi 20mg', generic: 'Ruxolitinib', cat: 'anti-cancer', brand: 'Novartis', pack: '1x10 Strip', basePrice: 655.0, unitLabel: 'per strip', basePill: 65.5, badge: 'PREMIUM' },
  { name: 'Cazanat 20mg', generic: 'Cabozantinib', cat: 'anti-cancer', brand: 'Natco', pack: '30 tabs Bottle', basePrice: 60.5, unitLabel: 'per bottle' },
  { name: 'Cazanat 40mg', generic: 'Cabozantinib', cat: 'anti-cancer', brand: 'Natco', pack: '30 tabs Bottle', basePrice: 106.2, unitLabel: 'per bottle' },

  // Hair Growth
  { name: 'Lonitab 2.5mg', generic: 'Oral Minoxidil', cat: 'hair-growth', brand: 'Intas', pack: '1x10 Strip', basePrice: 2.5, unitLabel: 'per strip' },
  { name: 'Lonitab 5mg', generic: 'Oral Minoxidil', cat: 'hair-growth', brand: 'Intas', pack: '1x10 Strip', basePrice: 6.0, unitLabel: 'per strip', basePill: 0.6 },
  { name: 'Lonitab 10mg', generic: 'Oral Minoxidil', cat: 'hair-growth', brand: 'Intas', pack: '1x10 Strip', basePrice: 8.5, unitLabel: 'per strip', basePill: 0.85 },
  { name: 'Minoforce 2.5mg', generic: 'Oral Minoxidil', cat: 'hair-growth', brand: 'Fortune', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Minoforce 5mg', generic: 'Oral Minoxidil', cat: 'hair-growth', brand: 'Fortune', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Proscalpin 1mg', generic: 'Finasteride', cat: 'hair-growth', brand: 'Fortune', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Proscare 5mg', generic: 'Finasteride', cat: 'hair-growth', brand: 'Fortune', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Healpecia 1mg', generic: 'Finasteride', cat: 'hair-growth', brand: 'Healing', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Healpecia 5mg', generic: 'Finasteride', cat: 'hair-growth', brand: 'Healing', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Minwin-F 5mg', generic: 'Minoxidil + Finasteride', cat: 'hair-growth', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Minwin-D 10mg', generic: 'Minoxidil + Dutasteride', cat: 'hair-growth', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Parksteride 1mg', generic: 'Finasteride', cat: 'hair-growth', brand: 'Parikh', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Morr F 5% Solution', generic: 'Minoxidil 5% + Finasteride 0.1%', cat: 'hair-growth', brand: 'Intas', pack: '60ml Bottle', basePrice: 10.5, unitLabel: 'per bottle' },
  { name: 'Morr F 10% Solution', generic: 'Minoxidil 10% + Finasteride 0.1%', cat: 'hair-growth', brand: 'Intas', pack: '60ml Bottle', basePrice: 16.5, unitLabel: 'per bottle' },
  { name: 'TATA 1mg Minoxidil 2%', generic: 'Minoxidil Topical 2%', cat: 'hair-growth', brand: 'Tata 1mg', pack: '60ml Bottle', basePrice: 5.9, unitLabel: 'per bottle' },
  { name: 'TATA 1mg Minoxidil 5%', generic: 'Minoxidil Topical 5%', cat: 'hair-growth', brand: 'Tata 1mg', pack: '60ml Bottle', basePrice: 9.8, unitLabel: 'per bottle' },

  // Weight Loss
  { name: 'Noveltreat 0.25mg Injection', generic: 'Semaglutide Injection', cat: 'weight-loss', brand: 'Generic', pack: '2 Doses 0.25mg/0.5ml', basePrice: 23.0, unitLabel: 'per unit' },
  { name: 'Noveltreat 0.5mg Injection', generic: 'Semaglutide Injection', cat: 'weight-loss', brand: 'Generic', pack: '2 Doses 0.5mg/0.5ml', basePrice: 27.0, unitLabel: 'per unit' },
  { name: 'Noveltreat 1mg Injection', generic: 'Semaglutide Injection', cat: 'weight-loss', brand: 'Generic', pack: '2 Doses 1mg/0.5ml', basePrice: 35.0, unitLabel: 'per unit' },
  { name: 'Noveltreat 1.7mg Injection', generic: 'Semaglutide Injection', cat: 'weight-loss', brand: 'Generic', pack: '2 Doses 1.7mg/0.5ml', basePrice: 45.0, unitLabel: 'per unit' },
  { name: 'Ozempic 0.25mg', generic: 'Semaglutide', cat: 'weight-loss', brand: 'Novo Nordisk', pack: '1.5ml Pen', basePrice: 74.5, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Ozempic 0.5mg', generic: 'Semaglutide', cat: 'weight-loss', brand: 'Novo Nordisk', pack: '1.5ml Pen', basePrice: 106.7, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Ozempic 1mg', generic: 'Semaglutide', cat: 'weight-loss', brand: 'Novo Nordisk', pack: '3ml Pen', basePrice: 120.0, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Wegovy 0.25mg', generic: 'Semaglutide', cat: 'weight-loss', brand: 'Novo Nordisk', pack: '1.5ml Pen', basePrice: 74.6, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Wegovy 0.5mg', generic: 'Semaglutide', cat: 'weight-loss', brand: 'Novo Nordisk', pack: '1.5ml Pen', basePrice: 106.7, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Wegovy 1mg', generic: 'Semaglutide', cat: 'weight-loss', brand: 'Novo Nordisk', pack: '3ml Pen', basePrice: 120.0, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Wegovy 1.7mg', generic: 'Semaglutide', cat: 'weight-loss', brand: 'Novo Nordisk', pack: '3ml Pen', basePrice: 168.0, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Wegovy 2.4mg', generic: 'Semaglutide', cat: 'weight-loss', brand: 'Novo Nordisk', pack: '3ml Pen', basePrice: 216.0, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Semalix Injection 2mg', generic: 'Semaglutide Injection', cat: 'weight-loss', brand: 'Generic', pack: 'Box of 1 Inj.', basePrice: 52.7, unitLabel: 'per unit' },
  { name: 'Semalix Injection 4mg', generic: 'Semaglutide Injection', cat: 'weight-loss', brand: 'Generic', pack: 'Box of 1 Inj.', basePrice: 59.2, unitLabel: 'per unit' },
  { name: 'Mounjaro 2.5mg Kwikpen', generic: 'Tirzepatide', cat: 'weight-loss', brand: 'Eli Lilly', pack: '3ml Pen', basePrice: 184.0, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Mounjaro 5mg Kwikpen', generic: 'Tirzepatide', cat: 'weight-loss', brand: 'Eli Lilly', pack: '3ml Pen', basePrice: 230.0, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Mounjaro 7.5mg Kwikpen', generic: 'Tirzepatide', cat: 'weight-loss', brand: 'Eli Lilly', pack: '3ml Pen', basePrice: 289.0, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Mounjaro 10mg Kwikpen', generic: 'Tirzepatide', cat: 'weight-loss', brand: 'Eli Lilly', pack: '3ml Pen', basePrice: 289.0, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Mounjaro 15mg Kwikpen', generic: 'Tirzepatide', cat: 'weight-loss', brand: 'Eli Lilly', pack: '3ml Pen', basePrice: 361.0, unitLabel: 'per pen', badge: 'BRANDED' },
  { name: 'Mounjaro 2.5mg Vial', generic: 'Tirzepatide', cat: 'weight-loss', brand: 'Eli Lilly', pack: '0.5ml Vial', basePrice: 43.2, unitLabel: 'per vial', badge: 'BRANDED' },
  { name: 'Mounjaro 5mg Vial', generic: 'Tirzepatide', cat: 'weight-loss', brand: 'Eli Lilly', pack: '0.5ml Vial', basePrice: 54.0, unitLabel: 'per vial', badge: 'BRANDED' },
  { name: 'Rybelsus 3mg', generic: 'Oral Semaglutide', cat: 'weight-loss', brand: 'Novo Nordisk', pack: '1x10 Strip', basePrice: 35.2, unitLabel: 'per strip', badge: 'BRANDED' },
  { name: 'Rybelsus 7mg', generic: 'Oral Semaglutide', cat: 'weight-loss', brand: 'Novo Nordisk', pack: '1x10 Strip', basePrice: 43.5, unitLabel: 'per strip', badge: 'BRANDED' },
  { name: 'Rybelsus 14mg', generic: 'Oral Semaglutide', cat: 'weight-loss', brand: 'Novo Nordisk', pack: '1x10 Strip', basePrice: 50.4, unitLabel: 'per strip', badge: 'BRANDED' },
  { name: 'Semalix 3mg Tablet', generic: 'Oral Semaglutide', cat: 'weight-loss', brand: 'Torrent', pack: '1x10 Strip', basePrice: 20.0, unitLabel: 'per strip', badge: 'GENERIC' },
  { name: 'Semalix 7mg Tablet', generic: 'Oral Semaglutide', cat: 'weight-loss', brand: 'Torrent', pack: '1x10 Strip', basePrice: 25.0, unitLabel: 'per strip', badge: 'GENERIC' },
  { name: 'Semalix 14mg Tablet', generic: 'Oral Semaglutide', cat: 'weight-loss', brand: 'Torrent', pack: '1x10 Strip', basePrice: 35.0, unitLabel: 'per strip', badge: 'GENERIC' },

  // Muscle & Performance (Anabolic Steroids)
  { name: 'Testo E 250mg 1ml', generic: 'Testosterone Enanthate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1ml Ampoule', basePrice: 1.6, unitLabel: 'per ampoule' },
  { name: 'Testo C 250mg 1ml', generic: 'Testosterone Cypionate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1ml Ampoule', basePrice: 1.3, unitLabel: 'per ampoule' },
  { name: 'Sustamaxx Amp', generic: 'Testosterone Blend 250mg', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1ml Ampoule', basePrice: 1.3, unitLabel: 'per ampoule' },
  { name: 'Tren A 100mg 1ml', generic: 'Trenbolone Acetate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1ml Ampoule', basePrice: 2.5, unitLabel: 'per ampoule' },
  { name: 'Deca 250mg 1ml', generic: 'Nandrolone Decanoate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1ml Ampoule', basePrice: 2.0, unitLabel: 'per ampoule' },
  { name: 'Tren E 200mg 1ml', generic: 'Trenbolone Enanthate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1ml Ampoule', basePrice: 4.0, unitLabel: 'per ampoule' },
  { name: 'Drostawin 1ml', generic: 'Drostanolone Propionate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1ml Ampoule', basePrice: 2.5, unitLabel: 'per ampoule' },
  { name: 'Boldebol 1ml', generic: 'Boldenone Undecylenate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1ml Ampoule', basePrice: 2.5, unitLabel: 'per ampoule' },
  { name: 'Primobolon 1ml', generic: 'Methenolone Enanthate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1ml Ampoule', basePrice: 4.0, unitLabel: 'per ampoule' },
  { name: 'Testo-P 100mg 1ml', generic: 'Testosterone Propionate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1ml Ampoule', basePrice: 1.2, unitLabel: 'per ampoule' },
  { name: 'Testo E 250mg 10ml', generic: 'Testosterone Enanthate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '10ml Vial', basePrice: 18.0, unitLabel: 'per vial' },
  { name: 'Testo C 250mg 10ml', generic: 'Testosterone Cypionate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '10ml Vial', basePrice: 14.5, unitLabel: 'per vial' },
  { name: 'Testo P 100mg 10ml', generic: 'Testosterone Propionate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '10ml Vial', basePrice: 8.0, unitLabel: 'per vial' },
  { name: 'Sustawin 250mg 10ml', generic: 'Testosterone Blend 250mg', cat: 'muscle-performance', brand: 'Powerbolic', pack: '10ml Vial', basePrice: 17.5, unitLabel: 'per vial' },
  { name: 'Deca 250mg 10ml', generic: 'Nandrolone Decanoate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '10ml Vial', basePrice: 21.8, unitLabel: 'per vial' },
  { name: 'Boldebol 250mg 10ml', generic: 'Boldenone Undecylenate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '10ml Vial', basePrice: 24.5, unitLabel: 'per vial' },
  { name: 'Primobolon 100mg 10ml', generic: 'Methenolone Enanthate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '10ml Vial', basePrice: 40.0, unitLabel: 'per vial' },
  { name: 'Drostawin 100mg 10ml', generic: 'Drostanolone Propionate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '10ml Vial', basePrice: 25.5, unitLabel: 'per vial' },
  { name: 'Tren E 200mg 10ml', generic: 'Trenbolone Enanthate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '10ml Vial', basePrice: 40.5, unitLabel: 'per vial' },
  { name: 'Tren A 100mg 10ml', generic: 'Trenbolone Acetate', cat: 'muscle-performance', brand: 'Powerbolic', pack: '10ml Vial', basePrice: 26.0, unitLabel: 'per vial' },
  { name: 'Stanofit 10ml', generic: 'Stanozolol Injection', cat: 'muscle-performance', brand: 'Powerbolic', pack: '10ml Vial', basePrice: 14.5, unitLabel: 'per vial' },
  { name: 'Test-E 250mg 10ml', generic: 'Testosterone Enanthate', cat: 'muscle-performance', brand: 'Evolve', pack: '10ml Vial', basePrice: 18.5, unitLabel: 'per vial' },
  { name: 'Test-C 250mg 10ml', generic: 'Testosterone Cypionate', cat: 'muscle-performance', brand: 'Evolve', pack: '10ml Vial', basePrice: 19.0, unitLabel: 'per vial' },
  { name: 'Sustamix 250mg 10ml', generic: 'Testosterone Blend 250mg', cat: 'muscle-performance', brand: 'Evolve', pack: '10ml Vial', basePrice: 19.0, unitLabel: 'per vial' },
  { name: 'Decabol 250mg 10ml', generic: 'Nandrolone Decanoate', cat: 'muscle-performance', brand: 'Evolve', pack: '10ml Vial', basePrice: 23.0, unitLabel: 'per vial' },
  { name: 'Boldabol 250mg 10ml', generic: 'Boldenone Undecylenate', cat: 'muscle-performance', brand: 'Evolve', pack: '10ml Vial', basePrice: 23.0, unitLabel: 'per vial' },
  { name: 'Masteron 100mg 10ml', generic: 'Drostanolone Propionate', cat: 'muscle-performance', brand: 'Evolve', pack: '10ml Vial', basePrice: 25.0, unitLabel: 'per vial' },
  { name: 'Primobol 100mg 10ml', generic: 'Methenolone Enanthate', cat: 'muscle-performance', brand: 'Evolve', pack: '10ml Vial', basePrice: 40.0, unitLabel: 'per vial' },
  { name: 'Trenabol 100mg 10ml', generic: 'Trenbolone Acetate', cat: 'muscle-performance', brand: 'Evolve', pack: '10ml Vial', basePrice: 27.0, unitLabel: 'per vial' },
  { name: 'Winvol 100mg 10ml', generic: 'Stanozolol Injection', cat: 'muscle-performance', brand: 'Evolve', pack: '10ml Vial', basePrice: 15.5, unitLabel: 'per vial' },
  { name: 'Nandrolin 100mg 10ml', generic: 'Nandrolone Phenylpropionate', cat: 'muscle-performance', brand: 'Evolve', pack: '10ml Vial', basePrice: 16.5, unitLabel: 'per vial' },
  { name: 'Testaveron 250mg 10ml', generic: 'Testosterone Enanthate', cat: 'muscle-performance', brand: 'British Pharma', pack: '10ml Vial', basePrice: 23.0, unitLabel: 'per vial' },
  { name: 'Cypiomax 250mg 10ml', generic: 'Testosterone Cypionate', cat: 'muscle-performance', brand: 'British Pharma', pack: '10ml Vial', basePrice: 23.0, unitLabel: 'per vial' },
  { name: 'Decadura 250mg 10ml', generic: 'Nandrolone Decanoate', cat: 'muscle-performance', brand: 'British Pharma', pack: '10ml Vial', basePrice: 23.0, unitLabel: 'per vial' },
  { name: 'Primo-Depot 100mg 10ml', generic: 'Methenolone Enanthate', cat: 'muscle-performance', brand: 'British Pharma', pack: '10ml Vial', basePrice: 53.5, unitLabel: 'per vial' },
  { name: 'Mastprop 100mg 10ml', generic: 'Drostanolone Propionate', cat: 'muscle-performance', brand: 'British Pharma', pack: '10ml Vial', basePrice: 35.0, unitLabel: 'per vial' },
  { name: 'Testomix 250mg 10ml', generic: 'Testosterone Blend 250mg', cat: 'muscle-performance', brand: 'British Pharma', pack: '10ml Vial', basePrice: 24.0, unitLabel: 'per vial' },
  { name: 'Trenabol 200mg 10ml', generic: 'Trenbolone Enanthate', cat: 'muscle-performance', brand: 'British Pharma', pack: '10ml Vial', basePrice: 46.0, unitLabel: 'per vial' },
  { name: 'Anavar Maxx 10mg', generic: 'Oxandrolone', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1x10 Strip', basePrice: 4.0, unitLabel: 'per strip' },
  { name: 'Anadrol Maxx', generic: 'Oxymetholone', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1x10 Strip', basePrice: 3.0, unitLabel: 'per strip' },
  { name: 'Clenfit 40mg', generic: 'Clenbuterol Hydrochloride', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip' },
  { name: 'Clenfit 60mg', generic: 'Clenbuterol Hydrochloride', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip' },
  { name: 'Dianabol 10mg', generic: 'Methandienone', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1x10 Strip', basePrice: 1.6, unitLabel: 'per strip' },
  { name: 'T3 Cytomel 25mcg', generic: 'Liothyronine Sodium', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip' },
  { name: 'Stanofil Tab', generic: 'Stanozolol', cat: 'muscle-performance', brand: 'Powerbolic', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip' },
  { name: 'Anavar 10mg', generic: 'Oxandrolone', cat: 'muscle-performance', brand: 'Evolve', pack: '1x10 Strip', basePrice: 4.5, unitLabel: 'per strip' },
  { name: 'Androl 50mg', generic: 'Oxymetholone', cat: 'muscle-performance', brand: 'Evolve', pack: '1x10 Strip', basePrice: 3.5, unitLabel: 'per strip' },
  { name: 'Anabol 1mg', generic: 'Methandienone', cat: 'muscle-performance', brand: 'Evolve', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip' },
  { name: 'Clenabol 40mg', generic: 'Clenbuterol', cat: 'muscle-performance', brand: 'Evolve', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip' },
  { name: 'Winstrol 10mg', generic: 'Stanozolol', cat: 'muscle-performance', brand: 'Evolve', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip' },
  { name: 'Danabol 10mg', generic: 'Methandienone', cat: 'muscle-performance', brand: 'Evolve', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip' },
  { name: 'Provibol 25mg', generic: 'Mesterolone', cat: 'muscle-performance', brand: 'Evolve', pack: '1x10 Strip', basePrice: 3.8, unitLabel: 'per strip' },
  { name: 'Turinabol 10mg', generic: 'Chlorodehydromethyltestosterone', cat: 'muscle-performance', brand: 'Evolve', pack: '1x10 Strip', basePrice: 3.8, unitLabel: 'per strip' },
  { name: 'Anaoxan-10 (British)', generic: 'Oxandrolone', cat: 'muscle-performance', brand: 'British Pharma', pack: '50 tabs Box', basePrice: 39.0, unitLabel: 'per box' },
  { name: 'Briclean-40 (British)', generic: 'Clenbuterol', cat: 'muscle-performance', brand: 'British Pharma', pack: '100 tabs Box', basePrice: 14.5, unitLabel: 'per box' },
  { name: 'Dianabol-10 (British)', generic: 'Methandienone', cat: 'muscle-performance', brand: 'British Pharma', pack: '100 tabs Box', basePrice: 17.5, unitLabel: 'per box' },
  { name: 'Halotestin-5 (British)', generic: 'Fluoxymesterone', cat: 'muscle-performance', brand: 'British Pharma', pack: '50 tabs Box', basePrice: 75.0, unitLabel: 'per box' },
  { name: 'Proviron-25 (British)', generic: 'Mesterolone', cat: 'muscle-performance', brand: 'British Pharma', pack: '50 tabs Box', basePrice: 33.5, unitLabel: 'per box' },
  { name: 'Xyandrol (British)', generic: 'Oxandrolone / Anabolic Blend', cat: 'muscle-performance', brand: 'British Pharma', pack: '50 tabs Box', basePrice: 33.0, unitLabel: 'per box' },
  { name: 'Turinabol-10 (British)', generic: 'Chlorodehydromethyltestosterone', cat: 'muscle-performance', brand: 'British Pharma', pack: '50 tabs Box', basePrice: 28.0, unitLabel: 'per box' },
  { name: 'Dianabol DS 20mg (British)', generic: 'Methandienone', cat: 'muscle-performance', brand: 'British Pharma', pack: '100 tabs Box', basePrice: 36.0, unitLabel: 'per box' },

  // Ivermectin & Parasite
  { name: 'Iverheal 3mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Healing Pharma', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Iverheal 6mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Healing Pharma', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Iverheal 12mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Healing Pharma', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Iverlast 3mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Iverlast 6mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Iverlast 12mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Iverjohn 3mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Johnlee', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Iverjohn 6mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Johnlee', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Iverjohn 12mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Johnlee', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Iversun 6mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Sunrise', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Iversun 12mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Sunrise', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Iverash 3mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Asher', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Iverash 6mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Asher', pack: '1x10 Strip', basePrice: 0.7, unitLabel: 'per strip', basePill: 0.07 },
  { name: 'Iverash 12mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Asher', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Iverguard 3mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Fortune', pack: '1x10 Strip', basePrice: 0.5, unitLabel: 'per strip', basePill: 0.05 },
  { name: 'Iverguard 6mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Fortune', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Iverguard 12mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Fortune', pack: '1x10 Strip', basePrice: 0.8, unitLabel: 'per strip', basePill: 0.08 },
  { name: 'Iverguard 15mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Fortune', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Ivermaxx 12mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Ivermaxx 15mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Ivermaxx 20mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Ivermaxx 24mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 2.1, unitLabel: 'per strip', basePill: 0.21 },
  { name: 'Ivermaxx 40mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 2.5, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Ivermaxx 80mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.3 },
  { name: 'Covilife 12mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Covilife 20mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Covilife 24mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 2.1, unitLabel: 'per strip', basePill: 0.21 },
  { name: 'Covilife 40mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 2.5, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Ivervid 12mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Jeerima', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Ivervid 20mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Jeerima', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Ivervid 40mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Jeerima', pack: '1x10 Strip', basePrice: 2.5, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Covimectin 12mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Signature', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Iverfresh 12mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Orange City', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Iverbest 12mg', generic: 'Ivermectin', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Wormentel 150mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Wormentel 222mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 1.4, unitLabel: 'per strip', basePill: 0.14 },
  { name: 'Wormentel 444mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Wormentel 500mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 2.3, unitLabel: 'per strip', basePill: 0.23 },
  { name: 'Wormentel 888mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.3 },
  { name: 'Wormentel 1000mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 3.3, unitLabel: 'per strip', basePill: 0.33 },
  { name: 'Fenbentel 150mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Fenbentel 222mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.4, unitLabel: 'per strip', basePill: 0.14 },
  { name: 'Fenbentel 444mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Fenbentel 500mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 2.3, unitLabel: 'per strip', basePill: 0.23 },
  { name: 'Fenbentel 888mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.3 },
  { name: 'Fenbentel 1000mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 3.3, unitLabel: 'per strip', basePill: 0.33 },
  { name: 'Fenforce 150mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Fortune', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Fenforce 222mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Fortune', pack: '1x10 Strip', basePrice: 1.4, unitLabel: 'per strip', basePill: 0.14 },
  { name: 'Fenforce 444mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Fortune', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Fenforce 500mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Fortune', pack: '1x10 Strip', basePrice: 2.3, unitLabel: 'per strip', basePill: 0.23 },
  { name: 'Fenforce 1000mg', generic: 'Fenbendazole', cat: 'ivermectin-parasite', brand: 'Fortune', pack: '1x10 Strip', basePrice: 3.3, unitLabel: 'per strip', basePill: 0.33 },
  { name: 'Mebentel 100mg', generic: 'Mebendazole', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Mebentel 500mg', generic: 'Mebendazole', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 1.6, unitLabel: 'per strip', basePill: 0.16 },
  { name: 'Mebentel 1000mg', generic: 'Mebendazole', cat: 'ivermectin-parasite', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 2.8, unitLabel: 'per strip', basePill: 0.28 },
  { name: 'Wormiash 100mg', generic: 'Mebendazole', cat: 'ivermectin-parasite', brand: 'Asher', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Wormiash 500mg', generic: 'Mebendazole', cat: 'ivermectin-parasite', brand: 'Asher', pack: '1x10 Strip', basePrice: 1.6, unitLabel: 'per strip', basePill: 0.16 },
  { name: 'Wormiash 1000mg', generic: 'Mebendazole', cat: 'ivermectin-parasite', brand: 'Asher', pack: '1x10 Strip', basePrice: 2.8, unitLabel: 'per strip', basePill: 0.28 },
  { name: 'Mebenda 100mg', generic: 'Mebendazole', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 0.6, unitLabel: 'per strip', basePill: 0.06 },
  { name: 'Mebenda 200mg', generic: 'Mebendazole', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Mebenda 500mg', generic: 'Mebendazole', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 1.5, unitLabel: 'per strip', basePill: 0.15 },
  { name: 'Mebenda 1000mg', generic: 'Mebendazole', cat: 'ivermectin-parasite', brand: 'Winlife', pack: '1x10 Strip', basePrice: 2.5, unitLabel: 'per strip', basePill: 0.25 },

  // Sirolimus
  { name: 'Siraboon 1mg', generic: 'Sirolimus', cat: 'sirolimus', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 5.5, unitLabel: 'per strip', basePill: 0.55 },
  { name: 'Siraboon 2mg', generic: 'Sirolimus', cat: 'sirolimus', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 7.0, unitLabel: 'per strip', basePill: 0.7 },
  { name: 'Siraboon 3mg', generic: 'Sirolimus', cat: 'sirolimus', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 12.0, unitLabel: 'per strip', basePill: 1.2 },
  { name: 'Siraboon 5mg', generic: 'Sirolimus', cat: 'sirolimus', brand: 'Kachhela', pack: '1x10 Strip', basePrice: 18.0, unitLabel: 'per strip', basePill: 1.8 },
  { name: 'Siromus 1mg', generic: 'Sirolimus', cat: 'sirolimus', brand: 'Zydus', pack: '1x10 Strip', basePrice: 14.0, unitLabel: 'per strip', basePill: 1.4 },
  { name: 'Rapacan 1mg', generic: 'Sirolimus', cat: 'sirolimus', brand: 'Biocon', pack: '1x10 Strip', basePrice: 40.0, unitLabel: 'per strip', basePill: 4.0 },

  // Antibiotics
  { name: 'Amoxyclav 625mg', generic: 'Amoxicillin + Clavulanic Acid', cat: 'antibiotics', brand: 'Zydus', pack: '1x10 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.3 },
  { name: 'Almox 250mg', generic: 'Amoxicillin', cat: 'antibiotics', brand: 'Alkem', pack: '1x10 Strip', basePrice: 1.0, unitLabel: 'per strip', basePill: 0.1 },
  { name: 'Almox 500mg', generic: 'Amoxicillin', cat: 'antibiotics', brand: 'Alkem', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Azithromax 250mg', generic: 'Azithromycin', cat: 'antibiotics', brand: 'Signature', pack: '1x6 Strip', basePrice: 2.5, unitLabel: 'per strip', basePill: 0.25 },
  { name: 'Azithromax 500mg', generic: 'Azithromycin', cat: 'antibiotics', brand: 'Signature', pack: '1x3 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.3 },
  { name: 'Azicip 250mg', generic: 'Azithromycin', cat: 'antibiotics', brand: 'Cipla', pack: '1x6 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Azicip 500mg', generic: 'Azithromycin', cat: 'antibiotics', brand: 'Cipla', pack: '1x3 Strip', basePrice: 3.5, unitLabel: 'per strip', basePill: 0.35 },
  { name: 'Azimax 250mg', generic: 'Azithromycin', cat: 'antibiotics', brand: 'Cipla', pack: '1x6 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.2 },
  { name: 'Azimax 500mg', generic: 'Azithromycin', cat: 'antibiotics', brand: 'Cipla', pack: '1x5 Strip', basePrice: 3.0, unitLabel: 'per strip', basePill: 0.3 },

  // ADHD Medicine
  { name: 'Atogard 18mg', generic: 'Atomoxetine', cat: 'adhd-medicine', brand: 'Fortune', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Atogard 25mg', generic: 'Atomoxetine', cat: 'adhd-medicine', brand: 'Fortune', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Atogard 40mg', generic: 'Atomoxetine', cat: 'adhd-medicine', brand: 'Fortune', pack: '1x10 Strip', basePrice: 2.2, unitLabel: 'per strip', basePill: 0.22 },
  { name: 'Atogard 60mg', generic: 'Atomoxetine', cat: 'adhd-medicine', brand: 'Fortune', pack: '1x10 Strip', basePrice: 2.6, unitLabel: 'per strip', basePill: 0.26 },
  { name: 'Atomoxet 18mg', generic: 'Atomoxetine', cat: 'adhd-medicine', brand: 'Healing', pack: '1x10 Strip', basePrice: 1.2, unitLabel: 'per strip', basePill: 0.12 },
  { name: 'Atomoxet 25mg', generic: 'Atomoxetine', cat: 'adhd-medicine', brand: 'Healing', pack: '1x10 Strip', basePrice: 1.8, unitLabel: 'per strip', basePill: 0.18 },
  { name: 'Atomoxet 40mg', generic: 'Atomoxetine', cat: 'adhd-medicine', brand: 'Healing', pack: '1x10 Strip', basePrice: 2.2, unitLabel: 'per strip', basePill: 0.22 },
  { name: 'Axepta 10mg', generic: 'Atomoxetine', cat: 'adhd-medicine', brand: 'Intas', pack: '1x10 Strip', basePrice: 3.5, unitLabel: 'per strip', basePill: 0.35 },
  { name: 'Axepta 25mg', generic: 'Atomoxetine', cat: 'adhd-medicine', brand: 'Intas', pack: '1x10 Strip', basePrice: 4.5, unitLabel: 'per strip', basePill: 0.45 },
  { name: 'Axepta 40mg', generic: 'Atomoxetine', cat: 'adhd-medicine', brand: 'Intas', pack: '1x10 Strip', basePrice: 5.5, unitLabel: 'per strip', basePill: 0.55 },
  { name: 'Axepta 60mg', generic: 'Atomoxetine', cat: 'adhd-medicine', brand: 'Intas', pack: '1x10 Strip', basePrice: 6.5, unitLabel: 'per strip', basePill: 0.65 },
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function inferStrength(name: string): string {
  const match = name.match(/(\d+(?:\.\d+)?\s*(?:mg|mcg|ml|%|gm))/i);
  return match ? match[1] : 'Standard';
}

function inferForm(pack: string): string {
  const lower = pack.toLowerCase();
  if (lower.includes('vial')) return 'Vial';
  if (lower.includes('ampoule')) return 'Ampoule';
  if (lower.includes('pen')) return 'Prefilled Pen';
  if (lower.includes('tube')) return 'Topical Gel / Cream';
  if (lower.includes('sachet') || lower.includes('jelly')) return 'Oral Jelly / Sachet';
  if (lower.includes('inj') || lower.includes('dose')) return 'Injection';
  if (lower.includes('bottle')) return 'Bottle';
  if (lower.includes('box')) return 'Box';
  return 'Tablets / Strip';
}

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((item, idx) => {
  const unitPrice = round2(item.basePrice * 4);
  const perPillPrice =
    item.basePill !== undefined ? round2(item.basePill * 4) : undefined;
  const categoryName = CATEGORY_MAP.get(item.cat) ?? 'Pharmaceutical';
  return {
    id: `${slugify(item.name)}-${slugify(item.brand)}-${idx + 1}`,
    name: item.name,
    generic: item.generic,
    categoryId: item.cat,
    categoryName,
    manufacturer: item.brand,
    packaging: item.pack,
    unitLabel: item.unitLabel,
    unitPrice,
    perPillPrice,
    badge: item.badge,
    strength: inferStrength(item.name),
    form: inferForm(item.pack),
    packs: [{ label: item.pack, price: unitPrice }],
    description: `${item.name} (${item.generic}) manufactured by ${item.brand}, supplied in factory-sealed ${item.pack} packaging for worldwide export.`,
    inStock: true,
  };
});

export const FAQ_ITEMS = [
  {
    question: 'Do you accept credit cards or PayPal?',
    answer:
      'No. We accept Bank Transfer, Wise, Remitly, Crypto (Bitcoin/USDT), Western Union, MoneyGram, and Revolut.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'Bank Transfer | Wise | Remitly | Crypto (Bitcoin/USDT) | Western Union | MoneyGram | Revolut.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Delivery typically takes 7–15 business days for most destinations. The UK is usually the fastest route.',
  },
  {
    question: 'Do you ship to my country?',
    answer:
      'We ship almost everywhere worldwide, except Pakistan. Israel is also restricted.',
  },
  {
    question: 'Is the packaging discreet?',
    answer:
      'Yes. Every parcel is packed using specialised protocols refined over 16+ years of export experience.',
  },
  {
    question: 'Are the products genuine?',
    answer:
      'Yes. India is the #2 exporter of medicines in the world. All our products are sourced from verified manufacturers.',
  },
  {
    question: 'What if my parcel is seized by customs?',
    answer:
      'If a parcel is stuck in customs for 10 days, we offer reshipment. High-value products above $100 per unit are excluded.',
  },
  {
    question: 'Do I need a prescription?',
    answer:
      'Optional but preferred. Most products do not require a prescription for export.',
  },
  {
    question: 'Can I track my order?',
    answer:
      'Yes. Tracking is provided the same day your order is dispatched.',
  },
  {
    question: 'Do you offer bulk pricing?',
    answer:
      'Yes. Favourable pricing for dropshippers and larger quantities.',
  },
  {
    question: 'What is your minimum order?',
    answer: 'As little as 10 tablets (1 strip).',
  },
  {
    question: 'Can I return products?',
    answer: 'No. Products cannot be returned once dispatched.',
  },
];

export const SHIPPING_REGIONS = [
  { region: 'United States & Canada', window: '7 – 12 Business Days', carrier: 'USPS / EMS / Express Air' },
  { region: 'United Kingdom & Europe', window: '6 – 10 Business Days', carrier: 'Royal Mail / DHL / EU Line' },
  { region: 'Australia & New Zealand', window: '8 – 14 Business Days', carrier: 'Australia Post / EMS' },
  { region: 'Middle East & Asia-Pacific', window: '5 – 9 Business Days', carrier: 'Aramex / DHL Express' },
  { region: 'Rest of World', window: '10 – 15 Business Days', carrier: 'Tracked International Air' },
];
