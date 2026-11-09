/**
 * THE SOCIAL VINE STUDIO — OFFICIAL PRICING & MONTHLY RETAINERS DATA
 * Centralized, editable configuration for agency packages and add-on services.
 */

export const PRICING_PACKAGES = [
  {
    id: 'starter',
    number: '01',
    name: 'Starter',
    subtitle: 'BUILD YOUR PRESENCE',
    price: 4999,
    formattedPrice: '₹4,999',
    period: '/ month',
    popular: false,
    badge: null,
    summary: 'Ideal for emerging brands establishing a consistent, high-aesthetic social foundation.',
    deliverables: [
      { count: '04', label: 'REELS', description: 'short, engaging videos' },
      { count: '06', label: 'POSTS', description: 'feed posts / creatives' },
      { count: '06', label: 'STORIES', description: 'daily engagement' }
    ],
    features: [
      'Content Planning & Strategy',
      'Captions & Hashtags',
      'Basic Performance Report'
    ],
    cta: 'Choose Starter'
  },
  {
    id: 'growth',
    number: '02',
    name: 'Growth',
    subtitle: 'EXPAND YOUR REACH',
    price: 9999,
    formattedPrice: '₹9,999',
    period: '/ month',
    popular: true,
    badge: 'MOST POPULAR',
    summary: 'Engineered for scaling brands seeking aggressive organic distribution and audience loyalty.',
    deliverables: [
      { count: '08', label: 'REELS', description: 'short, engaging videos' },
      { count: '10', label: 'POSTS', description: 'feed posts / creatives' },
      { count: '12', label: 'STORIES', description: 'daily engagement' }
    ],
    features: [
      'Content Planning & Strategy',
      'Captions & Hashtags',
      'Basic Performance Report',
      'Audience Engagement Support'
    ],
    cta: 'Choose Growth'
  },
  {
    id: 'premium',
    number: '03',
    name: 'Premium',
    subtitle: 'MAXIMUM IMPACT',
    price: 17999,
    formattedPrice: '₹17,999',
    period: '/ month',
    popular: false,
    badge: null,
    summary: 'Full-spectrum creative direction, high-cadence production, and priority agency leadership.',
    deliverables: [
      { count: '12', label: 'REELS', description: 'short, engaging videos' },
      { count: '12', label: 'POSTS', description: 'feed posts / creatives' },
      { count: '14', label: 'STORIES', description: 'daily engagement' }
    ],
    features: [
      'Content Planning & Strategy',
      'Captions & Hashtags',
      'Basic Performance Report',
      'Audience Engagement Support',
      'Priority Support'
    ],
    cta: 'Choose Premium'
  }
];

export const SHOOT_ADDON = {
  id: 'model-shoot',
  number: '04',
  tag: 'OPTIONAL ADD-ON',
  title: 'ON-SITE MODEL SHOOT.',
  description: 'Professional on-location photoshoots for your brand.',
  details: 'High-concept creative direction, studio lighting, professional model staging, and color-graded editorial stills ready for high-conversion campaigns.',
  priceRange: '₹3,500 – ₹5,000',
  period: '/ session',
  cta: 'Enquire About a Shoot'
};
