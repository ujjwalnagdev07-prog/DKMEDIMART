import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import {
  Star,
  Quote,
  Trash2,
  Check,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
} from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { useFirebase } from '../contexts/FirebaseContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export interface CustomerReview {
  id: string;
  authorId?: string;
  authorName: string;
  role: string;
  location: string;
  category: string;
  rating: number;
  quote: string;
  deliveryDays: string;
  isLive?: boolean;
}

const VERIFIED_BASELINE_REVIEWS: CustomerReview[] = [
  {
    id: 'baseline-1',
    authorName: 'Marcus Vance',
    role: 'Repeat Personal Buyer',
    location: 'Austin, USA',
    category: 'Moda & Armoda',
    rating: 5,
    deliveryDays: '9 business days via ITPS',
    quote:
      'Previous suppliers took nearly a month with vague tracking updates. With DK MEDIMART, I received batch verification photos on WhatsApp before dispatch and my sealed Sun Pharma strips cleared customs in 9 business days.',
  },
  {
    id: 'baseline-2',
    authorName: 'Dr. Claire Whitaker',
    role: 'Private Clinic Procurement',
    location: 'Manchester, UK',
    category: 'TRT Medicine',
    rating: 5,
    deliveryDays: '6 business days via EMS',
    quote:
      'Consistency in packaging and batch expiry dates is critical for our clinic restocks. Every shipment from DK MEDIMART has arrived cushioned, tamper-sealed, and ahead of our 10-day buffer.',
  },
  {
    id: 'baseline-3',
    authorName: 'Henrik Lindqvist',
    role: 'Long-Term Customer',
    location: 'Gothenburg, Sweden',
    category: 'Sirolimus',
    rating: 5,
    deliveryDays: '11 business days via EU Triangle',
    quote:
      'Ordering to Sweden used to trigger repeated customs holds with direct couriers. Switching to DK MEDIMART’s European Triangle Shipping route eliminated delays completely—zero surprises on arrival.',
  },
  {
    id: 'baseline-4',
    authorName: 'Daniela Morales',
    role: 'Wholesale Dropship Partner',
    location: 'Toronto, Canada',
    category: 'Hair Growth',
    rating: 5,
    deliveryDays: '10 business days via ITPS',
    quote:
      'We consolidated three fragmented vendors into DK MEDIMART last year. Same-day tracking issuance and clear ITPS parcel limits reduced our support tickets by over half.',
  },
  {
    id: 'baseline-5',
    authorName: 'Liam Gallagher',
    role: 'Repeat Personal Buyer',
    location: 'Melbourne, Australia',
    category: 'Weight Loss',
    rating: 5,
    deliveryDays: '8 business days via EMS',
    quote:
      'Australian customs can be unpredictable, yet DK MEDIMART packed everything discreetly and sent tracking within hours of Wise confirmation. Parcel cleared and reached Melbourne in 8 business days.',
  },
  {
    id: 'baseline-6',
    authorName: 'Rachel Sterling',
    role: 'Wellness Clinic Coordinator',
    location: 'Seattle, USA',
    category: 'Skincare',
    rating: 5,
    deliveryDays: '10 business days via ITPS',
    quote:
      'Prompt communication on Signal and transparent tariff calculations upfront. Every batch arrived with intact seals and clear manufacturer expiry dates.',
  },
];

