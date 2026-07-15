/**
 * Realistic IrisPro content for the /components specimen, transcribed from
 * the V1 reference screens. Where sources conflict, the FIRST variant
 * encountered is used — every conflict is logged in /_conflicts.md, none
 * were resolved here.
 *
 * Images are generated SVG placeholders (correct intrinsic dimensions, zero
 * network) until Stage 4 supplies real assets.
 */

import type {
  AskAiContent,
  CertItem,
  CinematicHeroContent,
  ComparisonRow,
  CtaAction,
  GuideChapter,
  MediaContent,
  PriorityOption,
  ProblemCard,
  ProductItem,
  ProjectItem,
  SeriesColumn,
  SpectrumBand,
  StatItem,
  TechPillar,
} from '@/types/content';

function placeholder(
  width: number,
  height: number,
  alt: string,
  label = alt,
  bg = '#1f2027',
  fg = '#9a9aa5',
): MediaContent {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">` +
    `<rect width="100%" height="100%" fill="${bg}"/>` +
    `<text x="50%" y="50%" fill="${fg}" font-family="sans-serif" font-size="${Math.max(14, width / 30)}" text-anchor="middle" dominant-baseline="middle">${label}</text>` +
    `</svg>`;
  return {
    src: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    alt,
    width,
    height,
  };
}

/* ── 1. CinematicHero ── */
export const HERO: CinematicHeroContent = {
  eyebrow: 'IrisPro Protection',
  // The longest real headline — the 360px no-overflow test string.
  headlineLines: ['Advanced Protection', 'Engineered for ASEAN Climate'],
  subhead:
    'Protecting People, Property and Our Future through Advanced Optical Technology.',
  benefits: [
    { icon: 'sun', label: 'Blocks UV400 & HEV Blue Light' },
    { icon: 'thermometer', label: 'Superior Heat Rejection' },
    { icon: 'shield', label: 'Protects Interior & Skin' },
    { icon: 'bolt', label: 'Save Energy & Fuel' },
    { icon: 'eye', label: 'Clear Vision & Safety' },
  ],
  ctas: [
    { label: 'Explore Solutions', href: '#solutions', variant: 'primary' },
    { label: 'Watch Video', href: '#video', variant: 'secondary' },
  ],
  media: placeholder(1600, 900, 'City skyline through protected glass', 'Hero media 1600×900'),
  accent: 'automotive',
  comparison: {
    without: {
      label: 'Without IrisPro',
      points: ['Very hot cabin', 'Uncomfortable & unsafe'],
    },
    with: {
      label: 'With IrisPro',
      points: ['Cooler cabin', 'Comfortable & protected'],
    },
  },
};

/* ── 2. ProblemCardGrid ── */
export const PROBLEM_CARDS: ProblemCard[] = [
  {
    icon: 'thermometer',
    title: 'Extreme Cabin Heat',
    description: 'Parked vehicles can become extremely hot under tropical sunlight.',
    image: placeholder(640, 400, 'Sun-baked car interior', 'Image 640×400'),
  },
  {
    icon: 'sun',
    title: 'Harmful UV & HEV Blue Light',
    description: 'Daily exposure affects your skin and eyes.',
    image: placeholder(640, 400, 'Driver shielding eyes from glare', 'Image 640×400'),
  },
  {
    icon: 'car',
    title: 'Interior Fading',
    description: 'Leather, dashboard, plastic and electronics fade and age faster.',
    image: placeholder(640, 400, 'Faded dashboard', 'Image 640×400'),
  },
  {
    icon: 'snowflake',
    title: 'High Air-conditioning Usage',
    description: 'Higher cooling demand means more fuel or battery consumption.',
    image: placeholder(640, 400, 'Air-conditioning controls', 'Image 640×400'),
  },
  {
    icon: 'battery',
    title: 'EV Battery Consumption',
    description:
      'Air-conditioning uses battery energy that could otherwise be used for driving.',
    image: placeholder(640, 400, 'EV energy display', 'Image 640×400'),
  },
  {
    icon: 'users',
    title: 'Family Comfort',
    description:
      'Children and elderly passengers are more sensitive to heat and UV exposure.',
    image: placeholder(640, 400, 'Family in rear seats', 'Image 640×400'),
  },
];

