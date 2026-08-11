import { useState } from 'react'
import { MapPin, Users, Package, CheckCircle2, X } from 'lucide-react'
import PrimaryButton from '../components/PrimaryButton'
import ScreenHeader from '../components/ScreenHeader'
import { SEAT_LAYOUTS, getAllocatedSeatsForWomen, getCityRouteStops } from '../data/carpoolData'

export default function SeatSelectionScreen({
  ride,
  existingBookings = [],
  onConfirm,
  onBack,
  selectedPickup,
  selectedDrop,
  onRouteChange,
}) {
  const vehicleType = ride?.vehicleType || 'sedan'
  const layout = SEAT_LAYOUTS[vehicleType] || SEAT_LAYOUTS.sedan
  const routeStops = getCityRouteStops(ride)
  const activePickup = selectedPickup || routeStops.pickupPoints[0]
  const activeDrop = selectedDrop || routeStops.dropPoints[routeStops.dropPoints.length - 1]

  const [selectedSeat, setSelectedSeat] = useState(null)
  const [gender, setGender] = useState('male')
  const [isHusbandWife, setIsHusbandWife] = useState(false)
  const [hasTrolley, setHasTrolley] = useState(false)
  const [error, setError] = useState('')

  const occupiedSeats = ride?.seatsOccupied || []
  const suggestedSeats = (!isHusbandWife && gender === 'female')
    ? getAllocatedSeatsForWomen(1, vehicleType)
    : []

  const handleSeatClick = (seat) => {
    if (!seat.bookable || occupiedSeats.includes(seat.id)) return
    setSelectedSeat(seat.id === selectedSeat ? null : seat.id)
    setError('')
  }

  const handleConfirm = () => {
    if (!selectedSeat) { setError('Please select a seat to continue.'); return }
    onConfirm({
      seatId: selectedSeat,
      seatLabel: layout.find(s => s.id === selectedSeat)?.label,
      hasTrolley,
      gender,
      pickupPoint: activePickup,
      dropPoint: activeDrop,
    })
  }

  // Group seats by row
  const rows = [...new Set(layout.map(s => s.row))]

  const seatColor = (seat) => {
    if (!seat.bookable) return 'bg-[#ede9f0] text-[#bbb] cursor-not-allowed border-[#e0dbe4]'
    if (occupiedSeats.includes(seat.id)) return 'bg-[#f3edf7] text-[#bbb] cursor-not-allowed border-[#ddd0e8] opacity-60'
    if (seat.id === selectedSeat) return 'bg-brand-purple text-white border-brand-purple shadow-md'
    if (suggestedSeats.includes(seat.id)) return 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
    return 'bg-white text-[#312b35] border-brand-border hover:border-brand-purple/60 hover:bg-brand-lavender'
  }

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Select Your Seat" onBack={onBack} />

      <div className="flex-1 space-y-4 px-5 pb-6 pt-4">
        {/* Vehicle type badge */}
        <div className="flex items-center justify-between rounded-xl bg-brand-lavender px-3 py-2">
          <div className="text-[11px]">
            <span className="font-bold text-[#312b35]">{ride?.vehicleModel}</span>
            <span className="ml-2 text-[#6e6872]">({ride?.vehicleNumber})</span>
          </div>
          <span className="rounded-full bg-brand-purple/10 px-2 py-0.5 text-[9px] font-bold text-brand-purple capitalize">
            {vehicleType === 'mpv' ? 'MPV' : vehicleType}
          </span>
        </div>

        <div className="rounded-xl border border-brand-border bg-white p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-[#312b35]">City-to-city segment</p>
            <span className="text-[9px] font-bold text-brand-purple">
              5 departure + 5 arrival stops
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <label className="space-y-1">
              <span className="block text-[9px] font-semibold text-[#77717b]">Departure city stop</span>
              <select
                value={activePickup}
                onChange={(event) => onRouteChange?.({ pickupPoint: event.target.value, dropPoint: activeDrop })}
                className="w-full rounded-control border border-brand-border bg-white px-2.5 py-1.5 text-[10px] text-[#312b35] focus:outline-none"
              >
                {routeStops.pickupPoints.map((stop) => (
                  <option key={stop} value={stop}>{stop}</option>
                ))}
              </select>
            </label>

            <label className="space-y-1">
              <span className="block text-[9px] font-semibold text-[#77717b]">Arrival city stop</span>
              <select
                value={activeDrop}
                onChange={(event) => onRouteChange?.({ pickupPoint: activePickup, dropPoint: event.target.value })}
                className="w-full rounded-control border border-brand-border bg-white px-2.5 py-1.5 text-[10px] text-[#312b35] focus:outline-none"
              >
                {routeStops.dropPoints.map((stop) => (
                  <option key={stop} value={stop}>{stop}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Gender selection */}
        <div className="rounded-xl border border-brand-border bg-white p-3 space-y-2">
          <p className="text-[11px] font-bold text-[#312b35]">Your Gender</p>
          <div className="flex gap-2">
            {['male', 'female'].map(g => (
              <button key={g} type="button"
                onClick={() => setGender(g)}
                className={`flex-1 rounded-control border py-1.5 text-[10px] font-semibold capitalize transition ${gender === g ? 'border-brand-purple bg-brand-purple text-white' : 'border-brand-border bg-white text-[#6e6872]'}`}
              >
                {g}
              </button>
            ))}
          </div>
          {gender === 'female' && (
            <label className="flex items-center gap-2 text-[10px] text-[#6e6872] cursor-pointer">
              <input type="checkbox" checked={isHusbandWife} onChange={e => setIsHusbandWife(e.target.checked)} className="accent-brand-purple" />
              Booking as couple (husband + wife — standard allocation)
            </label>
          )}
          {gender === 'female' && !isHusbandWife && (
            <p className="text-[9px] text-rose-600 bg-rose-50 rounded px-2 py-1">
              ⚡ Suggested seats highlighted in pink for your safety.
            </p>
          )}
        </div>

        {/* Seat Map */}
        <div className="rounded-xl border border-brand-border bg-white p-4">
          <div className="mb-3 flex items-center justify-between text-[10px] text-[#6e6872]">
            <span className="font-bold text-[#312b35] text-[11px]">Seat Map</span>
            <span>🚗 Driver</span>
          </div>

          {/* Driver seat (non-bookable) */}
          <div className="mb-3 flex justify-start">
            <div className="flex h-9 w-16 items-center justify-center rounded-lg bg-[#f3edf7] text-[9px] font-bold text-[#9b88a8]">
              Driver
            </div>
          </div>

          <div className="space-y-2">
            {rows.map(row => {
              const rowSeats = layout.filter(s => s.row === row)
              return (
                <div key={row} className="flex items-center justify-center gap-2">
                  {rowSeats.map(seat => (
                    <button
                      key={seat.id}
                      type="button"
                      disabled={!seat.bookable || occupiedSeats.includes(seat.id)}
                      onClick={() => handleSeatClick(seat)}
                      title={seat.label}
                      className={`flex h-10 w-14 flex-col items-center justify-center rounded-lg border text-[8px] font-semibold transition ${seatColor(seat)}`}
                    >
                      {occupiedSeats.includes(seat.id) ? (
                        <X size={12} />
                      ) : !seat.bookable ? (
                        <span>—</span>
                      ) : (
                        <>
                          <Users size={11} />
                          <span className="mt-0.5 leading-tight text-center px-0.5">
                            {seat.label.replace('Passenger', '').replace('Row', 'R').trim()}
                          </span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap gap-3 text-[9px] text-[#6e6872]">
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded border border-brand-border bg-white" /> Available</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-brand-purple" /> Selected</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-[#ede9f0]" /> Unavailable</span>
            {gender === 'female' && !isHusbandWife && (
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-rose-100 border border-rose-300" /> Suggested</span>
            )}
          </div>
        </div>

        {/* Boot / Trolley reservation */}
        <div className="rounded-xl border border-brand-border bg-white p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package size={15} className="text-brand-purple" />
              <div>
                <p className="text-[11px] font-bold text-[#312b35]">Trolley / Boot Space</p>
                <p className="text-[9px] text-[#6e6872]">Max 1 trolley per passenger</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setHasTrolley(!hasTrolley)}
              className={`flex h-6 w-11 items-center rounded-full border transition ${hasTrolley ? 'justify-end border-brand-purple bg-brand-purple' : 'justify-start border-brand-border bg-[#f3edf7]'}`}
            >
              <span className="mx-0.5 h-4 w-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>
          {hasTrolley && (
            <p className="mt-2 text-[9px] text-brand-purple bg-brand-lavender rounded px-2 py-1">
              ✓ 1 trolley slot reserved in boot space.
            </p>
          )}
        </div>

        {error && (
          <p className="text-[11px] font-semibold text-rose-600 bg-rose-50 rounded-lg px-3 py-2">{error}</p>
        )}
      </div>

      <div className="px-5 pb-6">
        <PrimaryButton onClick={handleConfirm}>
          {selectedSeat ? `Confirm — ${layout.find(s => s.id === selectedSeat)?.label}` : 'Select a Seat'}
        </PrimaryButton>
      </div>
    </div>
  )
}
