import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DestinationType, FlyerConfig } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTargetUrl(config: FlyerConfig): string {
  const { destinationType, destinationUrl, referralTemplate, referralCode } = config;

  if (destinationType === 'referral') {
    if (!referralTemplate) return '';
    return referralTemplate.replace('{code}', referralCode || '');
  }

  if (!destinationUrl) return '';

  let url = destinationUrl.trim();

  switch (destinationType) {
    case 'whatsapp_group':
      // Basic check: if it doesn't start with http, and seems like a code, prepend it
      if (!url.startsWith('http') && url.match(/^[a-zA-Z0-9_-]+$/) && url.length > 10) {
        return `https://chat.whatsapp.com/${url}`;
      }
      if (!url.startsWith('http') && url.includes('chat.whatsapp.com')) {
        return `https://${url}`;
      }
      return url.startsWith('http') ? url : `https://${url}`;

    case 'whatsapp_number':
      const digitsOnly = url.replace(/\D/g, '');
      if (!digitsOnly) return url;
      // Basic formatting, assumes an international number is passed or local requires country code
      // If starts with 0, a real app would need a country code
      return `https://wa.me/${digitsOnly}`;

    case 'facebook':
      if (!url.startsWith('http') && !url.includes('facebook.com')) {
        const handle = url.startsWith('@') ? url.substring(1) : url;
        return `https://facebook.com/${handle}`;
      }
      return url.startsWith('http') ? url : `https://${url}`;

    case 'instagram':
      if (!url.startsWith('http') && !url.includes('instagram.com')) {
        const handle = url.startsWith('@') ? url.substring(1) : url;
        return `https://instagram.com/${handle}`;
      }
      return url.startsWith('http') ? url : `https://${url}`;

    case 'tiktok':
      if (!url.startsWith('http') && !url.includes('tiktok.com')) {
        const handle = url.startsWith('@') ? url : `@${url}`;
        return `https://tiktok.com/${handle}`;
      }
      return url.startsWith('http') ? url : `https://${url}`;

    case 'website':
    default:
      return url.startsWith('http') ? url : `https://${url}`;
  }
}
