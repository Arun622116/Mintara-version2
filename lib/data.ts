import type { PaletteEntry, Nft, Collection, Creator, SaleActivity, Offer } from './types'

export const PALETTES: PaletteEntry[] = [
  { from: '#064e3b', to: '#065f46',  accent: '#6ee7b7' },
  { from: '#1e1b4b', to: '#312e81',  accent: '#c4b5fd' },
  { from: '#7c2d12', to: '#9a3412',  accent: '#fdba74' },
  { from: '#0c4a6e', to: '#075985',  accent: '#7dd3fc' },
  { from: '#14532d', to: '#166534',  accent: '#86efac' },
  { from: '#4a1d96', to: '#6d28d9',  accent: '#ddd6fe' },
  { from: '#7f1d1d', to: '#991b1b',  accent: '#fca5a5' },
  { from: '#1c1917', to: '#292524',  accent: '#d6d3d1' },
  { from: '#134e4a', to: '#115e59',  accent: '#5eead4' },
  { from: '#713f12', to: '#854d0e',  accent: '#fde68a' },
  { from: '#831843', to: '#9d174d',  accent: '#fbcfe8' },
  { from: '#0f172a', to: '#1e293b',  accent: '#94a3b8' },
]

export const pal = (i: number): PaletteEntry => PALETTES[i % PALETTES.length]

