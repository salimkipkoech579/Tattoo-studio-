import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Clock,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  FileText,
  Search,
  Image as ImageIcon,
  User,
  Mail,
  Phone,
  DollarSign,
  Info,
  X,
  MessageSquare,
} from 'lucide-react';
import { BookingRequest, TattooStyleCategory } from '../types';

interface BookingSectionProps {
  onNewBookingSubmit: (booking: BookingRequest) => void;
  allBookings: BookingRequest[];
  prefilledStyle?: string;
  prefilledNotes?: string;
  prefilledPlacement?: string;
}

const BODY_PLACEMENTS = [
  'Forearm (Inner/Outer)',
  'Upper Arm / Bicep',
  'Full Sleeve',
  'Chest / Collarbone',
  'Ribcage / Side',
  'Back (Upper / Full)',
  'Spine',
  'Thigh',
  'Calf / Shin',
  'Hand / Wrist',
  'Ankle / Foot',
  'Neck / Behind Ear',
];

const TATTOO_STYLES: TattooStyleCategory[] = [
  'Black & Grey',
  'Fine Line',
  'Realism',
  'Traditional',
  'Neo-Traditional',
  'Japanese',
  'Lettering',
  'Color',
  'Minimalist',
  'Cover-Up',
  'Sleeve',
  'Custom Designs',
];

const SIZE_OPTIONS = [
  'Micro / Tiny (Under 2" inches)',
  'Small (2" – 4" inches)',
  'Medium (4" – 6" inches)',
  'Large (6" – 10" inches)',
  'Half Sleeve / Major Panel',
  'Full Sleeve / Full Backpiece',
];

const BUDGET_OPTIONS = [
  '£150 – £300 (Micro / Fine Line Flash)',
  '£300 – £600 (Single-Session Medium)',
  '£600 – £1,200 (Half-Day Detailed Piece)',
  '£1,200 – £2,500 (Full-Day Intensive)',
  '£2,500+ (Multi-Session Monumental Sleeve)',
];

const TIME_OPTIONS = [
  'Morning (11:00 AM – 2:00 PM)',
  'Afternoon (2:00 PM – 5:00 PM)',
  'Evening (5:00 PM – 8:00 PM)',
  'Flexible / Any Available Slot',
];

