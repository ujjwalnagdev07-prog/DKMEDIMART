import React from 'react';
import type { CategoryId } from '../data/catalog';

interface CategoryIconProps {
  id: CategoryId;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ id, className = 'w-7 h-7' }) => {
  switch (id) {
    case 'ed-medicine':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M14 23.5S4.5 17.5 4.5 10.6C4.5 7.4 7 5 10 5c1.8 0 3.3.9 4 2.2C14.7 5.9 16.2 5 18 5c3 0 5.5 2.4 5.5 5.6 0 6.9-9.5 12.9-9.5 12.9Z"
            fill="#0284C7"
            stroke="#0F172A"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M9.5 9.2c-.8.4-1.4 1.2-1.5 2.1" stroke="#E0F2FE" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'sleep-aid':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M19.8 18.6A8.5 8.5 0 0 1 11.4 6a8.5 8.5 0 1 0 10.6 11.8c-.7.3-1.4.6-2.2.8Z"
            fill="#FACC15"
            stroke="#0F172A"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'pain-management':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M8.7 10.3a2.6 2.6 0 1 1 2.2-4.1 2.6 2.6 0 0 1 4.2 2.4l4.3 4.3a2.6 2.6 0 1 1 2.4 4.2 2.6 2.6 0 1 1-4.1 2.2l-4.3-4.3a2.6 2.6 0 0 1-4.7-4.7Z"
            fill="#F1F5F9"
            stroke="#0F172A"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'moda-armoda':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M15.8 3.8 6.5 15.2h6.8l-1.5 9 9.7-11.6h-6.8l1.1-8.8Z"
            fill="#FBBF24"
            stroke="#0F172A"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'trt-medicine':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M8 5c0 4.5 12 4.5 12 9s-12 4.5-12 9"
            stroke="#0284C7"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 5c0 4.5-12 4.5-12 9s12 4.5 12 9"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M9.5 8h9M10 14h8M9.5 20h9" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'anti-acne':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="m14.5 4.5 2.1 5.6 5.6 2.1-5.6 2.1-2.1 5.6-2.1-5.6-5.6-2.1 5.6-2.1 2.1-5.6Z"
            fill="#38BDF8"
            stroke="#0F172A"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="m21.5 17.5.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9.9-2.2Z"
            fill="#FACC15"
            stroke="#0F172A"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'anti-cancer':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M14 14.5c2.8-2.6 4.5-4.7 4.5-7a4.5 4.5 0 0 0-9 0c0 2.3 1.7 4.4 4.5 7Zm0 0-5.2 7.5m5.2-7.5 5.2 7.5"
            stroke="#0F172A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="7.5" r="2.6" fill="#F472B6" />
        </svg>
      );
    case 'hair-growth':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <circle cx="14" cy="14" r="8.5" fill="#E0F2FE" stroke="#0F172A" strokeWidth="1.75" />
          <path
            d="M9 12c1.2-3 4-4.5 6.8-3.8 2.4.6 3.7 2.5 3.7 4.8"
            stroke="#0F172A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M11 16.5c1.5 1.5 4.5 1.5 6 0" stroke="#0284C7" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case 'weight-loss':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path d="M14 5v18M8 23h12M6 10h16" stroke="#0F172A" strokeWidth="1.75" strokeLinecap="round" />
          <path d="m6 10-2.5 5.5h5L6 10Zm16 0-2.5 5.5h5L22 10Z" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case 'muscle-performance':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M7 19.5c0-4 2.5-6.5 6.5-6.5 2 0 3.5.8 4.5 2 1-1.5 1-3.5 0-5-.8-1.2-2.2-1.8-3.5-1.4"
            stroke="#0F172A"
            strokeWidth="1.85"
            strokeLinecap="round"
          />
          <path
            d="M7 19.5c0 2.2 2.2 3.5 6 3.5 4.2 0 7.5-2.2 7.5-5.5 0-2-.8-3.5-2.5-4.5"
            fill="#FDE68A"
            stroke="#0F172A"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'ivermectin-parasite':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M6.5 21.5C6.5 12.5 13 6.5 21.5 6.5c0 8.5-6 15-15 15Z"
            fill="#22C55E"
            stroke="#0F172A"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M6.5 21.5 17 11" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'sirolimus':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M14 4.5 6.5 7.8v5.7c0 4.9 3.2 9.4 7.5 10.7 4.3-1.3 7.5-5.8 7.5-10.7V7.8L14 4.5Z"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M14 4.5v19.7c4.3-1.3 7.5-5.8 7.5-10.7V7.8L14 4.5Z" fill="#EF4444" fillOpacity="0.85" />
        </svg>
      );
    case 'antibiotics':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <rect
            x="5.5"
            y="11"
            width="17"
            height="8.5"
            rx="4.25"
            transform="rotate(-35 14 14)"
            fill="#38BDF8"
            stroke="#0F172A"
            strokeWidth="1.75"
          />
          <path d="m11.5 10.5 5 7" stroke="#0F172A" strokeWidth="1.6" />
        </svg>
      );
    case 'adhd-medicine':
      return (
        <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
          <path
            d="M14 7a4.5 4.5 0 0 0-4.5 4.5c0 .7.2 1.3.4 1.9A3.5 3.5 0 0 0 8 16.5a3.5 3.5 0 0 0 3.5 3.5H14V7Z"
            fill="#FDA4AF"
            stroke="#0F172A"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
          <path
            d="M14 7a4.5 4.5 0 0 1 4.5 4.5c0 .7-.2 1.3-.4 1.9a3.5 3.5 0 0 1 1.9 3.1 3.5 3.5 0 0 1-3.5 3.5H14V7Z"
            fill="#FBCFE8"
            stroke="#0F172A"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};
