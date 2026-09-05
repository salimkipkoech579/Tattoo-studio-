import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  Sparkles,
  ExternalLink,
  Instagram,
  Facebook,
  CheckCircle2,
} from 'lucide-react';
import { StudioInfo } from '../types';

interface ContactSectionProps {
  studioInfo: StudioInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ studioInfo }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Studio Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: 'General Studio Inquiry', message: '' });
      setSubmitted(false);
    }, 4000);
  };

  const whatsappUrl = `https://wa.me/${studioInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Hello Ink Haven Studio London, I would like to inquire about a custom tattoo consultation.'
  )}`;

  return (
    <section id="contact" className="py-24 bg-[#07080b] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Atelier & Consultations</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            STUDIO LOCATION & CONTACT
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Located in London’s historic Soho arts quarter on Berwick Street. Conveniently accessible via Oxford Circus and Tottenham Court Road stations. We welcome serious inquiries, design discussions, and scheduled private visits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards, Hours & Map */}
          <div className="lg:col-span-7 space-y-6">
            {/* Direct Info Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address */}
              <div className="bg-[#0e1116] border border-white/10 p-5 rounded-sm space-y-2">
                <div className="flex items-center gap-2 text-[#c5a059] text-xs uppercase tracking-wider font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>Atelier Sanctuary</span>
                </div>
                <p className="text-sm font-bold text-white">{studioInfo.address}</p>
                <p className="text-xs text-neutral-400">{studioInfo.cityState}</p>
                <div className="pt-2">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#c5a059] hover:underline uppercase tracking-wider font-medium"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Communication */}
              <div className="bg-[#0e1116] border border-white/10 p-5 rounded-sm space-y-2">
                <div className="flex items-center gap-2 text-[#c5a059] text-xs uppercase tracking-wider font-semibold">
                  <Phone className="w-4 h-4" />
                  <span>Direct Communication</span>
                </div>
                <p className="text-xs text-neutral-300">
                  Phone:{' '}
                  <a href={`tel:${studioInfo.phone.replace(/\D/g, '')}`} className="font-semibold text-white hover:text-[#c5a059]">
                    {studioInfo.phone}
                  </a>
                </p>
                <p className="text-xs text-neutral-300">
                  Email:{' '}
                  <a href={`mailto:${studioInfo.email}`} className="font-semibold text-white hover:text-[#c5a059]">
                    {studioInfo.email}
                  </a>
                </p>
                <p className="text-xs text-neutral-300">
                  WhatsApp:{' '}
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="font-semibold text-emerald-400 hover:underline font-mono">
                    {studioInfo.whatsapp}
                  </a>
                </p>
                <div className="pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp ({studioInfo.whatsapp})</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-[#0e1116] border border-white/10 p-5 rounded-sm space-y-3">
              <div className="flex items-center gap-2 text-[#c5a059] text-xs uppercase tracking-wider font-semibold">
                <Clock className="w-4 h-4" />
                <span>Operating Hours & Studio Access</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(studioInfo.hours).map(([days, hours]) => (
                  <div key={days} className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-neutral-400">{days}:</span>
                    <span className="font-semibold text-white">{hours}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-neutral-400 pt-1">
                * Note: Studio access is by scheduled appointment and consultation only. No unannounced walk-ins during closed hours.
              </p>
            </div>

            {/* Styled Dark Google Maps Simulation Card */}
            <div className="bg-[#0e1116] border border-white/10 rounded-sm overflow-hidden relative">
              <div className="p-3 bg-[#11141b] border-b border-white/10 flex items-center justify-between text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span className="font-semibold text-white">38 Berwick Street, Soho, London W1F 8RT</span>
                </div>
                <span className="text-[10px] text-[#c5a059] uppercase tracking-wider font-semibold">Soho Arts District (Oxford Circus Tube)</span>
              </div>

              {/* Map Canvas Background */}
              <div className="relative h-64 bg-[#0a0c10] flex items-center justify-center overflow-hidden">
                {/* SVG Dark Grid Map Graphic */}
                <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  {/* Road lines simulation */}
                  <path d="M -50 120 Q 200 80 500 140 T 1000 110" fill="none" stroke="#2a303c" strokeWidth="12" />
                  <path d="M 220 -50 L 250 350" fill="none" stroke="#2a303c" strokeWidth="8" />
                  <path d="M 480 -50 L 460 350" fill="none" stroke="#2a303c" strokeWidth="8" />
                </svg>

                {/* Studio Map Pin */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="px-3 py-1 bg-black/90 border border-[#c5a059] rounded-sm text-[10px] uppercase font-bold text-[#c5a059] shadow-xl tracking-wider mb-1">
                    INK HAVEN ATELIER
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#c5a059] flex items-center justify-center text-black shadow-2xl">
                    <MapPin className="w-5 h-5 fill-black" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#c5a059] mt-0.5 opacity-60"></div>
                </div>

                <div className="absolute bottom-3 right-3 z-10">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-black/80 hover:bg-[#c5a059] text-white hover:text-black border border-white/20 text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Studio Inquiry Form & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e1116] border border-white/10 rounded-sm p-6 sm:p-8 shadow-2xl">
              <h3 className="font-heading text-xl font-bold text-white mb-1">
                SEND A DIRECT INQUIRY
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Have questions about pricing tiers, private appointments, or guest spots? Message our studio manager directly.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-950/20 border border-emerald-500/30 rounded-sm text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-white font-heading font-bold text-base">Inquiry Dispatched</div>
                  <p className="text-xs text-neutral-300">
                    Our studio management will respond to your email within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Gabriel Stone"
                      className="w-full px-3.5 py-2.5 bg-[#090b0e] border border-white/10 rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. gabriel@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#090b0e] border border-white/10 rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#090b0e] border border-white/10 rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059]"
                    >
                      <option value="General Studio Inquiry">General Studio Inquiry</option>
                      <option value="Cover-Up Assessment">Cover-Up Assessment</option>
                      <option value="Full Sleeve Roadmap">Full Sleeve Roadmap</option>
                      <option value="Guest Spot / Media Feature">Guest Spot / Media Feature</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we assist you today?"
                      className="w-full p-3 bg-[#090b0e] border border-white/10 rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-xs tracking-wider uppercase py-3.5 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Studio Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Social Channels Callout */}
            <div className="bg-[#0e1116] border border-white/10 p-5 rounded-sm space-y-3">
              <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400 block">
                Official Studio Channels
              </span>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={studioInfo.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded bg-white/5 hover:bg-[#c5a059] hover:text-black text-neutral-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href={studioInfo.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded bg-white/5 hover:bg-[#c5a059] hover:text-black text-neutral-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>TikTok</span>
                </a>
                <a
                  href={studioInfo.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded bg-white/5 hover:bg-[#c5a059] hover:text-black text-neutral-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
