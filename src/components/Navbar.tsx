import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Calendar, Phone, Clock, Instagram, Sparkles, MessageSquare } from 'lucide-react';
import { StudioInfo } from '../types';

interface NavbarProps {
  studioInfo: StudioInfo;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: (preselectedService?: string) => void;
  onOpenAdmin: () => void;
  pendingBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  studioInfo,
  activeSection,
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
  pendingBookingsCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'studio-video', label: 'Videos' },
    { id: 'styles', label: 'Tattoo Styles' },
    { id: 'aftercare', label: 'Aftercare' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const whatsappUrl = `https://wa.me/${studioInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Hello Ink Haven London, I would like to enquire about a tattoo consultation.'
  )}`;

  return (
    <>
      {/* Top micro announcement bar */}
      <div id="top-announcement-bar" className="bg-[#0b0d11] border-b border-white/5 py-1.5 px-4 text-xs text-neutral-400 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Booking Consultations for Fall & Winter
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#c5a059]" />
              Tue - Sat: 11:00 AM – 8:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium"
              title="Direct Studio WhatsApp"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp: {studioInfo.whatsapp}</span>
            </a>
            <span className="text-white/20">•</span>
            <a href={`tel:${studioInfo.phone.replace(/\D/g, '')}`} className="hover:text-[#c5a059] transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#c5a059]" />
              {studioInfo.phone}
            </a>
            <span className="text-white/20">•</span>
            <button
              id="admin-portal-pill-btn"
              onClick={onOpenAdmin}
              className="hover:text-white transition-colors flex items-center gap-1.5 text-[#c5a059] font-medium"
              title="Open Studio Admin Portal"
            >
              <Shield className="w-3 h-3" />
              <span>Studio Owner Portal</span>
              {pendingBookingsCount > 0 && (
                <span className="bg-[#c5a059] text-black text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {pendingBookingsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        id="main-sticky-nav"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08090bf2] backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
            : 'bg-[#08090b]/85 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#1b1e24] to-[#0f1115] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059] transition-all shadow-md">
              <span className="font-heading text-lg font-bold tracking-wider">IH</span>
            </div>
            <div>
              <div className="font-heading text-base sm:text-lg font-bold tracking-[0.15em] text-white flex items-center gap-1.5">
                INK HAVEN
                <span className="text-[#c5a059] text-xs font-sans tracking-widest font-normal uppercase hidden md:inline-block px-1.5 py-0.5 rounded bg-[#c5a059]/10 border border-[#c5a059]/20">
                  Studio
                </span>
              </div>
              <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium">
                Your Story. Permanently Inked.
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 text-xs tracking-wider uppercase font-medium rounded transition-all ${
                    isActive
                      ? 'text-[#c5a059] bg-white/5'
                      : 'text-neutral-300 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-admin-btn"
              onClick={onOpenAdmin}
              className="lg:hidden p-2 rounded text-neutral-400 hover:text-[#c5a059] hover:bg-white/5 transition-colors relative"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
              {pendingBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c5a059] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {pendingBookingsCount}
                </span>
              )}
            </button>

            <button
              id="header-book-cta-btn"
              onClick={() => onOpenBooking()}
              className="relative group overflow-hidden bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_25px_rgba(197,160,89,0.4)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              id="mobile-book-icon-btn"
              onClick={() => onOpenBooking()}
              className="bg-[#c5a059] text-black p-2 rounded text-xs font-semibold"
              title="Book Now"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white rounded hover:bg-white/5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown drawer */}
        {mobileMenuOpen && (
          <div id="mobile-menu-drawer" className="lg:hidden bg-[#0c0e12] border-b border-white/10 px-4 pt-3 pb-6 space-y-2 mt-2">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2.5 text-xs uppercase tracking-wider font-medium rounded transition-colors ${
                    activeSection === item.id
                      ? 'text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30'
                      : 'text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                id="mobile-nav-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs tracking-wider uppercase py-2.5 rounded-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp ({studioInfo.whatsapp})</span>
              </a>

              <button
                id="mobile-nav-book-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-xs tracking-wider uppercase py-3 rounded-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation</span>
              </button>

              <button
                id="mobile-nav-admin-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full border border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 py-2.5 rounded-sm text-xs flex items-center justify-center gap-2 font-medium"
              >
                <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Studio Owner Dashboard {pendingBookingsCount > 0 ? `(${pendingBookingsCount} Pending)` : ''}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
