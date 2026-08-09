import { useState } from 'react'
import { Navigation, Phone, CheckCircle2, Play } from 'lucide-react'
import { ROUTE_NODES_DEMO } from '../data/carpoolData'

export default function LivePoolMapScreen({ bookings }) {
  const [tripState, setTripState] = useState('started') // 'not_started', 'started', 'completed'
  const [activeNodeIndex, setActiveNodeIndex] = useState(1)
  const [enteredOtp, setEnteredOtp] = useState('')
  const [otpVerified, setOtpVerified] = useState(false)

  const activeBooking = bookings[0] || {
    driverName: 'Demo Driver',
    driverPhone: '+91 98765 43210',
    vehicleModel: 'Tata Nexon',
    vehicleNumber: 'KA 01 AB 1234',
    pickupPoint: 'Kengeri Bus Station',
    dropPoint: 'Mysuru Suburban Bus Stand',
    otp: '4829',
    seatsBooked: 1,
    status: 'Confirmed',
  }

  const handleNextStop = () => {
    if (activeNodeIndex < ROUTE_NODES_DEMO.length - 1) {
      setActiveNodeIndex(activeNodeIndex + 1)
    } else {
      setTripState('completed')
    }
  }

  const handleVerifyOtp = () => {
    if (enteredOtp === activeBooking.otp) {
      setOtpVerified(true)
    }
  }

  return (
    <div className="space-y-4 pb-4">
      {/* Live Header Banner */}
      <div className="flex items-center justify-between rounded-2xl bg-brand-purple p-3.5 text-white shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-xs">
            <Navigation className="animate-pulse text-white" size={20} />
          </div>
          <div>
            <h2 className="text-[13px] font-bold">Live Pool Navigation</h2>
            <p className="text-[9px] text-white/80">Route: Electronic City ➔ Mysuru</p>
          </div>
        </div>

        <span className="rounded-full bg-brand-green px-2.5 py-1 text-[9px] font-bold text-white shadow-xs">
          {tripState === 'completed' ? 'Completed' : 'Ride In Progress'}
        </span>
      </div>

      {/* SVG Interactive Route Map Graphic */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-gradient-to-b from-[#f3eef7] to-[#e8dff0] p-4 text-center">
        {/* Map Route Graphics */}
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
            style={{
              left: `${(activeNodeIndex / (ROUTE_NODES_DEMO.length - 1)) * 82}%`,
            }}
          >
            🚘
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-bold text-[#312b35] px-2">
          <span>Electronic City</span>
          <span className="text-brand-purple">Next: {ROUTE_NODES_DEMO[activeNodeIndex]?.name}</span>
          <span>Mysuru</span>
        </div>
      </div>

      {/* Passenger Card & Verification */}
      <div className="rounded-xl border border-brand-border bg-white p-3.5 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#312b35]">On-The-Way Passenger</span>
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            {activeBooking.status}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-brand-lavender p-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-purple text-[11px] font-bold text-white">
              P
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#2a2430]">{activeBooking.pickupPoint}</p>
              <p className="text-[9px] text-[#77717b]">{activeBooking.seatsBooked} Seat reserved</p>
            </div>
          </div>

          <a
            href={`tel:${activeBooking.driverPhone}`}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs"
            title="Call"
          >
            <Phone size={13} />
          </a>
        </div>

        {/* OTP Pickup Verification */}
        <div className="rounded-lg border border-brand-purple/20 p-2.5 space-y-2">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold text-[#3f3943]">Pickup Verification Code (OTP)</span>
            <span className="font-bold text-brand-purple">Code: {activeBooking.otp}</span>
          </div>

          {otpVerified ? (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 p-1.5 rounded">
              <CheckCircle2 size={14} className="text-brand-green" />
              Passenger Boarded &amp; Verified!
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 4-digit OTP"
                maxLength={4}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                className="flex-1 rounded-control border border-brand-border px-3 py-1 text-[11px] font-bold text-center tracking-widest focus:outline-none"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="rounded-control bg-brand-purple px-3 py-1 text-[10px] font-bold text-white"
              >
                Verify
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Stops List */}
      <div className="rounded-xl border border-brand-border bg-white p-3.5 space-y-2">
        <h3 className="text-[11px] font-bold text-[#312b35]">Route Stops Timeline</h3>

        <div className="space-y-2 pt-1">
          {ROUTE_NODES_DEMO.map((node, index) => {
            const isDone = index < activeNodeIndex
            const isCurrent = index === activeNodeIndex
            return (
              <div key={node.name} className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${isDone ? 'bg-brand-green' : isCurrent ? 'bg-brand-purple animate-ping' : 'bg-[#d2c9d8]'}`}
                  />
                  <span className={`font-medium ${isCurrent ? 'font-bold text-brand-purple' : 'text-[#3f3943]'}`}>
                    {node.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#77717b]">
                  <span>{node.distance}</span>
                  <span className="font-semibold text-[#312b35]">{node.time}</span>
                </div>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={handleNextStop}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-control bg-brand-lavender-strong py-2 text-[10px] font-bold text-brand-purple hover:bg-brand-purple hover:text-white transition"
        >
          <Play size={12} /> Advance to Next Pickup Node
        </button>
      </div>
    </div>
  )
}
