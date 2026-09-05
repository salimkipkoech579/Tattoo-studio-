import React, { useState } from 'react';
import {
  Play,
  ExternalLink,
  MessageSquare,
  Clock,
  Sparkles,
  Shield,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Flame,
  Film,
  Video,
  ChevronLeft,
  ChevronRight,
  Layers,
  Youtube,
  Tv,
  Square,
  Volume2,
} from 'lucide-react';
import { STUDIO_VIDEOS, StudioVideoItem } from '../data/videoData';

interface StudioVideoShowcaseProps {
  onBookConsultation: (prefillNote?: string) => void;
  whatsappNumber?: string;
}

export const StudioVideoShowcase: React.FC<StudioVideoShowcaseProps> = ({
  onBookConsultation,
  whatsappNumber = '+44 7490 186826',
}) => {
  const [activeVideoId, setActiveVideoId] = useState<string>(STUDIO_VIDEOS[0].id);
  const [filterCategory, setFilterCategory] = useState<'all' | 'masterclass' | 'session' | 'shorts'>('all');
  const [copied, setCopied] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Autoplay disabled by default

  const cleanWhatsappDigits = whatsappNumber.replace(/\D/g, '');

  const activeVideo = STUDIO_VIDEOS.find((v) => v.id === activeVideoId) || STUDIO_VIDEOS[0];
  const activeIndex = STUDIO_VIDEOS.findIndex((v) => v.id === activeVideo.id);

  const filteredVideos = STUDIO_VIDEOS.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  const handleSelectVideo = (video: StudioVideoItem) => {
    setIsPlaying(false); // Stop playback and prevent autoplay on switch
    setIsIframeLoaded(false);
    setActiveVideoId(video.id);
  };

  const handleNextVideo = () => {
    const nextIndex = (activeIndex + 1) % STUDIO_VIDEOS.length;
    handleSelectVideo(STUDIO_VIDEOS[nextIndex]);
  };

  const handlePrevVideo = () => {
    const prevIndex = (activeIndex - 1 + STUDIO_VIDEOS.length) % STUDIO_VIDEOS.length;
    handleSelectVideo(STUDIO_VIDEOS[prevIndex]);
  };

  const handleCopyWhatsapp = () => {
    navigator.clipboard.writeText(whatsappNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const activeWhatsappUrl = `https://wa.me/${cleanWhatsappDigits}?text=${encodeURIComponent(
    activeVideo.suggestedMessage
  )}`;

  return (
    <section
      id="studio-video"
      className="py-20 sm:py-28 bg-[#080a0e] relative border-b border-white/5 overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/6 -left-40 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/6 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>Studio Video Theater & Technique Reels</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            BEHIND THE NEEDLE • LIVE ATELIER SESSIONS
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Watch our resident artists and industry documentary features in action: from our London £500 all-day session vlog to in-depth single-needle fine line masterclasses, 3D realism, and sacred geometric designs.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20'
                  : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              All Studio Videos ({STUDIO_VIDEOS.length})
            </button>
            <button
              onClick={() => setFilterCategory('masterclass')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filterCategory === 'masterclass'
                  ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20'
                  : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              Masterclass Documentaries (1)
            </button>
            <button
              onClick={() => setFilterCategory('session')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filterCategory === 'session'
                  ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20'
                  : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              London Day Vlogs (1)
            </button>
            <button
              onClick={() => setFilterCategory('shorts')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filterCategory === 'shorts'
                  ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20'
                  : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              Technique Shorts & Flash (4)
            </button>
          </div>
        </div>

        {/* Main Cinema Theater Stage */}
        <div className="bg-[#0b0e14] border border-white/10 rounded-sm overflow-hidden shadow-2xl mb-12">
          {/* Top Video Stage Toolbar */}
          <div className="px-4 sm:px-6 py-3 border-b border-white/10 bg-black/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white uppercase tracking-wider">
                Now Playing: <span className="text-[#c5a059]">{activeVideo.categoryLabel}</span>
              </span>
              <span className="hidden sm:inline-block text-neutral-500">•</span>
              <span className="hidden sm:inline-block text-neutral-400 font-mono">
                {activeVideo.duration}
              </span>
            </div>

            {/* Navigation Switchers & External link */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevVideo}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Previous Video"
                aria-label="Previous Video"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-neutral-400 font-mono text-[11px] px-1">
                {activeIndex + 1} of {STUDIO_VIDEOS.length}
              </span>
              <button
                onClick={handleNextVideo}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Next Video"
                aria-label="Next Video"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-4 bg-white/20 mx-1" />

              {isPlaying && (
                <button
                  onClick={() => setIsPlaying(false)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 transition-colors text-xs font-semibold cursor-pointer"
                  title="Stop playback"
                >
                  <Square className="w-3 h-3 fill-current" />
                  <span>Stop Video</span>
                </button>
              )}

              <a
                href={activeVideo.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 hover:bg-[#c5a059]/20 hover:text-[#c5a059] text-neutral-300 transition-colors font-medium cursor-pointer"
              >
                {activeVideo.platform === 'tiktok' ? (
                  <>
                    <Flame className="w-3.5 h-3.5 text-pink-400" />
                    <span>Open on TikTok</span>
                  </>
                ) : (
                  <>
                    <Youtube className="w-3.5 h-3.5 text-red-500" />
                    <span>Open on YouTube</span>
                  </>
                )}
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
            </div>
          </div>

          {/* Active Theater Layout: Player on Left / In-depth Monograph & WhatsApp CTA on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Player Container */}
            <div
              className={`lg:col-span-7 bg-black flex items-center justify-center p-3 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/10 ${
                activeVideo.aspectRatio === '9/16' ? 'min-h-[500px] sm:min-h-[600px]' : 'min-h-[380px] sm:min-h-[480px]'
              }`}
            >
              {!isPlaying ? (
                /* Poster Thumbnail with Explicit Click-to-Play */
                <div
                  onClick={() => setIsPlaying(true)}
                  className={`w-full group relative overflow-hidden rounded-md border border-white/15 shadow-2xl bg-black cursor-pointer flex flex-col justify-between ${
                    activeVideo.aspectRatio === '16/9' ? 'aspect-video' : 'max-w-[320px] sm:max-w-[360px] aspect-[9/16] rounded-xl'
                  }`}
                >
                  <img
                    src={activeVideo.thumbnail}
                    alt={activeVideo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-75 group-hover:opacity-90 absolute inset-0 z-0"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-10" />

                  {/* Top Bar on Poster */}
                  <div className="relative z-20 p-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-black/80 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      {activeVideo.platform === 'tiktok' ? (
                        <Flame className="w-3.5 h-3.5 text-pink-400" />
                      ) : (
                        <Youtube className="w-3.5 h-3.5 text-red-500" />
                      )}
                      <span>{activeVideo.categoryLabel}</span>
                    </span>

                    <span className="px-2 py-0.5 rounded bg-black/80 border border-white/10 text-neutral-300 text-xs font-mono">
                      {activeVideo.duration}
                    </span>
                  </div>

                  {/* Central Gold Play Button */}
                  <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#c5a059] group-hover:bg-[#d8b368] text-black flex items-center justify-center shadow-2xl shadow-[#c5a059]/40 group-hover:scale-110 transition-transform duration-300 ring-8 ring-[#c5a059]/20 mb-4">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                    </div>

                    <div className="bg-black/70 backdrop-blur-sm border border-white/15 px-4 py-2 rounded-sm max-w-[320px]">
                      <span className="text-white text-sm font-bold block group-hover:text-[#c5a059] transition-colors">
                        Click to Play Video
                      </span>
                      <span className="text-[11px] text-neutral-400 block mt-0.5">
                        Autoplay is disabled • You have full audio control
                      </span>
                    </div>
                  </div>

                  {/* Bottom details on poster */}
                  <div className="relative z-20 p-4 text-left border-t border-white/10 bg-black/60 backdrop-blur-xs">
                    <div className="text-xs text-neutral-300 font-medium line-clamp-1">
                      {activeVideo.title}
                    </div>
                    <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                      Channel: {activeVideo.author} • Click to start
                    </div>
                  </div>
                </div>
              ) : activeVideo.aspectRatio === '16/9' ? (
                /* Widescreen 16:9 Video Box (Featured Inked Fine Line Masterclass) */
                <div className="w-full relative aspect-video rounded-md overflow-hidden border border-white/15 shadow-2xl bg-black">
                  <iframe
                    src={`${activeVideo.embedUrl}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    onLoad={() => setIsIframeLoaded(true)}
                  />
                  {!isIframeLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090b10] z-0 p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mb-3 animate-pulse">
                        <Video className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-white font-medium">Loading Video Stream...</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Vertical 9:16 Reel Player (Shorts & TikTok Session) */
                <div className="w-full max-w-[320px] sm:max-w-[360px] relative aspect-[9/16] rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black">
                  <iframe
                    src={activeVideo.embedUrl}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0 absolute inset-0 z-10"
                    onLoad={() => setIsIframeLoaded(true)}
                  />
                  {!isIframeLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090b10] z-0 p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mb-3 animate-pulse">
                        <Video className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-white font-medium">Loading Atelier Reel...</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Video Dossier & WhatsApp Direct Booking */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#0e1117]/60">
              <div className="space-y-4">
                {/* Style & Author Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059] text-[11px] font-semibold uppercase tracking-wider">
                    {activeVideo.styleCategory}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300 text-[11px] font-mono">
                    By {activeVideo.author}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white leading-tight">
                  {activeVideo.title}
                </h3>

                <p className="text-xs text-neutral-400 font-medium">
                  {activeVideo.subtitle}
                </p>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed border-t border-white/10 pt-4">
                  {activeVideo.description}
                </p>

                {/* Key Technique Takeaways */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Artistic & Technical Takeaways:
                  </div>
                  {activeVideo.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct WhatsApp Callout Card for This Exact Video */}
              <div className="mt-8 p-4 rounded-sm bg-gradient-to-br from-emerald-950/40 to-[#0a120e] border border-emerald-500/35 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4" />
                    <span>Direct WhatsApp Inquiries</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                    {whatsappNumber}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-normal">
                  Interested in a piece inspired by this video? Message our London atelier directly for instant sizing advice and date availability.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <a
                    id="active-video-whatsapp-btn"
                    href={activeWhatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wider uppercase py-2.5 px-4 rounded-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer text-center"
                    title={`Chat on WhatsApp about ${activeVideo.title}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onBookConsultation(`Inspired by video: ${activeVideo.title}`)}
                    className="flex-1 bg-white/5 hover:bg-[#c5a059] text-white hover:text-black border border-white/15 hover:border-[#c5a059] font-semibold text-xs tracking-wider uppercase py-2.5 px-4 rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Reel Playlist Grid (All 6 Videos) */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              <Layers className="w-4 h-4 text-[#c5a059]" />
              <span>Select from Studio Video Library ({filteredVideos.length} Available)</span>
            </div>
            <span className="text-xs text-neutral-500">
              Click any card to play in theater
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredVideos.map((video) => {
              const isSelected = video.id === activeVideo.id;
              return (
                <div
                  key={video.id}
                  id={`video-card-${video.id}`}
                  onClick={() => handleSelectVideo(video)}
                  className={`group relative rounded-sm border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#121620] border-[#c5a059] shadow-xl shadow-[#c5a059]/10 ring-1 ring-[#c5a059]/50'
                      : 'bg-[#0d1017] border-white/10 hover:border-white/25 hover:bg-[#10141d]'
                  }`}
                >
                  {/* Card Thumbnail Box with Play Overlay */}
                  <div className="relative aspect-video w-full bg-black/80 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Play Badge */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        isSelected ? 'scale-100 opacity-100' : 'group-hover:scale-110 opacity-90'
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                          isSelected
                            ? 'bg-[#c5a059] text-black ring-4 ring-[#c5a059]/30'
                            : 'bg-black/70 text-white group-hover:bg-[#c5a059] group-hover:text-black'
                        }`}
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Platform & Duration Tags */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-black/80 border border-white/15 text-white flex items-center gap-1">
                        {video.platform === 'tiktok' ? (
                          <Flame className="w-3 h-3 text-pink-400" />
                        ) : (
                          <Youtube className="w-3 h-3 text-red-500" />
                        )}
                        <span>{video.platform === 'tiktok' ? 'TikTok' : video.aspectRatio === '9/16' ? 'Shorts' : 'YouTube'}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-neutral-300 border border-white/10 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-[#c5a059]" />
                      <span>{video.duration}</span>
                    </div>

                    {/* Active playing indicator badge */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        <span>Active</span>
                      </div>
                    )}
                  </div>

                  {/* Card Information Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5 font-mono">
                        <span className="text-[#c5a059]">{video.styleCategory}</span>
                        <span>{video.author}</span>
                      </div>

                      <h4 className="font-heading text-sm font-bold text-white group-hover:text-[#c5a059] transition-colors line-clamp-2 leading-snug">
                        {video.title}
                      </h4>

                      <p className="mt-2 text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>

                    {/* Quick WhatsApp Link per video */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <a
                        href={`https://wa.me/${cleanWhatsappDigits}?text=${encodeURIComponent(
                          video.suggestedMessage
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 font-mono"
                        title="Chat about this video on WhatsApp"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-400" />
                        <span>Inquire on WhatsApp</span>
                      </a>

                      <span className="text-[10px] text-neutral-500 font-mono">
                        {video.categoryLabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
