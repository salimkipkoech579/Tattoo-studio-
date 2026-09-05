import React, { useState } from 'react';
import { Award, CheckCircle2, Instagram, Facebook, Sparkles, Quote, ShieldCheck, Heart } from 'lucide-react';
import { ARTISTS_DATA } from '../data/initialData';
import { ArtistProfile } from '../types';

interface AboutArtistSectionProps {
  onBookWithArtist: (artistName: string) => void;
}

export const AboutArtistSection: React.FC<AboutArtistSectionProps> = ({ onBookWithArtist }) => {
  const [selectedArtistId, setSelectedArtistId] = useState<string>(ARTISTS_DATA[0].id);

  const currentArtist = ARTISTS_DATA.find((a) => a.id === selectedArtistId) || ARTISTS_DATA[0];

  return (
    <section id="about" className="py-24 bg-[#090b0e] relative border-b border-white/5">
      {/* Background accents */}
      <div className="absolute top-12 left-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Craftsmen & Visionaries</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            MEET THE ARTISTS
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Our atelier brings together classically trained fine artists, illustrators, and medical-hygiene certified practitioners devoted to anatomical perfection.
          </p>

          {/* Artist selector tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {ARTISTS_DATA.map((artist) => (
              <button
                key={artist.id}
                id={`artist-tab-${artist.id}`}
                onClick={() => setSelectedArtistId(artist.id)}
                className={`px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 ${
                  selectedArtistId === artist.id
                    ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20'
                    : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <span>{artist.name}</span>
                <span className="opacity-75 text-[10px] hidden sm:inline">({artist.moniker})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Artist Profile Spotlight */}
        <div className="bg-[#0e1116] border border-white/10 rounded-sm p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Portrait & Badges */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-sm overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src={currentArtist.portraitUrl}
                  alt={currentArtist.name}
                  className="w-full h-[450px] object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                {/* Floating Role Pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-sm">
                  <div className="text-xs text-[#c5a059] uppercase tracking-widest font-semibold">
                    {currentArtist.role}
                  </div>
                  <div className="text-white font-heading text-lg font-bold">
                    {currentArtist.name} <span className="text-neutral-400 font-sans text-sm font-normal">{currentArtist.moniker}</span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center justify-between px-2 text-xs text-neutral-400">
                <span className="uppercase tracking-widest text-[10px] font-semibold text-neutral-500">Artist Channels</span>
                <div className="flex items-center gap-3">
                  <a
                    href={currentArtist.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-white/5 hover:bg-[#c5a059] hover:text-black text-neutral-300 transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={currentArtist.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-white/5 hover:bg-[#c5a059] hover:text-black text-neutral-300 transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Detailed Bio, Philosophy & Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-[#c5a059] text-xs font-semibold uppercase tracking-[0.25em] mb-1">
                  Artist Dossier & Philosophy
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  Crafting Permanent Legacies Through Anatomy
                </h3>
              </div>

              {/* Bio */}
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {currentArtist.bio}
              </p>

              {/* Philosophy Quote Box */}
              <div className="relative p-5 rounded-sm bg-[#13161c] border-l-2 border-[#c5a059] my-4">
                <Quote className="w-6 h-6 text-[#c5a059]/40 mb-1" />
                <p className="font-quote text-lg text-neutral-200 italic leading-relaxed">
                  “{currentArtist.philosophy}”
                </p>
                <div className="mt-2 text-xs uppercase tracking-widest text-[#c5a059] font-semibold">
                  — {currentArtist.name}
                </div>
              </div>

              {/* Specialties Tag Cloud */}
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Signature Specialties</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentArtist.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-xs text-neutral-200 font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications Checklist */}
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Verified Certifications & Licenses</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentArtist.certifications.map((cert, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-sm text-center">
                  <div className="font-heading text-xl font-bold text-white">
                    {currentArtist.experienceYears}+ Yrs
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Experience</div>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-sm text-center">
                  <div className="font-heading text-xl font-bold text-white">
                    {currentArtist.tattoosCount.toLocaleString()}+
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Tattoos Inked</div>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-sm text-center">
                  <div className="font-heading text-xl font-bold text-white">
                    {currentArtist.clientsCount.toLocaleString()}+
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Happy Clients</div>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-sm text-center">
                  <div className="font-heading text-xl font-bold text-[#c5a059]">
                    {currentArtist.rating} ★
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Guild Rating</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  id={`book-with-artist-${currentArtist.id}-btn`}
                  onClick={() => onBookWithArtist(currentArtist.name)}
                  className="w-full sm:w-auto bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-xs tracking-wider uppercase px-7 py-3 rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request Appointment With {currentArtist.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
