import React, { useState } from 'react';
import {
  X,
  Check,
  Ban,
  Clock,
  CheckCircle2,
  Calendar,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  Shield,
  Search,
  Filter,
  Users,
  Settings,
  DollarSign,
  FileText,
  Sparkles,
} from 'lucide-react';
import { BookingRequest, BookingStatus, PortfolioItem, TattooService, StudioInfo } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRequest[];
  onUpdateBookingStatus: (id: string, newStatus: BookingStatus, note?: string) => void;
  onDeleteBooking: (id: string) => void;
  portfolioItems: PortfolioItem[];
  onAddPortfolioItem: (item: PortfolioItem) => void;
  onDeletePortfolioItem: (id: string) => void;
  services: TattooService[];
  studioInfo: StudioInfo;
  onUpdateStudioInfo: (updated: StudioInfo) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onUpdateBookingStatus,
  onDeleteBooking,
  portfolioItems,
  onAddPortfolioItem,
  onDeletePortfolioItem,
  services,
  studioInfo,
  onUpdateStudioInfo,
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'portfolio' | 'services' | 'settings'>('bookings');
  const [statusFilter, setStatusFilter] = useState<'All' | BookingStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // New Portfolio Item Form state
  const [newPieceTitle, setNewPieceTitle] = useState('');
  const [newPieceStyle, setNewPieceStyle] = useState('Black & Grey');
  const [newPieceArtist, setNewPieceArtist] = useState('Marcus Thorne');
  const [newPiecePlacement, setNewPiecePlacement] = useState('Forearm');
  const [newPieceImageUrl, setNewPieceImageUrl] = useState('');
  const [newPieceDesc, setNewPieceDesc] = useState('');

  // Internal booking note editing
  const [selectedBookingForNote, setSelectedBookingForNote] = useState<BookingRequest | null>(null);
  const [noteText, setNoteText] = useState('');

  if (!isOpen) return null;

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesSearch =
      b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tattooStyle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;

  const handleCreatePortfolioPiece = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPieceTitle || !newPieceImageUrl) return;

    const newItem: PortfolioItem = {
      id: `p-${Date.now()}`,
      title: newPieceTitle,
      style: newPieceStyle as any,
      imageUrl: newPieceImageUrl,
      description: newPieceDesc || 'Original custom piece crafted at Ink Haven Atelier.',
      artist: newPieceArtist,
      placement: newPiecePlacement,
      size: 'Custom Dimensions',
      colorType: 'Black & Grey',
      date: new Date().toISOString().split('T')[0],
      featured: false,
    };

    onAddPortfolioItem(newItem);
    setNewPieceTitle('');
    setNewPieceImageUrl('');
    setNewPieceDesc('');
  };

  const handleSaveNote = () => {
    if (selectedBookingForNote) {
      onUpdateBookingStatus(selectedBookingForNote.id, selectedBookingForNote.status, noteText);
      setSelectedBookingForNote(null);
      setNoteText('');
    }
  };

  return (
    <div
      id="admin-dashboard-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="admin-dashboard-modal-panel"
        className="relative bg-[#0c0e13] border border-white/15 rounded-sm w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 bg-[#11141b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#c5a059]/15 border border-[#c5a059] flex items-center justify-center text-[#c5a059]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading text-lg font-bold text-white flex items-center gap-2">
                <span>STUDIO OWNER PORTAL</span>
                <span className="text-[10px] bg-white/10 text-neutral-300 font-sans px-2 py-0.5 rounded">
                  Admin v2.4
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Ink Haven Management Suite • Real-time consultation queue & appointments
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
            title="Close Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#0e1016] border-b border-white/10 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Consultations & Bookings</span>
            {pendingCount > 0 && (
              <span className="bg-[#c5a059] text-black text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'portfolio'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Portfolio Curator ({portfolioItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'services'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Tattoo Services ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Studio Settings</span>
          </button>
        </div>

        {/* Tab 1: Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-black/40 border border-white/10 rounded-sm">
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium">
                  Total Requests
                </span>
                <div className="font-heading text-2xl font-bold text-white mt-0.5">
                  {bookings.length}
                </div>
              </div>
              <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-sm">
                <span className="text-[11px] text-amber-400 uppercase tracking-wider font-medium">
                  Pending Review
                </span>
                <div className="font-heading text-2xl font-bold text-amber-300 mt-0.5">
                  {pendingCount}
                </div>
              </div>
              <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-sm">
                <span className="text-[11px] text-emerald-400 uppercase tracking-wider font-medium">
                  Confirmed Sessions
                </span>
                <div className="font-heading text-2xl font-bold text-emerald-300 mt-0.5">
                  {confirmedCount}
                </div>
              </div>
              <div className="p-3.5 bg-blue-950/20 border border-blue-500/30 rounded-sm">
                <span className="text-[11px] text-blue-400 uppercase tracking-wider font-medium">
                  Est. Pipeline Value
                </span>
                <div className="font-heading text-2xl font-bold text-blue-300 mt-0.5">
                  ${(bookings.length * 550).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search code, name, style..."
                  className="w-full pl-9 pr-3 py-2 bg-[#090b0e] border border-white/10 rounded-sm text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors ${
                      statusFilter === st
                        ? 'bg-[#c5a059] text-black'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table / Cards */}
            <div className="space-y-3">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#0e1117] border border-white/10 rounded-sm p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-white/20 transition-all"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 rounded">
                        {b.referenceCode}
                      </span>
                      <h4 className="font-heading text-base font-bold text-white">
                        {b.fullName}
                      </h4>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : b.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : b.status === 'Completed'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-neutral-300">
                      <div>
                        <span className="text-neutral-500 block text-[10px]">Contact</span>
                        <a href={`mailto:${b.email}`} className="text-[#c5a059] hover:underline">
                          {b.email}
                        </a>
                        <div className="text-neutral-400">{b.phone}</div>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[10px]">Style & Placement</span>
                        <div className="font-medium text-white">{b.tattooStyle} ({b.colorType})</div>
                        <div className="text-neutral-400">{b.placement} • {b.approximateSize.split('(')[0]}</div>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[10px]">Preferred Session</span>
                        <div className="font-medium text-white">{b.preferredDate}</div>
                        <div className="text-neutral-400">{b.preferredTime}</div>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[10px]">Artist / Budget</span>
                        <div className="font-medium text-white">{b.artistPreference}</div>
                        <div className="text-neutral-400">{b.budgetRange.split('(')[0]}</div>
                      </div>
                    </div>

                    {/* Narrative Description & Admin Notes */}
                    <div className="pt-2 text-xs text-neutral-300 border-t border-white/5 space-y-1">
                      <div>
                        <span className="text-neutral-500 font-semibold">Concept Description: </span>
                        <span>{b.description}</span>
                      </div>
                      {b.additionalNotes && (
                        <div>
                          <span className="text-neutral-500 font-semibold">Client Notes: </span>
                          <span className="text-neutral-400">{b.additionalNotes}</span>
                        </div>
                      )}
                      {b.adminNotes && (
                        <div className="text-[#e5c98f] bg-[#1a1610] p-2 rounded border border-[#c5a059]/20">
                          <span className="font-bold">Studio Log: </span>
                          <span>{b.adminNotes}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-row lg:flex-col items-end justify-between lg:justify-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5 shrink-0">
                    <div className="flex items-center gap-1.5">
                      {b.status !== 'Confirmed' && (
                        <button
                          onClick={() => onUpdateBookingStatus(b.id, 'Confirmed')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm text-xs font-semibold uppercase flex items-center gap-1 transition-colors"
                          title="Approve Consultation"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      )}

                      {b.status !== 'Cancelled' && (
                        <button
                          onClick={() => onUpdateBookingStatus(b.id, 'Cancelled')}
                          className="px-3 py-1.5 bg-red-950 hover:bg-red-800 text-red-300 rounded-sm text-xs font-semibold uppercase flex items-center gap-1 transition-colors"
                          title="Reject / Cancel"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>
                      )}

                      {b.status !== 'Completed' && (
                        <button
                          onClick={() => onUpdateBookingStatus(b.id, 'Completed')}
                          className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-sm text-xs font-semibold uppercase transition-colors"
                          title="Mark Session Completed"
                        >
                          Complete
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedBookingForNote(b);
                          setNoteText(b.adminNotes || '');
                        }}
                        className="text-xs text-[#c5a059] hover:underline flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Add Studio Note</span>
                      </button>
                      <button
                        onClick={() => onDeleteBooking(b.id)}
                        className="text-xs text-red-400 hover:text-red-300 p-1 hover:bg-red-500/10 rounded"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredBookings.length === 0 && (
                <div className="p-8 text-center text-xs text-neutral-400 bg-black/20 border border-white/5 rounded-sm">
                  No consultation requests found for this filter.
                </div>
              )}
            </div>

            {/* Note edit sub-modal */}
            {selectedBookingForNote && (
              <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-[#12151d] border border-[#c5a059]/40 p-6 rounded-sm max-w-md w-full space-y-4">
                  <h4 className="font-heading text-base font-bold text-white">
                    Add Note to {selectedBookingForNote.referenceCode} ({selectedBookingForNote.fullName})
                  </h4>
                  <textarea
                    rows={3}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="e.g. Stencil approved, client requested 2pm start, skin patch test complete..."
                    className="w-full p-2.5 bg-[#090b0e] border border-white/15 rounded-sm text-xs text-white focus:outline-none focus:border-[#c5a059]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedBookingForNote(null)}
                      className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveNote}
                      className="px-4 py-1.5 bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-xs rounded-sm"
                    >
                      Save Studio Note
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Portfolio Curator */}
        {activeTab === 'portfolio' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* Upload New Piece Form */}
            <form onSubmit={handleCreatePortfolioPiece} className="bg-[#12151d] border border-white/10 p-5 rounded-sm space-y-4">
              <h3 className="font-heading text-sm font-bold text-[#c5a059] flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Upload New Portfolio Piece</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1">Piece Title *</label>
                  <input
                    type="text"
                    required
                    value={newPieceTitle}
                    onChange={(e) => setNewPieceTitle(e.target.value)}
                    placeholder="e.g. Cerberus Under Moonlight"
                    className="w-full p-2 bg-[#090b0e] border border-white/15 rounded-sm text-white focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Style Category *</label>
                  <select
                    value={newPieceStyle}
                    onChange={(e) => setNewPieceStyle(e.target.value)}
                    className="w-full p-2 bg-[#090b0e] border border-white/15 rounded-sm text-white focus:border-[#c5a059]"
                  >
                    <option value="Black & Grey">Black & Grey</option>
                    <option value="Fine Line">Fine Line</option>
                    <option value="Realism">Realism</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Lettering">Lettering</option>
                    <option value="Color">Color</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Artist *</label>
                  <select
                    value={newPieceArtist}
                    onChange={(e) => setNewPieceArtist(e.target.value)}
                    className="w-full p-2 bg-[#090b0e] border border-white/15 rounded-sm text-white focus:border-[#c5a059]"
                  >
                    <option value="Marcus Thorne">Marcus Thorne</option>
                    <option value="Elena Rostova">Elena Rostova</option>
                    <option value="Kenji Sato">Kenji Sato</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-400 mb-1">Image URL *</label>
                  <input
                    type="url"
                    required
                    value={newPieceImageUrl}
                    onChange={(e) => setNewPieceImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2 bg-[#090b0e] border border-white/15 rounded-sm text-white focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Body Placement</label>
                  <input
                    type="text"
                    value={newPiecePlacement}
                    onChange={(e) => setNewPiecePlacement(e.target.value)}
                    placeholder="e.g. Outer Forearm"
                    className="w-full p-2 bg-[#090b0e] border border-white/15 rounded-sm text-white focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setNewPieceImageUrl('https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80');
                    setNewPieceTitle('Dark Renaissance Skull');
                  }}
                  className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
                >
                  Fill Sample
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#c5a059] hover:bg-[#dfba73] text-black font-semibold text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish to Gallery</span>
                </button>
              </div>
            </form>

            {/* Existing Pieces List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {portfolioItems.map((item) => (
                <div key={item.id} className="relative rounded-sm overflow-hidden bg-[#12151d] border border-white/10 group">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover" />
                  <div className="p-2.5">
                    <span className="text-[10px] text-[#c5a059] uppercase font-bold block">{item.style}</span>
                    <h5 className="text-xs font-semibold text-white truncate">{item.title}</h5>
                    <span className="text-[10px] text-neutral-400 block">{item.artist}</span>
                  </div>
                  <button
                    onClick={() => onDeletePortfolioItem(item.id)}
                    className="absolute top-2 right-2 p-1.5 bg-black/80 hover:bg-red-600 text-white rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Piece"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Tattoo Services Overview */}
        {activeTab === 'services' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="text-xs text-neutral-400 mb-2">
              Viewing all 12 active studio service tiers. These services are linked directly with online consultation bookings.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {services.map((serv) => (
                <div key={serv.id} className="p-4 bg-[#12151d] border border-white/10 rounded-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#c5a059] font-bold">
                      {serv.styleTag}
                    </span>
                    <span className="text-xs font-semibold text-white">{serv.startingPrice}</span>
                  </div>
                  <h4 className="font-heading text-sm font-bold text-white">{serv.title}</h4>
                  <p className="text-xs text-neutral-400 line-clamp-2">{serv.shortDesc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Studio Settings */}
        {activeTab === 'settings' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 max-w-2xl">
            <h3 className="font-heading text-base font-bold text-white">Studio Contact & Opening Hours</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Studio Address</label>
                <input
                  type="text"
                  value={studioInfo.address}
                  onChange={(e) => onUpdateStudioInfo({ ...studioInfo, address: e.target.value })}
                  className="w-full p-2.5 bg-[#090b0e] border border-white/15 rounded-sm text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Studio Telephone</label>
                  <input
                    type="text"
                    value={studioInfo.phone}
                    onChange={(e) => onUpdateStudioInfo({ ...studioInfo, phone: e.target.value })}
                    className="w-full p-2.5 bg-[#090b0e] border border-white/15 rounded-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Studio Email</label>
                  <input
                    type="email"
                    value={studioInfo.email}
                    onChange={(e) => onUpdateStudioInfo({ ...studioInfo, email: e.target.value })}
                    className="w-full p-2.5 bg-[#090b0e] border border-white/15 rounded-sm text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Studio WhatsApp (with country code)</label>
                  <input
                    type="text"
                    value={studioInfo.whatsapp}
                    onChange={(e) => onUpdateStudioInfo({ ...studioInfo, whatsapp: e.target.value })}
                    placeholder="+44 7490 186826"
                    className="w-full p-2.5 bg-[#090b0e] border border-emerald-500/30 rounded-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">TikTok Channel / Featured Video URL</label>
                  <input
                    type="url"
                    value={studioInfo.socials.tiktok}
                    onChange={(e) =>
                      onUpdateStudioInfo({
                        ...studioInfo,
                        socials: { ...studioInfo.socials, tiktok: e.target.value },
                      })
                    }
                    placeholder="https://vt.tiktok.com/ZSq8bB1GP/"
                    className="w-full p-2.5 bg-[#090b0e] border border-white/15 rounded-sm text-white"
                  />
                </div>
              </div>
            </div>
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-sm text-xs text-emerald-300">
              Changes are saved directly to your active studio session.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
