import React from 'react';
import { FlyerConfig, DestinationType, BackgroundStyle } from '../types';

interface FlyerFormProps {
  config: FlyerConfig;
  onChange: (updates: Partial<FlyerConfig>) => void;
}

const COLOR_PRESETS = [
  '#2F6FF0', '#10B981', '#F59E0B', '#EF4444', 
  '#8B5CF6', '#EC4899', '#06B6D4', '#0F172A'
];

export function FlyerForm({ config, onChange }: FlyerFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const isReferral = config.destinationType === 'referral';
  const isMissingCode = isReferral && config.referralCode && !config.referralTemplate.includes('{code}');

  return (
    <div className="space-y-6">
      
      {/* Destination Section */}
      <div className="space-y-4">
        
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Destination Type</label>
          <select
            name="destinationType"
            value={config.destinationType}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors"
          >
            <option value="website">Website / Custom Link</option>
            <option value="whatsapp_group">WhatsApp Group</option>
            <option value="whatsapp_number">WhatsApp Number (Chat)</option>
            <option value="facebook">Facebook Page/Post</option>
            <option value="instagram">Instagram Profile/Post</option>
            <option value="tiktok">TikTok Profile/Video</option>
            <option value="referral">Referral Link (with code)</option>
          </select>
        </div>

        {!isReferral ? (
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Destination URL or Link</label>
            <input
              type="text"
              name="destinationUrl"
              value={config.destinationUrl}
              onChange={handleChange}
              placeholder={getPlaceholder(config.destinationType)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors"
            />
            <p className="text-xs text-slate-400 mt-1">{getHint(config.destinationType)}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Base Link Template</label>
              <input
                type="text"
                name="referralTemplate"
                value={config.referralTemplate}
                onChange={handleChange}
                placeholder="https://example.com/?ref={code}"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors"
              />
              {isMissingCode && (
                 <p className="text-xs font-semibold text-amber-600 mt-1">Warning: Add {"{code}"} to your link template to insert the referral code.</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Referral Code</label>
              <input
                type="text"
                name="referralCode"
                value={config.referralCode}
                onChange={handleChange}
                placeholder="PROMO2024"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-slate-100 w-full"></div>

      {/* Content Section */}
      <div className="space-y-4">
        
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Brand Name</label>
          <input
            type="text"
            name="brandName"
            value={config.brandName}
            onChange={handleChange}
            placeholder="e.g. GigUp Nigeria"
            className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Headline / Hook Text</label>
          <textarea
            name="headline"
            value={config.headline}
            onChange={handleChange}
            rows={2}
            placeholder="e.g. Join the Community Today!"
            className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Call-to-Action Line</label>
          <textarea
            name="ctaText"
            value={config.ctaText}
            onChange={handleChange}
            rows={2}
            placeholder="Point your camera to join instantly"
            className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Footer Text</label>
          <input
            type="text"
            name="footerText"
            value={config.footerText}
            onChange={handleChange}
            placeholder="www.example.com | @handle"
            className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors"
          />
        </div>
      </div>

      <div className="h-px bg-slate-100 w-full"></div>

      {/* Styling Section */}
      <div className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Accent Color</label>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {COLOR_PRESETS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onChange({ accentColor: color })}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${config.accentColor.toLowerCase() === color.toLowerCase() ? 'scale-110 border-slate-400 shadow-sm' : 'border-transparent hover:scale-110'}`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                name="accentColor"
                value={config.accentColor}
                onChange={handleChange}
                className="w-full h-8 rounded-md cursor-pointer border border-slate-200 p-0 overflow-hidden"
                style={{ WebkitAppearance: 'none' }}
              />
            </div>
          </div>

          <div>
             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Style</label>
             <select
                name="bgStyle"
                value={config.bgStyle}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors"
              >
                <option value="dark_navy">Dark Navy</option>
                <option value="light_white">Light / White</option>
                <option value="gradient">Gradient</option>
              </select>
          </div>
        </div>
      </div>

    </div>
  );
}

function getPlaceholder(type: DestinationType) {
  switch (type) {
    case 'whatsapp_group': return 'https://chat.whatsapp.com/XXXX OR XXXX';
    case 'whatsapp_number': return '+1234567890';
    case 'facebook': return '@username or full url';
    case 'instagram': return '@username or full url';
    case 'tiktok': return '@username or full url';
    case 'website':
    default: return 'https://example.com';
  }
}

function getHint(type: DestinationType) {
  switch (type) {
    case 'whatsapp_group': return 'Paste raw invite link or just the code block at the end.';
    case 'whatsapp_number': return 'Enter number with country code. Non-digits are ignored.';
    case 'facebook':
    case 'instagram':
    case 'tiktok': return 'Enter full URL or just the @handle.';
    case 'website':
    default: return 'Full web address';
  }
}

