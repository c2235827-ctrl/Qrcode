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
    bgStyle
  } = config;

  const bgClasses = {
    dark_navy: 'bg-[#0D1F3D] bg-gradient-to-br from-[#0D1F3D] to-[#15315E] text-white',
    light_white: 'bg-white text-[#0D1F3D]',
    gradient: 'text-white' // We'll apply inline style for custom color gradient
  };

  const getGradientStyle = () => {
    if (bgStyle !== 'gradient') return {};
    return {
      background: `linear-gradient(135deg, ${accentColor} 0%, #0D1F3D 100%)`
    };
  };

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
