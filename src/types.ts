export type DestinationType =
  | 'website'
  | 'whatsapp_group'
  | 'whatsapp_number'
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'referral';

export type BackgroundStyle = 'dark_navy' | 'light_white' | 'gradient';

export interface FlyerConfig {
  destinationType: DestinationType;
  destinationUrl: string;
  referralTemplate: string;
  referralCode: string;
  headline: string;
  ctaText: string;
  brandName: string;
  footerText: string;
  accentColor: string;
  bgStyle: BackgroundStyle;
}