export const COLLECTIONS: Collection[] = [
  {
    id: 'col1', slug: 'dravidian-mandalas', name: 'Dravidian Mandalas',
    description: '847 generative mandalas mathematically derived from the geometric proportions of South Indian temple architecture. Each piece encodes a different temple — Brihadeeswarar, Meenakshi, Ranganathaswamy — as parametric data.',
    creatorId: 'cr1', creatorName: 'Arjun Sharma', verified: true, category: 'Art',
    bannerPaletteIndex: 0, avatarPaletteIndex: 4,
    totalItems: 847, totalOwners: 312, floorPrice: 1.20, floorPriceINR: '₹8,400',
    volume24h: 14.8, volume7d: 89.2, volumeAll: 1240.5, volumeAllINR: '₹86.8L',
    change24h: 22.5, change7d: 8.3, topOffer: 1.05, listed: 34,
    isNew: false, isVerified: true, chain: 'Polygon',
    traits: [
      { name: 'Temple', values: [{ label: 'Brihadeeswarar', count: 284, pct: 33.5 }, { label: 'Meenakshi', count: 198, pct: 23.4 }, { label: 'Ranganathaswamy', count: 172, pct: 20.3 }, { label: 'Kapaleeshwarar', count: 193, pct: 22.8 }] },
      { name: 'Palette', values: [{ label: 'Temple Gold', count: 211, pct: 24.9 }, { label: 'Stone Grey', count: 198, pct: 23.4 }, { label: 'Copper Bronze', count: 186, pct: 22.0 }, { label: 'Lapis Blue', count: 252, pct: 29.7 }] },
      { name: 'Complexity', values: [{ label: 'Simple', count: 169, pct: 20.0 }, { label: 'Moderate', count: 254, pct: 30.0 }, { label: 'Complex', count: 254, pct: 30.0 }, { label: 'Intricate', count: 170, pct: 20.1 }] },
      { name: 'Era', values: [{ label: 'Classical', count: 423, pct: 50.0 }, { label: 'Medieval', count: 254, pct: 30.0 }, { label: 'Modern', count: 170, pct: 20.1 }] },
    ],
    createdAt: '2024-03-01',
  },
  {
    id: 'col2', slug: 'raga-sessions', name: 'Raga Sessions Vol.1',
    description: '24 one-of-one audio NFTs — original Carnatic and Hindustani fusion compositions. Each NFT transfers full streaming rights and 50% of future licensing revenue to the holder.',
    creatorId: 'cr2', creatorName: 'Meera Sharma', verified: true, category: 'Music',
    bannerPaletteIndex: 1, avatarPaletteIndex: 5,
    totalItems: 24, totalOwners: 18, floorPrice: 3.20, floorPriceINR: '₹22,400',
    volume24h: 6.4, volume7d: 42.0, volumeAll: 280.0, volumeAllINR: '₹19.6L',
    change24h: 16.0, change7d: 5.2, topOffer: 2.80, listed: 58,
    isNew: false, isVerified: true, chain: 'Polygon',
    traits: [
      { name: 'Genre', values: [{ label: 'Carnatic', count: 10, pct: 41.7 }, { label: 'Hindustani', count: 8, pct: 33.3 }, { label: 'Fusion', count: 6, pct: 25.0 }] },
      { name: 'Instrument', values: [{ label: 'Veena', count: 6, pct: 25.0 }, { label: 'Tabla', count: 8, pct: 33.3 }, { label: 'Violin', count: 5, pct: 20.8 }, { label: 'Mridangam', count: 5, pct: 20.8 }] },
      { name: 'Duration', values: [{ label: '< 3 min', count: 8, pct: 33.3 }, { label: '3–5 min', count: 12, pct: 50.0 }, { label: '> 5 min', count: 4, pct: 16.7 }] },
    ],
    createdAt: '2024-01-20',
  },
  {
    id: 'col3', slug: 'ipl-2025-access', name: 'IPL 2025 Access',
    description: '5,000 NFT event tickets for IPL 2025. Transfer any NFT to transfer its seat. Gate-verified on Polygon. Resale royalties go back to BCCI and the original event organisers.',
    creatorId: 'cr3', creatorName: 'IPL Official', verified: true, category: 'Sports',
    bannerPaletteIndex: 2, avatarPaletteIndex: 6,
    totalItems: 5000, totalOwners: 3200, floorPrice: 0.30, floorPriceINR: '₹2,100',
    volume24h: 84.0, volume7d: 420.0, volumeAll: 8680.0, volumeAllINR: '₹6.07Cr',
    change24h: 8.3, change7d: 2.1, topOffer: 0.28, listed: 12,
    isNew: false, isVerified: true, chain: 'Polygon',
    traits: [
      { name: 'Match', values: [{ label: 'MI vs CSK', count: 800, pct: 16.0 }, { label: 'RCB vs KKR', count: 800, pct: 16.0 }, { label: 'Final', count: 300, pct: 6.0 }, { label: 'Semi-Final', count: 600, pct: 12.0 }] },
      { name: 'Stand', values: [{ label: 'VIP', count: 500, pct: 10.0 }, { label: 'Premium', count: 1000, pct: 20.0 }, { label: 'General', count: 3500, pct: 70.0 }] },
      { name: 'Venue', values: [{ label: 'Wankhede', count: 800, pct: 16.0 }, { label: 'Eden Gardens', count: 800, pct: 16.0 }, { label: 'Narendra Modi', count: 700, pct: 14.0 }] },
    ],
    createdAt: '2024-02-01',
  },
  {
    id: 'col4', slug: 'warli-reimagined', name: 'Warli Reimagined',
    description: '50 animated interpretations of traditional Warli folk art. Each figure was individually hand-drawn on handmade paper, then digitally animated.',
    creatorId: 'cr4', creatorName: 'Ananya Krishnan', verified: true, category: 'Art',
    bannerPaletteIndex: 3, avatarPaletteIndex: 8,
    totalItems: 50, totalOwners: 38, floorPrice: 1.80, floorPriceINR: '₹12,600',
    volume24h: 3.6, volume7d: 18.0, volumeAll: 94.5, volumeAllINR: '₹6.6L',
    change24h: -3.6, change7d: -8.2, topOffer: 1.60, listed: 44,
    isNew: false, isVerified: true, chain: 'Polygon',
    traits: [
      { name: 'Subject', values: [{ label: 'Dancing Figures', count: 18, pct: 36.0 }, { label: 'Animals', count: 14, pct: 28.0 }, { label: 'Village Life', count: 12, pct: 24.0 }, { label: 'Ceremony', count: 6, pct: 12.0 }] },
      { name: 'Animation', values: [{ label: 'Looping', count: 35, pct: 70.0 }, { label: 'One-shot', count: 15, pct: 30.0 }] },
      { name: 'Paper', values: [{ label: 'Handmade', count: 38, pct: 76.0 }, { label: 'Cotton Rag', count: 12, pct: 24.0 }] },
    ],
    createdAt: '2024-04-01',
  },
  {
    id: 'col5', slug: 'mumbai-street-souls', name: 'Mumbai Street Souls',
    description: '112 high-resolution photographs of Mumbai street life — Dharavi workshops, Sassoon Docks at dawn, Colaba Causeway on a Sunday. Each photograph is a 1/1 edition with the physical print shipped to the holder.',
    creatorId: 'cr5', creatorName: 'Rahul Verma', verified: false, category: 'Photography',
    bannerPaletteIndex: 7, avatarPaletteIndex: 11,
    totalItems: 112, totalOwners: 67, floorPrice: 0.90, floorPriceINR: '₹6,300',
    volume24h: 1.8, volume7d: 9.6, volumeAll: 57.6, volumeAllINR: '₹4.0L',
    change24h: 4.2, change7d: 11.0, topOffer: 0.82, listed: 29,
    isNew: true, isVerified: false, chain: 'Polygon',
    traits: [
      { name: 'Location', values: [{ label: 'Dharavi', count: 28, pct: 25.0 }, { label: 'Colaba', count: 22, pct: 19.6 }, { label: 'Sassoon Docks', count: 18, pct: 16.1 }, { label: 'Bandra', count: 30, pct: 26.8 }] },
      { name: 'Time of Day', values: [{ label: 'Dawn', count: 34, pct: 30.4 }, { label: 'Afternoon', count: 28, pct: 25.0 }, { label: 'Dusk', count: 28, pct: 25.0 }, { label: 'Night', count: 22, pct: 19.6 }] },
      { name: 'Physical Print', values: [{ label: 'Included', count: 112, pct: 100.0 }] },
    ],
    createdAt: '2026-03-15',
  },
  {
    id: 'col6', slug: 'madhubani-portraits', name: 'Madhubani Portraits',
    description: '36 contemporary portrait studies rendered entirely in the Madhubani folk painting tradition of Bihar. Each artwork took 2–4 weeks to complete using natural pigments on handmade paper.',
    creatorId: 'cr6', creatorName: 'Priya Nair', verified: true, category: 'Art',
    bannerPaletteIndex: 10, avatarPaletteIndex: 6,
    totalItems: 36, totalOwners: 24, floorPrice: 2.40, floorPriceINR: '₹16,800',
    volume24h: 4.8, volume7d: 24.0, volumeAll: 144.0, volumeAllINR: '₹10.1L',
    change24h: 12.0, change7d: 6.4, topOffer: 2.10, listed: 50,
    isNew: false, isVerified: true, chain: 'Polygon',
    traits: [
      { name: 'Subject', values: [{ label: 'Women', count: 18, pct: 50.0 }, { label: 'Men', count: 10, pct: 27.8 }, { label: 'Children', count: 8, pct: 22.2 }] },
      { name: 'Pigment', values: [{ label: 'Natural', count: 24, pct: 66.7 }, { label: 'Mixed', count: 12, pct: 33.3 }] },
      { name: 'Time to Complete', values: [{ label: '2 weeks', count: 12, pct: 33.3 }, { label: '3 weeks', count: 14, pct: 38.9 }, { label: '4 weeks', count: 10, pct: 27.8 }] },
    ],
    createdAt: '2024-06-01',
  },
]

