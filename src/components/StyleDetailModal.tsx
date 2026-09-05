import React, { useEffect, useState } from 'react';
import {
  X,
  Sparkles,
  Clock,
  Shield,
  Layers,
  Eye,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  PenTool,
} from 'lucide-react';
import { TattooStyleDetail, StyleExampleImage } from '../types';
import { TATTOO_STYLE_DETAILS } from '../data/styleGuideDetails';

interface StyleDetailModalProps {
  isOpen: boolean;
  styleDetail: TattooStyleDetail | null;
  onClose: () => void;
  onSelectStyle: (styleTag: string) => void;
  onBookStyle: (styleTitle: string) => void;
}

export const StyleDetailModal: React.FC<StyleDetailModalProps> = ({
  isOpen,
  styleDetail,
  onClose,
  onSelectStyle,
  onBookStyle,
}) => {
  const [activeImage, setActiveImage] = useState<StyleExampleImage | null>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeImage) {
          setActiveImage(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, activeImage, onClose]);

  if (!isOpen || !styleDetail) return null;

  const allStyleKeys = Object.keys(TATTOO_STYLE_DETAILS);
  const currentIndex = allStyleKeys.findIndex(
    (key) => TATTOO_STYLE_DETAILS[key].styleTag === styleDetail.styleTag
  );

  const handlePrevStyle = () => {
    const prevIndex = (currentIndex - 1 + allStyleKeys.length) % allStyleKeys.length;
    onSelectStyle(allStyleKeys[prevIndex]);
  };

  const handleNextStyle = () => {
    const nextIndex = (currentIndex + 1) % allStyleKeys.length;
    onSelectStyle(allStyleKeys[nextIndex]);
  };

  const renderIcon = (type?: string) => {
    switch (type) {
      case 'needle':
        return <PenTool className="w-4 h-4 text-[#c5a059]" />;
      case 'clock':
        return <Clock className="w-4 h-4 text-[#c5a059]" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-[#c5a059]" />;
      case 'layers':
        return <Layers className="w-4 h-4 text-[#c5a059]" />;
      case 'eye':
        return <Eye className="w-4 h-4 text-[#c5a059]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#c5a059]" />;
    }
  };

  return (
    <div
      id="style-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Container */}
      <div
        id="style-detail-modal-panel"
        className="relative w-full max-w-5xl bg-[#090b0e] border border-white/15 rounded-md shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col transition-all"
      >
        {/* Top Header & Atelier Hallmark */}
        <div className="bg-[#0e1217] border-b border-white/10 px-5 sm:px-8 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c5a059]">
                  London Atelier Monograph
                </span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <span className="text-[10px] text-neutral-400 hidden sm:inline">
                  Interactive Style Characteristics & Portfolio
                </span>
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-white tracking-wide">
                {styleDetail.serviceTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Next / Prev navigation */}
            <div className="hidden sm:flex items-center bg-black/50 border border-white/10 rounded-sm p-0.5 mr-2">
              <button
                onClick={handlePrevStyle}
                title="Previous Tattoo Style"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 text-[11px] text-neutral-400 font-mono">
                {currentIndex + 1} / {allStyleKeys.length}
              </span>
              <button
                onClick={handleNextStyle}
                title="Next Tattoo Style"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              id="close-style-modal-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-sm bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Style Switcher Pill Ribbon */}
        <div className="bg-[#0b0d11] border-b border-white/5 px-4 sm:px-8 py-2 overflow-x-auto flex items-center gap-1.5 shrink-0 scrollbar-none">
          <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider mr-1 shrink-0">
            Switch Style:
          </span>
          {allStyleKeys.map((key) => {
            const isCurrent = TATTOO_STYLE_DETAILS[key].styleTag === styleDetail.styleTag;
            return (
              <button
                key={key}
                onClick={() => onSelectStyle(key)}
                className={`px-3 py-1 rounded-sm text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {TATTOO_STYLE_DETAILS[key].serviceTitle.replace(' Tattoos', '')}
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8 flex-1">
          {/* Top Overview & Explanation */}
          <div className="bg-[#0e1116] border border-white/10 rounded-sm p-5 sm:p-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-wider mb-2">
                  <span>Style Classification: {styleDetail.styleTag}</span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  {styleDetail.headline}
                </h3>
              </div>

              {/* Quick Specification Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
                <div className="px-3 py-1.5 bg-black/60 border border-white/10 rounded-sm text-center">
                  <div className="text-[9px] uppercase tracking-wider text-neutral-400">London Atelier Rate</div>
                  <div className="text-xs sm:text-sm font-bold text-[#c5a059]">{styleDetail.startingPriceGbp}</div>
                </div>
                <div className="px-3 py-1.5 bg-black/60 border border-white/10 rounded-sm text-center">
                  <div className="text-[9px] uppercase tracking-wider text-neutral-400">Pace / Session</div>
                  <div className="text-xs sm:text-sm font-bold text-white">{styleDetail.typicalSessionHours}</div>
                </div>
                <div className="px-3 py-1.5 bg-black/60 border border-white/10 rounded-sm text-center">
                  <div className="text-[9px] uppercase tracking-wider text-neutral-400">Pain Profile</div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-200">{styleDetail.painProfile}</div>
                </div>
              </div>
            </div>

            {/* Brief Explanation */}
            <div className="border-t border-white/10 pt-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Style Explanation & Technique
              </h4>
              <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                {styleDetail.explanation}
              </p>
              <div className="p-3 bg-black/40 border-l-2 border-[#c5a059] rounded-r-sm text-xs text-neutral-300 italic font-serif leading-relaxed">
                "{styleDetail.artisticPhilosophy}"
              </div>
            </div>
          </div>

          {/* Key Characteristics Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#c5a059]" />
                  <span>Key Characteristics & Mechanics</span>
                </h4>
                <p className="text-xs text-neutral-400">
                  What defines this discipline physically, mechanically, and anatomically.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {styleDetail.characteristics.map((char, idx) => (
                <div
                  key={idx}
                  className="bg-[#0e1116] border border-white/10 hover:border-[#c5a059]/40 rounded-sm p-4 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-sm bg-white/5 text-[#c5a059] group-hover:bg-[#c5a059]/10 transition-colors">
                        {renderIcon(char.iconType)}
                      </div>
                      <h5 className="font-semibold text-sm text-white group-hover:text-[#c5a059] transition-colors">
                        {char.title}
                      </h5>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[#e5c98f] shrink-0">
                      {char.badge}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed mb-2.5 pl-8">
                    {char.description}
                  </p>

                  {char.technicalNote && (
                    <div className="ml-8 text-[11px] text-neutral-400 border-t border-white/5 pt-2 flex items-center gap-1.5">
                      <span className="text-[#c5a059] font-bold">Studio Standard:</span>
                      <span>{char.technicalNote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 2-3 Example Portfolio Images Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c5a059]" />
                  <span>Example Portfolio Works ({styleDetail.exampleImages.length} Pieces)</span>
                </h4>
                <p className="text-xs text-neutral-400">
                  Curated client works from our Soho studio illustrating this exact style.
                </p>
              </div>
              <span className="text-xs text-[#c5a059] font-mono font-medium">
                Ink Haven London Archive
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {styleDetail.exampleImages.map((img) => (
                <div
                  key={img.id}
                  className="group bg-[#0e1116] border border-white/10 hover:border-[#c5a059]/50 rounded-sm overflow-hidden flex flex-col justify-between transition-all"
                >
                  <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Quick zoom preview button */}
                    <button
                      onClick={() => setActiveImage(img)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-sm bg-black/70 hover:bg-[#c5a059] text-white hover:text-black transition-colors cursor-pointer"
                      title="Inspect High-Res Work"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Placement badge */}
                    <div className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-sm border border-white/15 px-2 py-0.5 rounded-sm text-[10px] text-neutral-300 font-medium">
                      {img.placement}
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <h5 className="font-heading text-sm font-bold text-white group-hover:text-[#c5a059] transition-colors truncate">
                          {img.title}
                        </h5>
                      </div>
                      <div className="text-[11px] text-[#c5a059] font-medium mb-2">
                        Artist: {img.artist}
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-relaxed line-clamp-3">
                        {img.caption}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 text-[10px] text-neutral-400 font-mono">
                      Technique: {img.technique}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="bg-[#0e1217] border-t border-white/10 px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-neutral-400 text-center sm:text-left">
            <span>Interested in {styleDetail.serviceTitle}? </span>
            <span className="text-white">Private consultations available at our Soho London studio.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-sm border border-white/10 hover:border-white/30 text-xs text-neutral-300 hover:text-white uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Close Monograph
            </button>

            <button
              id="modal-book-consultation-btn"
              onClick={() => {
                onClose();
                onBookStyle(styleDetail.serviceTitle);
              }}
              className="flex-1 sm:flex-none bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-xs tracking-wider uppercase px-6 py-2.5 rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation in this Style</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Image Lightbox Sub-Modal */}
      {activeImage && (
        <div
          id="style-image-lightbox"
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#c5a059] flex items-center gap-1 text-xs uppercase tracking-wider cursor-pointer"
            >
              <X className="w-5 h-5" />
              <span>Close View</span>
            </button>
            <img
              src={activeImage.imageUrl}
              alt={activeImage.title}
              className="max-h-[68vh] w-auto object-contain rounded-sm border border-white/20 shadow-2xl"
            />
            <div className="mt-4 bg-[#0e1217] border border-white/10 p-4 rounded-sm text-center max-w-xl">
              <h3 className="font-heading text-lg font-bold text-white">{activeImage.title}</h3>
              <p className="text-xs text-[#c5a059] font-medium mt-0.5">
                {activeImage.artist} • {activeImage.placement}
              </p>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">{activeImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
