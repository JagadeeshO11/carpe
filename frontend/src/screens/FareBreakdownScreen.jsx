import { Clock, MapPin, Package, CreditCard, ChevronRight, Info } from 'lucide-react'
import PrimaryButton from '../components/PrimaryButton'
import ScreenHeader from '../components/ScreenHeader'
import { CARPE_COMMISSION, PASSENGER_ADVANCE, PICKUP_WINDOW_MINUTES } from '../data/carpoolData'

function addMinutesToTime(timeStr, minutes) {
  const [time, period] = timeStr.split(' ')
  const [h, m] = time.split(':').map(Number)
  let totalMins = (period === 'PM' && h !== 12 ? h + 12 : period === 'AM' && h === 12 ? 0 : h) * 60 + m + minutes
  const newH = Math.floor(totalMins / 60) % 24
  const newM = totalMins % 60
  const newPeriod = newH >= 12 ? 'PM' : 'AM'
  const displayH = newH % 12 || 12
  return `${displayH}:${String(newM).padStart(2, '0')} ${newPeriod}`
}

export default function FareBreakdownScreen({ ride, seatSelection, onConfirm, onBack }) {
  const fare = ride?.pricePerSeat || 0
  const remaining = fare - PASSENGER_ADVANCE
  const driverAdvance = PASSENGER_ADVANCE - CARPE_COMMISSION
  const pickupWindow = `${ride?.time} – ${addMinutesToTime(ride?.time || '8:00 AM', PICKUP_WINDOW_MINUTES)}`

  const rows = [
    { label: 'Fare per seat', value: `₹${fare}`, highlight: false },
    { label: `Distance (${ride?.distanceKm || '?'} km × ₹${ride?.fuelType === 'diesel' ? 2.5 : ride?.fuelType === 'cng' ? 1.8 : ride?.fuelType === 'electric' ? 1.2 : 2.8}/km)`, value: '', highlight: false, note: true },
    { label: 'Advance payable now', value: `₹${PASSENGER_ADVANCE}`, highlight: true },
    { label: `  ↳ CarPe commission`, value: `₹${CARPE_COMMISSION}`, highlight: false, sub: true },
    { label: `  ↳ Driver advance`, value: `₹${driverAdvance}`, highlight: false, sub: true },
    { label: 'Balance (pay driver on pickup)', value: `₹${remaining}`, highlight: false },
  ]

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Fare Breakdown" onBack={onBack} />

      <div className="flex-1 space-y-4 px-5 pb-6 pt-4">

        {/* Route summary */}
        <div className="rounded-xl border border-brand-purple/20 bg-brand-lavender p-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#312b35]">
            <MapPin size={13} className="text-brand-purple shrink-0" />
            <span>{seatSelection?.pickupPoint || ride?.origin}</span>
            <ChevronRight size={12} className="text-brand-purple" />
            <span>{seatSelection?.dropPoint || ride?.destination}</span>
          </div>
          <p className="mt-1.5 text-[10px] text-[#6e6872]">
            Seat: <strong>{seatSelection?.seatLabel}</strong>
            {seatSelection?.hasTrolley && <span className="ml-2 text-brand-purple font-semibold">+ 1 Trolley Reserved</span>}
          </p>
        </div>

        {/* Fare table */}
        <div className="rounded-xl border border-brand-border bg-white overflow-hidden">
          <div className="border-b border-brand-border bg-brand-lavender px-4 py-2 text-[11px] font-bold text-[#312b35]">
            Payment Breakdown
          </div>
          <div className="divide-y divide-[#f4edf7]">
            {rows.map((row, i) => (
              <div key={i} className={`flex items-center justify-between px-4 py-2.5 ${row.highlight ? 'bg-brand-lavender-strong' : ''}`}>
                <span className={`text-[10px] ${row.sub ? 'text-[#817b84]' : 'text-[#3f3943] font-medium'} ${row.note ? 'text-[#a29ca6] italic' : ''}`}>
                  {row.label}
                </span>
                {row.value && (
                  <span className={`text-[11px] font-bold ${row.highlight ? 'text-brand-purple' : 'text-[#312b35]'}`}>
                    {row.value}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t-2 border-brand-purple/20 bg-brand-lavender-strong px-4 py-3">
            <span className="text-[12px] font-extrabold text-[#231b2b]">Total Ride Fare</span>
            <span className="text-[14px] font-extrabold text-brand-purple">₹{fare}</span>
          </div>
        </div>

        {/* 40-minute pickup window */}
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <Clock size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-bold text-amber-900">40-Minute Pickup Window</p>
            <p className="mt-0.5 text-[10px] text-amber-800">
              Driver will pick you up between <strong>{pickupWindow}</strong>.
              Be ready at your pickup point on time.
            </p>
          </div>
        </div>

        {/* AC policy */}
        <div className="flex items-start gap-2.5 rounded-xl border border-brand-border bg-white p-3">
          <Info size={15} className="text-brand-purple shrink-0 mt-0.5" />
          <p className="text-[10px] text-[#6e6872]">
            <strong className="text-[#312b35]">AC Policy: </strong>
            {ride?.acPolicy || 'All vehicles are AC by default. Exceptions may apply in winter or by mutual agreement.'}
          </p>
        </div>

        {/* Payment info */}
        <div className="flex items-start gap-2.5 rounded-xl border border-brand-green/30 bg-emerald-50 p-3">
          <CreditCard size={15} className="text-brand-green shrink-0 mt-0.5" />
          <div className="text-[10px] text-emerald-800">
            <p className="font-bold">Pay ₹{PASSENGER_ADVANCE} Advance Now</p>
            <p className="mt-0.5">Remaining ₹{remaining} is paid directly to driver at pickup. Cash or UPI accepted.</p>
          </div>
        </div>
      </div>

      <div className="px-5 pb-6">
        <PrimaryButton onClick={onConfirm}>
          Pay ₹{PASSENGER_ADVANCE} Advance & Confirm Booking
        </PrimaryButton>
      </div>
    </div>
  )
}