export const NFTS: Nft[] = [
  { id: 'nft001', name: 'Dravidian Mandala #147', tokenId: '#147', collectionId: 'col1', collectionName: 'Dravidian Mandalas', creatorId: 'cr1', creatorName: 'Arjun Sharma', creatorVerified: true, category: 'Art', description: 'Brihadeeswarar at maximum complexity — 2,847 geometric vertices encoding the vimana spire ratio.', status: 'buy_now', price: 2.40, priceINR: '₹16,800', lastSalePrice: 1.80, topOffer: 2.10, rarity: 3, rarityScore: 98.2, views: 4820, favorites: 312, isNew: false, hasOffers: true, auctionEndsAt: null, traits: [{ category: 'Temple', value: 'Brihadeeswarar', rarity: 33.5, count: 284 }, { category: 'Palette', value: 'Temple Gold', rarity: 24.9, count: 211 }, { category: 'Complexity', value: 'Intricate', rarity: 20.1, count: 170 }, { category: 'Era', value: 'Classical', rarity: 50.0, count: 423 }], paletteIndex: 0, createdAt: '2024-03-15', chain: 'Polygon' },
  { id: 'nft002', name: 'Dravidian Mandala #392', tokenId: '#392', collectionId: 'col1', collectionName: 'Dravidian Mandalas', creatorId: 'cr1', creatorName: 'Arjun Sharma', creatorVerified: true, category: 'Art', description: 'Meenakshi Amman encoded in Lapis Blue — the twin fish motif reflected in 12-fold symmetry.', status: 'on_auction', price: 1.80, priceINR: '₹12,600', lastSalePrice: 1.20, topOffer: 1.75, rarity: 12, rarityScore: 91.4, views: 2240, favorites: 168, isNew: false, hasOffers: true, auctionEndsAt: '2026-04-30T18:00:00Z', traits: [{ category: 'Temple', value: 'Meenakshi', rarity: 23.4, count: 198 }, { category: 'Palette', value: 'Lapis Blue', rarity: 29.7, count: 252 }, { category: 'Complexity', value: 'Complex', rarity: 30.0, count: 254 }, { category: 'Era', value: 'Medieval', rarity: 30.0, count: 254 }], paletteIndex: 3, createdAt: '2024-03-18', chain: 'Polygon' },
  { id: 'nft003', name: 'Dravidian Mandala #571', tokenId: '#571', collectionId: 'col1', collectionName: 'Dravidian Mandalas', creatorId: 'cr1', creatorName: 'Arjun Sharma', creatorVerified: true, category: 'Art', description: 'Ranganathaswamy — the sleeping Vishnu encoded as a horizontal mandala, unique in the collection.', status: 'buy_now', price: 1.20, priceINR: '₹8,400', lastSalePrice: null, topOffer: 0.98, rarity: 47, rarityScore: 82.1, views: 980, favorites: 72, isNew: false, hasOffers: true, auctionEndsAt: null, traits: [{ category: 'Temple', value: 'Ranganathaswamy', rarity: 20.3, count: 172 }, { category: 'Palette', value: 'Copper Bronze', rarity: 22.0, count: 186 }, { category: 'Complexity', value: 'Moderate', rarity: 30.0, count: 254 }, { category: 'Era', value: 'Classical', rarity: 50.0, count: 423 }], paletteIndex: 4, createdAt: '2024-03-22', chain: 'Polygon' },
  { id: 'nft004', name: 'Dravidian Mandala #008', tokenId: '#008', collectionId: 'col1', collectionName: 'Dravidian Mandalas', creatorId: 'cr1', creatorName: 'Arjun Sharma', creatorVerified: true, category: 'Art', description: 'The rarest of the collection — Kapaleeshwarar rendered in Stone Grey with simple symmetry, an anomaly.', status: 'open_to_offers', price: null, priceINR: null, lastSalePrice: 3.60, topOffer: 3.20, rarity: 1, rarityScore: 99.8, views: 12480, favorites: 847, isNew: false, hasOffers: true, auctionEndsAt: null, traits: [{ category: 'Temple', value: 'Kapaleeshwarar', rarity: 22.8, count: 193 }, { category: 'Palette', value: 'Stone Grey', rarity: 23.4, count: 198 }, { category: 'Complexity', value: 'Simple', rarity: 20.0, count: 169 }, { category: 'Era', value: 'Modern', rarity: 20.1, count: 170 }], paletteIndex: 7, createdAt: '2024-03-10', chain: 'Polygon' },
  { id: 'nft005', name: 'Raga Bhairavi at Sunrise', tokenId: '#001', collectionId: 'col2', collectionName: 'Raga Sessions Vol.1', creatorId: 'cr2', creatorName: 'Meera Sharma', creatorVerified: true, category: 'Music', description: 'A 6-minute Bhairavi composition recorded at 5:34 AM on the Mahabalipuram shore. Holder receives full streaming rights.', status: 'buy_now', price: 5.00, priceINR: '₹35,000', lastSalePrice: null, topOffer: 4.40, rarity: 1, rarityScore: 99.9, views: 8920, favorites: 624, isNew: false, hasOffers: true, auctionEndsAt: null, traits: [{ category: 'Genre', value: 'Carnatic', rarity: 41.7, count: 10 }, { category: 'Instrument', value: 'Veena', rarity: 25.0, count: 6 }, { category: 'Duration', value: '> 5 min', rarity: 16.7, count: 4 }], paletteIndex: 1, createdAt: '2024-01-22', chain: 'Polygon' },
  { id: 'nft006', name: 'Tabla Loop Series — III', tokenId: '#012', collectionId: 'col2', collectionName: 'Raga Sessions Vol.1', creatorId: 'cr2', creatorName: 'Meera Sharma', creatorVerified: true, category: 'Music', description: '2-minute tabla loop in Teentaal with live crowd ambience from Sawai Gandharva Bhimsen Festival 2024.', status: 'on_auction', price: 3.80, priceINR: '₹26,600', lastSalePrice: 3.00, topOffer: 3.60, rarity: 3, rarityScore: 97.4, views: 3240, favorites: 248, isNew: false, hasOffers: true, auctionEndsAt: '2026-04-30T12:00:00Z', traits: [{ category: 'Genre', value: 'Hindustani', rarity: 33.3, count: 8 }, { category: 'Instrument', value: 'Tabla', rarity: 33.3, count: 8 }, { category: 'Duration', value: '< 3 min', rarity: 33.3, count: 8 }], paletteIndex: 5, createdAt: '2024-01-25', chain: 'Polygon' },
  { id: 'nft007', name: 'IPL Final 2025 — VIP Box A', tokenId: '#0042', collectionId: 'col3', collectionName: 'IPL 2025 Access', creatorId: 'cr3', creatorName: 'IPL Official', creatorVerified: true, category: 'Sports', description: 'VIP Box A seat — Narendra Modi Stadium, Ahmedabad. IPL 2025 Final. Includes pre-match hospitality and player meet access.', status: 'buy_now', price: 1.20, priceINR: '₹8,400', lastSalePrice: 0.80, topOffer: 1.10, rarity: 8, rarityScore: 95.2, views: 18400, favorites: 1240, isNew: false, hasOffers: true, auctionEndsAt: null, traits: [{ category: 'Match', value: 'Final', rarity: 6.0, count: 300 }, { category: 'Stand', value: 'VIP', rarity: 10.0, count: 500 }, { category: 'Venue', value: 'Narendra Modi', rarity: 14.0, count: 700 }], paletteIndex: 2, createdAt: '2024-02-10', chain: 'Polygon' },
  { id: 'nft008', name: 'IPL Match #12 — MI vs CSK', tokenId: '#1842', collectionId: 'col3', collectionName: 'IPL 2025 Access', creatorId: 'cr3', creatorName: 'IPL Official', creatorVerified: true, category: 'Sports', description: 'Premium stand — Wankhede Stadium, Mumbai. MI vs CSK. A seat at the greatest rivalry in cricket.', status: 'buy_now', price: 0.45, priceINR: '₹3,150', lastSalePrice: null, topOffer: 0.40, rarity: 124, rarityScore: 71.2, views: 6720, favorites: 384, isNew: false, hasOffers: false, auctionEndsAt: null, traits: [{ category: 'Match', value: 'MI vs CSK', rarity: 16.0, count: 800 }, { category: 'Stand', value: 'Premium', rarity: 20.0, count: 1000 }, { category: 'Venue', value: 'Wankhede', rarity: 16.0, count: 800 }], paletteIndex: 6, createdAt: '2024-02-12', chain: 'Polygon' },
  { id: 'nft009', name: 'Warli Dance — Full Moon', tokenId: '#7', collectionId: 'col4', collectionName: 'Warli Reimagined', creatorId: 'cr4', creatorName: 'Ananya Krishnan', creatorVerified: true, category: 'Art', description: 'Twelve dancing figures around a full moon — each drawn in a single continuous line. Cotton rag paper on hand-processed natural ochre.', status: 'buy_now', price: 3.20, priceINR: '₹22,400', lastSalePrice: 2.40, topOffer: 2.80, rarity: 2, rarityScore: 98.8, views: 4120, favorites: 284, isNew: false, hasOffers: true, auctionEndsAt: null, traits: [{ category: 'Subject', value: 'Dancing Figures', rarity: 36.0, count: 18 }, { category: 'Animation', value: 'Looping', rarity: 70.0, count: 35 }, { category: 'Paper', value: 'Cotton Rag', rarity: 24.0, count: 12 }], paletteIndex: 8, createdAt: '2024-04-10', chain: 'Polygon' },
  { id: 'nft010', name: 'Warli Harvest Ceremony', tokenId: '#22', collectionId: 'col4', collectionName: 'Warli Reimagined', creatorId: 'cr4', creatorName: 'Ananya Krishnan', creatorVerified: true, category: 'Art', description: 'Paddy harvest ceremony — 48 individual figures across a 4-metre composition, animated as a slow procession.', status: 'open_to_offers', price: null, priceINR: null, lastSalePrice: 4.20, topOffer: 3.80, rarity: 4, rarityScore: 97.1, views: 2840, favorites: 196, isNew: false, hasOffers: true, auctionEndsAt: null, traits: [{ category: 'Subject', value: 'Ceremony', rarity: 12.0, count: 6 }, { category: 'Animation', value: 'One-shot', rarity: 30.0, count: 15 }, { category: 'Paper', value: 'Handmade', rarity: 76.0, count: 38 }], paletteIndex: 9, createdAt: '2024-04-15', chain: 'Polygon' },
  { id: 'nft011', name: 'Sassoon Docks, 5:12 AM', tokenId: '#34', collectionId: 'col5', collectionName: 'Mumbai Street Souls', creatorId: 'cr5', creatorName: 'Rahul Verma', creatorVerified: false, category: 'Photography', description: 'Fisherwomen sorting the morning catch in the grey-blue light before sunrise. Shot on medium format film, developed in caffenol.', status: 'buy_now', price: 1.60, priceINR: '₹11,200', lastSalePrice: null, topOffer: 1.40, rarity: 7, rarityScore: 95.8, views: 1840, favorites: 124, isNew: true, hasOffers: true, auctionEndsAt: null, traits: [{ category: 'Location', value: 'Sassoon Docks', rarity: 16.1, count: 18 }, { category: 'Time of Day', value: 'Dawn', rarity: 30.4, count: 34 }, { category: 'Physical Print', value: 'Included', rarity: 100.0, count: 112 }], paletteIndex: 11, createdAt: '2026-03-20', chain: 'Polygon' },
  { id: 'nft012', name: 'Dharavi Workshop #08', tokenId: '#67', collectionId: 'col5', collectionName: 'Mumbai Street Souls', creatorId: 'cr5', creatorName: 'Rahul Verma', creatorVerified: false, category: 'Photography', description: 'Leather craftsman surrounded by the geometry of his tools, Dharavi. The last generation of this trade.', status: 'buy_now', price: 0.90, priceINR: '₹6,300', lastSalePrice: null, topOffer: 0.80, rarity: 24, rarityScore: 83.2, views: 980, favorites: 68, isNew: true, hasOffers: false, auctionEndsAt: null, traits: [{ category: 'Location', value: 'Dharavi', rarity: 25.0, count: 28 }, { category: 'Time of Day', value: 'Afternoon', rarity: 25.0, count: 28 }, { category: 'Physical Print', value: 'Included', rarity: 100.0, count: 112 }], paletteIndex: 7, createdAt: '2026-03-22', chain: 'Polygon' },
  { id: 'nft013', name: 'Sita in the Garden', tokenId: '#3', collectionId: 'col6', collectionName: 'Madhubani Portraits', creatorId: 'cr6', creatorName: 'Priya Nair', creatorVerified: true, category: 'Art', description: 'Three weeks of work — Sita surrounded by the Ashoka forest in full bloom. Natural indigo, turmeric and pomegranate rind pigments on handmade paper.', status: 'buy_now', price: 4.80, priceINR: '₹33,600', lastSalePrice: 3.60, topOffer: 4.20, rarity: 2, rarityScore: 98.4, views: 6240, favorites: 428, isNew: false, hasOffers: true, auctionEndsAt: null, traits: [{ category: 'Subject', value: 'Women', rarity: 50.0, count: 18 }, { category: 'Pigment', value: 'Natural', rarity: 66.7, count: 24 }, { category: 'Time to Complete', value: '3 weeks', rarity: 38.9, count: 14 }], paletteIndex: 10, createdAt: '2024-06-15', chain: 'Polygon' },
  { id: 'nft014', name: 'The Weaver — Study No.12', tokenId: '#18', collectionId: 'col6', collectionName: 'Madhubani Portraits', creatorId: 'cr6', creatorName: 'Priya Nair', creatorVerified: true, category: 'Art', description: 'A young weaver from Sitamarhi, Bihar. Mixed pigments — natural lac with synthetic ochre for the loom.', status: 'on_auction', price: 2.40, priceINR: '₹16,800', lastSalePrice: 2.00, topOffer: 2.20, rarity: 11, rarityScore: 91.8, views: 2180, favorites: 156, isNew: false, hasOffers: true, auctionEndsAt: '2026-04-30T20:00:00Z', traits: [{ category: 'Subject', value: 'Men', rarity: 27.8, count: 10 }, { category: 'Pigment', value: 'Mixed', rarity: 33.3, count: 12 }, { category: 'Time to Complete', value: '2 weeks', rarity: 33.3, count: 12 }], paletteIndex: 9, createdAt: '2024-06-20', chain: 'Polygon' },
]