/* ── 3. PrioritySelector ── */
export const PRIORITY_OPTIONS: PriorityOption[] = [
  {
    id: 'too-hot',
    icon: 'thermometer',
    label: 'My Car Is Too Hot',
    recommendation: {
      title: 'Maximise infrared heat rejection',
      body: 'Films with multi-layer sputtering reflect the most solar heat. Start with the Plus Series (IRR up to 95% at 1400nm) or step up to Signature for maximum rejection.',
      cta: { label: 'View Plus Series', href: '#plus' },
    },
  },
  {
    id: 'skin-eye',
    icon: 'eye',
    label: 'I Want Better Skin & Eye Protection',
    accent: 'personal-protection',
    recommendation: {
      title: 'UV+420™ complete protection',
      body: 'Every IrisPro series blocks UV400 and HEV Blue Light (380–420nm) at the source — the difference for skin and eyes is the UV+420™ optical layer, standard across the range.',
      cta: { label: 'How UV+420™ works', href: '#uv420' },
    },
  },
  {
    id: 'ev',
    icon: 'battery',
    label: 'I Drive An EV',
    accent: 'commercial',
    recommendation: {
      title: 'Less air-conditioning, more range',
      body: 'Heat rejection lowers cooling demand, which preserves battery for driving. EV owners typically choose the Plus Series for enhanced cooling with signal-friendly construction.',
      cta: { label: 'Best films for EVs', href: '#ev' },
    },
  },
  {
    id: 'interior',
    icon: 'shield',
    label: 'I Want To Protect My Car Interior',
    recommendation: {
      title: 'Stop fading before it starts',
      body: 'Blocking UV and infrared heat slows leather, trim and electronics ageing. Anti-fade constructions are available across Plus and Signature.',
      cta: { label: 'Interior protection films', href: '#interior' },
    },
  },
  {
    id: 'max-heat',
    icon: 'sun',
    label: 'I Want Maximum Heat Rejection',
    recommendation: {
      title: 'Signature Series',
      body: 'Multi-layer silver sputter construction with IRR up to 98% (1400nm) — IrisPro’s maximum performance tier, with a 10-year performance warranty.',
      cta: { label: 'View Signature Series', href: '#signature' },
    },
  },
  {
    id: 'value',
    icon: 'wallet',
    label: 'I Want The Best Overall Value',
    accent: 'sustainability',
    recommendation: {
      title: 'Comfort Series',
      body: 'Great comfort, great value: UV+420™ protection and IRR up to 90% with a 5-year performance warranty — the right fit for daily driving and families.',
      cta: { label: 'View Comfort Series', href: '#comfort' },
    },
  },
];

/* ── 4. SpectrumDiagram ── */
export const SPECTRUM_BANDS: SpectrumBand[] = [
  {
    id: 'uv',
    name: 'UV',
    fromNm: 100,
    toNm: 400,
    behavior: 'blocked',
    annotation: 'Blocks 99.99% UV400',
    hue: 'var(--accent-personal-protection-bright)',
  },
  {
    id: 'hev',
    name: 'HEV Blue Light',
    fromNm: 380,
    toNm: 420,
    behavior: 'blocked',
    annotation: 'Blocks up to 100% HEV',
    hue: 'var(--accent-commercial-bright)',
  },
  {
    id: 'visible',
    name: 'Visible Light',
    fromNm: 400, // Technologies screen says 420 — logged in _conflicts.md §6
    toNm: 780,
    behavior: 'transmitted',
    annotation: 'Allows beneficial visible light',
    hue: 'var(--accent-sustainability-bright)',
  },
  {
    id: 'infrared',
    name: 'Infrared Heat',
    fromNm: 780,
    toNm: 2500,
    behavior: 'reduced',
    annotation: 'Reduces infrared heat',
    hue: '#e85d3a',
  },
];

