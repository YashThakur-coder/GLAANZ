
export enum Category {
  KUNDAN = 'Kundan',
  TEMPLE = 'Temple',
  OXIDIZED = 'Oxidized',
  POLKI = 'Polki',
  AMERICAN_DIAMOND = 'American Diamond',
  BANGLES = 'Bangles',
  NECKLACES = 'Necklaces',
  RINGS = 'Finger Rings',
  NOSE_PINS = 'Nose Pins'
}

export enum Occasion {
  WEDDING = 'Wedding',
  FESTIVAL = 'Festival',
  GIFTING = 'Gifting',
  DAILY = 'Daily Wear',
  PARTY = 'Party'
}

export type VideoCategory = 'All' | 'Bridal' | 'Everyday Wear' | 'Styling Tips' | 'Behind the Scenes';

export type ViewState =
  | 'Products'
  | 'Videos'
  | 'About'
  | 'Account'
  | 'Bestsellers'
  | 'TrackOrder'
  | 'Returns'
  | 'Contact'
  | 'Terms'
  | 'Privacy'
  | 'Shipping'
  | 'Refund';

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  _id?: string;
  id: string;
  name: string;
  category: Category;
  occasion?: Occasion;
  price: number;
  description: string;
  imageUrl: string;
  hoverImageUrl?: string;
  detailImages?: string[];
  reviews?: Review[];
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isExclusive?: boolean;
  arAsset?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product { }

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  recommendedProductIds?: string[];
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
  category: VideoCategory;
  approxValue?: number;
  relatedProductId?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: {
    id: string;
    date: string;
    total: number;
    status: 'Delivered' | 'In Transit' | 'Processing';
    items: string[];
  }[];
}
