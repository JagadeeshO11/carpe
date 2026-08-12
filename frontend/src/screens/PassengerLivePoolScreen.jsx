import { useState } from 'react'
import { Navigation, Phone, MapPin, ShieldCheck, Clock } from 'lucide-react'
import { ROUTE_NODES_DEMO } from '../data/carpoolData'

export default function PassengerLivePoolScreen({ bookings }) {
  const [activeNodeIndex, setActiveNodeIndex] = useState(4)

  const activeBooking = bookings[0] || {
    driverName: 'Demo Driver',
    driverPhone: '+91 98765 43210',
    vehicleModel: 'Tata Nexon',
    vehicleNumber: 'KA 01 AB 1234',
    pickupPoint: 'Kengeri Bus Station',
    dropPoint: 'Mysuru Suburban Bus Stand',
    date: '2026-08-09',
    time: '08:30 AM',
    seatsBooked: 1,
    status: 'Confirmed',
  }

  const driverPickup = activeBooking.pickupPoint || 'Kengeri Bus Station'
  const driverDrop = activeBooking.dropPoint || 'Mysuru Suburban Bus Stand'
  const currentNode = ROUTE_NODES_DEMO[activeNodeIndex] || ROUTE_NODES_DEMO[ROUTE_NODES_DEMO.length - 1]
  const progress = (activeNodeIndex / (ROUTE_NODES_DEMO.length - 1)) * 100

  return (
    <div className="space-y-4 pb-4">
      {/* Live Header Banner */}
      <div className="flex items-center justify-between rounded-2xl bg-brand-purple p-3.5 text-white shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-xs">
            <Navigation className="animate-pulse text-white" size={20} />
          </div>
          <div>
            <h2 className="text-[13px] font-bold">My Live Pool</h2>
            <p className="text-[9px] text-white/80">Track your ride in real time</p>
          </div>
        </div>

        <span className="rounded-full bg-brand-green px-2.5 py-1 text-[9px] font-bold text-white shadow-xs">
          {activeBooking.status || 'Confirmed'}
        </span>
      </div>

      {/* Interactive Route Progress */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-gradient-to-b from-[#f3eef7] to-[#e8dff0] p-4 text-center">
        <div className="relative mx-auto my-3 h-28 w-full max-w-[300px]">
          <svg className="h-full w-full" viewBox="0 0 300 100" fill="none">
            {/* Background Route Line */}
            <path
              d="M 20 50 Q 80 20, 150 50 T 280 50"
              stroke="#cbb3df"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Active Progress Line */}
            <path
              d="M 20 50 Q 80 20, 150 50 T 280 50"
              stroke="#5b16a6"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="300"
              strokeDashoffset={300 - (activeNodeIndex / (ROUTE_NODES_DEMO.length - 1)) * 300}
              className="transition-all duration-700"
            />

            {/* Stops Pins */}
            <circle cx="20" cy="50" r="7" fill="#00b936" />
            <circle cx="90" cy="35" r="7" fill={activeNodeIndex >= 1 ? '#5b16a6' : '#a29ca6'} />
            <circle cx="150" cy="50" r="7" fill={activeNodeIndex >= 2 ? '#5b16a6' : '#a29ca6'} />
            <circle cx="210" cy="65" r="7" fill={activeNodeIndex >= 3 ? '#5b16a6' : '#a29ca6'} />
            <circle cx="280" cy="50" r="8" fill="#5b16a6" />
          </svg>

          {/* Car Icon Positioned on Active Segment */}
          <div
            className="absolute -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-purple text-white shadow-lg transition-all duration-500"
            style={{ left: `${progress * 0.82}%` }}
          >
            🚘
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-bold text-[#312b35] px-2">
          <span>{activeBooking.origin || 'Electronic City'}</span>
          <span className="text-brand-purple">Next: {currentNode.name}</span>
          <span>{activeBooking.destination || 'Mysuru'}</span>
        </div>
      </div>

      {/* Driver & Vehicle Card */}
      <div className="rounded-xl border border-brand-border bg-white p-3.5 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#312b35]">Your Driver</span>
          <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            <ShieldCheck size={11} /> Verified
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-brand-lavender p-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple text-[11px] font-bold text-white">
              {activeBooking.driverName?.charAt(0) || 'D'}
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#2a2430]">{activeBooking.driverName}</p>
              <p className="text-[9px] text-[#77717b]">
                {activeBooking.vehicleModel} • {activeBooking.vehicleNumber}
              </p>
            </div>
          </div>

          <a
            href={`tel:${activeBooking.driverPhone}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs"
            title="Call Driver"
          >
            <Phone size={14} />
          </a>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="rounded-xl border border-brand-border bg-white p-3.5 space-y-2">
        <h3 className="text-[11px] font-bold text-[#312b35]">Trip Summary</h3>

        <div className="space-y-2 pt-1">
          <div className="flex items-start gap-2 rounded-lg bg-brand-lavender p-2.5">
            <MapPin size={14} className="mt-0.5 shrink-0 text-brand-green" />
            <div>
              <p className="text-[9px] font-semibold text-[#77717b]">Pickup Point</p>
              <p className="text-[11px] font-bold text-[#2a2430]">{driverPickup}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg bg-brand-lavender p-2.5">
            <MapPin size={14} className="mt-0.5 shrink-0 text-brand-purple" />
            <div>
              <p className="text-[9px] font-semibold text-[#77717b]">Drop Point</p>
              <p className="text-[11px] font-bold text-[#2a2430]">{driverDrop}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-brand-lavender p-2.5">
            <Clock size={14} className="shrink-0 text-brand-purple" />
            <div>
              <p className="text-[9px] font-semibold text-[#77717b]">Departure</p>
              <p className="text-[11px] font-bold text-[#2a2430]">
                {activeBooking.date} • {activeBooking.time}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ride Safety Info */}
      <div className="rounded-xl border border-brand-purple/20 bg-brand-lavender-strong/40 p-3.5">
        <div className="flex items-center gap-2 text-brand-purple">
          <ShieldCheck size={16} />
          <h3 className="text-[11px] font-bold">Safety Tips For Your Ride</h3>
        </div>
        <ul className="mt-2 space-y-1.5 pl-1 text-[10px] text-[#3f3943]">
          <li>• Share your live trip status with trusted contacts.</li>
          <li>• Confirm the vehicle number plate before boarding.</li>
          <li>• Use the in-app SOS button if you feel unsafe.</li>
        </ul>
      </div>
    </div>
  )
}