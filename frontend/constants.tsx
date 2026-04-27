
import { Product, Category, Occasion, YouTubeVideo } from './types';

export const PRODUCTS: Product[] = [
  // --- NECKLACES (9 Items) ---
  { id: 'neck-01', isBestseller: true, name: 'POLKI Necklaces', category: Category.NECKLACES, price: 4599, description: 'Inspired by Rajputana royalty.', imageUrl: '/image/polki-necklaces-1.png', hoverImageUrl: '/image/polki-necklaces-2.png', arAsset: '/ar-assets/choker.png', detailImages: ['/image/polki-necklaces-1.png', '/image/polki-necklaces-2.png', '/Videos/POLKI Necklaces video.mp4'] },
  { id: 'neck-02', isBestseller: true, name: 'Antique Peacock Rani Haar', category: Category.NECKLACES, price: 3200, description: 'Traditional long necklace featuring exquisite peacock motifs and an antique gold matte finish.', imageUrl: '/image/Antique Peacock Rani Haar 1.png', arAsset: '/ar-assets/rani-haar.png', detailImages: ['/image/Antique Peacock Rani Haar 2.png', '/Videos/Antique Peacock Rani Haar video.mp4'] },
  { id: 'neck-03', name: 'Victorian Emerald String', category: Category.NECKLACES, price: 2850, description: 'Deep green emerald cut.', imageUrl: '/image/Victorian Emerald String 1.png', detailImages: ['/image/Victorian Emerald String 2.png', '/Videos/Victorian Emerald String video.mp4'] },
  { id: 'neck-04', name: 'Jaipur Meenakari Set', category: Category.NECKLACES, price: 3100, description: 'Hand-painted enamel work.', imageUrl: '/image/Jaipur Meenakari Set 1.png', detailImages: ['/image/Jaipur Meenakari Set 2.png'] },
  { id: 'neck-05', name: 'Temple Gold Choker', category: Category.NECKLACES, price: 2900, description: 'Divine antique finish.', imageUrl: '/image/Temple Gold Choker 1.png', detailImages: ['/image/Temple Gold Choker 2.png'] },
  { id: 'neck-06', name: 'Oxidized Tribal Mala', category: Category.NECKLACES, price: 1800, description: 'Bohemian Jaipur vibes.', imageUrl: '/image/Oxidized Tribal Mala 1.png', detailImages: ['/image/Oxidized Tribal Mala 2.png'] },
  { id: 'neck-07', name: 'Bridal Kundan Layer', category: Category.NECKLACES, price: 5500, description: 'Majestic wedding look.', imageUrl: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=800', detailImages: ['/image/Bridal Kundan Layer.jpg'] },
  { id: 'neck-08', name: 'Polki Statement Set', category: Category.NECKLACES, price: 4200, description: 'Heritage uncut stones.', imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800', detailImages: ['/image/Polki Statement Set 2.png'] },
  { id: 'neck-09', name: 'Festive Gold String', category: Category.NECKLACES, price: 2400, description: 'Elegant daily grace.', imageUrl: '/image/Festive Gold String 1.png', detailImages: ['/image/Festive Gold String 2.png', '/Videos/Festive Gold String video.mp4'] },

  // --- EARRINGS (5 Items) ---
  { id: 'ear-01', isBestseller: true, name: 'Classic Jhumka Shine', category: Category.TEMPLE, price: 1250, description: 'Gold plated bells.', imageUrl: '/image/classic-jhumka-shine-1.jpg', hoverImageUrl: '/image/classic-jhumka-shine-1.jpg', arAsset: '/ar-assets/jhumka.png', detailImages: ['/image/classic-jhumka-shine-1.jpg', '/Videos/Classic Jhumka Shine video.mp4', '/image/classic-jhumka-shine-3.png'] },
  { id: 'ear-02', isBestseller: true, name: 'Celestial Chandbalis', category: Category.AMERICAN_DIAMOND, price: 1899, description: 'Moon shaped brilliance.', imageUrl: '/image/celestial-chandbalis-3.png', hoverImageUrl: '/image/celestial-chandbalis-1.png', arAsset: '/ar-assets/chandbali.png', detailImages: ['/image/celestial-chandbalis-3.png', '/Videos/Celestial Chandbalis video.mp4', '/image/celestial-chandbalis-1.png'] },
  { id: 'ear-03', name: 'Oxidized Tribal Studs', category: Category.OXIDIZED, price: 450, description: 'Minimalist tribal work.', imageUrl: '/image/oxidized-tribal-studs-1.png', hoverImageUrl: '/image/oxidized-tribal-studs-2.png', detailImages: ['/image/oxidized-tribal-studs-1.png', '/Videos/Oxidized Tribal Studs video.mp4', '/image/oxidized-tribal-studs-2.png', '/image/oxidized-tribal-studs-3.png'] },
  { id: 'ear-04', isBestseller: true, name: 'Heritage Drop Earrings', category: Category.KUNDAN, price: 1400, description: 'Regal kundan drops.', imageUrl: '/image/heritage-drop-earrings-box.jpg', arAsset: '/ar-assets/kundan-drop.png', detailImages: ['/image/Heritage Drop Earrings.png', '/Videos/Heritage Drop Earrings video.mp4', '/image/heritage-drop-earrings-box.jpg'] },
  { id: 'ear-05', name: 'Floral Gold Jhumkis', category: Category.BANGLES, price: 950, description: 'Daily wear charm.', imageUrl: '/image/floral-gold-jhumkis-2.png', hoverImageUrl: '/image/floral-gold-jhumkis-1.png', detailImages: ['/image/floral-gold-jhumkis-2.png', '/Videos/Floral Gold Jhumkis video.mp4', '/image/floral-gold-jhumkis-1.png'] },

  // --- KUNDAN (3 Items) ---
  { id: 'kun-01', name: 'Bridal Kundan Set', category: Category.KUNDAN, price: 6200, description: 'Complete bridal look.', imageUrl: '/image/Bridal Kundan Set 1.png' },
  { id: 'kun-02', name: 'Kundan Choker', category: Category.KUNDAN, price: 3400, description: 'Elegant neck piece.', imageUrl: '/image/Kundan Cocktail Choker 1.png', detailImages: ['/image/Kundan Cocktail Choker 2.png'] },
  { id: 'kun-03', isBestseller: true, name: 'Meenakari Kundan Studs', category: Category.KUNDAN, price: 4800, description: 'Colorful enamel work.', imageUrl: '/image/meenakari-kundan-studs-new.jpg', detailImages: ['/Videos/Meenakari Kundan Studs video.mp4'] },

  // --- RINGS (2 Items) ---
  { id: 'ring-01', name: 'Maharani Polki Ring', category: Category.RINGS, price: 1100, description: 'Oversized statement.', imageUrl: '/image/Maharani Polki Ring 1.png', detailImages: ['/image/Maharani Polki Ring 1.png', '/image/Maharani Polki Ring.png'] },
  { id: 'ring-02', isBestseller: true, name: 'Sparkling AD Band', category: Category.RINGS, price: 650, description: 'Sleek everyday band.', imageUrl: '/image/Sparkling AD Band 3.png', detailImages: ['/Videos/Sparkling AD Band video.mp4', '/image/Sparkling AD Band 1.png', '/image/Sparkling AD Band 2.png', '/image/Sparkling AD Band 3.png'] },

  // --- BANGLES (5 Items) ---
  { id: 'ban-01', isBestseller: true, name: 'Gajra Gold Bangles Set', category: Category.BANGLES, price: 1100, description: 'Micro-plated gold.', imageUrl: '/image/Gajra Gold Bangles Set.png', detailImages: ['/image/Gajra Gold Bangles Set 2.png', '/Videos/Gajra Gold Bangles Set video.mp4'] },
  { id: 'ban-02', name: 'Designer AD Kada Set', category: Category.BANGLES, price: 2100, description: 'Party wear sparkle.', imageUrl: 'https://images.unsplash.com/photo-1611085583191-a3b1a30a8a0a?auto=format&fit=crop&q=80&w=800', detailImages: ['/image/Designer AD Kada Set.png'] },
  { id: 'ban-03', name: 'Antique Temple Bangles', category: Category.BANGLES, price: 1800, description: 'Antique matte finish.', imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800', detailImages: ['/image/Antique Temple Bangles.jpg'] },
  { id: 'ban-04', name: 'Oxidized Tribal Bangles', category: Category.BANGLES, price: 750, description: 'Daily wear oxidized.', imageUrl: 'https://images.unsplash.com/photo-1611085583191-a3b1a30a8a0a?auto=format&fit=crop&q=80&w=800', detailImages: ['/image/Oxidized Tribal Bangles.png'] },
  { id: 'ban-05', name: 'Royal Velvet Bangle Mix', category: Category.BANGLES, price: 1450, description: 'Traditional mix.', imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800', detailImages: ['/image/Royal Velvet Bangle Mix.png'] },

  // --- KADA (1 Item) ---
  { id: 'kada-01', name: 'Antique Elephant Kada', category: Category.BANGLES, price: 1450, description: 'Elephant head motif.', imageUrl: 'https://images.unsplash.com/photo-1611085583191-a3b1a30a8a0a?auto=format&fit=crop&q=80&w=800', detailImages: ['/image/Antique Elephant Kada.jpg', '/Videos/Antique Elephant Kada video.mp4'] }
];

export const CATEGORIES = Object.values(Category);
export const OCCASIONS = Object.values(Occasion);

export const VIDEOS: YouTubeVideo[] = [
  // Bridal
  { id: 'v1', title: 'The Royal Bridal Collection', thumbnail: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&q=80&w=1600', videoId: 'SQIOYE43sf4', category: 'Bridal', relatedProductId: 'neck-02', approxValue: 245000 },
  { id: 'v2', title: 'Kundak Meenakari Unveiling', thumbnail: 'https://images.unsplash.com/photo-1599643478514-4a42095cc1fe?auto=format&fit=crop&q=80&w=1600', videoId: 'Dwmg0B036Ws', category: 'Bridal', relatedProductId: 'kun-01', approxValue: 125000 },
  { id: 'v3', title: 'Polki Statement Classics', thumbnail: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1600', videoId: '4IS1H7b6orA', category: 'Bridal', relatedProductId: 'neck-08', approxValue: 185000 },

  // Everyday Wear
  { id: 'v4', title: 'Minimalist Office Charms', thumbnail: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=1600', videoId: 'hIaFwOM5Urw', category: 'Everyday Wear', relatedProductId: 'ring-02', approxValue: 18000 },
  { id: 'v5', title: 'Daily Gold Essentials', thumbnail: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=1600', videoId: '0lm15XxbbNE', category: 'Everyday Wear', relatedProductId: 'ear-05', approxValue: 12000 },
  { id: 'v6', title: 'Subtle American Diamond', thumbnail: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1600', videoId: 'IM7JX54p-aY', category: 'Everyday Wear', relatedProductId: 'ear-02', approxValue: 8500 },

  // Styling Tips
  { id: 'v7', title: 'How to Layer Statement Necklaces', thumbnail: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1600', videoId: '4-5ps2buKLI', category: 'Styling Tips', relatedProductId: 'neck-01', approxValue: 89000 },
  { id: 'v8', title: 'Jhumka Styling for Festivals', thumbnail: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=1600', videoId: 'L0I9l5i-7gg', category: 'Styling Tips', relatedProductId: 'ear-01', approxValue: 45000 },
  { id: 'v9', title: 'Bangle Stacking Guide', thumbnail: 'https://images.unsplash.com/photo-1611085583191-a3b1a30a8a0a?auto=format&fit=crop&q=80&w=1600', videoId: 'aCfkG43iXlw', category: 'Styling Tips', relatedProductId: 'ban-01', approxValue: 32000 },

  // Behind the Scenes
  { id: 'v10', title: 'The Artisan Gold Smelting Process', thumbnail: 'https://images.unsplash.com/photo-1584447128309-8d197c362140?auto=format&fit=crop&q=80&w=1600', videoId: 'Xe_JCVLZxRQ', category: 'Behind the Scenes', relatedProductId: 'neck-05', approxValue: null as any },
  { id: 'v11', title: 'Stone Setting: American Diamonds', thumbnail: 'https://images.unsplash.com/photo-1629813204961-00fba68f9aee?auto=format&fit=crop&q=80&w=1600', videoId: '2CZ8-ShsbiU', category: 'Behind the Scenes', relatedProductId: 'ring-01', approxValue: null as any },
  { id: 'v12', title: 'Handcrafting Oxidized Classics', thumbnail: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1600', videoId: 'Ybu2740PhIE', category: 'Behind the Scenes', relatedProductId: 'neck-06', approxValue: null as any },
];

export const SHORTS = [
  // Necklaces (9)
  { id: 'sn1', title: 'Choker Look 01', videoId: 'SQIOYE43sf4', thumbnail: 'https://img.youtube.com/vi/SQIOYE43sf4/maxresdefault.jpg', productId: 'neck-01' },
  { id: 'sn2', title: 'Rani Haar Look 02', videoId: '4IS1H7b6orA', thumbnail: 'https://img.youtube.com/vi/4IS1H7b6orA/maxresdefault.jpg', productId: 'neck-02' },
  { id: 'sn3', title: 'Emerald Look 03', videoId: '4-5ps2buKLI', thumbnail: 'https://img.youtube.com/vi/4-5ps2buKLI/maxresdefault.jpg', productId: 'neck-03' },
  { id: 'sn4', title: 'Meenakari Look 04', videoId: '8ejkOoK8jM8', thumbnail: 'https://img.youtube.com/vi/8ejkOoK8jM8/maxresdefault.jpg', productId: 'neck-04' },
  { id: 'sn5', title: 'Temple Look 05', videoId: 'Xe_JCVLZxRQ', thumbnail: 'https://img.youtube.com/vi/Xe_JCVLZxRQ/maxresdefault.jpg', productId: 'neck-05' },
  { id: 'sn6', title: 'Oxidized Look 06', videoId: 'Ybu2740PhIE', thumbnail: 'https://img.youtube.com/vi/Ybu2740PhIE/maxresdefault.jpg', productId: 'neck-06' },
  { id: 'sn7', title: 'Bridal Look 07', videoId: 'Zx1V0bKveOI', thumbnail: 'https://img.youtube.com/vi/Zx1V0bKveOI/maxresdefault.jpg', productId: 'neck-07' },
  { id: 'sn8', title: 'Polki Look 08', videoId: '3MmNWiruQvk', thumbnail: 'https://img.youtube.com/vi/3MmNWiruQvk/maxresdefault.jpg', productId: 'neck-08' },
  { id: 'sn9', title: 'Gold Look 09', videoId: '0lm15XxbbNE', thumbnail: 'https://img.youtube.com/vi/0lm15XxbbNE/maxresdefault.jpg', productId: 'neck-09' },

  // Earrings (5)
  { id: 'se1', title: 'Jhumka Look 01', videoId: 'L0I9l5i-7gg', thumbnail: 'https://img.youtube.com/vi/L0I9l5i-7gg/maxresdefault.jpg', productId: 'ear-01' },
  { id: 'se2', title: 'Chandbali Look 02', videoId: 'MoDJZvOWKq4', thumbnail: 'https://img.youtube.com/vi/MoDJZvOWKq4/maxresdefault.jpg', productId: 'ear-02' },
  { id: 'se3', title: 'Studs Look 03', videoId: 'hIaFwOM5Urw', thumbnail: 'https://img.youtube.com/vi/hIaFwOM5Urw/maxresdefault.jpg', productId: 'ear-03' },
  { id: 'se4', title: 'Heritage Look 04', videoId: 'AGoFA9Z1CNw', thumbnail: 'https://img.youtube.com/vi/AGoFA9Z1CNw/maxresdefault.jpg', productId: 'ear-04' },
  { id: 'se5', title: 'Floral Look 05', videoId: '7RbUnT67iKk', thumbnail: 'https://img.youtube.com/vi/7RbUnT67iKk/maxresdefault.jpg', productId: 'ear-05' },

  // Kundan (3)
  { id: 'sk1', title: 'Bridal Kundan 01', videoId: 'Dwmg0B036Ws', thumbnail: 'https://img.youtube.com/vi/Dwmg0B036Ws/maxresdefault.jpg', productId: 'kun-01' },
  { id: 'sk2', title: 'Cocktail Kundan 02', videoId: 'axvwCZfCF-I', thumbnail: 'https://img.youtube.com/vi/axvwCZfCF-I/maxresdefault.jpg', productId: 'kun-02' },
  { id: 'sk3', title: 'Heritage Kundan 03', videoId: 'rnm5HV3oBUs', thumbnail: 'https://img.youtube.com/vi/rnm5HV3oBUs/maxresdefault.jpg', productId: 'kun-03' },

  // Rings (2)
  { id: 'sr1', title: 'Polki Ring Look 01', videoId: '7tPW5_3XQVg', thumbnail: 'https://img.youtube.com/vi/7tPW5_3XQVg/maxresdefault.jpg', productId: 'ring-01' },
  { id: 'sr2', title: 'AD Ring Look 02', videoId: 'IM7JX54p-aY', thumbnail: 'https://img.youtube.com/vi/IM7JX54p-aY/maxresdefault.jpg', productId: 'ring-02' },

  // Bangles (5)
  { id: 'sb1', title: 'Gold Bangles Look 01', videoId: 'aCfkG43iXlw', thumbnail: 'https://img.youtube.com/vi/aCfkG43iXlw/maxresdefault.jpg', productId: 'ban-01' },
  { id: 'sb2', title: 'AD Kada Look 02', videoId: 'dnIjoPCWEkc', thumbnail: 'https://img.youtube.com/vi/dnIjoPCWEkc/maxresdefault.jpg', productId: 'ban-02' },
  { id: 'sb3', title: 'Temple Bangle Look 03', videoId: 'CEM0dq7BBoo', thumbnail: 'https://img.youtube.com/vi/CEM0dq7BBoo/maxresdefault.jpg', productId: 'ban-03' },
  { id: 'sb4', title: 'Tribal Bangle Look 04', videoId: '2CZ8-ShsbiU', thumbnail: 'https://img.youtube.com/vi/2CZ8-ShsbiU/maxresdefault.jpg', productId: 'ban-04' },
  { id: 'sb5', title: 'Velvet Bangle Look 05', videoId: 'feNR4IrIyD4', thumbnail: 'https://img.youtube.com/vi/feNR4IrIyD4/maxresdefault.jpg', productId: 'ban-05' },

  // Kada (1)
  { id: 'skd1', title: 'Antique Elephant Kada 01', videoId: 'GlW89D4wXUM', thumbnail: 'https://img.youtube.com/vi/GlW89D4wXUM/maxresdefault.jpg', productId: 'kada-01' }
];
