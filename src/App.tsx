import React, { useState, useRef, useEffect } from 'react';
import { Download, QrCode } from 'lucide-react';
import { toPng } from 'html-to-image';
import { FlyerForm } from './components/FlyerForm';
import { FlyerPreview } from './components/FlyerPreview';
import { FlyerConfig } from './types';
import QRCode from 'qrcode';
import { generateTargetUrl } from './lib/utils';

const DEFAULT_CONFIG: FlyerConfig = {
  destinationType: 'website',
  destinationUrl: '',
  referralTemplate: 'https://example.com/?ref={code}',
  referralCode: '',
  headline: 'Join the Community Today!',
  ctaText: 'Point your camera to join instantly',
  brandName: 'Brand Name',
  footerText: 'Scan to connect with us',
  accentColor: '#2F6FF0',
  bgStyle: 'dark_navy',
  fontFamily: 'font-montserrat',
};

export default function App() {
  const [config, setConfig] = useState<FlyerConfig>(DEFAULT_CONFIG);
  const flyerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(0.45);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const padding = window.innerWidth < 1024 ? 32 : 64; 
        const scaleX = (clientWidth - padding) / 1080;
        const scaleY = (clientHeight - padding) / 1350;
        setScale(Math.min(scaleX, scaleY));
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleConfigChange = (updates: Partial<FlyerConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const getFilenameBase = () => {
    const brand = config.brandName.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'flyer';
    return `${brand}_${config.destinationType}`;
  };

  const handleDownloadFlyer = async () => {
    if (!flyerRef.current) return;
    try {
      const dataUrl = await toPng(flyerRef.current, { 
        quality: 1, 
        pixelRatio: 1, // Rendered at native 1080x1350
      });
      const link = document.createElement('a');
      link.download = `${getFilenameBase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export flyer', err);
    }
  };

  const handleDownloadQrOnly = async () => {
    const targetUrl = generateTargetUrl(config);
    if (!targetUrl) {
      alert("Please enter a valid destination first.");
      return;
    }
    
    try {
      const dataUrl = await QRCode.toDataURL(targetUrl, {
        width: 1080, // High res for saving
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      const link = document.createElement('a');
      link.download = `${getFilenameBase()}_qr.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export QR code', err);
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-[#F1F5F9] font-sans flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Panel */}
      <aside className="w-full lg:w-[420px] bg-white border-t lg:border-t-0 lg:border-r border-slate-200 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:shadow-xl z-20 flex-1 lg:flex-none lg:h-full shrink-0 order-2 lg:order-1 overflow-hidden">
        <header className="p-4 lg:p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/13481/13481093.png" 
              alt="QR Code Scan Sticker" 
              className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-lg lg:text-xl font-bold text-slate-800 tracking-tight">Flyer & QR Generator</h1>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-6 overflow-y-auto bg-white custom-scrollbar pb-8 lg:pb-6">
          <FlyerForm config={config} onChange={handleConfigChange} />
        </div>

        <div className="p-4 lg:p-6 border-t border-slate-100 bg-slate-50 flex gap-3 shrink-0">
           <button
             onClick={handleDownloadFlyer}
             className="flex-1 bg-[#2F6FF0] text-white text-sm font-bold py-3 px-4 lg:px-6 rounded-lg shadow-lg shadow-blue-200 transition-transform active:scale-95 flex items-center justify-center gap-2"
           >
             <Download size={18} /> <span className="hidden sm:inline">Download PNG</span><span className="sm:hidden">Flyer</span>
           </button>
           <button
             onClick={handleDownloadQrOnly}
             title="Download QR Only"
             className="bg-white border flex items-center justify-center border-slate-200 py-3 px-4 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
           >
             <QrCode size={20} />
           </button>
        </div>
      </aside>

      {/* Right Panel - Preview */}
      <main ref={containerRef} className="lg:flex-1 w-full flex flex-col items-center justify-center relative p-4 lg:p-8 h-[45vh] sm:h-[55vh] lg:h-full overflow-hidden order-1 lg:order-2 shrink-0 bg-[#F1F5F9]">
         {/* Live View Indicator */}
         <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm z-10">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">Live View Ready</span>
            <span className="ml-1 pl-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter border-l border-slate-200">1080x1350</span>
         </div>
         
         <div 
           className="relative flex items-center justify-center pointer-events-none"
           style={{ 
             width: `${1080 * scale}px`,
             height: `${1350 * scale}px`,
           }}
         >
           <div 
             style={{
               transform: `scale(${scale})`,
               transformOrigin: 'top left',
               width: '1080px',
               height: '1350px',
               position: 'absolute',
               top: 0,
               left: 0,
               pointerEvents: 'auto'
             }}
           >
             <FlyerPreview config={config} flyerRef={flyerRef} />
           </div>
         </div>
      </main>
    </div>
  );
}

