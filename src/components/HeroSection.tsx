import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Sparkles, Award, Star, Clock, CheckCircle, MessageSquare, Video } from 'lucide-react';
import { PortfolioItem } from '../types';

interface HeroSectionProps {
  onBookClick: () => void;
  onViewPortfolio: () => void;
  featuredItems: PortfolioItem[];
  onOpenLightbox: (item: PortfolioItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookClick,
  onViewPortfolio,
  featuredItems,
  onOpenLightbox,
}) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#07080a]">
      {/* Ambient background tattoo imagery with luxury dark gradient vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=2000&q=80"
          alt="Tattoo Artistry Background"
          className="w-full h-full object-cover object-center opacity-25 filter grayscale contrast-125 scale-105 transform duration-1000"
        />
        {/* Dark radial overlay to ensure high contrast for typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/85 to-[#08090b]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#08090b]/60 to-[#08090b]" />
      </div>

      {/* Decorative luxury hairline border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Studio Tag & Heritage Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#c5a059]/30 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#c5a059]"></span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#e5c98f]">
              Bespoke Custom Tattoo Atelier • Soho, London, UK
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            YOUR STORY.{' '}
            <span className="block gold-gradient-text mt-1">
              PERMANENTLY INKED.
            </span>
          </h1>

          {/* Studio Commitment Paragraph */}
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl mb-8">
            Ink Haven is London’s premier private bespoke tattoo atelier dedicated to non-repetitive, custom body art. Merging fine art academic rigor with British medical sterilization standards, we transform your intimate narratives into enduring masterpieces.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-12 flex-wrap">
            <button
              id="hero-primary-book-btn"
              onClick={onBookClick}
              className="bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-sm shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:shadow-[0_0_40px_rgba(197,160,89,0.5)] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-black" />
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              id="hero-whatsapp-btn"
              href="https://wa.me/447490186826?text=Hello%20Ink%20Haven%20London%2C%20I%20would%20like%20to%20enquire%20about%20a%20tattoo%20consultation."
              target="_blank"
              rel="noreferrer"
              className="border border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/40 hover:bg-emerald-950/70 text-emerald-400 font-semibold text-xs tracking-wider uppercase px-5 py-4 rounded-sm transition-all flex items-center justify-center gap-2"
              title="Chat on WhatsApp: +44 7490 186826"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp (+44 7490 186826)</span>
            </a>

            <button
              id="hero-secondary-portfolio-btn"
              onClick={onViewPortfolio}
              className="border border-white/20 hover:border-[#c5a059]/60 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-200 hover:text-white font-medium text-xs tracking-wider uppercase px-6 py-4 rounded-sm transition-all flex items-center justify-center gap-2"
            >
              <span>View Portfolio</span>
            </button>
          </div>

          {/* Quality Guarantees / Key Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>100% Single-Use Sterile</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Custom Original Concepts</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Private VIP Suites</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Works Glimpse Banner */}
      <div className="relative z-10 border-t border-white/10 bg-[#0b0d11]/90 backdrop-blur-md py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-300">
                Recent Masterpieces From Our Studio
              </span>
            </div>
            <button
              onClick={onViewPortfolio}
              className="text-xs text-[#c5a059] hover:text-white uppercase tracking-wider font-semibold flex items-center gap-1 transition-colors self-start md:self-auto"
            >
              <span>Explore All 16 Works</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {featuredItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                id={`hero-featured-card-${item.id}`}
                onClick={() => onOpenLightbox(item)}
                className="group relative h-36 sm:h-44 rounded-sm overflow-hidden border border-white/10 bg-neutral-900 cursor-pointer shadow-lg"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#c5a059] block">
                    {item.style}
                  </span>
                  <h4 className="text-xs font-heading font-medium text-white truncate group-hover:text-[#c5a059] transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-neutral-400">By {item.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Statistics Ribbon */}
      <div className="relative z-10 bg-[#0e1116] border-y border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-2">
            <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8+ <span className="text-[#c5a059]">Years</span>
            </div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium mt-0.5">
              Studio Legacy & Experience
            </div>
          </div>
          <div className="p-2">
            <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1,500+ <span className="text-[#c5a059]">Tattoos</span>
            </div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium mt-0.5">
              Custom Works Executed
            </div>
          </div>
          <div className="p-2">
            <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1,000+ <span className="text-[#c5a059]">Clients</span>
            </div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium mt-0.5">
              Happy Satisfied Collectors
            </div>
          </div>
          <div className="p-2">
            <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-1">
              5.0 <Star className="w-5 h-5 fill-[#c5a059] text-[#c5a059]" />
            </div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium mt-0.5">
              5-Star Rated Studio Guild
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