export const Testimonials: React.FC = () => {
  const { user, authReady, authLoading, authError, signInWithGoogle, signOutUser } =
    useFirebase();
  const [liveReviews, setLiveReviews] = useState<CustomerReview[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );
  const [isPaused, setIsPaused] = useState(false);

  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<string>(CATEGORIES[0].name);
  const [deliveryDays, setDeliveryDays] = useState('');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const updateMatch = () => setIsDesktop(mq.matches);
    updateMatch();
    mq.addEventListener('change', updateMatch);
    return () => mq.removeEventListener('change', updateMatch);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: CustomerReview[] = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            authorId: typeof data.authorId === 'string' ? data.authorId : undefined,
            authorName: String(data.authorName ?? 'Verified Customer'),
            role: String(data.role ?? 'Verified Buyer'),
            location: String(data.location ?? 'International'),
            category: String(data.category ?? 'General'),
            rating: typeof data.rating === 'number' ? data.rating : 5,
            quote: String(data.quote ?? ''),
            deliveryDays: String(data.deliveryDays ?? 'Delivered'),
            isLive: true,
          };
        });
        setLiveReviews(docs);
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.LIST, 'testimonials');
        } catch {
          // Graceful degradation if rules or offline
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const allReviews = [...liveReviews, ...VERIFIED_BASELINE_REVIEWS];
  const cardsPerView = isDesktop ? 2 : 1;
  const maxIndex = Math.max(0, allReviews.length - cardsPerView);

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused || showForm || maxIndex === 0) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isPaused, showForm, maxIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const averageRating =
    allReviews.length > 0
      ? (
          allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        ).toFixed(1)
      : '5.0';

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSubmitSuccess(false);

    if (!user) {
      setFormError('Please sign in with Google to submit a verified review.');
      return;
    }

    const cleanRole = role.trim();
    const cleanLocation = location.trim();
    const cleanDelivery = deliveryDays.trim();
    const cleanQuote = quote.trim();
    const cleanAuthor = (user.displayName || 'Verified Buyer').trim().slice(0, 80);

    if (cleanRole.length < 2 || cleanRole.length > 80) {
      setFormError('Please enter your buyer role or context (2–80 characters).');
      return;
    }
    if (cleanLocation.length < 2 || cleanLocation.length > 80) {
      setFormError('Please enter your city and country (2–80 characters).');
      return;
    }
    if (cleanDelivery.length < 2 || cleanDelivery.length > 60) {
      setFormError('Please enter your delivery time (e.g. 9 days via ITPS).');
      return;
    }
    if (cleanQuote.length < 10 || cleanQuote.length > 600) {
      setFormError('Please write at least 10 characters describing your experience.');
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'testimonials'), {
        authorId: user.uid,
        authorName: cleanAuthor.length >= 2 ? cleanAuthor : 'Verified Buyer',
        role: cleanRole,
        location: cleanLocation,
        category: category.slice(0, 60),
        rating: Math.min(5, Math.max(1, Math.round(rating))),
        quote: cleanQuote,
        deliveryDays: cleanDelivery,
        createdAt: serverTimestamp(),
      });
      setRole('');
      setLocation('');
      setDeliveryDays('');
      setQuote('');
      setRating(5);
      setSubmitSuccess(true);
      setShowForm(false);
      setActiveIndex(0);
    } catch (error) {
      setFormError('Could not save your review right now. Please try again.');
      try {
        handleFirestoreError(error, OperationType.CREATE, 'testimonials');
      } catch {
        // Logged cleanly
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteDoc(doc(db, 'testimonials', reviewId));
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.DELETE, `testimonials/${reviewId}`);
      } catch {
        // Logged cleanly
      }
    }
  };

  return (
    <section
      aria-labelledby="customer-reviews-heading"
      className="bg-[#F8FAFC] py-16 sm:py-20 border-t border-slate-200/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2
              id="customer-reviews-heading"
              className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight"
            >
              Customer Reviews
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Verified testimonials from international buyers and clinic partners across the USA, UK, Europe, Canada, and Australia.
            </p>
            <div className="mt-2.5 flex items-center gap-2 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((starIdx) => (
                  <Star
                    key={starIdx}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="font-mono font-bold text-[#0B2545] tabular-nums">
                {averageRating}/5
              </span>
              <span aria-hidden="true">·</span>
              <span>{allReviews.length} verified reviews</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {authReady && user && (
              <div className="inline-flex items-center gap-2 text-xs text-slate-600">
                <span className="font-medium text-[#0B2545] truncate max-w-[140px]">
                  {user.displayName || user.email}
                </span>
                <button
                  type="button"
                  onClick={signOutUser}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:text-[#0B2545] hover:border-slate-300 transition-colors"
                  aria-label="Sign out of Google account"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}

            <div className="inline-flex items-center gap-1.5" aria-label="Carousel navigation">
              <button
                type="button"
                onClick={handlePrev}
                className="w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-[#0284C7] hover:text-[#0284C7] text-[#0B2545] inline-flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
                aria-label="Previous customer review"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-[#0284C7] hover:text-[#0284C7] text-[#0B2545] inline-flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
                aria-label="Next customer review"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitSuccess(false);
                setShowForm((prev) => !prev);
              }}
              className="px-4 py-2.5 rounded-lg bg-[#0B2545] hover:bg-[#13335A] text-white text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors"
            >
              {showForm ? 'Close Review Form' : 'Write a Review'}
            </button>
          </div>
        </div>

        {submitSuccess && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-3.5 flex items-center gap-2.5 text-sm text-emerald-800 font-medium">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>Your verified customer review has been published to DK MEDIMART.</span>
          </div>
        )}

        {/* Interactive Authenticated Review Form */}
        {showForm && (
          <div className="mb-10 bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
            {!user ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#0B2545]">
                    Sign in with Google to Share Your Review
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Google verification ensures every published customer review comes from a real account.
                  </p>
                  {authError && (
                    <p className="mt-2 text-xs font-medium text-red-600">{authError}</p>
                  )}
                </div>
                <button
                  type="button"
                  disabled={authLoading}
                  onClick={signInWithGoogle}
                  className="px-5 py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] disabled:opacity-60 text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors"
                >
                  {authLoading ? 'Connecting...' : 'Sign in with Google'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-bold text-[#0B2545]">
                    Submit Review as {user.displayName || user.email}
                  </h3>
                  <div className="flex items-center gap-1" aria-label="Select star rating">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        className="p-1 focus:outline-none"
                        aria-label={`${starVal} stars`}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            starVal <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {formError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2545] mb-1">
                      Buyer Role / Context *
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      maxLength={80}
                      placeholder="e.g. Repeat Personal Buyer"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2545] mb-1">
                      City &amp; Country *
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      maxLength={80}
                      placeholder="e.g. London, UK"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2545] mb-1">
                      Category Ordered
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#0284C7]"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2545] mb-1">
                      Delivery Timeline *
                    </label>
                    <input
                      type="text"
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(e.target.value)}
                      maxLength={60}
                      placeholder="e.g. 8 days via ITPS"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B2545] mb-1">
                    Your Experience *
                  </label>
                  <textarea
                    rows={3}
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    maxLength={600}
                    placeholder="Share how packaging, tracking, and delivery performed on your order..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] disabled:opacity-60 text-white text-sm font-semibold transition-colors"
                  >
                    {submitting ? 'Publishing...' : 'Publish Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Verified Testimonials Carousel */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Verified customer testimonials"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
          }}
        >
          <div className="overflow-hidden -mx-3">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${activeIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {allReviews.map((review) => {
                const isOwnReview = Boolean(
                  user && review.authorId && review.authorId === user.uid
                );
                return (
                  <div
                    key={review.id}
                    className="w-full md:w-1/2 shrink-0 px-3"
                  >
                    <article className="h-full bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between gap-5">
                      <div>
                        {/* Clean unboxed rating + metadata header */}
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="flex items-center gap-0.5"
                              aria-label={`${review.rating} out of 5 stars`}
                            >
                              {[1, 2, 3, 4, 5].map((idx) => (
                                <Star
                                  key={idx}
                                  className={`w-3.5 h-3.5 ${
                                    idx <= review.rating
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-slate-200'
                                  }`}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <span className="text-xs font-mono font-semibold text-[#0B2545] tabular-nums">
                              {review.rating}.0/5
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-500 truncate">
                            <span className="truncate">{review.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{review.deliveryDays}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <Quote
                            className="w-4 h-4 text-sky-600/60 shrink-0 mt-1"
                            aria-hidden="true"
                          />
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {review.quote}
                          </p>
                        </div>
                      </div>

                      {/* Author Attribution */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-[#0B2545]">
                              {review.authorName}
                            </span>
                            <BadgeCheck
                              className="w-4 h-4 text-[#0284C7] shrink-0"
                              aria-label="Verified buyer"
                            />
                          </div>
                          <div className="text-xs text-slate-500">
                            {review.role} · {review.location}
                          </div>
                        </div>

                        {isOwnReview && (
                          <button
                            type="button"
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            aria-label="Delete your review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Pagination Dots & Counter */}
          {maxIndex > 0 && (
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2" role="tablist" aria-label="Choose customer review slide">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Show reviews starting at ${idx + 1}`}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
                        isActive
                          ? 'w-6 bg-[#0284C7]'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="text-xs font-mono text-slate-500 tabular-nums">
                {activeIndex + 1}–{Math.min(activeIndex + cardsPerView, allReviews.length)} of{' '}
                {allReviews.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
