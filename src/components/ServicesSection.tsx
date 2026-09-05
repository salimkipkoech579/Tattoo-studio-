import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  Check,
  ArrowRight,
  Search,
  ChevronDown,
  ChevronUp,
  Layers,
  Eye,
  Shield,
  PenTool,
  Maximize2,
} from 'lucide-react';
import { TattooService, TattooStyleCategory } from '../types';
import { TATTOO_STYLE_DETAILS, getTattooStyleDetail } from '../data/styleGuideDetails';
import { StyleDetailModal } from './StyleDetailModal';

interface ServicesSectionProps {
  services: TattooService[];
  onBookService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onBookService }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStyle, setFilterStyle] = useState<string>('All');
  const [selectedStyleTagForModal, setSelectedStyleTagForModal] = useState<string | null>(null);
  const [expandedInlineCardId, setExpandedInlineCardId] = useState<string | null>(null);

  // Available style keys for the interactive quick-exploration bar
  const availableStyles = Object.keys(TATTOO_STYLE_DETAILS);

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.fullDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.styleTag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStyle = filterStyle === 'All' || service.styleTag === filterStyle;
    return matchesSearch && matchesStyle;
  });

  const handleOpenStyleModal = (styleTag: string) => {
    setSelectedStyleTagForModal(styleTag);
  };

  const handleCloseStyleModal = () => {
    setSelectedStyleTagForModal(null);
  };

  const toggleInlineCardPreview = (serviceId: string) => {
    setExpandedInlineCardId((prev) => (prev === serviceId ? null : serviceId));
  };

  const currentModalDetail = selectedStyleTagForModal
    ? getTattooStyleDetail(selectedStyleTagForModal)
    : null;

  return (
    <section id="services" className="py-24 bg-[#07080b] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>London Atelier Disciplines & Mastery</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            TATTOO SERVICES & STYLES
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            From single-needle micro-botanicals to monumental full-body Japanese Irezumi suits. Click on any style below to inspect its key characteristics, needle mechanics, and curated portfolio examples.
          </p>

          {/* Search bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search styles (e.g. Fine Line, Sleeve, Cover-Up)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-[#0f1217] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#c5a059] transition-colors"
              />
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-neutral-400 hover:text-white underline shrink-0 cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Interactive Style Guide Explorer Ribbon (Prompt Requirement: Click a style to explore) */}
        <div className="mb-12 bg-[#0c0f14] border border-[#c5a059]/30 rounded-sm p-4 sm:p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-sm bg-[#c5a059]/20 text-[#c5a059]">
                <Eye className="w-4 h-4" />
              </div>
              <span className="text-xs font-heading font-bold text-white tracking-wide uppercase">
                Interactive Style Explorer
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="text-[11px] text-neutral-400">
                Click any style to view explanation, key characteristics & 2–3 portfolio examples
              </span>
            </div>

            <div className="text-[11px] text-[#c5a059] font-mono font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>10 Master Disciplines</span>
            </div>
          </div>

          {/* Interactive Style Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {availableStyles.map((styleKey) => {
              const detail = TATTOO_STYLE_DETAILS[styleKey];
              return (
                <button
                  key={styleKey}
                  id={`style-pill-${detail.id}`}
                  onClick={() => handleOpenStyleModal(styleKey)}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#13171f] hover:bg-[#c5a059] border border-white/10 hover:border-[#c5a059] text-xs font-medium text-neutral-300 hover:text-black transition-all cursor-pointer shadow-sm"
                  title={`Explore ${detail.serviceTitle} characteristics and portfolio examples`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] group-hover:bg-black transition-colors" />
                  <span>{detail.serviceTitle.replace(' Tattoos', '')}</span>
                  <span className="text-[10px] text-neutral-400 group-hover:text-black/80 font-mono">
                    (3 Works)
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 12 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const styleDetail = getTattooStyleDetail(service.styleTag);
            const isInlineExpanded = expandedInlineCardId === service.id;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group bg-[#0e1116] border border-white/10 hover:border-[#c5a059]/50 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#c5a059]/10"
              >
                <div>
                  {/* Image header with zoom effect and interactive style tag badge */}
                  <div className="relative h-56 overflow-hidden bg-neutral-900">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1116] via-[#0e1116]/30 to-transparent" />

                    {/* Interactive Style Tag badge (Click opens interactive guide) */}
                    <button
                      onClick={() => handleOpenStyleModal(service.styleTag)}
                      className="absolute top-3 left-3 bg-black/85 hover:bg-[#c5a059] text-[#c5a059] hover:text-black backdrop-blur-sm border border-[#c5a059]/40 hover:border-[#c5a059] px-2.5 py-1 rounded-sm text-[10px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      title={`Click to inspect ${service.styleTag} style characteristics & example works`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{service.styleTag}</span>
                      <span className="opacity-75 text-[9px] font-normal underline">Explore Style</span>
                    </button>

                    {/* Price & Time indicator in British Sterling (£) */}
                    <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-sm text-[10px] font-medium text-white flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#c5a059]" />
                      <span>{service.avgHours}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <h3
                        onClick={() => handleOpenStyleModal(service.styleTag)}
                        className="font-heading text-xl font-bold text-white group-hover:text-[#c5a059] transition-colors cursor-pointer"
                        title="Click to view style details and examples"
                      >
                        {service.title}
                      </h3>
                      <span className="text-xs text-[#c5a059] font-semibold">{service.startingPrice}</span>
                    </div>

                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>

                    <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3 mb-5 border-l border-white/10 pl-3">
                      {service.fullDesc}
                    </p>

                    {/* Feature Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5 mb-5">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Button to Explore Style & Examples (Prompt Core Requirement) */}
                    <div className="space-y-2">
                      <button
                        id={`explore-style-btn-${service.id}`}
                        onClick={() => handleOpenStyleModal(service.styleTag)}
                        className="w-full bg-[#13171f] hover:bg-[#c5a059]/15 text-[#e5c98f] hover:text-[#c5a059] border border-[#c5a059]/30 hover:border-[#c5a059] font-medium text-xs tracking-wider uppercase py-2.5 px-3 rounded-sm transition-all flex items-center justify-between cursor-pointer group/guide"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>Explore Style & 3 Examples</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#c5a059] group-hover/guide:translate-x-0.5 transition-transform" />
                      </button>

                      {/* Optional inline preview toggle to check characteristics without leaving page */}
                      <button
                        onClick={() => toggleInlineCardPreview(service.id)}
                        className="w-full text-center text-[11px] text-neutral-400 hover:text-white py-1 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{isInlineExpanded ? 'Hide Quick Insights' : 'Quick Preview Characteristics & Works'}</span>
                        {isInlineExpanded ? (
                          <ChevronUp className="w-3 h-3 text-[#c5a059]" />
                        ) : (
                          <ChevronDown className="w-3 h-3 text-[#c5a059]" />
                        )}
                      </button>
                    </div>

                    {/* Collapsible Inline Preview (Provides compact, clean preview without overcrowding) */}
                    {isInlineExpanded && styleDetail && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-3 bg-[#0a0c0f] p-3.5 rounded-sm animate-fadeIn">
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#c5a059] mb-1">
                            Style Essence:
                          </div>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            {styleDetail.explanation.slice(0, 160)}...
                          </p>
                        </div>

                        {/* 2 Key Characteristics Quick Pills */}
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                            Key Characteristics:
                          </div>
                          {styleDetail.characteristics.slice(0, 2).map((char, cIdx) => (
                            <div
                              key={cIdx}
                              className="text-[11px] text-neutral-300 flex items-start gap-1.5 bg-black/40 p-1.5 rounded-sm"
                            >
                              <span className="text-[#c5a059] font-bold shrink-0">•</span>
                              <div>
                                <span className="text-white font-medium">{char.title}: </span>
                                <span>{char.badge}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* 3 Portfolio Thumbnails */}
                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                              3 Portfolio Works:
                            </span>
                            <button
                              onClick={() => handleOpenStyleModal(service.styleTag)}
                              className="text-[10px] text-[#c5a059] hover:underline"
                            >
                              Enlarge all
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-1.5">
                            {styleDetail.exampleImages.map((img) => (
                              <div
                                key={img.id}
                                onClick={() => handleOpenStyleModal(service.styleTag)}
                                className="relative aspect-square rounded-sm overflow-hidden bg-neutral-900 cursor-pointer group/thumb border border-white/10 hover:border-[#c5a059]"
                                title={`${img.title} by ${img.artist}`}
                              >
                                <img
                                  src={img.imageUrl}
                                  alt={img.title}
                                  className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-transparent transition-colors" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer with Book Now CTA */}
                <div className="p-6 pt-0">
                  <button
                    id={`book-now-service-${service.id}-btn`}
                    onClick={() => onBookService(service.title)}
                    className="w-full bg-white/5 hover:bg-[#c5a059] text-neutral-200 hover:text-black border border-white/10 hover:border-[#c5a059] font-semibold text-xs tracking-wider uppercase py-3 rounded-sm transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-[#0e1116] border border-white/10 rounded-sm">
            <p className="text-neutral-400 text-sm">No tattoo services matched your search term.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStyle('All');
              }}
              className="mt-3 text-xs text-[#c5a059] hover:underline uppercase tracking-wider font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Interactive Style Detail Modal (Displays explanation, key characteristics & 2-3 portfolio examples) */}
      <StyleDetailModal
        isOpen={!!selectedStyleTagForModal}
        styleDetail={currentModalDetail}
        onClose={handleCloseStyleModal}
        onSelectStyle={(newStyleTag) => setSelectedStyleTagForModal(newStyleTag)}
        onBookStyle={(styleTitle) => onBookService(styleTitle)}
      />
    </section>
  );
};
