import { useState } from 'react'
import { Users, CheckCircle2, XCircle, Phone, Package, MapPin, ChevronRight } from 'lucide-react'
import ScreenHeader from '../components/ScreenHeader'

export default function PassengerListScreen({ ride, onBack }) {
  const [passengers, setPassengers] = useState(
    (ride?.passengers || []).map(p => ({ ...p }))
  )
  const [otpInputs, setOtpInputs] = useState({})
  const [errors, setErrors] = useState({})

  const verifyOtp = (idx) => {
    const p = passengers[idx]
    const entered = otpInputs[idx] || ''
    if (entered === p.otp) {
      setPassengers(prev => prev.map((pax, i) => i === idx ? { ...pax, otpVerified: true } : pax))
      setErrors(prev => ({ ...prev, [idx]: '' }))
    } else {
      setErrors(prev => ({ ...prev, [idx]: 'Invalid OTP. Please try again.' }))
    }
  }

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Passenger List" onBack={onBack} />

      <div className="flex-1 space-y-4 px-5 pb-6 pt-4">
        {/* Ride summary */}
        <div className="rounded-xl bg-brand-lavender px-4 py-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#312b35]">
            <MapPin size={13} className="text-brand-purple shrink-0" />
            <span>{ride?.origin}</span>
            <ChevronRight size={12} className="text-brand-purple" />
            <span>{ride?.destination}</span>
          </div>
          <p className="mt-1 text-[10px] text-[#6e6872]">{ride?.date} · {ride?.time} · {ride?.vehicleModel}</p>
          <div className="mt-1.5 flex items-center gap-2 text-[10px]">
            <Users size={12} className="text-brand-purple" />
            <span className="font-semibold text-brand-purple">{passengers.length} passenger(s)</span>
            <span className="text-[#a29ca6]">· {passengers.filter(p => p.otpVerified).length} verified</span>
          </div>
        </div>

        {passengers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center text-[#a29ca6]">
            <Users size={32} className="mb-2 text-brand-purple/30" />
            <p className="text-[12px] font-bold">No bookings yet</p>
            <p className="mt-1 text-[11px]">Passengers who book this ride will appear here.</p>
          </div>
        )}

        {passengers.map((p, idx) => (
          <div key={idx} className="rounded-xl border border-[#eee8f3] bg-white p-3.5 shadow-xs space-y-2.5">
            {/* Passenger header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-lavender-strong text-[13px] font-extrabold text-brand-purple">
                  {p.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#312b35]">{p.name}</p>
                  <p className="text-[9px] text-[#6e6872]">{p.phone}</p>
                </div>
              </div>
              <a href={`tel:${p.phone}`} className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <Phone size={13} />
              </a>
            </div>

            {/* Seat, route, luggage */}
            <div className="grid grid-cols-2 gap-1.5 text-[9px] text-[#6e6872] bg-brand-lavender rounded-lg p-2">
              <div><span className="font-semibold">Pickup:</span> {p.pickup}</div>
              <div><span className="font-semibold">Drop:</span> {p.drop}</div>
              <div><span className="font-semibold">Seat:</span> {p.seat}</div>
              <div className="flex items-center gap-1">
                <Package size={10} className="text-brand-purple" />
                {p.hasTrolley ? 'Trolley reserved' : 'No trolley'}
              </div>
            </div>

            {/* Fare */}
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-[#6e6872]">Fare: <strong>₹{p.fare}</strong></span>
              <span className="text-emerald-700 font-semibold">Advance received: ₹{p.advance}</span>
            </div>

            {/* OTP verification */}
            {p.otpVerified ? (
              <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-[10px] font-bold text-emerald-700">
                <CheckCircle2 size={14} />
                OTP Verified — Ready to Board
              </div>
            ) : (
              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold text-[#554e5b]">Enter Passenger OTP to verify boarding:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={otpInputs[idx] || ''}
                    onChange={e => setOtpInputs(prev => ({ ...prev, [idx]: e.target.value }))}
                    placeholder="4-digit OTP"
                    className="flex-1 rounded-control border border-brand-border bg-white px-3 py-1.5 text-[11px] tracking-widest focus:outline-none focus:border-brand-purple"
                  />
                  <button type="button" onClick={() => verifyOtp(idx)}
                    className="rounded-control bg-brand-purple px-4 text-[10px] font-bold text-white hover:bg-brand-purple-dark transition"
                  >
                    Verify
                  </button>
                </div>
                {errors[idx] && (
                  <p className="flex items-center gap-1 text-[10px] text-rose-600">
                    <XCircle size={12} /> {errors[idx]}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