/* ── 5. TechPillarGrid ── */
export const TECH_PILLARS: TechPillar[] = [
  {
    icon: 'sun',
    title: 'Patent UV+420™',
    description:
      'Beyond UV400 — comprehensive protection against UVB, UVA, UVA1 and Blue Light (HEV).',
    link: { label: 'Learn more', href: '#uv420' },
  },
  {
    icon: 'layers',
    title: '6-Layer Hotmelt™',
    description:
      'Stronger, more durable adhesion for long-lasting performance in extreme ASEAN climate.',
    link: { label: 'Learn more', href: '#hotmelt' },
  },
  {
    icon: 'thermometer',
    title: 'Multi-Layer Sputtering',
    description:
      'Advanced heat rejection technology without interfering with your signal and visibility.',
    link: { label: 'Learn more', href: '#sputter' },
  },
  {
    icon: 'document',
    title: 'Rigorous Testing',
    description:
      'Tested to international standards for optical performance, durability and safety.',
    link: { label: 'Learn more', href: '#testing' },
  },
  {
    icon: 'award',
    title: 'Performance Warranty',
    description:
      'Backed by our industry-leading warranty for your total peace of mind.',
    link: { label: 'Learn more', href: '#warranty' },
  },
];

/* ── 6. ProofStatBar ── */
export const STATS: StatItem[] = [
  {
    value: '10',
    unit: '°C',
    label: 'Infrared heat reduction',
    // "Up to 32.5°C" exists on another variant — _conflicts.md §3
    footnote:
      'Results may vary based on film type, vehicle model, driving conditions and usage.',
  },
  { value: '99.99', unit: '%', label: 'UV400 rejection' },
  { value: '80', unit: '%', label: 'Glare reduction' },
  {
    value: '30',
    unit: '%',
    label: 'Energy saving',
    footnote: 'Air-conditioning energy saving depends on usage pattern and climate.',
  },
  { value: '20,000+', label: 'Vehicles protected' },
];

/* ── 7. ProjectStrip ── */
export const PROJECTS: ProjectItem[] = [
  {
    name: 'Porsche 911',
    location: 'Kuala Lumpur',
    category: 'Automotive',
    image: placeholder(560, 360, 'Porsche 911 with IrisPro film', 'Project 560×360'),
    productsUsed: ['Titan X'],
    cta: { label: 'View case study', href: '#porsche' },
  },
  {
    name: 'Luxury Residence',
    location: 'Johor Bahru',
    category: 'Residential',
    image: placeholder(560, 360, 'Luxury residence glazing', 'Project 560×360'),
    benefit: 'Cooler living spaces with lower energy bills.',
    cta: { label: 'View case study', href: '#residence' },
  },
  {
    name: 'Menara Office Tower',
    location: 'Kuala Lumpur',
    category: 'Commercial',
    image: placeholder(560, 360, 'Menara office tower façade', 'Project 560×360'),
    cta: { label: 'View case study', href: '#menara' },
  },
  {
    name: 'OCBC Bank Tower',
    location: 'Kuala Lumpur',
    category: 'Commercial',
    badge: { label: 'Achieved 4 GBI points', tone: 'achievement' },
    image: placeholder(560, 360, 'OCBC Bank Tower', 'Project 560×360'),
    cta: { label: 'View case study', href: '#ocbc' },
  },
  {
    name: 'Putrajaya Government Complex',
    location: 'Putrajaya',
    category: 'Government',
    badge: { label: 'In progress', tone: 'progress' },
    image: placeholder(560, 360, 'Putrajaya government complex', 'Project 560×360'),
    cta: { label: 'View case study', href: '#putrajaya' },
  },
  {
    name: 'Sunway Medical Centre',
    location: 'Selangor',
    category: 'Healthcare',
    image: placeholder(560, 360, 'Sunway Medical Centre', 'Project 560×360'),
    cta: { label: 'View case study', href: '#sunway' },
  },
];

/* ── 8. SeriesComparisonTable ── */
export const SERIES: SeriesColumn[] = [
  { id: 'comfort', name: 'Comfort Series', tagline: 'Great Comfort. Great Value.' },
  { id: 'plus', name: 'Plus Series', tagline: 'Enhanced Comfort. Better Performance.' },
  {
    id: 'signature',
    name: 'Signature Series',
    tagline: 'Maximum Performance. Ultimate Protection.',
  },
];

