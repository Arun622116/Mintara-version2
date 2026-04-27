export type NftCategory = 'Art' | 'Photography' | 'Music' | 'Gaming' | 'PFP' | 'Collectibles' | 'Sports' | 'Virtual Worlds'
export type NftStatus   = 'buy_now' | 'on_auction' | 'open_to_offers' | 'not_for_sale'
export type ChainName   = 'Polygon' | 'Ethereum' | 'Solana'

export interface PaletteEntry {
  from:   string
  to:     string
  accent: string
}

export interface NftTrait {
  category: string
  value:    string
  rarity:   number
  count:    number
}

export interface Nft {
  id:              string
  name:            string
  tokenId:         string
  collectionId:    string
  collectionName:  string
  creatorId:       string
  creatorName:     string
  creatorVerified: boolean
  category:        NftCategory
  description:     string
  status:          NftStatus
  price:           number | null
  priceINR:        string | null
  lastSalePrice:   number | null
  topOffer:        number | null
  rarity:          number | null
  rarityScore:     number | null
  views:           number
  favorites:       number
  isNew:           boolean
  hasOffers:       boolean
  auctionEndsAt:   string | null
  traits:          NftTrait[]
  paletteIndex:    number
  createdAt:       string
  chain:           ChainName
}

export interface Collection {
  id:               string
  slug:             string
  name:             string
  description:      string
  creatorId:        string
  creatorName:      string
  verified:         boolean
  category:         NftCategory
  bannerPaletteIndex: number
  avatarPaletteIndex: number
  totalItems:       number
  totalOwners:      number
  floorPrice:       number
  floorPriceINR:    string
  volume24h:        number
  volume7d:         number
  volumeAll:        number
  volumeAllINR:     string
  change24h:        number
  change7d:         number
  topOffer:         number
  listed:           number
  isNew:            boolean
  isVerified:       boolean
  chain:            ChainName
  traits:           CollectionTraitGroup[]
  createdAt:        string
}

export interface CollectionTraitGroup {
  name:   string
  values: { label: string; count: number; pct: number }[]
}

export interface Creator {
  id:             string
  username:       string
  displayName:    string
  bio:            string
  verified:       boolean
  paletteIndex:   number
  joinedAt:       string
  totalVolume:    number
  totalVolumeINR: string
  totalSales:     number
  followers:      number
  following:      number
  collections:    string[]
  socials: {
    twitter?:   string
    instagram?: string
    website?:   string
  }
}

export interface SaleActivity {
  id:           string
  nftId:        string
  nftName:      string
  collectionId: string
  eventType:    'Sale' | 'Transfer' | 'Mint' | 'List' | 'Offer' | 'Cancel'
  price:        number | null
  priceINR:     string | null
  from:         string
  to:           string
  timestamp:    string
  txHash:       string
}

export interface Offer {
  id:        string
  nftId:     string
  offerer:   string
  amount:    number
  amountINR: string
  expiresAt: string
  floorDiff: number
}

export interface FilterState {
  status:     string[]
  priceMin:   string
  priceMax:   string
  categories: NftCategory[]
  traits:     Record<string, string[]>
  chains:     ChainName[]
  sortBy:     SortOption
}

export type SortOption =
  | 'recently_listed'
  | 'recently_sold'
  | 'price_low_high'
  | 'price_high_low'
  | 'rarity_rare_first'
  | 'rarity_common_first'
  | 'most_viewed'
  | 'most_favorited'
