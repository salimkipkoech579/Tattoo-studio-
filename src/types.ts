export type TattooStyleCategory =
  | 'All'
  | 'Black & Grey'
  | 'Fine Line'
  | 'Realism'
  | 'Traditional'
  | 'Neo-Traditional'
  | 'Japanese'
  | 'Lettering'
  | 'Color'
  | 'Minimalist'
  | 'Cover-Up'
  | 'Sleeve'
  | 'Custom Designs';

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface PortfolioItem {
  id: string;
  title: string;
  style: TattooStyleCategory;
  imageUrl: string;
  description: string;
  artist: string;
  placement: string;
  size: string;
  colorType: 'Black & Grey' | 'Color' | 'Black & Grey with Accent';
  date: string;
  featured?: boolean;
}

export interface TattooService {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  startingPrice: string;
  avgHours: string;
  imageUrl: string;
  styleTag: TattooStyleCategory;
  features: string[];
}

export interface ArtistProfile {
  id: string;
  name: string;
  moniker: string;
  role: string;
  portraitUrl: string;
  bio: string;
  experienceYears: number;
  tattoosCount: number;
  clientsCount: number;
  rating: number;
  specialties: string[];
  certifications: string[];
  philosophy: string;
  socials: {
    instagram: string;
    tiktok: string;
    facebook: string;
  };
}

export interface BookingRequest {
  id: string;
  referenceCode: string;
  fullName: string;
  email: string;
  phone: string;
  tattooStyle: TattooStyleCategory;
  placement: string;
  approximateSize: string;
  colorType: 'Black & Grey' | 'Color' | 'Undecided';
  budgetRange: string;
  preferredDate: string;
  preferredTime: string;
  description: string;
  referenceImageUrl?: string;
  additionalNotes?: string;
  artistPreference?: string;
  status: BookingStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  rating: number;
  review: string;
  tattooStyle: string;
  artist: string;
  date: string;
  verified: boolean;
  avatarUrl?: string;
}

export interface StudioInfo {
  name: string;
  tagline: string;
  address: string;
  cityState: string;
  phone: string;
  email: string;
  whatsapp: string;
  hours: {
    [key: string]: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    tiktok: string;
    pinterest: string;
  };
}

export interface AftercareTimelinePhase {
  phase: string;
  days: string;
  summary: string;
  instructions: string[];
  whatToExpect: string;
}

export interface StyleCharacteristic {
  title: string;
  badge: string;
  description: string;
  technicalNote?: string;
  iconType?: 'needle' | 'clock' | 'shield' | 'sparkle' | 'layers' | 'eye';
}

export interface StyleExampleImage {
  id: string;
  title: string;
  imageUrl: string;
  artist: string;
  placement: string;
  technique: string;
  caption: string;
}

export interface TattooStyleDetail {
  id: string;
  styleTag: TattooStyleCategory;
  serviceTitle: string;
  headline: string;
  explanation: string;
  artisticPhilosophy: string;
  characteristics: StyleCharacteristic[];
  exampleImages: StyleExampleImage[];
  typicalSessionHours: string;
  startingPriceGbp: string;
  healedLongevity: string;
  painProfile: string;
  recommendedPlacements: string[];
}
