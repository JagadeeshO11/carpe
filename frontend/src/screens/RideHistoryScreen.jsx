import { MapPin, ChevronRight, Clock, CheckCircle2, XCircle, Star } from 'lucide-react'
import ScreenHeader from '../components/ScreenHeader'

const STATUS_STYLES = {
  Confirmed: 'bg-brand-lavender text-brand-purple',
  Completed: 'bg-emerald-50 text-emerald-700',
  Cancelled: 'bg-rose-50 text-rose-600',
}

export default function RideHistoryScreen({ bookings = [], onRateRide, onBack }) {
  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="My Ride History" onBack={onBack} />

      <div className="flex-1 space-y-3 px-5 pb-6 pt-4">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-[#a29ca6]">
            <Clock size={36} className="mb-3 text-brand-purple/30" />
            <p className="text-[12px] font-bold">No rides yet</p>
            <p className="mt-1 text-[11px]">Your completed and cancelled rides will appear here.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="rounded-xl border border-[#eee8f3] bg-white p-3.5 shadow-xs">
              {/* Route */}
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#312b35]">
                <MapPin size={13} className="text-brand-purple shrink-0" />
                <span>{booking.pickupPoint}</span>
                <ChevronRight size={12} className="text-brand-purple" />
                <span>{booking.dropPoint}</span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-[10px] text-[#6e6872]">{booking.date} · {booking.time}</p>
                  <p className="text-[10px] text-[#6e6872]">
                    {booking.vehicleModel} · Seat: <strong>{booking.seatLabel}</strong>
                  </p>
                  <p className="text-[10px] font-semibold text-brand-purple">₹{booking.fare} total</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${STATUS_STYLES[booking.status] || 'bg-gray-100 text-gray-600'}`}>
                    {booking.status}
                  </span>
                  {booking.status === 'Completed' && !booking.rated && (
                    <button
                      type="button"
                      onClick={() => onRateRide(booking)}
                      className="flex items-center gap-1 rounded-lg bg-amber-50 border border-amber-200 px-2 py-0.5 text-[9px] font-bold text-amber-700 hover:bg-amber-100 transition"
                    >
                      <Star size={10} className="fill-amber-400 text-amber-400" />
                      Rate Driver
                    </button>
                  )}
                  {booking.rated && (
                    <span className="flex items-center gap-1 text-[9px] text-emerald-600 font-semibold">
                      <CheckCircle2 size={11} /> Rated
                    </span>
                  )}
                </div>
              </div>

              {booking.status === 'Cancelled' && (
                <div className="mt-2 flex items-center gap-1 text-[9px] text-rose-600 bg-rose-50 rounded px-2 py-1">
                  <XCircle size={11} /> Advance of ₹{booking.advance} forfeited.
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
