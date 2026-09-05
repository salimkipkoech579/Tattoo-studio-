import React, { useState } from 'react';
import { Sparkles, Layers, PenTool, Compass, HelpCircle, ArrowRight } from 'lucide-react';
import { TATTOO_STYLES_GUIDE } from '../data/initialData';

interface TattooStylesSectionProps {
  onSelectStyleForBooking: (styleName: string) => void;
}

export const TattooStylesSection: React.FC<TattooStylesSectionProps> = ({ onSelectStyleForBooking }) => {
  const [activeTab, setActiveTab] = useState(TATTOO_STYLES_GUIDE[0].id);

  const selectedStyle = TATTOO_STYLES_GUIDE.find((s) => s.id === activeTab) || TATTOO_STYLES_GUIDE[0];

  return (
    <section id="styles" className="py-24 bg-[#07080a] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Aesthetic Lexicon & Techniques</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            TATTOO STYLES GUIDE
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Understanding artistic disciplines ensures your vision aligns harmoniously with skin anatomy, longevity, and pigment density. Explore our primary studio styles below.
          </p>

          {/* Style Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {TATTOO_STYLES_GUIDE.map((style) => (
              <button
                key={style.id}
                id={`style-guide-tab-${style.id}`}
                onClick={() => setActiveTab(style.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all cursor-pointer ${
                  activeTab === style.id
                    ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20'
                    : 'bg-[#0f1217] text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {style.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Style Detail Card */}
        <div className="bg-[#0e1116] border border-white/10 rounded-sm p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-semibold">
                  Aesthetic Profile
                </span>
                <h3 className="font-heading text-3xl font-bold text-white mt-1">
                  {selectedStyle.title}
                </h3>
                <p className="text-sm text-[#e5c98f] italic mt-1 font-quote text-lg">
                  “{selectedStyle.aesthetic}”
                </p>
              </div>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {selectedStyle.description}
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-white/5 text-[#c5a059] shrink-0 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white block">
                      Best Suited For
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                      {selectedStyle.bestFor}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-white/5 text-[#c5a059] shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white block">
                      Healing & Pigment Dynamics
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                      {selectedStyle.healingNotes}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-white/5 text-[#c5a059] shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white block">
                      Technical Hardware & Needle Groupings
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                      {selectedStyle.needleTypes}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  id={`book-style-${selectedStyle.id}-btn`}
                  onClick={() => onSelectStyleForBooking(selectedStyle.title)}
                  className="bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Book a {selectedStyle.title} Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual comparative cards */}
            <div className="lg:col-span-5 bg-[#14171e] p-6 rounded-sm border border-white/10 space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
                <span>Our Studio Approach to {selectedStyle.title}</span>
              </h4>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Every skin tone and dermal depth interacts differently with needles and pigments. During your private consultation, we test needle taper resistance and review skin undertones to ensure maximum vibrancy.
              </p>

              <div className="p-4 rounded-sm bg-black/40 border border-white/5 space-y-2">
                <div className="text-[11px] text-[#c5a059] font-semibold uppercase tracking-wider">
                  Complimentary With Every Project:
                </div>
                <ul className="text-xs text-neutral-300 space-y-1.5 list-disc list-inside">
                  <li>Digital stencil fit simulation on high-res anatomical photo</li>
                  <li>Custom pigment mix tailored to your skin undertone</li>
                  <li>Surgical-grade medical film bandage application</li>
                  <li>90-day complimentary touchup inspection</li>
                </ul>
              </div>

              <div className="text-[11px] text-neutral-400 italic">
                Unsure if your concept falls under {selectedStyle.title}? In your booking notes, describe your inspiration and our artists will recommend the optimal discipline.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
