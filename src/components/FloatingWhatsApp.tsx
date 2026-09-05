import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  whatsappNumber = '+44 7490 186826',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cleanDigits = whatsappNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(
    'Hello Ink Haven London, I would like to inquire about a tattoo consultation or booking.'
  )}`;

  return (
    <div
      id="floating-whatsapp-widget"
      className="fixed bottom-20 right-5 z-40 flex items-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip badge */}
      <div
        className={`hidden sm:flex items-center gap-2 mr-3 px-3.5 py-2 bg-[#0c120f] border border-emerald-500/40 rounded-full shadow-2xl transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-semibold text-white whitespace-nowrap">
          WhatsApp:{' '}
          <span className="text-emerald-400 font-mono">{whatsappNumber}</span>
        </span>
      </div>

      {/* Floating Action Button */}
      <a
        id="floating-whatsapp-button"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="relative p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_28px_rgba(16,185,129,0.6)] hover:scale-105 transition-all flex items-center justify-center cursor-pointer"
        title={`Chat on WhatsApp: ${whatsappNumber}`}
        aria-label={`Chat with Ink Haven Studio on WhatsApp at ${whatsappNumber}`}
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
        </span>
        <MessageSquare className="w-5 h-5 fill-black text-black" />
      </a>
    </div>
  );
};
