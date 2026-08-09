import { MapPin, ChevronRight, CheckCircle2, AlertCircle, Users, Clock } from 'lucide-react'
import ScreenHeader from '../components/ScreenHeader'
import { DRIVER_DEPOSIT } from '../data/carpoolData'

const STATUS_STYLES = {
  upcoming: 'bg-brand-lavender text-brand-purple',
  active: 'bg-blue-50 text-blue-700',
  completed: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-rose-50 text-rose-600',
}

export default function DriverRideHistoryScreen({ driverRides = [], onViewPassengers, onBack }) {
  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="My Ride History" onBack={onBack} />

      <div className="flex-1 space-y-3 px-5 pb-6 pt-4">
        {driverRides.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-[#a29ca6]">
            <Clock size={36} className="mb-3 text-brand-purple/30" />
            <p className="text-[12px] font-bold">No rides posted yet</p>
            <p className="mt-1 text-[11px]">Rides you post will appear here.</p>
          </div>
        ) : (
          driverRides.map(ride => (
            <div key={ride.id} className="rounded-xl border border-[#eee8f3] bg-white p-3.5 shadow-xs space-y-2.5">
              {/* Route */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#312b35]">
                  <MapPin size={13} className="text-brand-purple shrink-0" />
                  <span>{ride.origin}</span>
                  <ChevronRight size={12} className="text-brand-purple" />
                  <span>{ride.destination}</span>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold capitalize ${STATUS_STYLES[ride.status] || 'bg-gray-100 text-gray-600'}`}>
                  {ride.status}
                </span>
              </div>

              {/* Date, vehicle, passengers */}
              <div className="grid grid-cols-2 gap-1.5 text-[10px] text-[#6e6872]">
                <div>{ride.date} · {ride.time}</div>
                <div>{ride.vehicleModel}</div>
                <div className="flex items-center gap-1">
                  <Users size={11} className="text-brand-purple" />
                  {ride.passengers.length} passenger(s)
                </div>
                <div className="font-semibold text-brand-purple">₹{ride.totalEarnings} earned</div>
              </div>

              {/* Deposit status */}
              <div className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[9px] font-bold ${ride.depositStatus === 'refunded' ? 'bg-emerald-50 text-emerald-700' : ride.depositStatus === 'paid' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-600'}`}>
                {ride.depositStatus === 'refunded'
                  ? <><CheckCircle2 size={11} /> ₹{DRIVER_DEPOSIT} deposit refunded</>
                  : ride.depositStatus === 'paid'
                    ? <><Clock size={11} /> ₹{DRIVER_DEPOSIT} deposit held (pending completion)</>
                    : <><AlertCircle size={11} /> ₹{DRIVER_DEPOSIT} deposit forfeited</>
                }
              </div>

              {/* View passengers */}
              {ride.passengers.length > 0 && (
                <button type="button" onClick={() => onViewPassengers(ride)}
                  className="flex w-full items-center justify-between rounded-lg border border-brand-border px-3 py-1.5 text-[10px] font-bold text-brand-purple hover:bg-brand-lavender transition"
                >
                  <span>View Passenger List</span>
                  <ChevronRight size={13} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
