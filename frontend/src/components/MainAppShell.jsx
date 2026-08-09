import { Car, Search, Navigation, UserCheck, ShieldAlert } from 'lucide-react'

export default function MainAppShell({ activeTab, onTabChange, mode, onModeToggle, children, onEmergencySos }) {
  return (
    <div className="flex h-full flex-col bg-[#fdfcff]">
      {/* Top Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#f0ebf5] bg-white px-4">
        <div className="flex items-center gap-2">
          <span className="text-[20px] font-extrabold tracking-[-0.06em] text-brand-purple">
            Car<span className="text-brand-green">Pe</span>
          </span>
          <span className="rounded-full bg-brand-lavender-strong px-2 py-0.5 text-[9px] font-bold text-brand-purple">
            Prototype
          </span>
        </div>

        {/* Mode Switcher Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onModeToggle}
            className="flex items-center gap-1.5 rounded-full border border-brand-purple/20 bg-brand-lavender px-2.5 py-1 transition hover:bg-brand-lavender-strong"
            title={`Switch to ${mode === 'passenger' ? 'Driver' : 'Passenger'} Mode`}
          >
            <span className={`h-2 w-2 rounded-full ${mode === 'passenger' ? 'bg-brand-purple' : 'bg-brand-green'}`} />
            <span className="text-[10px] font-bold text-[#312b35]">
              {mode === 'passenger' ? 'Passenger View' : 'Driver View'}
            </span>
          </button>

          <button
            type="button"
            onClick={onEmergencySos}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition hover:bg-rose-100"
            title="Emergency SOS"
          >
            <ShieldAlert size={15} />
          </button>
        </div>
      </header>

      {/* Main Content View */}
      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-none">
        {children}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="flex h-16 shrink-0 items-center justify-around border-t border-[#f0ebf5] bg-white px-2">
        {mode === 'passenger' && (
          <button
            type="button"
            onClick={() => onTabChange('find')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition ${activeTab === 'find' ? 'text-brand-purple font-bold' : 'text-[#77717b] hover:text-[#312b35]'}`}
          >
            <Search size={18} strokeWidth={activeTab === 'find' ? 2.5 : 1.8} />
            <span>Find Ride</span>
          </button>
        )}

        {mode === 'driver' && (
          <button
            type="button"
            onClick={() => onTabChange('offer')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition ${activeTab === 'offer' ? 'text-brand-purple font-bold' : 'text-[#77717b] hover:text-[#312b35]'}`}
          >
            <Car size={18} strokeWidth={activeTab === 'offer' ? 2.5 : 1.8} />
            <span>Offer Ride</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onTabChange('live')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition ${activeTab === 'live' ? 'text-brand-purple font-bold' : 'text-[#77717b] hover:text-[#312b35]'}`}
        >
          <Navigation size={18} strokeWidth={activeTab === 'live' ? 2.5 : 1.8} />
          <span>Live Pool</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition ${activeTab === 'profile' ? 'text-brand-purple font-bold' : 'text-[#77717b] hover:text-[#312b35]'}`}
        >
          <UserCheck size={18} strokeWidth={activeTab === 'profile' ? 2.5 : 1.8} />
          <span>Profile</span>
        </button>

        {/* Admin tab intentionally removed from bottom nav; access via Profile -> Admin Panel */}
      </nav>
    </div>
  )
}
