import React, { useState, useEffect } from 'react'
import { Users, X } from 'lucide-react'
import { SEAT_LAYOUTS } from '../data/carpoolData'

export default function SeatMap({ vehicleType = 'sedan', occupiedSeats = [], initialAvailable = [], editable = false, onChange }) {
  const layout = SEAT_LAYOUTS[vehicleType] || SEAT_LAYOUTS.sedan
  const rows = [...new Set(layout.map(s => s.row))]

  const initial = () => {
    if (initialAvailable && initialAvailable.length) return initialAvailable
    return layout.filter(s => s.bookable).map(s => s.id)
  }

  const [available, setAvailable] = useState(initial())
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (onChange) onChange(available)
  }, [available])

  const toggleSeat = (seat) => {
    if (!editable) return
    if (!seat.bookable) return
    setAvailable(prev => prev.includes(seat.id) ? prev.filter(id => id !== seat.id) : [...prev, seat.id])
  }

  const handleSelect = (seat) => {
    if (occupiedSeats.includes(seat.id) || !seat.bookable) return
    setSelected(seat.id === selected ? null : seat.id)
  }

  const seatClass = (seat) => {
    if (!seat.bookable) return 'bg-[#ede9f0] text-[#bbb] cursor-not-allowed border-[#e0dbe4]'
    if (occupiedSeats.includes(seat.id)) return 'bg-[#f3edf7] text-[#bbb] cursor-not-allowed border-[#ddd0e8] opacity-60'
    if (editable) {
      return available.includes(seat.id) ? 'bg-white border-brand-purple text-[#312b35]' : 'bg-[#fff7f7] border-rose-200 text-rose-700'
    }
    if (seat.id === selected) return 'bg-brand-purple text-white border-brand-purple'
    return 'bg-white text-[#312b35] border-brand-border'
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[10px] text-[#6e6872]">
        <span className="font-bold text-[#312b35] text-[11px]">Seat Map</span>
        <span>🚗 Driver</span>
      </div>

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
                  disabled={!seat.bookable || (!editable && occupiedSeats.includes(seat.id))}
                  onClick={() => editable ? toggleSeat(seat) : handleSelect(seat)}
                  title={seat.label}
                  className={`flex h-10 w-14 flex-col items-center justify-center rounded-lg border text-[8px] font-semibold transition ${seatClass(seat)}`}
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

      <div className="mt-3 flex flex-wrap gap-3 text-[9px] text-[#6e6872]">
        {editable ? (
          <>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded border border-brand-border bg-white" /> Available</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-[#fff7f7] border border-rose-200" /> Marked Unavailable</span>
          </>
        ) : (
          <>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded border border-brand-border bg-white" /> Available</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-brand-purple" /> Selected</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-[#ede9f0]" /> Unavailable</span>
          </>
        )}
      </div>
    </div>
  )
}