export const SERIES_ROWS: ComparisonRow[] = [
  {
    label: 'UV+420™ Protection',
    values: { comfort: true, plus: true, signature: true },
  },
  {
    label: 'IRR (Heat Rejection)',
    values: {
      comfort: 'Up to 90%',
      plus: 'Up to 95% (1400nm)',
      signature: 'Up to 98% (1400nm)', // TITAN X card says >99% — _conflicts.md §2
    },
  },
  {
    label: 'Technology',
    values: {
      comfort: '6-Layer Hotmelt™',
      plus: '6-Layer Hotmelt™ + Titanium Sputter',
      signature: '6-Layer Hotmelt™ + Multi-Layer Silver Sputter',
    },
  },
  {
    label: 'SIRIM Certification',
    values: { comfort: 'Grade A', plus: 'Grade A', signature: 'Grade A' },
  },
  {
    label: 'Warranty',
    values: { comfort: '5 Years', plus: '7 Years', signature: '10 Years' },
  },
  {
    label: 'Best For',
    values: {
      comfort: 'Daily Driving / Families',
      plus: 'EV Owners / Long Drives',
      signature: 'Premium / Maximum Performance',
    },
  },
  {
    label: 'VLT Options',
    values: {
      comfort: '70% / 50% / 35% / 20% / 5%',
      plus: '70% / 50% / 35% / 20% / 5%',
      signature: '70% / 50% / 35% / 20% / 5%',
    },
  },
];

/* ── 9. ProductCard ── */
export const PRODUCTS: ProductItem[] = [
  {
    id: 'titan-x',
    name: 'Titan X',
    badge: 'SIGNATURE',
    technology: 'Multi-Layer Silver Sputter',
    image: placeholder(560, 320, 'Titan X on black sedan', 'Product 560×320'),
    specs: [
      { label: 'IRR (1400nm)', value: '>99%' },
      { label: 'UV400', value: '100%' },
      { label: 'Warranty', value: '10 Years' },
    ],
    vltOptions: ['69%', '60%', '15%'],
  },
  {
    id: 'diamond-x',
    name: 'Diamond X',
    badge: 'SIGNATURE',
    technology: 'Multi-Layer Titanium Sputter',
    image: placeholder(560, 320, 'Diamond X on white coupé', 'Product 560×320'),
    specs: [
      { label: 'IRR (1400nm)', value: '98%' },
      { label: 'UV400', value: '100%' },
      { label: 'Warranty', value: '10 Years' },
    ],
    vltOptions: ['65%', '30%'],
  },
  {
    id: 'raypro',
    name: 'RayPro',
    badge: 'SIGNATURE',
    technology: 'Nano Titanium Sputter',
    image: placeholder(560, 320, 'RayPro on grey sedan', 'Product 560×320'),
    specs: [
      { label: 'IRR (1400nm)', value: '95%' },
      { label: 'UV400', value: '100%' },
      { label: 'Warranty', value: '10 Years' },
    ],
    vltOptions: ['78%', '70%', '57%', '30%', '15%'],
  },
  {
    id: 'uv420-silver-black',
    name: 'UV+420 Silver Black',
    badge: 'PRIVACY + HEAT',
    technology: 'Aluminium',
    image: placeholder(560, 320, 'UV+420 Silver Black', 'Product 560×320'),
    specs: [
      { label: 'IRR (1400nm)', value: '95%' },
      { label: 'UV400', value: '100%' },
      { label: 'Warranty', value: '7 Years' },
    ],
    vltOptions: ['84%'],
  },
  {
    id: 'vanguard',
    name: 'Vanguard',
    badge: 'HEAT REJECTION + SECURITY',
    technology: 'TPU Silver Sputter (External Use)',
    image: placeholder(560, 320, 'Vanguard exterior film', 'Product 560×320'),
    specs: [
      { label: 'IRR (1400nm)', value: '95%' },
      { label: 'UV380', value: '99%' },
      { label: 'VLT', value: '56%' },
    ],
    vltOptions: ['56%'],
  },
];