export const CREATORS: Creator[] = [
  { id: 'cr1', username: 'arjun_creates', displayName: 'Arjun Sharma', bio: 'Generative artist and architect from Chennai. I encode the mathematical language of Dravidian temple architecture into visual algorithms. Every piece is a building transformed into pure geometry.', verified: true, paletteIndex: 0, joinedAt: '2023-08-15', totalVolume: 1240.5, totalVolumeINR: '₹86.8L', totalSales: 284, followers: 4820, following: 312, collections: ['col1'], socials: { twitter: 'arjun_creates', instagram: 'arjun.creates', website: 'arjunsharma.art' } },
  { id: 'cr2', username: 'meera_music', displayName: 'Meera Sharma', bio: 'Musician, producer, and Carnatic vocalist from Chennai. Tokenising the rarest art form in the world — one raga at a time. Each NFT is a 1/1 performance that will never be replicated.', verified: true, paletteIndex: 1, joinedAt: '2023-10-01', totalVolume: 280.0, totalVolumeINR: '₹19.6L', totalSales: 62, followers: 3400, following: 128, collections: ['col2'], socials: { twitter: 'meera_music', instagram: 'meera.sharma' } },
  { id: 'cr3', username: 'ipl_official', displayName: 'IPL Official', bio: 'Official NFT ticketing platform for the Indian Premier League. Blockchain-verified seats. Non-transferable until you choose to sell.', verified: true, paletteIndex: 2, joinedAt: '2024-01-01', totalVolume: 8680.0, totalVolumeINR: '₹6.07Cr', totalSales: 18400, followers: 125000, following: 0, collections: ['col3'], socials: { twitter: 'IPL' } },
  { id: 'cr4', username: 'ananya_k', displayName: 'Ananya Krishnan', bio: 'Visual artist from Kochi exploring the dialogue between tribal art forms and digital permanence. My Warli animations preserve techniques that exist in only three villages in Maharashtra.', verified: true, paletteIndex: 3, joinedAt: '2023-12-10', totalVolume: 94.5, totalVolumeINR: '₹6.6L', totalSales: 38, followers: 1890, following: 247, collections: ['col4'], socials: { twitter: 'ananya_k', instagram: 'ananya.art' } },
  { id: 'cr5', username: 'rahul_photo', displayName: 'Rahul Verma', bio: 'Documentary photographer from Mumbai. I photograph the people and places that disappear before they can be remembered. Every NFT includes the physical medium-format print.', verified: false, paletteIndex: 7, joinedAt: '2026-02-20', totalVolume: 57.6, totalVolumeINR: '₹4.0L', totalSales: 112, followers: 840, following: 192, collections: ['col5'], socials: { instagram: 'rahul.verma.photo' } },
  { id: 'cr6', username: 'priya_art', displayName: 'Priya Nair', bio: 'Madhubani painter from Kochi. I trained under the last masters of this 2,500-year-old Bihar folk painting tradition. Each work takes 2–4 weeks using only natural pigments on handmade paper.', verified: true, paletteIndex: 10, joinedAt: '2024-03-15', totalVolume: 144.0, totalVolumeINR: '₹10.1L', totalSales: 24, followers: 2240, following: 184, collections: ['col6'], socials: { instagram: 'priya.madhubani', website: 'priyanair.art' } },
]

