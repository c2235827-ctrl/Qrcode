import React from 'react';
import { FlyerConfig, DestinationType, BackgroundStyle, FlyerMode } from '../types';

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

  const setMode = (mode: FlyerMode) => {
    if (mode === 'universal') {
      onChange({
        flyerMode: 'universal',
      });
    } else if (mode === 'business') {
      onChange({
        flyerMode: 'business',
        destinationType: 'referral',
        brandName: config.brandName === 'Brand Name' || config.brandName === 'GIGUP AMBASSADOR' ? 'GIGUP NIGERIA' : config.brandName || 'GIGUP NIGERIA',
        referralCode: config.referralCode || 'BIZ001',
        referralTemplate: config.referralTemplate || 'https://gigupnigeria.com/partner/?ref={code}',
        headline: config.headline === 'Join the Community Today!' || config.headline === '⚡ BECOME A GIGUP AMBASSADOR' ? 'JOIN OUR EXCLUSIVE EARLY FOUNDERS GROUP' : config.headline || 'JOIN OUR EXCLUSIVE EARLY FOUNDERS GROUP',
        ctaText: config.ctaText === 'Point your camera to join instantly' || config.ctaText === 'Scan to register instantly and start earning daily commissions!' ? 'Scan now to unlock 40% lifetime discount on all premium plans!' : config.ctaText || 'Scan now to unlock 40% lifetime discount on all premium plans!',
        footerText: config.footerText === 'Scan to connect with us' || config.footerText === 'gigupnigeria.com' ? 'gigupnigeria.com' : config.footerText || 'gigupnigeria.com',
      });
    } else if (mode === 'ambassador') {
      onChange({
        flyerMode: 'ambassador',
        destinationType: 'referral',
        brandName: config.brandName === 'Brand Name' || config.brandName === 'GIGUP NIGERIA' ? 'GIGUP AMBASSADOR' : config.brandName || 'GIGUP AMBASSADOR',
        referralCode: config.referralCode || 'AMB042',
        referralTemplate: config.referralTemplate || 'https://gigupnigeria.com/join/?ref={code}',
        headline: config.headline === 'Join the Community Today!' || config.headline === 'JOIN OUR EXCLUSIVE EARLY FOUNDERS GROUP' ? '⚡ BECOME A GIGUP AMBASSADOR' : config.headline || '⚡ BECOME A GIGUP AMBASSADOR',
        ctaText: config.ctaText === 'Point your camera to join instantly' || config.ctaText === 'Scan now to unlock 40% lifetime discount on all premium plans!' ? 'Scan to register instantly and start earning daily commissions!' : config.ctaText || 'Scan to register instantly and start earning daily commissions!',
        footerText: config.footerText === 'Scan to connect with us' || config.footerText === 'gigupnigeria.com' ? 'gigupnigeria.com' : config.footerText || 'gigupnigeria.com',
      });
    }
  };

  const isReferral = config.destinationType === 'referral';
  const isMissingCode = isReferral && config.referralCode && !config.referralTemplate.includes('{code}');

  const currentMode = config.flyerMode || 'universal';

  return (
    <div className="space-y-6">
      
      {/* Tab Selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Flyer Mode</label>
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setMode('universal')}
            className={`py-2 px-1 text-xs font-bold rounded transition-colors ${currentMode === 'universal' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Universal
          </button>
          <button
            type="button"
            onClick={() => setMode('business')}
            className={`py-2 px-1 text-xs font-bold rounded transition-colors ${currentMode === 'business' ? 'bg-white text-[#16A34A] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Business
          </button>
          <button
            type="button"
            onClick={() => setMode('ambassador')}
            className={`py-2 px-1 text-xs font-bold rounded transition-colors ${currentMode === 'ambassador' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Ambassador
          </button>
        </div>
      </div>

      <div className="h-px bg-slate-100 w-full"></div>

      {currentMode === 'universal' && (
        <>
          {/* Universal Mode Fields */}
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors mb-4"
                >
                  <option value="dark_navy">Dark Navy</option>
                  <option value="light_white">Light / White</option>
                  <option value="gradient">Gradient</option>
                </select>

                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Typography</label>
                <select
                  name="fontFamily"
                  value={config.fontFamily}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors"
                >
                  <option value="font-poppins">Poppins</option>
                  <option value="font-inter">Inter</option>
                  <option value="font-space">Space Grotesk</option>
                  <option value="font-playfair">Playfair Display</option>
                  <option value="font-roboto">Roboto</option>
                  <option value="font-montserrat">Montserrat</option>
                  <option value="font-lato">Lato</option>
                  <option value="font-oswald">Oswald</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}

      {currentMode === 'business' && (
        <>
          {/* Business Mode Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Business Name</label>
              <input
                type="text"
                name="brandName"
                value={config.brandName}
                onChange={handleChange}
                placeholder="GIGUP NIGERIA"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Business Partner Code</label>
              <input
                type="text"
                name="referralCode"
                value={config.referralCode}
                onChange={handleChange}
                placeholder="BIZ001"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Invite Link Template</label>
              <input
                type="text"
                name="referralTemplate"
                value={config.referralTemplate}
                onChange={handleChange}
                placeholder="https://gigupnigeria.com/partner/?ref={code}"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] transition-colors"
              />
              {isMissingCode && (
                 <p className="text-xs font-semibold text-amber-600 mt-1">Warning: Add {"{code}"} to your link template to insert the partner code.</p>
              )}
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Headline / Hook (Gift Msg)</label>
              <textarea
                name="headline"
                value={config.headline}
                onChange={handleChange}
                rows={2}
                placeholder="JOIN OUR EXCLUSIVE EARLY FOUNDERS GROUP"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Call to Action</label>
              <textarea
                name="ctaText"
                value={config.ctaText}
                onChange={handleChange}
                rows={2}
                placeholder="Scan now to unlock 40% lifetime discount on all premium plans!"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] transition-colors resize-none"
              />
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          <div>
             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Typography</label>
             <select
                name="fontFamily"
                value={config.fontFamily}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] transition-colors"
              >
                <option value="font-poppins">Poppins</option>
                <option value="font-inter">Inter</option>
                <option value="font-space">Space Grotesk</option>
                <option value="font-playfair">Playfair Display</option>
                <option value="font-roboto">Roboto</option>
                <option value="font-montserrat">Montserrat</option>
                <option value="font-lato">Lato</option>
                <option value="font-oswald">Oswald</option>
              </select>
          </div>
        </>
      )}

      {currentMode === 'ambassador' && (
        <>
          {/* Ambassador Mode Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Ambassador Name</label>
              <input
                type="text"
                name="brandName"
                value={config.brandName}
                onChange={handleChange}
                placeholder="GIGUP AMBASSADOR"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Ambassador Referral Code</label>
              <input
                type="text"
                name="referralCode"
                value={config.referralCode}
                onChange={handleChange}
                placeholder="AMB042"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Referral Link Template</label>
              <input
                type="text"
                name="referralTemplate"
                value={config.referralTemplate}
                onChange={handleChange}
                placeholder="https://gigupnigeria.com/join/?ref={code}"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors"
              />
              {isMissingCode && (
                 <p className="text-xs font-semibold text-amber-600 mt-1">Warning: Add {"{code}"} to your link template to insert the ambassador code.</p>
              )}
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Headline / Hook</label>
              <textarea
                name="headline"
                value={config.headline}
                onChange={handleChange}
                rows={2}
                placeholder="⚡ BECOME A GIGUP AMBASSADOR"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Call to Action Line</label>
              <textarea
                name="ctaText"
                value={config.ctaText}
                onChange={handleChange}
                rows={2}
                placeholder="Scan to register instantly and start earning daily commissions!"
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors resize-none"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors mb-4"
                >
                  <option value="dark_navy">Dark Navy</option>
                  <option value="light_white">Light / White</option>
                  <option value="gradient">Gradient</option>
                </select>

                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Typography</label>
                <select
                  name="fontFamily"
                  value={config.fontFamily}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2F6FF0] focus:border-[#2F6FF0] transition-colors"
                >
                  <option value="font-poppins">Poppins</option>
                  <option value="font-inter">Inter</option>
                  <option value="font-space">Space Grotesk</option>
                  <option value="font-playfair">Playfair Display</option>
                  <option value="font-roboto">Roboto</option>
                  <option value="font-montserrat">Montserrat</option>
                  <option value="font-lato">Lato</option>
                  <option value="font-oswald">Oswald</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}

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
