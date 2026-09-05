import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Calendar, User, MapPin, Tag } from 'lucide-react';
import { PortfolioItem, TattooStyleCategory } from '../types';

interface PortfolioSectionProps {
  portfolioItems: PortfolioItem[];
  selectedLightboxItem: PortfolioItem | null;
  onOpenLightbox: (item: PortfolioItem) => void;
  onCloseLightbox: () => void;
  onBookPiece: (item: PortfolioItem) => void;
}

const FILTER_CATEGORIES: TattooStyleCategory[] = [
  'All',
  'Black & Grey',
  'Fine Line',
  'Realism',
  'Traditional',
  'Japanese',
  'Lettering',
  'Color',
];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolioItems,
  selectedLightboxItem,
  onOpenLightbox,
  onCloseLightbox,
  onBookPiece,
}) => {
  const [activeFilter, setActiveFilter] = useState<TattooStyleCategory>('All');

  const filteredItems = portfolioItems.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.style === activeFilter;
  });

  const handlePrevItem = () => {
    if (!selectedLightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedLightboxItem.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    onOpenLightbox(filteredItems[prevIndex]);
  };

  const handleNextItem = () => {
    if (!selectedLightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedLightboxItem.id);
    const nextIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    onOpenLightbox(filteredItems[nextIndex]);
  };

  return (
    <section id="portfolio" className="py-24 bg-[#090b0e] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Archival Gallery</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            PORTFOLIO & ATELIER WORKS
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Explore authentic pieces designed and inked by our artists. Each piece reflects deep anatomical synergy, long-term pigment stability, and customized aesthetic vision.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`portfolio-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20'
                    : 'bg-[#0f1217] text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`portfolio-thumb-${item.id}`}
              onClick={() => onOpenLightbox(item)}
              className="group relative rounded-sm overflow-hidden bg-[#0e1116] border border-white/10 cursor-pointer shadow-lg hover:border-[#c5a059]/50 transition-all duration-300"
            >
              {/* Image container */}
              <div className="h-80 sm:h-96 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-black/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-sm text-[10px] font-semibold uppercase tracking-wider text-[#c5a059]">
                    {item.style}
                  </span>
                  {item.featured && (
                    <span className="bg-[#c5a059]/90 text-black px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </div>

                {/* Maximize Icon on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-sm bg-black/70 text-white border border-white/20">
                  <Maximize2 className="w-4 h-4 text-[#c5a059]" />
                </div>

                {/* Bottom Card Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#c5a059] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-neutral-300 mt-1">
                    <span className="flex items-center gap-1 text-neutral-400">
                      <User className="w-3 h-3 text-[#c5a059]" />
                      {item.artist}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-400">
                      <MapPin className="w-3 h-3 text-[#c5a059]" />
                      {item.placement}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-[#0e1116] border border-white/10 rounded-sm">
            <p className="text-neutral-400 text-sm">No artwork found under this category.</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-3 text-xs text-[#c5a059] hover:underline uppercase tracking-wider font-semibold"
            >
              View All Works
            </button>
          </div>
        )}
      </div>

      {/* Professional Lightbox Modal */}
      {selectedLightboxItem && (
        <div
          id="portfolio-lightbox-backdrop"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={onCloseLightbox}
        >
          <div
            id="portfolio-lightbox-container"
            className="relative max-w-5xl w-full max-h-[92vh] bg-[#0c0e12] border border-white/15 rounded-sm overflow-hidden flex flex-col lg:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              id="lightbox-close-btn"
              onClick={onCloseLightbox}
              className="absolute top-3 right-3 z-30 p-2 rounded bg-black/80 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image View with Nav arrows */}
            <div className="relative lg:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[350px] lg:min-h-[550px]">
              <img
                src={selectedLightboxItem.imageUrl}
                alt={selectedLightboxItem.title}
                className="w-full h-full object-contain max-h-[75vh]"
              />

              {/* Prev / Next controls */}
              <button
                id="lightbox-prev-btn"
                onClick={handlePrevItem}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 hover:border-[#c5a059] transition-colors"
                title="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="lightbox-next-btn"
                onClick={handleNextItem}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 hover:border-[#c5a059] transition-colors"
                title="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Details Panel */}
            <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[85vh]">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-sm bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059] text-[11px] font-semibold uppercase tracking-wider">
                    {selectedLightboxItem.style}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {selectedLightboxItem.colorType}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white">
                  {selectedLightboxItem.title}
                </h3>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  {selectedLightboxItem.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="text-neutral-500 font-medium">Artist</span>
                    <span className="font-semibold text-white">{selectedLightboxItem.artist}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="text-neutral-500 font-medium">Body Placement</span>
                    <span className="font-semibold text-white">{selectedLightboxItem.placement}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="text-neutral-500 font-medium">Scale / Dimensions</span>
                    <span className="font-semibold text-white">{selectedLightboxItem.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="text-neutral-500 font-medium">Archival Session</span>
                    <span className="text-neutral-400">{selectedLightboxItem.date}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/10 mt-6 space-y-2">
                <button
                  id="lightbox-book-piece-btn"
                  onClick={() => {
                    onCloseLightbox();
                    onBookPiece(selectedLightboxItem);
                  }}
                  className="w-full bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-xs tracking-wider uppercase py-3 rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Inquire About Similar Piece</span>
                </button>
                <p className="text-[11px] text-center text-neutral-500">
                  All Ink Haven works are custom originals. We never replicate exact tattoos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