/* ── 10. GuideChapterList ── */
export const GUIDE_CHAPTERS: GuideChapter[] = [
  {
    number: 1,
    title: 'Understanding Automotive Window Film',
    description:
      'Learn the basics and why window film is essential for your car and your lifestyle.',
    thumbnail: placeholder(448, 252, 'Chapter 1 video', 'Video 448×252'),
    lessons: [
      'What is automotive window film?',
      'Why do cars need window film?',
      'Why is ASEAN climate different?',
      'Types of window film',
      'How film is constructed',
      'What the numbers mean',
    ],
    href: '#chapter-1',
  },
  {
    number: 2,
    title: 'Heat & Comfort',
    description: 'Understand solar heat, TSER and why IRR99% may still feel hot.',
    thumbnail: placeholder(448, 252, 'Chapter 2 video', 'Video 448×252'),
    lessons: [
      'Why does a car become so hot?',
      'What is TSER?',
      'Why can IRR 99% still feel hot?',
      'How solar heat enters a vehicle',
      'Measuring heat rejection honestly',
      'Reading a spec sheet',
    ],
    href: '#chapter-2',
  },
  {
    number: 3,
    title: 'UV & Health Protection',
    description:
      'Protect your skin, eyes and loved ones from harmful UV and blue light.',
    thumbnail: placeholder(448, 252, 'Chapter 3 video', 'Video 448×252'),
    lessons: [
      'What is UV?',
      'What is UV400?',
      'What is UV+420?',
      'How UV affects skin',
      'How UV affects eyes',
      'Protection for children and elderly',
    ],
    href: '#chapter-3',
  },
  {
    number: 4,
    title: 'Choosing the Right Film',
    description:
      'Find the best window film based on your needs, car type and driving lifestyle.',
    thumbnail: placeholder(448, 252, 'Chapter 4 video', 'Video 448×252'),
    lessons: [
      'Which VLT should I choose?',
      'Best film for daily drivers',
      'Best film for families',
      'Best film for EV owners',
      'Legal considerations',
      'Warranty and installation',
    ],
    href: '#chapter-4',
  },
];

/* ── 11. AskIrisProAI ── */
export const ASK_AI: AskAiContent = {
  heading: 'Ask IrisPro AI',
  description:
    'Ask any question about automotive window film and get instant answers.',
  placeholder: 'Ask anything…',
  suggestedQuestions: [
    'Best film for EV',
    'Why IRR99% still hot?',
    'Which VLT should I choose?',
    'How window film saves fuel?',
  ],
  fallbackAction: '/knowledge-centre/search',
};

/* ── 12. CTABar + CertificationStrip ── */
export const CTA_ACTIONS: CtaAction[] = [
  {
    icon: 'pin',
    title: 'Find a Dealer',
    description: 'Locate our authorized dealers near you.',
    cta: { label: 'Locate now', href: '#dealers' },
  },
  {
    icon: 'headset',
    title: 'Request Consultation',
    description: 'Get expert advice for your needs.',
    cta: { label: 'Request now', href: '#consult' },
  },
  {
    icon: 'chat',
    title: 'WhatsApp Us',
    description: 'Quick & easy — chat with us for assistance.',
    cta: { label: 'Chat now', href: '#whatsapp' },
  },
  {
    icon: 'document',
    title: 'Download Catalogue',
    description: 'PDF brochure with the full product range.',
    cta: { label: 'Download', href: '#catalogue' },
  },
];

export const CERTS: CertItem[] = [
  { id: 'sirim', name: 'SIRIM', label: 'Certified Grade A' },
  { id: 'sgs', name: 'SGS', label: 'Independently tested' },
  { id: 'rohs', name: 'RoHS', label: 'Compliant' },
  { id: 'reach', name: 'REACH', label: 'Compliant' },
  { id: 'gbi', name: 'GBI', label: 'Green Building Index points' },
  { id: 'iwfa', name: 'IWFA', label: 'Installation standard' },
  { id: 'ewarranty', name: 'eW', label: 'Up to 10 years performance warranty' },
];