export const ACTIVITY: SaleActivity[] = [
  { id: 'a1', nftId: 'nft001', nftName: 'Dravidian Mandala #147',   collectionId: 'col1', eventType: 'Sale',   price: 2.40, priceINR: '₹16,800', from: '0x1f9...3a2d', to: 'dev_collector',  timestamp: '2026-04-27T09:14:00Z', txHash: '0xaaa...111' },
  { id: 'a2', nftId: 'nft009', nftName: 'Warli Dance — Full Moon',  collectionId: 'col4', eventType: 'Sale',   price: 3.20, priceINR: '₹22,400', from: 'ananya_k',     to: '0x8c4...f12e',   timestamp: '2026-04-27T08:52:00Z', txHash: '0xbbb...222' },
  { id: 'a3', nftId: 'nft005', nftName: 'Raga Bhairavi at Sunrise', collectionId: 'col2', eventType: 'Offer',  price: 4.40, priceINR: '₹30,800', from: '0x4d2...cc89', to: 'meera_music',    timestamp: '2026-04-27T08:41:00Z', txHash: '0xccc...333' },
  { id: 'a4', nftId: 'nft013', nftName: 'Sita in the Garden',       collectionId: 'col6', eventType: 'Sale',   price: 4.80, priceINR: '₹33,600', from: 'priya_art',    to: '0x2f1...d45a',   timestamp: '2026-04-27T08:28:00Z', txHash: '0xddd...444' },
  { id: 'a5', nftId: 'nft007', nftName: 'IPL Final 2025 — VIP Box A', collectionId: 'col3', eventType: 'List', price: 1.20, priceINR: '₹8,400', from: '0x9a3...12bc', to: '-',              timestamp: '2026-04-27T08:15:00Z', txHash: '0xeee...555' },
  { id: 'a6', nftId: 'nft002', nftName: 'Dravidian Mandala #392',   collectionId: 'col1', eventType: 'Offer',  price: 1.75, priceINR: '₹12,250', from: '0x3c8...aa14', to: 'arjun_creates',  timestamp: '2026-04-27T08:02:00Z', txHash: '0xfff...666' },
  { id: 'a7', nftId: 'nft011', nftName: 'Sassoon Docks, 5:12 AM',   collectionId: 'col5', eventType: 'Sale',   price: 1.60, priceINR: '₹11,200', from: 'rahul_photo',  to: '0x7e2...b38f',   timestamp: '2026-04-27T07:49:00Z', txHash: '0x000...777' },
  { id: 'a8', nftId: 'nft006', nftName: 'Tabla Loop Series — III',  collectionId: 'col2', eventType: 'Offer',  price: 3.60, priceINR: '₹25,200', from: '0x5f4...22dd', to: 'meera_music',    timestamp: '2026-04-27T07:36:00Z', txHash: '0x111...888' },
]

export const OFFERS: Offer[] = [
  { id: 'o1', nftId: 'nft001', offerer: '0x4d2...cc89',    amount: 2.10, amountINR: '₹14,700', expiresAt: '2026-05-01T00:00:00Z', floorDiff: 75 },
  { id: 'o2', nftId: 'nft001', offerer: 'dev_collector',   amount: 1.80, amountINR: '₹12,600', expiresAt: '2026-04-30T00:00:00Z', floorDiff: 50 },
  { id: 'o3', nftId: 'nft001', offerer: '0x9a3...12bc',    amount: 1.44, amountINR: '₹10,080', expiresAt: '2026-05-04T00:00:00Z', floorDiff: 20 },
]

export const RANKINGS = [...COLLECTIONS]
  .map((c, i) => ({ ...c, rank: i + 1, volume: c.volumeAll, floorChange: c.change24h }))
  .sort((a, b) => b.volume - a.volume)
  .map((c, i) => ({ ...c, rank: i + 1 }))
