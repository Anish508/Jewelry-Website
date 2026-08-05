export interface Product {
  id: string;
  name: string;
  category: string;
  priceUSD: number;
  priceAED: number;
  karat: string;
  rating: number;
  reviewsCount: number;
  imagePrimary: string;
  imageSecondary: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  description: string;
  availableSizes?: string[];
  karatOptions?: string[];
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

export interface Category {
  id: string;
  name: string;
  itemCount: string;
  image: string;
}

export interface Story {
  id: string;
  name: string;
  location: string;
  quote: string;
  purchase: string;
  image: string;
  rating: number;
}

export const GOLD_RATES = {
  aed24k: "312.50",
  aed22k: "289.25",
  aed18k: "236.80",
  change24k: "+0.45%",
  lastUpdated: "Live Dubai Gold & Jewellery Group",
};

export const HERO_SLIDES = [
  {
    id: "slide-1",
    tagline: "EMIRATES GOLD INTERNATIONAL",
    title: "Crafted For Generations",
    subtitle: "Timeless 22K & 24K gold jewellery designed with exceptional craftsmanship and royal UAE heritage.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=85&w=1920",
    ctaPrimary: "Explore Collection",
    ctaSecondary: "Book Appointment",
  },
  {
    id: "slide-2",
    tagline: "ROYAL SOLITAIRE & BRIDAL",
    title: "The Diamond Symphony",
    subtitle: "Ethically sourced certified diamonds set in handcrafted 18K white and rose gold settings.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=85&w=1920",
    ctaPrimary: "Discover Solitaires",
    ctaSecondary: "View Bridal Lookbook",
  },
  {
    id: "slide-3",
    tagline: "HERITAGE COUTURE",
    title: "The Royal Heritage Collection",
    subtitle: "Exquisite temple and contemporary gold masterpieces celebrating centuries of Arabian artistry.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=85&w=1920",
    ctaPrimary: "Shop Heritage",
    ctaSecondary: "Custom Commission",
  },
];

export const FEATURED_COLLECTIONS: Collection[] = [
  {
    id: "col-1",
    title: "Gold Jewellery",
    subtitle: "22K & 24K pure gold signature sets",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800",
    tag: "Signature Bestsellers",
  },
  {
    id: "col-2",
    title: "Diamond Jewellery",
    subtitle: "GIA certified rare brilliant cut stones",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    tag: "High Jewellery",
  },
  {
    id: "col-3",
    title: "Wedding Collection",
    subtitle: "Royal bridal chokers & layering sets",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    tag: "Bridal Special",
  },
  {
    id: "col-4",
    title: "Daily Wear",
    subtitle: "Minimalist modern 18K elegance",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800",
    tag: "Everyday Luxury",
  },
  {
    id: "col-5",
    title: "Men's Jewellery",
    subtitle: "Solid gold chains, bracelets & signets",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800",
    tag: "Men's Atelier",
  },
  {
    id: "col-6",
    title: "Kids Collection",
    subtitle: "Lightweight hypoallergenic gold treasures",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    tag: "Little Treasures",
  },
  {
    id: "col-7",
    title: "Traditional Collection",
    subtitle: "Intricate antique filigree & Kundan",
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&q=80&w=800",
    tag: "Arabian Heritage",
  },
  {
    id: "col-8",
    title: "Gift Collection",
    subtitle: "Unforgettable gold coins & bar keepsakes",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800",
    tag: "Luxury Gifting",
  },
];

export const CATEGORIES: Category[] = [
  { id: "cat-1", name: "Rings", itemCount: "140+ Designs", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=500" },
  { id: "cat-2", name: "Chains", itemCount: "95+ Designs", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=500" },
  { id: "cat-3", name: "Necklaces", itemCount: "180+ Designs", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=500" },
  { id: "cat-4", name: "Bracelets", itemCount: "85+ Designs", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=500" },
  { id: "cat-5", name: "Bangles", itemCount: "110+ Designs", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=500" },
  { id: "cat-6", name: "Pendants", itemCount: "75+ Designs", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=500" },
  { id: "cat-7", name: "Earrings", itemCount: "210+ Designs", image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=500" },
  { id: "cat-8", name: "Mangalsutra", itemCount: "60+ Designs", image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&q=80&w=500" },
  { id: "cat-9", name: "Coins", itemCount: "24K Bullion", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=500" },
  { id: "cat-10", name: "Gift Items", itemCount: "Curated Sets", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=500" },
];

export const PRODUCTS: Product[] = [
  {
    id: "p-1",
    name: "The Royal Emerald & Diamond Choker",
    category: "Necklaces",
    priceUSD: 4850,
    priceAED: 17800,
    karat: "22K Yellow Gold",
    rating: 4.9,
    reviewsCount: 28,
    imagePrimary: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    imageSecondary: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    isNew: true,
    isBestSeller: true,
    description: "Handcrafted 22K yellow gold choker featuring vivid Zambian emeralds, brilliant solitaire diamonds, and traditional hand-engraved Arabesque scrollwork.",
    availableSizes: ['14"', '16"', '18" Adjustable'],
    karatOptions: ["22K Yellow Gold", "18K Rose Gold", "18K White Gold"],
  },
  {
    id: "p-2",
    name: "Solitaire Marquise Diamond Ring",
    category: "Rings",
    priceUSD: 3200,
    priceAED: 11750,
    karat: "18K White Gold",
    rating: 5.0,
    reviewsCount: 42,
    imagePrimary: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    imageSecondary: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800",
    isBestSeller: true,
    description: "GIA-certified 1.8 carat marquise-cut central diamond flanked by micro-pave diamond halo in platinum and 18K white gold.",
    availableSizes: ["5 US", "6 US", "7 US", "8 US"],
    karatOptions: ["18K White Gold", "18K Yellow Gold", "Platinum"],
  },
  {
    id: "p-3",
    name: "Empress Gold Filigree Bangles (Set of 4)",
    category: "Bangles",
    priceUSD: 5400,
    priceAED: 19800,
    karat: "22K Yellow Gold",
    rating: 4.8,
    reviewsCount: 19,
    imagePrimary: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    imageSecondary: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800",
    isNew: true,
    description: "Pure 22K hallmarked gold bangles showcasing intricate Middle Eastern lattice carving with secure dual-safety clasps.",
    availableSizes: ['2.4"', '2.6"', '2.8"'],
    karatOptions: ["22K Yellow Gold", "24K Solid Gold"],
  },
  {
    id: "p-4",
    name: "Celestial Diamond Cascade Earrings",
    category: "Earrings",
    priceUSD: 2750,
    priceAED: 10100,
    karat: "18K Rose Gold",
    rating: 4.9,
    reviewsCount: 34,
    imagePrimary: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800",
    imageSecondary: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800",
    isBestSeller: true,
    description: "Flowing drop earrings set with 48 round brilliant diamonds that catch light with every movement. Designed for evening gala elegance.",
    availableSizes: ["Standard Drop (45mm)"],
    karatOptions: ["18K Rose Gold", "18K White Gold"],
  },
  {
    id: "p-5",
    name: "Sovereign 24K Gold Investment Bar (50g)",
    category: "Coins",
    priceUSD: 4100,
    priceAED: 15050,
    karat: "24K 999.9 Pure Gold",
    rating: 5.0,
    reviewsCount: 88,
    imagePrimary: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800",
    imageSecondary: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800",
    isBestSeller: true,
    description: "Official Emirates Gold stamped 50-gram 999.9 fine gold ingot with tamper-evident security assay packaging and serial certificate.",
    availableSizes: ["50 Grams", "100 Grams", "1 Ounce"],
    karatOptions: ["24K 999.9 Fine Gold"],
  },
  {
    id: "p-6",
    name: "Arabian Nights Sapphire & Diamond Pendant",
    category: "Pendants",
    priceUSD: 3890,
    priceAED: 14280,
    karat: "18K White Gold",
    rating: 4.9,
    reviewsCount: 15,
    imagePrimary: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&q=80&w=800",
    imageSecondary: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    isNew: true,
    description: "Deep Royal Blue natural sapphire framed by tapered baguette diamonds on an 18K white gold snake chain.",
    availableSizes: ['18" Chain included'],
    karatOptions: ["18K White Gold", "18K Yellow Gold"],
  },
];

export const OCCASIONS = [
  { name: "Wedding", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600", desc: "Royal Bridal Sets & Solitaires" },
  { name: "Engagement", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600", desc: "GIA Certified Solitaire Rings" },
  { name: "Anniversary", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600", desc: "Eternity Bands & Diamond Pendants" },
  { name: "Birthday", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=600", desc: "Delicate Daily Wear Gold" },
  { name: "Festivals", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600", desc: "22K Traditional Arabesque Gold" },
  { name: "Corporate Gifts", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=600", desc: "24K Stamped Gold Coins & Ingot Bars" },
];

export const WHY_US = [
  { title: "100% Hallmarked Gold", desc: "Every creation is stamped with official UAE Ministry hallmarks ensuring 22K & 24K purity.", icon: "Award" },
  { title: "GIA & IGI Certified Diamonds", desc: "Conflict-free ethically sourced diamonds certified by global gemological laboratories.", icon: "Gem" },
  { title: "Lifetime Exchange & Buyback", desc: "Guaranteed transparent valuation with 100% gold rate value retention worldwide.", icon: "RefreshCw" },
  { title: "International Standards", desc: "Crafted by master goldsmiths following centuries of royal Arabian and European techniques.", icon: "ShieldCheck" },
  { title: "Custom Bespoke Atelier", desc: "Work directly with our master designers to turn your dream sketches into handcrafted gold.", icon: "Sparkles" },
  { title: "Fully Insured Express Shipping", desc: "Global door-to-door delivery with high-value security packaging and real-time tracking.", icon: "Truck" },
];

export const CUSTOMER_STORIES: Story[] = [
  {
    id: "story-1",
    name: "Sheikha Al-Maktoum",
    location: "Dubai, UAE",
    quote: "Emirates Gold International crafted my complete bridal set with unrivaled luxury. The emerald choker is a true family heirloom that will be passed down for generations.",
    purchase: "Custom Bridal Choker Set",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    rating: 5,
  },
  {
    id: "story-2",
    name: "Claire & Alexander Vance",
    location: "London, UK",
    quote: "The solitaire ring arrived in London with flawless white-glove security delivery. The diamond brilliance and 18K white gold craft exceed any boutique in Mayfair.",
    purchase: "Solitaire Marquise Diamond Ring",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    rating: 5,
  },
  {
    id: "story-3",
    name: "Fatima Al-Hassan",
    location: "Abu Dhabi, UAE",
    quote: "Purchasing 24K gold investment coins from Emirates Gold gives complete peace of mind. Transparent live pricing, instant certificates, and impeccable service.",
    purchase: "24K Sovereign Bullion Bars",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    rating: 5,
  },
];

export const STORE_LOCATIONS = [
  "Dubai Mall – Fashion Avenue Boutique, Dubai",
  "Gold & Diamond Park – Flagship Showroom, Dubai",
  "Galleria Mall – Al Maryah Island, Abu Dhabi",
  "Mayfair Private Boutique, London UK",
  "Fifth Avenue VIP Suite, New York USA",
];
