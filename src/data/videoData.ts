export interface StudioVideoItem {
  id: string;
  title: string;
  subtitle: string;
  platform: 'youtube' | 'youtube-shorts' | 'tiktok';
  url: string;
  embedUrl: string;
  thumbnail: string;
  author: string;
  authorUrl?: string;
  category: 'masterclass' | 'session' | 'shorts';
  categoryLabel: string;
  duration?: string;
  styleCategory: string;
  aspectRatio: '16/9' | '9/16';
  description: string;
  keyTakeaways: string[];
  suggestedMessage: string;
}

export const STUDIO_VIDEOS: StudioVideoItem[] = [
  {
    id: 'fine-line-inked-masterclass',
    title: 'So You Want A Fine Line Tattoo | Tattoo Styles',
    subtitle: 'Comprehensive Fine Line Aesthetics, Needle Depth & Longevity Breakdown',
    platform: 'youtube',
    url: 'https://youtu.be/J-x94uZWHVY?si=9dJZBOndZ7HQpuYR',
    embedUrl: 'https://www.youtube.com/embed/J-x94uZWHVY',
    thumbnail: 'https://i.ytimg.com/vi/J-x94uZWHVY/hqdefault.jpg',
    author: 'Inked Magazine',
    authorUrl: 'https://www.youtube.com/@inked',
    category: 'masterclass',
    categoryLabel: 'Featured Masterclass',
    duration: '11:42 min',
    styleCategory: 'Fine Line & Micro-Realism',
    aspectRatio: '16/9',
    description:
      'In-depth documentary exploration of fine line tattoo artistry: examining single-needle configurations (01/03RL), dermal depth mechanics, contrast calibration against epidermal turnover, and realistic 10-year aging considerations.',
    keyTakeaways: [
      'Single-needle (01RL) vs tight round liners (03RL) puncture mechanics',
      'Minimizing dermal blowouts through controlled hand-speed and low voltage',
      'Contrast strategies to prevent pigment fading over years of UV exposure',
    ],
    suggestedMessage:
      'Hello Ink Haven London! I watched the "So You Want A Fine Line Tattoo" guide and want to consult on a bespoke fine line piece.',
  },
  {
    id: 'london-500-day-session',
    title: 'What Does a £500 Full-Day Tattoo Session in London Actually Look Like?',
    subtitle: 'Real-Time Client Experience: Stencil Mapping to Sterile Medical Finishing',
    platform: 'tiktok',
    url: 'https://vt.tiktok.com/ZSq8bB1GP/',
    embedUrl: 'https://www.tiktok.com/player/v1/7676105443076279574',
    thumbnail:
      'https://p16-common-sign.tiktokcdn-eu.com/tos-no1a-p-0037-no/o8vIAHFEwAEehAUqAkAIRATFnfCJJCEkFDlCgl~tplv-tiktokx-origin.image?dr=10395&x-expires=1788714000&x-signature=ek6EH4t%2F8x5eA29PpWmePejb%2Bco%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=no1a',
    author: 'Glyntattoos',
    authorUrl: 'https://www.tiktok.com/@glyntattoos',
    category: 'session',
    categoryLabel: 'Studio Day Vlog',
    duration: '1:15 min',
    styleCategory: 'Black & Grey Realism',
    aspectRatio: '9/16',
    description:
      'Experience what an intensive £500 full-day session entails in West London: precision carbon stencil placement respecting body posture, grey-wash value stacking, client comfort ergonomics, and hospital-grade post-procedure wraps.',
    keyTakeaways: [
      '6 to 8 hours of focused, single-client atelier dedication',
      'Smooth transition between 20%, 40%, and 80% grey-wash ink dilutions',
      'Medical aftercare barrier dressing applied immediately post-session',
    ],
    suggestedMessage:
      'Hello! I saw the £500 full-day session reel on TikTok and would like to enquire about booking a full-day sitting at your London studio.',
  },
  {
    id: 'triangle-geometric-tattoo',
    title: 'Unique Geometric Triangle Design & Precision Shading',
    subtitle: 'Sacred Geometry, Dotwork Stippling & Razor-Sharp Mathematical Linework',
    platform: 'youtube-shorts',
    url: 'https://youtube.com/shorts/WtI1uWwatrU?si=zaUmOuopBUBZn46R',
    embedUrl: 'https://www.youtube.com/embed/WtI1uWwatrU',
    thumbnail: 'https://i.ytimg.com/vi/WtI1uWwatrU/hqdefault.jpg',
    author: 'MR. MAVEN SR',
    authorUrl: 'https://www.youtube.com/@SUPERSAIYANYT01',
    category: 'shorts',
    categoryLabel: 'Technique Short',
    duration: '0:35 min',
    styleCategory: 'Geometric & Dotwork',
    aspectRatio: '9/16',
    description:
      'High-impact sacred geometry highlighting sharp equilateral linework, negative space balance, and gradient dotwork shading tailored for forearm and calf anatomy.',
    keyTakeaways: [
      'High-tension cartridge calibration for crisp mathematical straight lines',
      'Whip-shading and pepper-dot gradients giving 3D optical depth',
      'Anatomical alignment ensuring angles do not distort upon movement',
    ],
    suggestedMessage:
      'Hello Ink Haven! I am interested in getting a geometric triangle / sacred geometry piece like the short on YouTube (https://youtube.com/shorts/WtI1uWwatrU).',
  },
  {
    id: '3d-realism-football-tattoo',
    title: 'Dynamic 3D Realism: Football Player Motion Tattoo',
    subtitle: 'Anatomical Hyper-Realism, Kinetic Fabric Motion & Denser Carbon Blacks',
    platform: 'youtube-shorts',
    url: 'https://youtube.com/shorts/aJnapm5wCks?si=EK0SmkjzhIjRsKAz',
    embedUrl: 'https://www.youtube.com/embed/aJnapm5wCks',
    thumbnail: 'https://i.ytimg.com/vi/aJnapm5wCks/hqdefault.jpg',
    author: 'hemz Tattoo',
    authorUrl: 'https://www.youtube.com/@hemztattoo1602',
    category: 'shorts',
    categoryLabel: 'Technique Short',
    duration: '0:42 min',
    styleCategory: '3D Hyper-Realism',
    aspectRatio: '9/16',
    description:
      'Striking sports realism showcasing dramatic muscle shadow sculpting, kinetic clothing folds, and deep carbon black saturation creating a three-dimensional illusion on skin.',
    keyTakeaways: [
      'Soft magnum needle grouping for buttery-smooth subcutaneous shadow fades',
      'Opaque white ink highlights catching directional light',
      'Realistic skin texture preserved without overworking the epidermis',
    ],
    suggestedMessage:
      'Hi! I saw the 3D football realism tattoo short (https://youtube.com/shorts/aJnapm5wCks) and would like to talk about a custom portrait/realism piece.',
  },
  {
    id: 'diy-easy-tattoo-ideas',
    title: 'Creative Linework Flash & Minimalist Design Concepts',
    subtitle: 'Micro-Concepts, Forearm Composition Flow & Curated Men’s Flash Ideas',
    platform: 'youtube-shorts',
    url: 'https://youtube.com/shorts/3-Hsln3GOLw?si=Mr_odbzNDKzyyJL6',
    embedUrl: 'https://www.youtube.com/embed/3-Hsln3GOLw',
    thumbnail: 'https://i.ytimg.com/vi/3-Hsln3GOLw/hqdefault.jpg',
    author: 'Ink Creation',
    authorUrl: 'https://www.youtube.com/@Ink_Creation',
    category: 'shorts',
    categoryLabel: 'Technique Short',
    duration: '0:30 min',
    styleCategory: 'Minimalist & Flash',
    aspectRatio: '9/16',
    description:
      'Curated contemporary flash ideas and minimalist linework inspirations suitable for wrist, inner bicep, and ankle placements with clean silhouette balance.',
    keyTakeaways: [
      'Compact silhouette clarity designed to remain legible for decades',
      'Quick single-session turnaround with fast healing cycles',
      'Modular layouts easily incorporated into larger patchwork sleeves',
    ],
    suggestedMessage:
      'Hello Ink Haven London! I loved the minimalist flash ideas from the YouTube short (https://youtube.com/shorts/3-Hsln3GOLw) and want to book a flash session.',
  },
  {
    id: 'moon-star-delicate-art',
    title: 'Delicate Celestial Moon & Star Fine Line Artwork',
    subtitle: 'Single-Needle Lunar Shading, Micro-Starlight Sparkles & Fine Filigree',
    platform: 'youtube-shorts',
    url: 'https://youtube.com/shorts/PtKYCgNEdLI?si=Ido0Gf4IPn3nyxWP',
    embedUrl: 'https://www.youtube.com/embed/PtKYCgNEdLI',
    thumbnail: 'https://i.ytimg.com/vi/PtKYCgNEdLI/hqdefault.jpg',
    author: 'Ink Creation',
    authorUrl: 'https://www.youtube.com/@Ink_Creation',
    category: 'shorts',
    categoryLabel: 'Technique Short',
    duration: '0:28 min',
    styleCategory: 'Celestial & Micro Fine Line',
    aspectRatio: '9/16',
    description:
      'Graceful celestial moon and twinkling star composition highlighting subtle needle-stippled craters, fine-gauge starlight rays, and ultra-clean feminine aesthetic flow.',
    keyTakeaways: [
      'Micro-taper needle precision preserving gossamer starlight details',
      'Minimal skin trauma ideal for delicate placements like ribcage, wrist, or collarbone',
      'Subtle wash tones replicating soft moonlit luminescence',
    ],
    suggestedMessage:
      'Hello! I am enchanted by the delicate moon & star tattoo artwork (https://youtube.com/shorts/PtKYCgNEdLI) and would love to consult on a celestial piece.',
  },
];
