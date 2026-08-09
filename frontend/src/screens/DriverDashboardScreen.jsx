import { Car, Plus, Wallet, ClipboardList, ChevronRight, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react'
import PrimaryButton from '../components/PrimaryButton'
import ScreenHeader from '../components/ScreenHeader'
import { DRIVER_VERIFICATION_STATUS } from '../data/onboardingData'

const STATUS_CONFIG = {
  PENDING: { color: 'bg-amber-50 border-amber-200 text-amber-800', icon: Clock, label: 'Verification Pending', sub: 'Your documents are under review. You can not post rides yet.' },
  VERIFIED: { color: 'bg-emerald-50 border-emerald-200 text-emerald-800', icon: CheckCircle2, label: 'Verified Driver ✓', sub: 'You are approved to post rides on CarPe.' },
  REJECTED: { color: 'bg-rose-50 border-rose-200 text-rose-700', icon: XCircle, label: 'Verification Rejected', sub: 'Your application was rejected. Please re-submit with correct documents.' },
}

export default function DriverDashboardScreen({
  formData, driverRides = [], vehicles = [], earnings, onGoPostRide,
  onGoVehicles, onGoRideHistory, onGoEarnings, onBack,
}) {
  const status = formData?.driverVerificationStatus || 'PENDING'
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING
  const StatusIcon = cfg.icon
  const isVerified = status === DRIVER_VERIFICATION_STATUS.VERIFIED

  const upcomingRides = driverRides.filter(r => r.status === 'upcoming')
  const completedRides = driverRides.filter(r => r.status === 'completed')

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Driver Dashboard" onBack={onBack} />

      <div className="flex-1 space-y-4 px-5 pb-6 pt-4">
        {/* Verification status */}
        <div className={`flex items-start gap-3 rounded-xl border p-3.5 ${cfg.color}`}>
          <StatusIcon size={20} className="shrink-0 mt-0.5" />
          <div>
            <p className="text-[12px] font-extrabold">{cfg.label}</p>
            <p className="mt-0.5 text-[10px]">{cfg.sub}</p>
            {status === 'REJECTED' && (
              <button type="button" className="mt-2 text-[10px] font-bold underline">Re-submit Documents</button>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Total Rides', value: driverRides.length },
            { label: 'Upcoming', value: upcomingRides.length },
            { label: 'Vehicles', value: vehicles.length + '/3' },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-brand-border bg-white p-2.5 text-center">
              <p className="text-[18px] font-extrabold text-brand-purple">{value}</p>
              <p className="text-[9px] text-[#77717b] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Earnings snapshot */}
        {earnings && (
          <div className="rounded-xl border border-brand-purple/20 bg-gradient-to-br from-brand-lavender to-white p-4">
            <p className="text-[10px] font-bold text-[#554e5b] mb-1">Earnings Overview</p>
            <p className="text-[22px] font-extrabold text-brand-purple">₹{earnings.totalEarnings}</p>
            <p className="text-[9px] text-[#77717b]">
              Advance received: ₹{earnings.totalAdvanceReceived} · Commission: ₹{earnings.totalCommissionDeducted}
            </p>
            <button type="button" onClick={onGoEarnings}
              className="mt-2 text-[10px] font-bold text-brand-purple hover:underline flex items-center gap-1"
            >
              View Breakdown <ChevronRight size={12} />
            </button>
          </div>
        )}

        {/* Quick actions */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-[#312b35]">Quick Actions</p>

          <button
            type="button"
            onClick={onGoPostRide}
            disabled={!isVerified}
            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 transition ${isVerified ? 'border-brand-purple/20 bg-brand-lavender hover:bg-brand-lavender-strong' : 'border-[#e9e3ef] bg-[#f8f7f9] opacity-50 cursor-not-allowed'}`}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple text-white">
                <Plus size={16} />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-[#312b35]">Post a New Ride</p>
                <p className="text-[9px] text-[#6e6872]">{isVerified ? '₹100 deposit required' : 'Verification required'}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-brand-purple" />
          </button>

          <button type="button" onClick={onGoVehicles}
            className="flex w-full items-center justify-between rounded-xl border border-brand-border bg-white px-4 py-3 hover:border-brand-purple/40 hover:bg-brand-lavender transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3edf7] text-brand-purple">
                <Car size={16} />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-[#312b35]">My Vehicles</p>
                <p className="text-[9px] text-[#6e6872]">{vehicles.length} of 3 registered</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#817b84]" />
          </button>

          <button type="button" onClick={onGoRideHistory}
            className="flex w-full items-center justify-between rounded-xl border border-brand-border bg-white px-4 py-3 hover:border-brand-purple/40 hover:bg-brand-lavender transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3edf7] text-brand-purple">
                <ClipboardList size={16} />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-[#312b35]">Ride History</p>
                <p className="text-[9px] text-[#6e6872]">{completedRides.length} completed rides</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#817b84]" />
          </button>
        </div>

        {/* Upcoming rides preview */}
        {upcomingRides.length > 0 && (
          <div>
            <p className="text-[11px] font-bold text-[#312b35] mb-2">Upcoming Rides</p>
            <div className="space-y-2">
              {upcomingRides.slice(0, 2).map(ride => (
                <div key={ride.id} className="rounded-xl border border-[#eee8f3] bg-white p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-[#312b35]">{ride.origin} → {ride.destination}</p>
                    <p className="text-[9px] text-[#6e6872]">{ride.date} · {ride.time} · {ride.passengers.length} passenger(s)</p>
                  </div>
                  <span className="rounded-full bg-brand-lavender px-2 py-0.5 text-[8px] font-bold text-brand-purple">Upcoming</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
