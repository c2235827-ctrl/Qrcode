import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { cn, generateTargetUrl } from '../lib/utils';
import { FlyerConfig } from '../types';

interface FlyerPreviewProps {
  config: FlyerConfig;
  flyerRef: React.RefObject<HTMLDivElement | null>;
}

export function FlyerPreview({ config, flyerRef }: FlyerPreviewProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  
  const targetUrl = generateTargetUrl(config);

  useEffect(() => {
    if (!targetUrl) {
      setQrCodeDataUrl(null);
      return;
    }

    QRCode.toDataURL(targetUrl, {
      width: 600,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })
      .then((url: string) => {
        setQrCodeDataUrl(url);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [targetUrl]);

  const {
    headline,
    ctaText,
    brandName,
    footerText,
    accentColor,
    bgStyle,
    flyerMode = 'universal'
  } = config;

  const bgClasses = {
    dark_navy: 'bg-[#0D1F3D] bg-gradient-to-br from-[#0D1F3D] to-[#15315E] text-white',
    light_white: 'bg-white text-[#0D1F3D]',
    gradient: 'text-white' // We'll apply inline style for custom color gradient
  };

  const getGradientStyle = () => {
    if (bgStyle !== 'gradient' || flyerMode !== 'universal') return {};
    return {
      background: `linear-gradient(135deg, ${accentColor} 0%, #0D1F3D 100%)`
    };
  };

  // 1. BUSINESS MODE RENDER (to match renderBusinessFlyer design)
  if (flyerMode === 'business') {
    const bizName = brandName || 'Our Partner';
    const initial = bizName.trim().charAt(0).toUpperCase();
    const code = config.referralCode || 'BIZ001';

    return (
      <div
        ref={flyerRef}
        className={cn(
          "relative w-[1080px] h-[1350px] flex flex-col items-center justify-between p-6 overflow-hidden rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] bg-white text-slate-800",
          config.fontFamily
        )}
        style={{
          transformOrigin: "top left",
        }}
      >
        {/* Certificate border frame */}
        <div className="absolute inset-5 border-[6px] border-[#16A34A] rounded-[24px] pointer-events-none z-20"></div>

        {/* Top green header strip */}
        <div className="absolute top-[26px] left-[26px] right-[26px] h-[160px] bg-[#16A34A] rounded-t-[18px] flex items-center justify-between px-10 z-10">
          {/* GigUp logo top-left */}
          <div className="bg-[#FFC940] text-[#0D1F3D] font-bold text-[26px] h-14 px-8 rounded-full flex items-center justify-center gap-2 shadow-sm">
            ⚡ GigUp Nigeria
          </div>

          {/* Business identity badge */}
          <div className="flex items-center gap-4 text-right">
            <div>
              <div className="text-white font-bold text-[24px] leading-tight">{bizName}</div>
              <div className="text-white/85 font-semibold text-[18px] mt-0.5">✓ Verified GigUp Partner</div>
            </div>
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#16A34A] font-extrabold text-[32px] shadow-sm">
              {initial}
            </div>
          </div>
        </div>

        {/* Outer Content wrap - offset top header height */}
        <div className="w-full flex flex-col items-center flex-1 pt-[180px] z-10">
          
          {/* Headline - folded emoji */}
          <h1 className="text-[#14532D] font-black text-[58px] leading-[1.25] text-center max-w-[950px] text-balance tracking-tight mt-8 px-6">
            🎁 {headline || "Your Attention-Grabbing Headline"}
          </h1>

          {/* Divider */}
          <div className="w-[960px] h-[2px] bg-[#BBF7D0] my-8"></div>

          {/* QR Card */}
          <div className="relative my-4">
            <div className="bg-white p-6 rounded-[28px] shadow-[0_30px_70px_rgba(22,163,74,0.15)] relative">
              <div className="border-[4px] border-dashed border-[#22C55E] rounded-[20px] p-6 bg-slate-50 flex items-center justify-center min-h-[480px] min-w-[480px]">
                {qrCodeDataUrl ? (
                  <img src={qrCodeDataUrl} alt="QR Code" className="w-[430px] h-[430px] mix-blend-multiply" />
                ) : (
                  <div className="text-slate-400 text-center text-3xl max-w-sm font-medium uppercase tracking-wide">
                    Enter a destination to generate QR
                  </div>
                )}
              </div>
            </div>

            {/* SCAN ME Sticker */}
            <div className="absolute -top-6 -right-6 bg-[#16A34A] text-white font-bold text-[24px] px-6 py-3 rounded-full shadow-lg rotate-[10.3deg] flex items-center justify-center z-30 border-4 border-white">
              SCAN ME 📱
            </div>

            {/* ₦500 Badge */}
            <div className="absolute bottom-5 left-5 bg-[#FFC940] text-[#0D1F3D] font-bold text-[26px] px-6 py-2 rounded-full shadow-md z-30">
              ₦500 FREE 🎉
            </div>
          </div>

          {/* CTA Text */}
          {ctaText && (
            <p className="text-[#166534] font-semibold text-[34px] leading-snug text-center max-w-[960px] mx-auto px-6 mt-8">
              {ctaText}
            </p>
          )}

          {/* Footer */}
          <div className="w-[960px] mt-auto pb-8 pt-4 flex flex-col items-start text-left">
            <div className="text-[#16A34A] font-bold text-[26px]">Powered by GigUp Nigeria</div>
            <div className="text-[#6B7280] font-medium text-[22px] mt-1">
              Partner Code: {code}  |  gigupnigeria.com
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 2. AMBASSADOR MODE RENDER
  if (flyerMode === 'ambassador') {
    const ambName = brandName || 'GIGUP AMBASSADOR';
    const initial = ambName.trim().charAt(0).toUpperCase();
    const code = config.referralCode || 'AMB042';

    return (
      <div
        ref={flyerRef}
        className={cn(
          "relative w-[1080px] h-[1350px] flex flex-col items-center justify-between p-6 overflow-hidden rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] bg-[#0D1F3D] bg-gradient-to-br from-[#0D1F3D] via-[#102444] to-[#1e3a8a] text-white",
          config.fontFamily
        )}
        style={{
          transformOrigin: "top left",
        }}
      >
        {/* Certificate border frame in Gold */}
        <div className="absolute inset-5 border-[6px] border-[#FFC940] rounded-[24px] pointer-events-none z-20"></div>

        {/* Top green/blue header strip */}
        <div className="absolute top-[26px] left-[26px] right-[26px] h-[160px] bg-[#1E3A8A]/90 backdrop-blur-md rounded-t-[18px] flex items-center justify-between px-10 z-10 border-b-2 border-[#FFC940]/20">
          {/* GigUp logo top-left */}
          <div className="bg-[#FFC940] text-[#0D1F3D] font-bold text-[26px] h-14 px-8 rounded-full flex items-center justify-center gap-2 shadow-md">
            ⚡ GigUp Ambassador
          </div>

          {/* Ambassador badge */}
          <div className="flex items-center gap-4 text-right">
            <div>
              <div className="text-white font-bold text-[24px] leading-tight">{ambName}</div>
              <div className="text-[#FFC940] font-semibold text-[18px] mt-0.5">✓ Active Brand Advocate</div>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#FFC940] flex items-center justify-center text-[#0D1F3D] font-extrabold text-[32px] shadow-md">
              {initial}
            </div>
          </div>
        </div>

        {/* Outer Content wrap - offset top header height */}
        <div className="w-full flex flex-col items-center flex-1 pt-[180px] z-10">
          
          {/* Headline - folded emoji */}
          <h1 className="text-white font-black text-[58px] leading-[1.25] text-center max-w-[950px] text-balance tracking-tight mt-8 px-6 drop-shadow-md">
            ✨ {headline || "Your Ambassador Headline"}
          </h1>

          {/* Divider */}
          <div className="w-[960px] h-[2px] bg-[#FFC940]/30 my-8"></div>

          {/* QR Card */}
          <div className="relative my-4">
            <div className="bg-white p-6 rounded-[28px] shadow-[0_30px_70px_rgba(255,201,64,0.15)] relative">
              <div className="border-[4px] border-dashed border-[#FFC940] rounded-[20px] p-6 bg-slate-50 flex items-center justify-center min-h-[480px] min-w-[480px]">
                {qrCodeDataUrl ? (
                  <img src={qrCodeDataUrl} alt="QR Code" className="w-[430px] h-[430px] mix-blend-multiply" />
                ) : (
                  <div className="text-slate-400 text-center text-3xl max-w-sm font-medium uppercase tracking-wide">
                    Enter a destination to generate QR
                  </div>
                )}
              </div>
            </div>

            {/* JOIN FREE Sticker */}
            <div className="absolute -top-6 -right-6 bg-[#2F6FF0] text-white font-bold text-[24px] px-6 py-3 rounded-full shadow-lg rotate-[-10.3deg] flex items-center justify-center z-30 border-4 border-white">
              JOIN FREE 📱
            </div>

            {/* Commission Active Badge */}
            <div className="absolute bottom-5 left-5 bg-[#FFC940] text-[#0D1F3D] font-bold text-[22px] px-5 py-2.5 rounded-full shadow-md z-30">
              REFERRAL BONUS ACTIVE 🎁
            </div>
          </div>

          {/* CTA Text */}
          {ctaText && (
            <p className="text-[#FFC940] font-semibold text-[34px] leading-snug text-center max-w-[960px] mx-auto px-6 mt-8 drop-shadow-sm">
              {ctaText}
            </p>
          )}

          {/* Footer */}
          <div className="w-[960px] mt-auto pb-8 pt-4 flex flex-col items-start text-left">
            <div className="text-[#FFC940] font-bold text-[26px]">Powered by GigUp Nigeria</div>
            <div className="text-slate-300 font-medium text-[22px] mt-1">
              Ambassador Code: {code}  |  gigupnigeria.com
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 3. UNIVERSAL MODE RENDER (Standard)
  return (
    <div
      ref={flyerRef}
      className={cn(
        "relative w-[1080px] h-[1350px] flex flex-col items-center justify-between p-24 overflow-hidden rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.4)]",
        bgClasses[bgStyle],
        config.fontFamily
      )}
      style={{
        ...getGradientStyle(),
        transformOrigin: "top left",
        // We will scale this down via a container wrapper in the parent
      }}
    >
      {/* Decorative background effects */}
      {bgStyle === 'dark_navy' && (
        <>
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] opacity-15 rounded-full blur-[100px]" style={{ backgroundColor: accentColor }}></div>
          <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] opacity-15 rounded-full blur-[100px]" style={{ backgroundColor: accentColor }}></div>
        </>
      )}
      
      {/* Top Section */}
      <div className="w-full flex flex-col items-center flex-1 pt-12 z-10">
        {brandName && (
          <div 
            className={cn(
               "px-8 py-3 rounded-full text-2xl font-black tracking-[0.2em] uppercase mb-12",
               bgStyle === 'light_white' ? 'bg-[#0D1F3D] text-white' : 'text-white'
            )}
            style={{ backgroundColor: bgStyle === 'light_white' ? '#0D1F3D' : accentColor }}
          >
            {brandName}
          </div>
        )}
        
        <h1 className={cn(
          "font-black text-[84px] leading-[1.1] text-center max-w-[950px] text-balance uppercase tracking-tight drop-shadow-2xl",
          bgStyle === 'light_white' ? 'text-[#0D1F3D]' : 'text-white'
        )}>
          {headline || "Your Attention-Grabbing Headline"}
        </h1>
      </div>

      {/* Middle Section - QR Code */}
      <div className="w-full flex flex-col items-center z-10 my-12">
        <div className="relative">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl relative border border-slate-100">
            <div className="border-[6px] border-dashed border-slate-200 rounded-[2rem] p-8 bg-slate-50 flex items-center justify-center min-h-[480px] min-w-[480px]">
              {qrCodeDataUrl ? (
                <img src={qrCodeDataUrl} alt="QR Code" className="w-[440px] h-[440px] mix-blend-multiply" />
              ) : (
                <div className="text-slate-400 text-center text-3xl max-w-sm font-medium uppercase tracking-wide">
                  Enter a destination to generate QR
                </div>
              )}
            </div>
          </div>
          
          {/* Scan Me Sticker */}
          <div 
            className="absolute -top-10 -right-10 px-8 py-5 rounded-full shadow-2xl rotate-12 border-[6px] z-20 transition-transform hover:rotate-0"
            style={{ 
              backgroundColor: '#f97316', // Vibrant orange
              color: '#fff',
              borderColor: bgStyle === 'light_white' ? '#fff' : '#0D1F3D'
            }}
          >
             <span className="font-black text-4xl tracking-wider uppercase">SCAN ME</span>
          </div>
        </div>

        {ctaText && (
          <p 
            className={cn(
              "mt-20 font-bold text-[36px] max-w-[800px] text-center uppercase tracking-wide leading-relaxed",
              bgStyle === 'light_white' ? 'text-[#0D1F3D]' : ''
            )}
            style={{ color: bgStyle === 'light_white' ? '#0D1F3D' : accentColor }}
          >
            {ctaText}
          </p>
        )}
      </div>

      {/* Bottom Section */}
      <div className="w-full pb-8 z-10 mt-auto flex flex-col items-center">
        {footerText && (
          <>
            <div className="h-[2px] w-full max-w-[700px] mb-8" style={{ backgroundColor: bgStyle === 'light_white' ? 'rgba(13,31,61,0.1)' : 'rgba(255,255,255,0.1)' }}></div>
            <p className={cn(
              "text-center text-2xl uppercase tracking-[0.2em] font-medium opacity-60",
              bgStyle === 'light_white' ? 'text-[#0D1F3D]' : 'text-white'
            )}>
              {footerText}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
