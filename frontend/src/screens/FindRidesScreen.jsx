import { useState } from 'react'
import { MapPin, Calendar, Star, Car, ShieldCheck, CheckCircle2, ChevronRight, Filter } from 'lucide-react'
import PrimaryButton from '../components/PrimaryButton'
import SeatSelectionScreen from './SeatSelectionScreen'

export default function FindRidesScreen({ rides, onBookRide }) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [travelDate, setTravelDate] = useState('2026-08-09')
  const [filterOnTheWay, setFilterOnTheWay] = useState(true)
  const [selectedRide, setSelectedRide] = useState(null)
  const [selectedPickup, setSelectedPickup] = useState('')
  const [selectedSeats, setSelectedSeats] = useState(1)
  const [bookingSuccess, setBookingSuccess] = useState(null)

  // Filter rides based on search criteria and on-the-way pickup points
  const filteredRides = rides.filter((ride) => {
    const originMatch = !origin ||
      ride.origin.toLowerCase().includes(origin.toLowerCase()) ||
      ride.pickupPoints.some((p) => p.toLowerCase().includes(origin.toLowerCase()))
    
    const destMatch = !destination ||
      ride.destination.toLowerCase().includes(destination.toLowerCase()) ||
      ride.dropPoints.some((d) => d.toLowerCase().includes(destination.toLowerCase()))

    return originMatch && destMatch
  })

  const openBookingModal = (ride) => {
    setSelectedRide(ride)
    setSelectedPickup(ride.pickupPoints[0] || ride.origin)
    setSelectedSeats(1)
  }

  const handleConfirmBooking = () => {
    if (!selectedRide) return
    const booking = {
      id: `booking-${Date.now()}`,
      rideId: selectedRide.id,
      driverName: selectedRide.driverName,
      driverPhone: selectedRide.driverPhone,
      vehicleModel: selectedRide.vehicleModel,
      vehicleNumber: selectedRide.vehicleNumber,
      pickupPoint: selectedPickup,
      dropPoint: selectedRide.destination,
      seatsBooked: selectedSeats,
      totalPrice: selectedRide.pricePerSeat * selectedSeats,
      date: selectedRide.date,
      time: selectedRide.time,
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      status: 'Confirmed',
    }
    onBookRide(booking)
    setBookingSuccess(booking)
    setSelectedRide(null)
  }

  return (
    <div className="space-y-4 pb-4">
      {/* Search Header Banner */}
      <div className="rounded-2xl border border-brand-purple/20 bg-gradient-to-br from-brand-lavender to-white p-4 shadow-sm">
        <h2 className="text-[14px] font-extrabold text-[#231b2b]">Find a Carpool Ride</h2>
        <p className="mt-0.5 text-[10px] text-[#6e6872]">Travel with trusted nearby drivers on your route</p>

        {/* Form Controls */}
        <div className="mt-3 space-y-2">
          {/* Pickup Input */}
          <div className="flex items-center gap-2 rounded-control border border-brand-border bg-white px-3 py-2">
            <MapPin size={15} className="text-brand-purple shrink-0" />
            <input
              type="text"
              placeholder="From: Pickup location (e.g. Electronic City)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-transparent text-[11px] text-[#312b35] placeholder:text-[#a29ca6] focus:outline-none"
            />
          </div>

          {/* Dropoff Input */}
          <div className="flex items-center gap-2 rounded-control border border-brand-border bg-white px-3 py-2">
            <MapPin size={15} className="text-brand-green shrink-0" />
            <input
              type="text"
              placeholder="To: Destination (e.g. Mysuru, Whitefield)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-[11px] text-[#312b35] placeholder:text-[#a29ca6] focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-control border border-brand-border bg-white px-3 py-1.5">
              <Calendar size={14} className="text-[#6e6872] shrink-0" />
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-transparent text-[10px] text-[#312b35] focus:outline-none"
              />
            </div>
            
            <button
              type="button"
              onClick={() => setFilterOnTheWay(!filterOnTheWay)}
              className={`flex items-center gap-1 rounded-control border px-3 text-[10px] font-semibold transition ${filterOnTheWay ? 'border-brand-purple bg-brand-purple text-white' : 'border-brand-border bg-white text-[#6e6872]'}`}
            >
              <Filter size={12} />
              <span>On-the-way</span>
            </button>
          </div>
        </div>
      </div>

      {/* Booking Success Toast */}
      {bookingSuccess && (
        <div className="flex items-start gap-2.5 rounded-xl border border-brand-green/30 bg-emerald-50 p-3 text-emerald-900">
          <CheckCircle2 size={18} className="text-brand-green shrink-0 mt-0.5" />
          <div className="flex-1 text-[11px]">
            <p className="font-bold">Ride Booked Successfully!</p>
            <p className="mt-0.5 text-[10px] text-emerald-750">
              OTP: <strong className="font-bold">{bookingSuccess.otp}</strong> | Pickup at {bookingSuccess.pickupPoint}
            </p>
          </div>
          <button type="button" onClick={() => setBookingSuccess(null)} className="text-[10px] font-bold text-emerald-800">
            ✕
          </button>
        </div>
      )}

      {/* Ride Results */}
      <div>
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="text-[12px] font-bold text-[#312b35]">Available Carpools ({filteredRides.length})</span>
          <span className="text-[10px] text-brand-purple font-semibold">Verified Drivers</span>
        </div>

        <div className="space-y-3">
          {filteredRides.map((ride) => (
            <div
              key={ride.id}
              className="rounded-xl border border-[#eee8f3] bg-white p-3.5 shadow-xs hover:border-brand-purple/40 transition"
            >
              {/* Driver & Price Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[#f4edf7]">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold text-white shadow-xs"
                    style={{ backgroundColor: ride.avatarBg || '#5b16a6' }}
                  >
                    {ride.driverName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-bold text-[#27212c]">{ride.driverName}</span>
                      <ShieldCheck size={13} className="text-brand-green fill-brand-green/20" />
                    </div>
                    <div className="flex items-center gap-2 text-[9px] text-[#77717b]">
                      <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                        <Star size={10} className="fill-amber-500 text-amber-500" />
                        {ride.driverRating}
                      </span>
                      <span>• {ride.driverRides} rides offered</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[15px] font-extrabold text-brand-purple">₹{ride.pricePerSeat}</span>
                  <span className="block text-[8px] text-[#817b84]">per seat</span>
                </div>
              </div>

              {/* Route & Vehicle Info */}
              <div className="mt-2.5 space-y-1.5 text-[11px]">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-bold text-[#2d2731]">
                    <span>{ride.origin}</span>
                    <ChevronRight size={13} className="text-brand-purple" />
                    <span>{ride.destination}</span>
                  </div>
                  <span className="rounded-md bg-brand-lavender-strong px-2 py-0.5 text-[9px] font-semibold text-brand-purple">
                    {ride.time}
                  </span>
                </div>

                {/* On-the-way Pickup Nodes Badge */}
                <div className="flex items-center gap-1 text-[9px] text-[#6e6872] bg-[#f9f7fc] p-1.5 rounded-md">
                  <MapPin size={10} className="text-brand-purple shrink-0" />
                  <span className="truncate">Stops: {ride.pickupPoints.join(' ➔ ')}</span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#77717b] pt-1">
                  <span className="flex items-center gap-1">
                    <Car size={12} className="text-brand-purple" />
                    {ride.vehicleModel} ({ride.vehicleColor})
                  </span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {ride.seatsAvailable} seats left
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-3">
                <PrimaryButton onClick={() => openBookingModal(ride)}>Book Seat</PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Confirmation / Seat selection Modal */}
      {selectedRide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-[420px] rounded-2xl bg-white p-4 shadow-xl">
            <SeatSelectionScreen
              ride={selectedRide}
              existingBookings={[]}
              onBack={() => setSelectedRide(null)}
              onConfirm={({ seatId, seatLabel, hasTrolley, gender }) => {
                const booking = {
                  id: `booking-${Date.now()}`,
                  rideId: selectedRide.id,
                  driverName: selectedRide.driverName,
                  driverPhone: selectedRide.driverPhone,
                  vehicleModel: selectedRide.vehicleModel,
                  vehicleNumber: selectedRide.vehicleNumber,
                  pickupPoint: selectedPickup,
                  dropPoint: selectedRide.destination,
                  seatsBooked: 1,
                  seatId,
                  seatLabel,
                  hasTrolley: !!hasTrolley,
                  gender: gender || 'male',
                  totalPrice: selectedRide.pricePerSeat * 1,
                  date: selectedRide.date,
                  time: selectedRide.time,
                  otp: Math.floor(1000 + Math.random() * 9000).toString(),
                  status: 'Confirmed',
                }
                onBookRide(booking)
                setBookingSuccess(booking)
                setSelectedRide(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
