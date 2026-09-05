import React, { useState, useEffect } from 'react';
import {
  INITIAL_STUDIO_INFO,
  TATTOO_SERVICES,
  PORTFOLIO_ITEMS,
  INITIAL_BOOKINGS,
  TESTIMONIALS_DATA,
} from './data/initialData';
import {
  BookingRequest,
  BookingStatus,
  PortfolioItem,
  StudioInfo,
  TattooService,
} from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutArtistSection } from './components/AboutArtistSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TattooStylesSection } from './components/TattooStylesSection';
import { BookingSection } from './components/BookingSection';
import { AftercareSection } from './components/AftercareSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { StudioVideoShowcase } from './components/StudioVideoShowcase';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MessageSquare, Calendar, Check, AlertCircle } from 'lucide-react';

const STORAGE_KEY_BOOKINGS = 'inkhaven_bookings_data_v1';
const STORAGE_KEY_PORTFOLIO = 'inkhaven_portfolio_data_v1';
const STORAGE_KEY_STUDIO = 'inkhaven_studio_data_v1';

export default function App() {
  // Persistence state
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDIO);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.whatsapp || parsed.whatsapp.includes('7911123456') || parsed.whatsapp.includes('718')) {
          parsed.whatsapp = '+44 7490 186826';
        }
        if (!parsed.socials?.tiktok || parsed.socials.tiktok.includes('@inkhaven.london')) {
          parsed.socials = { ...parsed.socials, tiktok: 'https://vt.tiktok.com/ZSq8bB1GP/' };
        }
        return parsed;
      }
      return INITIAL_STUDIO_INFO;
    } catch {
      return INITIAL_STUDIO_INFO;
    }
  });

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PORTFOLIO);
      return saved ? JSON.parse(saved) : PORTFOLIO_ITEMS;
    } catch {
      return PORTFOLIO_ITEMS;
    }
  });

  const [services] = useState<TattooService[]>(TATTOO_SERVICES);
  const [testimonials] = useState(TESTIMONIALS_DATA);

  // UI state
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<PortfolioItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Prefilled booking states
  const [prefilledStyle, setPrefilledStyle] = useState<string>('');
  const [prefilledNotes, setPrefilledNotes] = useState<string>('');
  const [prefilledPlacement, setPrefilledPlacement] = useState<string>('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(portfolioItems));
    } catch (e) {
      console.error(e);
    }
  }, [portfolioItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDIO, JSON.stringify(studioInfo));
    } catch (e) {
      console.error(e);
    }
  }, [studioInfo]);

  // Section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'styles', 'booking', 'aftercare', 'testimonials', 'contact'];
      const scrollY = window.scrollY + 180;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (preselectedServiceTitle?: string) => {
    if (preselectedServiceTitle) {
      setPrefilledStyle(preselectedServiceTitle);
      setPrefilledNotes(`Client selected the "${preselectedServiceTitle}" service package.`);
    }
    scrollToSection('booking');
  };

  const handleBookWithArtist = (artistName: string) => {
    setPrefilledNotes(`Client specifically requested consultation with artist: ${artistName}`);
    scrollToSection('booking');
  };

  const handleBookPortfolioPiece = (item: PortfolioItem) => {
    setPrefilledStyle(item.style);
    setPrefilledPlacement(item.placement);
    setPrefilledNotes(`Client is inspired by the portfolio piece "${item.title}" (${item.style}) created by ${item.artist}.`);
    scrollToSection('booking');
  };

  const handleNewBookingSubmit = (newBooking: BookingRequest) => {
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Consultation request ${newBooking.referenceCode} logged! Studio notified.`);
  };

  const handleUpdateBookingStatus = (id: string, newStatus: BookingStatus, note?: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: newStatus,
              adminNotes: note !== undefined ? note : b.adminNotes,
            }
          : b
      )
    );
    showToast(`Booking marked as ${newStatus}.`);
  };

  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    showToast('Booking request removed from studio queue.');
  };

  const handleAddPortfolioItem = (newItem: PortfolioItem) => {
    setPortfolioItems((prev) => [newItem, ...prev]);
    showToast(`"${newItem.title}" published to portfolio.`);
  };

  const handleDeletePortfolioItem = (id: string) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item deleted from gallery.');
  };

  const pendingBookingsCount = bookings.filter((b) => b.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#08090b] text-[#e2e4e9] font-sans antialiased selection:bg-[#c5a059] selection:text-black">
      {/* Toast alert banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#12151d] border border-[#c5a059] text-white px-4 py-3 rounded-sm shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300 text-xs">
          <Check className="w-4 h-4 text-[#c5a059]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Sticky Navigation Bar */}
      <Navbar
        studioInfo={studioInfo}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenBooking={() => scrollToSection('booking')}
        onOpenAdmin={() => setIsAdminOpen(true)}
        pendingBookingsCount={pendingBookingsCount}
      />

      {/* 1. Hero Section */}
      <HeroSection
        onBookClick={() => scrollToSection('booking')}
        onViewPortfolio={() => scrollToSection('portfolio')}
        featuredItems={portfolioItems}
        onOpenLightbox={(item) => setSelectedLightboxItem(item)}
      />

      {/* 2. About the Artist Section */}
      <AboutArtistSection
        onBookWithArtist={handleBookWithArtist}
      />

      {/* 3. Tattoo Services Section (12 Services) */}
      <ServicesSection
        services={services}
        onBookService={handleOpenBooking}
      />

      {/* 4. Portfolio Gallery Section (with Lightbox) */}
      <PortfolioSection
        portfolioItems={portfolioItems}
        selectedLightboxItem={selectedLightboxItem}
        onOpenLightbox={(item) => setSelectedLightboxItem(item)}
        onCloseLightbox={() => setSelectedLightboxItem(null)}
        onBookPiece={handleBookPortfolioPiece}
      />

      {/* 4b. Studio in Action: Video Theater & Technique Showcase */}
      <StudioVideoShowcase
        onBookConsultation={(note) => {
          if (note) setPrefilledNotes(note);
          scrollToSection('booking');
        }}
        whatsappNumber={studioInfo.whatsapp}
      />

      {/* 5. Tattoo Styles Guide Section */}
      <TattooStylesSection
        onSelectStyleForBooking={(styleName) => {
          setPrefilledStyle(styleName);
          scrollToSection('booking');
        }}
      />

      {/* 6. Booking System Section */}
      <BookingSection
        onNewBookingSubmit={handleNewBookingSubmit}
        allBookings={bookings}
        prefilledStyle={prefilledStyle}
        prefilledNotes={prefilledNotes}
        prefilledPlacement={prefilledPlacement}
      />

      {/* 7. Clinical Aftercare Guide Section */}
      <AftercareSection />

      {/* 8. Testimonials Section */}
      <TestimonialsSection
        testimonials={testimonials}
      />

      {/* 9. Contact & Atelier Section */}
      <ContactSection
        studioInfo={studioInfo}
      />

      {/* Footer */}
      <Footer
        studioInfo={studioInfo}
        onNavigate={scrollToSection}
        onOpenBooking={() => scrollToSection('booking')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Studio Owner / Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onDeleteBooking={handleDeleteBooking}
        portfolioItems={portfolioItems}
        onAddPortfolioItem={handleAddPortfolioItem}
        onDeletePortfolioItem={handleDeletePortfolioItem}
        services={services}
        studioInfo={studioInfo}
        onUpdateStudioInfo={setStudioInfo}
      />

      {/* Floating Quick Action Buttons */}
      <FloatingWhatsApp whatsappNumber={studioInfo.whatsapp} />

      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2">
        <button
          onClick={() => scrollToSection('booking')}
          className="bg-[#c5a059] hover:bg-[#dfba73] text-black p-3.5 rounded-full shadow-[0_0_20px_rgba(197,160,89,0.4)] hover:scale-105 transition-all flex items-center justify-center cursor-pointer"
          title="Book Consultation"
        >
          <Calendar className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
