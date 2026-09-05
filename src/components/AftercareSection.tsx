import React, { useState } from 'react';
import {
  ShieldAlert,
  Droplets,
  Sun,
  Flame,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  Sparkles,
  FileCheck,
  Ban,
  HelpCircle,
} from 'lucide-react';
import { AFTERCARE_PHASES } from '../data/initialData';

export const AftercareSection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [copiedChecklist, setCopiedChecklist] = useState(false);

  const currentPhase = AFTERCARE_PHASES[activePhaseIndex];

  const handleCopyChecklist = () => {
    const text = `INK HAVEN TATTOO STUDIO - OFFICIAL AFTERCARE PROTOCOL
------------------------------------------------------
1. FIRST 24 HOURS:
   - Keep medical derm-shield (Saniderm) on for 24 hours.
   - If traditional wrap, remove in 2-4 hours. Wash gently with fragrance-free soap.
2. WASHING:
   - 2-3 times daily with lukewarm water and fragrance-free antibacterial soap.
   - Pat dry with a fresh paper towel. Never use used bath towels.
3. MOISTURIZING:
   - Days 1-4: Rice-grain thin layer of Aquaphor or tattoo ointment.
   - Days 5+: Light fragrance-free lotion (Cetaphil/Lubriderm). Never over-saturate.
4. STRICT RULES:
   - NO swimming, hot tubs, baths (showers only for 3 weeks).
   - NO direct sun exposure or tanning for 4 weeks.
   - NO picking, scratching, or peeling.
   - NO tight synthetic gym wear causing friction.
5. SPF 50+:
   - Once fully healed (Day 21+), apply SPF 50+ to protect pigment vibrancy.
Medical Disclaimer: This guidance does not replace professional medical advice. Consult a licensed physician if you observe signs of infection.`;

    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <section id="aftercare" className="py-24 bg-[#07080b] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preservation & Cellular Healing</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            PROFESSIONAL AFTERCARE GUIDE
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Your tattoo is 50% artist needlework and 50% disciplined aftercare. Follow our clinical protocol to ensure crisp line retention, deep velvety blacks, and rapid dermal healing.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              id="copy-aftercare-guide-btn"
              onClick={handleCopyChecklist}
              className="bg-white/5 hover:bg-[#c5a059] hover:text-black border border-white/15 text-neutral-300 px-5 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-[#c5a059]" />
              <span>{copiedChecklist ? 'Protocol Copied to Clipboard!' : 'Copy Aftercare Checklist'}</span>
            </button>
          </div>
        </div>

        {/* 1. Core Pillar Grid: The First 24 Hours, Washing, Moisturizing, What to Avoid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* First 24 Hours */}
          <div className="bg-[#0e1116] border border-white/10 rounded-sm p-6 space-y-3">
            <div className="w-10 h-10 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">1. First 24 Hours</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Keep your protective medical derm-shield (Saniderm) on for 24 hours. If bandaged with sterile gauze, remove in 2–4 hours. Clean hands thoroughly before touching the area.
            </p>
          </div>

          {/* Washing */}
          <div className="bg-[#0e1116] border border-white/10 rounded-sm p-6 space-y-3">
            <div className="w-10 h-10 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">2. Washing the Tattoo</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Wash 2 to 3 times daily using lukewarm water and mild fragrance-free antibacterial liquid soap (e.g. Dial Gold). Pat dry with clean paper towels — never rub.
            </p>
          </div>

          {/* Moisturizing */}
          <div className="bg-[#0e1116] border border-white/10 rounded-sm p-6 space-y-3">
            <div className="w-10 h-10 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">3. Moisturizing Discipline</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Apply a micro thin, grain-of-rice layer of recommended tattoo balm. Less is more — suffocating skin causes trapped bacteria and pigment loss.
            </p>
          </div>

          {/* What to Avoid */}
          <div className="bg-[#0e1116] border border-white/10 rounded-sm p-6 space-y-3">
            <div className="w-10 h-10 rounded bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <Ban className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">4. What To Avoid</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              No scratching, picking scabs, soaking in tubs, swimming pools, ocean water, direct sunlight, heavy gym sweat, or dirty pet dander for 3 full weeks.
            </p>
          </div>
        </div>

        {/* 2. Critical Environmental Factors: Swimming, Sun Exposure, Exercise */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#12151c] border border-white/10 rounded-sm p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#c5a059] font-semibold text-xs uppercase tracking-wider">
              <Droplets className="w-4 h-4" />
              <span>Swimming & Soaking</span>
            </div>
            <h4 className="font-heading text-base font-bold text-white">Strictly No Submersion</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Pools contain chlorine that leaches raw ink; oceans and hot tubs harbor aggressive bacteria that cause severe staph infections. Quick showers under 10 minutes are permitted.
            </p>
          </div>

          <div className="bg-[#12151c] border border-white/10 rounded-sm p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#c5a059] font-semibold text-xs uppercase tracking-wider">
              <Sun className="w-4 h-4" />
              <span>Sun Exposure & UV</span>
            </div>
            <h4 className="font-heading text-base font-bold text-white">UV Light is Ink’s Enemy</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Keep the healing tattoo completely covered with loose clothing outdoors. Once fully healed (Day 21+), apply Broad Spectrum SPF 50+ mineral sunscreen daily to prevent fading.
            </p>
          </div>

          <div className="bg-[#12151c] border border-white/10 rounded-sm p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#c5a059] font-semibold text-xs uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              <span>Exercise & Friction</span>
            </div>
            <h4 className="font-heading text-base font-bold text-white">Manage Friction & Sweat</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Avoid strenuous workouts and heavy gym sweating for the first 5 days. Gym equipment harbors bacteria. Wear loose 100% breathable cotton over the tattooed area.
            </p>
          </div>
        </div>

        {/* 3. Interactive Tattoo Healing Timeline */}
        <div className="bg-[#0e1116] border border-white/10 rounded-sm p-6 sm:p-10 mb-16 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a059]">
                Day-by-Day Cellular Recovery
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mt-1">
                TATTOO HEALING TIMELINE
              </h3>
            </div>

            {/* Phase Selector Pills */}
            <div className="flex flex-wrap gap-1.5 bg-[#090b0e] p-1 rounded-sm border border-white/10">
              {AFTERCARE_PHASES.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                    activePhaseIndex === idx
                      ? 'bg-[#c5a059] text-black font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {p.days}
                </button>
              ))}
            </div>
          </div>

          {/* Current Phase Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-lg font-heading font-bold text-white">
                  {currentPhase.phase}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059] text-xs font-mono">
                  {currentPhase.days}
                </span>
              </div>

              <p className="text-neutral-300 text-sm leading-relaxed">
                {currentPhase.summary}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-white">
                  Prescribed Actions:
                </div>
                <ul className="space-y-2">
                  {currentPhase.instructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <CheckCircle className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#141720] border border-white/10 p-5 rounded-sm space-y-3">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#c5a059] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>What to Expect Dermal-Wise</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {currentPhase.whatToExpect}
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] text-neutral-400">
                Notice anything outside these normal symptoms? Refer to the warning signs checklist below.
              </div>
            </div>
          </div>
        </div>

        {/* 4. Warning Signs Requiring Medical Attention & Health Disclaimer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Warning signs */}
          <div className="lg:col-span-7 bg-red-950/20 border border-red-500/30 rounded-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-widest">
              <AlertTriangle className="w-4 h-4" />
              <span>Warning Signs Requiring Prompt Attention</span>
            </div>
            <h4 className="font-heading text-xl font-bold text-white">
              When to Consult a Medical Professional
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Complications are exceptionally rare when proper sterile hygiene is maintained. However, contact a licensed physician or urgent care immediately if you notice:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-200">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Spreading red streaking radiating outward from tattoo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Fever, chills, or systemic weakness after 24 hrs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Thick, foul-smelling yellow/green discharge or pus</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Intense, burning skin heat that worsens after Day 3</span>
              </li>
            </ul>
          </div>

          {/* Legal / Medical Disclaimer Box */}
          <div className="lg:col-span-5 bg-[#0e1116] border border-white/10 rounded-sm p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-[#c5a059] font-semibold text-xs uppercase tracking-widest mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Official Health Disclaimer</span>
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">
                Standard Professional Disclaimer
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                The tattoo aftercare instructions provided by Ink Haven Tattoo Studio are formulated based on industry best practices, OSHA sterilization standards, and professional artist guild experience. <strong>This guidance does NOT replace professional medical advice, diagnosis, or treatment.</strong> Always seek the counsel of a licensed doctor or healthcare provider with any questions regarding skin infections or adverse dermal reactions.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 text-[11px] text-neutral-500">
              Ink Haven Studio • Licensed by NYC Department of Health & Mental Hygiene
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
