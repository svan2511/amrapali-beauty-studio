// Central image library — all people photos are Indian subjects
// (free Unsplash photos, hotlinked with sizing params)
const u = (id) => `https://images.unsplash.com/photo-${id}?q=80&w=900&auto=format&fit=crop`

export const IMAGES = {
  // Smiling young Indian woman in black saree with temple jewellery (Mumbai)
  heroPortrait: u('1745237015356-cefb04c70b46'),
  // Indian bride in red saree with nath, sindoor & gold bangles (Kolkata)
  bridalGlow: u('1742891602747-383fc69b4e39'),
  // Young South-Asian man with styled curly hair & trimmed beard
  menHairBeard: u('1667006328505-969202acac5e'),
  // Indian woman in bandhani dupatta with maang-tikka, festive glow
  skinRadiance: u('1706685481823-b8f1a1c11fca'),
  // South Indian bridal hands with henna & traditional bangles
  mehndiHands: u('1686865604150-43f95d61416c'),
  // Indian wedding couple in traditional attire
  weddingCouple: u('1583939003579-730e3918a45a'),
  // Indian woman in printed suit with long black hair
  indianHair: u('1742800786544-e935375035e3'),
}

// Hero slider — photo + its own matching content.
// New photo? Add one more block (src in public/, mode auto).
// mode 'minimal' = photo already has big text/board → short overlay text
// mode 'full'    = clean photo → full headline block
export const HERO_SLIDES = [
  {
    src: '/hero.png',
    alt: 'Aamarpali Beauty Spa studio front in Roorkee',
    mode: 'minimal',
    eyebrow: 'Visit Our Studio',
    titleA: "Roorkee's own",
    titleAccent: 'luxury unisex salon.',
    sub: 'Spot the golden glow on Paniyala Road — walk in for everyday grooming or a complete occasion transformation.',
    cardTitle: 'Our Studio Front',
    cardSub: 'Paniyala Road, Gandhi Nagar',
  },
  {
    src: '/hero-2.png',
    alt: 'Inside Amarpali Beauty Studio salon in Roorkee',
    mode: 'full',
    eyebrow: 'The Sanctuary',
    titleA: 'Beauty that feels',
    titleAccent: 'like you.',
    sub: 'A modern unisex beauty sanctuary creating effortless looks, thoughtful artisanal rituals, and quiet confidence.',
    cardTitle: 'Styling Lounge',
    cardSub: 'Calm chairs, honest craft',
  },
  {
    src: '/hero-3.png',
    alt: 'Premium product wall and styling mirror at Amarpali Studio',
    mode: 'full',
    eyebrow: 'Curated & Clean',
    titleA: 'Only what your',
    titleAccent: 'skin & hair loves.',
    sub: 'Professional-grade, cruelty-free products chosen for Indian hair textures and skin — nothing harsh, ever.',
    cardTitle: 'Curated Shelves',
    cardSub: 'Professional-grade care',
  },
  {
    src: '/hero-4.png',
    alt: 'Styling chairs and lounge at Amarpali Beauty Studio',
    mode: 'full',
    eyebrow: 'Take A Seat',
    titleA: 'Sit back.',
    titleAccent: "We'll handle the rest.",
    sub: 'From quick trims to slow Sunday rituals — every chair is designed for comfort, calm and great conversation.',
    cardTitle: 'Styling Stations',
    cardSub: 'Comfort in every chair',
  },
]
