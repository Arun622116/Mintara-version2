export const SITE_NAME = 'Mintara'
export const PLATFORM_FEE = 0.025
export const MATIC_TO_INR = 7000
export const NAV_LINKS = [
  { label: 'Explore', href: '/explore' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'Create', href: '/create' },
] as const
export const MOBILE_TABS = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Explore', href: '/explore', icon: 'explore' },
  { label: 'Create', href: '/create', icon: 'create' },
  { label: 'Rankings', href: '/rankings', icon: 'rankings' },
  { label: 'Profile', href: '/portfolio', icon: 'profile' },
] as const
export const SORT_OPTIONS = [
  { value: 'recently_listed', label: 'Recently listed' },
  { value: 'recently_sold',   label: 'Recently sold' },
  { value: 'price_low_high',  label: 'Price: low to high' },
  { value: 'price_high_low',  label: 'Price: high to low' },
  { value: 'rarity_rare_first',   label: 'Rarity: rare first' },
  { value: 'rarity_common_first', label: 'Rarity: common first' },
  { value: 'most_viewed',    label: 'Most viewed' },
  { value: 'most_favorited', label: 'Most favorited' },
] as const
export const NFT_CATEGORIES = ['Art','Photography','Music','Gaming','PFP','Collectibles','Sports','Virtual Worlds'] as const
export const TIME_FILTERS = ['1h','6h','24h','7d','30d','All'] as const