export const BookingSection: React.FC<BookingSectionProps> = ({
  onNewBookingSubmit,
  allBookings,
  prefilledStyle,
  prefilledNotes,
  prefilledPlacement,
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'status'>('form');

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tattooStyle, setTattooStyle] = useState<TattooStyleCategory>('Black & Grey');
  const [placement, setPlacement] = useState('Forearm (Inner/Outer)');
  const [customPlacement, setCustomPlacement] = useState('');
  const [approximateSize, setApproximateSize] = useState(SIZE_OPTIONS[1]);
  const [colorType, setColorType] = useState<'Black & Grey' | 'Color' | 'Undecided'>('Black & Grey');
  const [budgetRange, setBudgetRange] = useState(BUDGET_OPTIONS[1]);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState(TIME_OPTIONS[1]);
  const [description, setDescription] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [artistPreference, setArtistPreference] = useState('Any / Best Suited Artist');
  const [referenceImageUrl, setReferenceImageUrl] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);

  // Status Lookup state
  const [searchCode, setSearchCode] = useState('');
  const [searchedBooking, setSearchedBooking] = useState<BookingRequest | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // React to prefilled inputs from service or portfolio clicks
  useEffect(() => {
    if (prefilledStyle) {
      const match = TATTOO_STYLES.find(
        (s) => s.toLowerCase() === prefilledStyle.toLowerCase()
      );
      if (match) setTattooStyle(match);
    }
    if (prefilledNotes) {
      setDescription((prev) => (prev ? `${prev}\n\n${prefilledNotes}` : prefilledNotes));
    }
    if (prefilledPlacement) {
      setPlacement(prefilledPlacement);
    }
  }, [prefilledStyle, prefilledNotes, prefilledPlacement]);

  // Handle image upload from file or drag
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image must be less than 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setReferenceImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!phone.trim() || phone.trim().length < 7) {
      newErrors.phone = 'Valid phone number is required';
    }
    if (!preferredDate) {
      newErrors.preferredDate = 'Please specify a preferred consultation date';
    }
    if (!description.trim() || description.trim().length < 15) {
      newErrors.description = 'Please describe your tattoo idea in at least 15 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Generate reference code
    const randomCode = `INH-${Math.floor(10000 + Math.random() * 90000)}`;

    const finalPlacement = placement === 'Other (Specify Below)' && customPlacement ? customPlacement : placement;

    const newBooking: BookingRequest = {
      id: `book-${Date.now()}`,
      referenceCode: randomCode,
      fullName,
      email,
      phone,
      tattooStyle,
      placement: finalPlacement,
      approximateSize,
      colorType,
      budgetRange,
      preferredDate,
      preferredTime,
      description,
      referenceImageUrl: referenceImageUrl || 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=400&q=80',
      additionalNotes,
      artistPreference,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      onNewBookingSubmit(newBooking);
      setSubmittedBooking(newBooking);
      setIsSubmitting(false);
    }, 600);
  };

  const handleLookupBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleaned = searchCode.trim().toUpperCase();
    const found = allBookings.find((b) => b.referenceCode.toUpperCase() === cleaned);
    setSearchedBooking(found || null);
  };

  return (
    <section id="booking" className="py-24 bg-[#090b0e] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation & Session Booking</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            COMMENCE YOUR PIECE
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Fill out the consultation dossier below. We review placement, anatomical flow, and design complexity before confirming your appointment.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs">
            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
            <span>Need quick preliminary advice? Chat with our studio on WhatsApp:</span>
            <a
              href="https://wa.me/447490186826?text=Hello%20Ink%20Haven%20London%2C%20I%20have%20a%20question%20about%20booking%20a%20tattoo."
              target="_blank"
              rel="noreferrer"
              className="font-bold underline text-white hover:text-emerald-300 font-mono ml-0.5"
            >
              +44 7490 186826
            </a>
          </div>

          {/* Tab Switcher: New Booking vs. Track Existing */}
          <div className="inline-flex p-1 bg-[#10131a] border border-white/10 rounded-sm mt-8">
            <button
              id="tab-new-booking-btn"
              onClick={() => setActiveTab('form')}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-[#c5a059] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              New Booking Request
            </button>
            <button
              id="tab-track-booking-btn"
              onClick={() => setActiveTab('status')}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'status'
                  ? 'bg-[#c5a059] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Existing Booking</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Booking Form */}
        {activeTab === 'form' && (
          <div className="max-w-4xl mx-auto">
            {submittedBooking ? (
              /* Success Confirmation Card */
              <div
                id="booking-confirmation-box"
                className="bg-[#0e1116] border border-[#c5a059]/40 rounded-sm p-8 sm:p-12 shadow-2xl animate-in zoom-in-95 duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#c5a059]/15 border border-[#c5a059] flex items-center justify-center mx-auto mb-6 text-[#c5a059]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold">
                  Consultation Request Received
                </span>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
                  THANK YOU, {submittedBooking.fullName.toUpperCase()}
                </h3>

                <div className="inline-block bg-[#14171f] border border-white/10 px-4 py-2 rounded-sm mb-6">
                  <span className="text-xs text-neutral-400 mr-2">Your Booking Reference Code:</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#c5a059]">
                    {submittedBooking.referenceCode}
                  </span>
                </div>

                <div className="max-w-xl mx-auto text-neutral-300 text-sm leading-relaxed space-y-3 mb-8 text-left bg-black/30 p-6 rounded-sm border border-white/5">
                  <div className="flex items-center gap-2 font-semibold text-white text-xs uppercase tracking-wider">
                    <Info className="w-4 h-4 text-[#c5a059]" />
                    <span>What Happens Next?</span>
                  </div>
                  <p>
                    1. <strong className="text-white">Artist Review:</strong> Our senior artist team will analyze your concept, reference images, and anatomy placement within <strong>24 to 48 hours</strong>.
                  </p>
                  <p>
                    2. <strong className="text-white">Email & Phone Follow-up:</strong> We will contact you at <span className="text-[#c5a059] underline">{submittedBooking.email}</span> with exact session duration, artist availability, and custom pricing quotation.
                  </p>
                  <p>
                    3. <strong className="text-white">Deposit & Date Lock:</strong> Once approved, a $100 non-refundable deposit secures your calendar spot and initiates your digital design preview.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmittedBooking(null);
                      setFullName('');
                      setDescription('');
                    }}
                    className="bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-sm transition-all cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                  <button
                    onClick={() => {
                      setSearchCode(submittedBooking.referenceCode);
                      setSearchedBooking(submittedBooking);
                      setHasSearched(true);
                      setActiveTab('status');
                    }}
                    className="border border-white/20 hover:border-white text-white font-medium text-xs tracking-wider uppercase px-6 py-3 rounded-sm transition-all"
                  >
                    View Status Tracking
                  </button>
                </div>
              </div>
            ) : (
              /* Actual Form */
              <form
                id="tattoo-booking-form"
                onSubmit={handleSubmit}
                className="bg-[#0e1116] border border-white/10 rounded-sm p-6 sm:p-10 shadow-2xl space-y-8"
              >
                {/* Notice banner */}
                <div className="bg-[#12151c] border-l-2 border-[#c5a059] p-4 text-xs text-neutral-300 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Custom Consultation Policy:</span> Every tattoo is custom-drawn. Initial in-person or video consultations are complimentary with your appointment booking.
                  </div>
                </div>

                {/* Section 1: Contact Details */}
                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#c5a059] flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    <span>1. Client Information</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="booking-fullname-input"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Victor Thorne"
                        className={`w-full px-3.5 py-2.5 bg-[#090b0e] border ${
                          errors.fullName ? 'border-red-500' : 'border-white/10'
                        } rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059] transition-colors`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="booking-email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. victor@example.com"
                        className={`w-full px-3.5 py-2.5 bg-[#090b0e] border ${
                          errors.email ? 'border-red-500' : 'border-white/10'
                        } rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059] transition-colors`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="booking-phone-input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 019-2834"
                        className={`w-full px-3.5 py-2.5 bg-[#090b0e] border ${
                          errors.phone ? 'border-red-500' : 'border-white/10'
                        } rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059] transition-colors`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2: Tattoo Concept & Style */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#c5a059] flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" />
                    <span>2. Tattoo Concept & Aesthetics</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Tattoo Style */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Tattoo Style *
                      </label>
                      <select
                        id="booking-style-select"
                        value={tattooStyle}
                        onChange={(e) => setTattooStyle(e.target.value as TattooStyleCategory)}
                        className="w-full px-3.5 py-2.5 bg-[#090b0e] border border-white/10 rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059]"
                      >
                        {TATTOO_STYLES.map((style) => (
                          <option key={style} value={style}>
                            {style}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Color or Black & Grey */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Pigment Preference *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Black & Grey', 'Color', 'Undecided'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setColorType(type)}
                            className={`py-2 px-2 text-center text-xs font-medium rounded-sm border transition-all ${
                              colorType === type
                                ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold'
                                : 'bg-[#090b0e] text-neutral-300 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Body Placement */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Desired Body Placement *
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {BODY_PLACEMENTS.map((place) => (
                        <button
                          key={place}
                          type="button"
                          onClick={() => setPlacement(place)}
                          className={`text-[11px] px-3 py-1.5 rounded-sm border transition-all ${
                            placement === place
                              ? 'bg-[#c5a059] text-black border-[#c5a059] font-semibold'
                              : 'bg-[#090b0e] text-neutral-300 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {place}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Approximate Tattoo Size *
                      </label>
                      <select
                        id="booking-size-select"
                        value={approximateSize}
                        onChange={(e) => setApproximateSize(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#090b0e] border border-white/10 rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059]"
                      >
                        {SIZE_OPTIONS.map((sz) => (
                          <option key={sz} value={sz}>
                            {sz}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Anticipated Budget Range *
                      </label>
                      <select
                        id="booking-budget-select"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#090b0e] border border-white/10 rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059]"
                      >
                        {BUDGET_OPTIONS.map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Scheduling Preferences */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#c5a059] flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>3. Artist & Scheduling Preferences</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Artist Preference
                      </label>
                      <select
                        id="booking-artist-select"
                        value={artistPreference}
                        onChange={(e) => setArtistPreference(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#090b0e] border border-white/10 rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059]"
                      >
                        <option value="Any / Best Suited Artist">Any / Best Suited Artist</option>
                        <option value="Marcus Thorne (Founder / Realism)">Marcus Thorne (Realism, Black & Grey)</option>
                        <option value="Elena Rostova (Fine Line & Botanicals)">Elena Rostova (Fine Line, Micro-Detail)</option>
                        <option value="Kenji Sato (Japanese Irezumi)">Kenji Sato (Irezumi, Neo-Traditional)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        id="booking-date-input"
                        value={preferredDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className={`w-full px-3.5 py-2.5 bg-[#090b0e] border ${
                          errors.preferredDate ? 'border-red-500' : 'border-white/10'
                        } rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059]`}
                      />
                      {errors.preferredDate && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.preferredDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Preferred Time Window *
                      </label>
                      <select
                        id="booking-time-select"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#090b0e] border border-white/10 rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059]"
                      >
                        {TIME_OPTIONS.map((tm) => (
                          <option key={tm} value={tm}>
                            {tm}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 4: Narrative Description & Reference Image */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#c5a059] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>4. Narrative & Reference Assets</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Tattoo Description & Meaning *
                    </label>
                    <textarea
                      rows={4}
                      id="booking-description-textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the story, key focal elements, mood, contrast, and any specific symbols you envision..."
                      className={`w-full p-3 bg-[#090b0e] border ${
                        errors.description ? 'border-red-500' : 'border-white/10'
                      } rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059] leading-relaxed`}
                    />
                    {errors.description && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.description}</p>
                    )}
                  </div>

                  {/* Reference Image Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Upload Reference Image or Moodboard Photo
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-sm bg-[#090b0e] border border-dashed border-white/15">
                      <div className="shrink-0">
                        {imagePreview ? (
                          <div className="relative w-24 h-24 rounded overflow-hidden border border-[#c5a059]">
                            <img
                              src={imagePreview}
                              alt="Reference Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview('');
                                setReferenceImageUrl('');
                              }}
                              className="absolute top-1 right-1 p-1 bg-black/80 rounded-full text-white hover:text-red-400"
                              title="Remove image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500">
                            <ImageIcon className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 text-center sm:text-left space-y-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="reference-file-upload"
                        />
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-sm text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5 text-[#c5a059]" />
                            <span>Select Image File</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const sampleUrl = 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=600&q=80';
                              setImagePreview(sampleUrl);
                              setReferenceImageUrl(sampleUrl);
                            }}
                            className="px-3 py-2 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-sm text-xs transition-colors"
                          >
                            Use Sample Reference
                          </button>
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          Supports JPG, PNG, WEBP up to 5MB. Sketches, photos, or existing tattoos you admire.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Additional Notes / Skin Considerations / Cover-Up Details (Optional)
                    </label>
                    <textarea
                      rows={2}
                      id="booking-notes-textarea"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="e.g. Existing scars, previous tattoos in the area, skin allergies, or travel constraints..."
                      className="w-full p-3 bg-[#090b0e] border border-white/10 rounded-sm text-white text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                {/* Submit button & Disclaimer */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <button
                    type="submit"
                    id="submit-booking-request-btn"
                    disabled={isSubmitting}
                    className="w-full bg-[#c5a059] hover:bg-[#dfba73] disabled:opacity-50 text-black font-bold text-xs tracking-wider uppercase py-4 rounded-sm transition-all shadow-[0_0_25px_rgba(197,160,89,0.2)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Securing Consultation Request...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submit Booking Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-neutral-400 leading-relaxed">
                    By submitting, you agree to Ink Haven’s booking policy. Consultations are strictly 18+ (ID required at studio). Appointments are finalized upon artist review.
                  </p>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Track Existing Booking Status */}
        {activeTab === 'status' && (
          <div className="max-w-2xl mx-auto bg-[#0e1116] border border-white/10 rounded-sm p-6 sm:p-10 shadow-2xl">
            <h3 className="font-heading text-2xl font-bold text-white mb-2 text-center">
              TRACK CONSULTATION STATUS
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm text-center mb-6">
              Enter your booking reference code (e.g. <span className="text-[#c5a059] font-mono">INH-84920</span>) to view real-time studio review updates.
            </p>

            <form onSubmit={handleLookupBooking} className="flex gap-2 mb-8">
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter Reference Code (e.g. INH-84920)..."
                className="flex-1 px-4 py-3 bg-[#090b0e] border border-white/15 rounded-sm text-white text-xs font-mono uppercase focus:outline-none focus:border-[#c5a059]"
              />
              <button
                type="submit"
                className="bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-sm transition-colors cursor-pointer"
              >
                Track
              </button>
            </form>

            {hasSearched && (
              <div>
                {searchedBooking ? (
                  <div className="p-6 bg-[#12151d] border border-white/10 rounded-sm space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-neutral-400">Reference</span>
                        <div className="font-mono text-base font-bold text-white">{searchedBooking.referenceCode}</div>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-neutral-400 block text-right">Status</span>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                            searchedBooking.status === 'Confirmed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : searchedBooking.status === 'Pending'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : searchedBooking.status === 'Completed'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                              : 'bg-red-500/20 text-red-400 border border-red-500/40'
                          }`}
                        >
                          {searchedBooking.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-neutral-500">Client Name:</span>
                        <p className="font-semibold text-white">{searchedBooking.fullName}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500">Style & Placement:</span>
                        <p className="font-semibold text-white">{searchedBooking.tattooStyle} • {searchedBooking.placement}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500">Preferred Date:</span>
                        <p className="font-semibold text-white">{searchedBooking.preferredDate} ({searchedBooking.preferredTime.split(' ')[0]})</p>
                      </div>
                      <div>
                        <span className="text-neutral-500">Artist:</span>
                        <p className="font-semibold text-white">{searchedBooking.artistPreference || 'Senior Guild'}</p>
                      </div>
                    </div>

                    {searchedBooking.adminNotes && (
                      <div className="p-3 bg-black/40 rounded border border-white/5 text-xs text-neutral-300">
                        <span className="text-[#c5a059] font-semibold block mb-1">Studio Note:</span>
                        {searchedBooking.adminNotes}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 bg-[#12151d] border border-white/10 rounded-sm text-center text-xs text-neutral-400">
                    No booking record found for code <span className="text-white font-mono">{searchCode}</span>. Please verify your reference number or contact the studio directly.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
