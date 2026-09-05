import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle, LayoutGrid, Sliders } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isAutoplay, setIsAutoplay] = useState(false);

  // Optional auto-rotation for carousel
  useEffect(() => {
    if (!isAutoplay || viewMode !== 'carousel' || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoplay, viewMode, testimonials.length]);

  const handlePrev = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex] || testimonials[0];

  return (
    <section id="testimonials" className="py-24 bg-[#090b0e] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collector Voices & Stories</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            CLIENT TESTIMONIALS
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every client brings an indelible story. Read first-hand reviews from collectors who trusted Ink Haven with their bodies and vision.
          </p>

          {/* View Mode Switcher */}
          <div className="inline-flex items-center p-1 bg-[#10131a] border border-white/10 rounded-sm mt-8">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                viewMode === 'carousel'
                  ? 'bg-[#c5a059] text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Carousel Slider</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-[#c5a059] text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>View All Reviews</span>
            </button>
          </div>
        </div>

        {/* Carousel Mode */}
        {viewMode === 'carousel' && (
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-[#0e1116] border border-white/10 rounded-sm p-8 sm:p-14 shadow-2xl">
              <Quote className="w-12 h-12 text-[#c5a059]/20 absolute top-6 right-6" />

              <div className="space-y-6">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#c5a059] text-[#c5a059]" />
                  ))}
                </div>

                {/* Review text */}
                <p className="font-quote text-xl sm:text-2xl lg:text-3xl text-neutral-100 italic leading-relaxed">
                  “{currentTestimonial.review}”
                </p>

                {/* Client Info Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    {currentTestimonial.avatarUrl ? (
                      <img
                        src={currentTestimonial.avatarUrl}
                        alt={currentTestimonial.clientName}
                        className="w-11 h-11 rounded-full object-cover border border-[#c5a059]/40"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#1b1e26] border border-white/10 flex items-center justify-center text-white font-heading font-bold">
                        {currentTestimonial.clientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-heading text-base font-bold text-white flex items-center gap-2">
                        <span>{currentTestimonial.clientName}</span>
                        {currentTestimonial.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-sans font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Verified Client
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-neutral-400">
                        Piece: <span className="text-[#c5a059]">{currentTestimonial.tattooStyle}</span> • Artist: {currentTestimonial.artist}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-500">
                    {currentTestimonial.date}
                  </div>
                </div>
              </div>

              {/* Slider Navigation controls */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsAutoplay(false);
                        setCurrentIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentIndex === idx ? 'w-8 bg-[#c5a059]' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-sm bg-white/5 hover:bg-[#c5a059] text-white hover:text-black transition-colors cursor-pointer"
                    title="Previous review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-sm bg-white/5 hover:bg-[#c5a059] text-white hover:text-black transition-colors cursor-pointer"
                    title="Next review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid Mode */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-[#0e1116] border border-white/10 rounded-sm p-6 sm:p-8 flex flex-col justify-between space-y-4 hover:border-[#c5a059]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#c5a059] text-[#c5a059]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-neutral-500">{t.date}</span>
                  </div>

                  <p className="text-neutral-300 text-xs sm:text-sm italic leading-relaxed font-quote text-base sm:text-lg">
                    “{t.review}”
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  {t.avatarUrl ? (
                    <img
                      src={t.avatarUrl}
                      alt={t.clientName}
                      className="w-9 h-9 rounded-full object-cover border border-[#c5a059]/30"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#1b1e26] border border-white/10 flex items-center justify-center text-white text-xs font-bold font-heading">
                      {t.clientName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-heading text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{t.clientName}</span>
                      {t.verified && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {t.tattooStyle} • {t.artist}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
