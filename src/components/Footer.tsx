import React, { useState } from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Instagram, Facebook, Sparkles, X, FileText, MessageSquare } from 'lucide-react';
import { StudioInfo } from '../types';

interface FooterProps {
  studioInfo: StudioInfo;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  studioInfo,
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
}) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer id="main-footer" className="bg-[#050608] border-t border-white/10 pt-16 pb-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Studio Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#1b1e24] to-[#0f1115] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shadow-md">
                <span className="font-heading text-lg font-bold">IH</span>
              </div>
              <div>
                <div className="font-heading text-lg font-bold tracking-wider text-white">
                  INK HAVEN TATTOO STUDIO
                </div>
                <div className="text-[10px] tracking-[0.2em] text-[#c5a059] uppercase font-semibold">
                  “Your Story. Permanently Inked.”
                </div>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              An internationally accredited bespoke private tattoo atelier based in Soho, London, United Kingdom. Devoted to custom large-scale compositions, single-needle fine lines, hyper-realism, and sterile medical-grade artistry.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={studioInfo.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded bg-white/5 hover:bg-[#c5a059] hover:text-black text-neutral-300 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={studioInfo.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded bg-white/5 hover:bg-[#c5a059] hover:text-black text-neutral-300 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={studioInfo.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded bg-white/5 hover:bg-[#c5a059] hover:text-black text-neutral-300 transition-colors"
                title="TikTok"
              >
                <Sparkles className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-neutral-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span>Westminster Council Licensed #LBL-84912 • CIEH & BTAG Clinical Standards</span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Studio Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About the Artists' },
                { id: 'services', label: 'Tattoo Services' },
                { id: 'portfolio', label: 'Portfolio Gallery' },
                { id: 'studio-video', label: 'Studio Video Theater' },
                { id: 'styles', label: 'Tattoo Styles Guide' },
                { id: 'booking', label: 'Book a Consultation' },
                { id: 'aftercare', label: 'Clinical Aftercare' },
                { id: 'testimonials', label: 'Client Testimonials' },
                { id: 'contact', label: 'Studio & Location' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-[#c5a059] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Featured Services */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Signature Disciplines
            </h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#c5a059]">Custom Tattoos</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#c5a059]">Black & Grey Realism</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#c5a059]">Fine Line Botanicals</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#c5a059]">Japanese Irezumi</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#c5a059]">Neo-Traditional Art</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#c5a059]">Lettering & Typography</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#c5a059]">Cover-Up Renovations</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#c5a059]">Full & Half Sleeves</button></li>
            </ul>
          </div>

          {/* Col 5: Location & Hours */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Sanctuary Access
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{studioInfo.address}, {studioInfo.cityState}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>{studioInfo.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>{studioInfo.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${studioInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                    'Hello Ink Haven London, I would like to enquire about a consultation.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 text-emerald-400 font-mono transition-colors"
                >
                  WhatsApp: {studioInfo.whatsapp}
                </a>
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1">
              <span className="text-[11px] font-semibold text-neutral-300 block">Opening Hours:</span>
              <p className="text-[11px] text-neutral-400">Tue – Sat: 11:00 AM – 8:00 PM</p>
              <p className="text-[11px] text-neutral-400">Sun: 12:00 PM – 6:00 PM</p>
              <p className="text-[11px] text-[#c5a059]">Mon: Private Consultations Only</p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-[11px] tracking-wider uppercase py-2 rounded-sm transition-all"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Ink Haven Tattoo Studio Ltd (Registered in England & Wales #10984912). All Rights Reserved. “Your Story. Permanently Inked.”
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-neutral-300 underline"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-neutral-300 underline"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="text-[#c5a059] hover:underline flex items-center gap-1 font-medium"
            >
              Studio Staff Login
            </button>
          </div>
        </div>
      </div>

      {/* Privacy / Terms Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="bg-[#0e1116] border border-white/15 p-6 sm:p-8 rounded-sm max-w-lg w-full max-h-[80vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-heading text-lg font-bold text-white">
                {legalModal === 'privacy' ? 'Client Privacy Policy' : 'Studio Terms & Conditions'}
              </h3>
              <button onClick={() => setLegalModal(null)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-neutral-300 space-y-3 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    Ink Haven Tattoo Studio prioritizes the confidentiality and physical privacy of every client. Reference images, medical disclosures, and contact credentials submitted through our booking system are stored securely and never shared with third-party advertising brokers.
                  </p>
                  <p>
                    Session photographs for portfolio documentation are shared on our public channels only with voluntary client consent.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Age Requirement:</strong> Clients must be 18 years of age or older on the date of appointment. Government-issued photo ID is legally mandated prior to tattooing.
                  </p>
                  <p>
                    <strong>Deposits:</strong> A standard non-refundable consultation deposit ($100 minimum) is credited toward the final cost of your session. Rescheduling requires 48 hours notice.
                  </p>
                  <p>
                    <strong>Originality:</strong> Every artwork designed by Ink Haven artists is copyright-protected and created specifically for the designated client.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
