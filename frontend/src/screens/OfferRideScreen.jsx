import { useState, useEffect } from 'react'
import { Car, MapPin, CheckCircle2, Trash2, Plus } from 'lucide-react'
import PrimaryButton from '../components/PrimaryButton'
import SeatMap from '../components/SeatMap'
import { SEAT_LAYOUTS } from '../data/carpoolData'

export default function OfferRideScreen({ formData, onPublishRide }) {
  const [origin, setOrigin] = useState('Electronic City')
  const [destination, setDestination] = useState('Mysuru')
  const [departureStops, setDepartureStops] = useState([
    'Electronic City Phase 1',
    'Bommasandra',
    'Hebbagodi',
    'Chandapura',
    'Attibele',
  ])
  const [arrivalStops, setArrivalStops] = useState([
    'Srirangapatna',
    'Columbia Asia Mysuru',
    'Mysuru Junction',
    'Kuvempunagar',
    'Mysuru Bus Stand',
  ])
  const [date, setDate] = useState('2026-08-09')
  const [time, setTime] = useState('08:30 AM')
  const [seats, setSeats] = useState(3)
  const [price, setPrice] = useState(350)
  const [published, setPublished] = useState(false)
  const [newStop, setNewStop] = useState('')
  const vehicleType = formData.vehicleType || 'suv'
  const defaultAvailable = (SEAT_LAYOUTS[vehicleType] || SEAT_LAYOUTS.sedan).filter(s => s.bookable).map(s => s.id)
  const [seatAvailability, setSeatAvailability] = useState(defaultAvailable)

  useEffect(() => {
    setSeats(seatAvailability.length)
  }, [seatAvailability])

  const updateDepartureStop = (index, value) => {
    setDepartureStops((previous) => previous.map((stop, idx) => idx === index ? value : stop))
  }

  const updateArrivalStop = (index, value) => {
    setArrivalStops((previous) => previous.map((stop, idx) => idx === index ? value : stop))
  }

  const handleAddStop = () => {
    const trimmed = newStop.trim()
    if (!trimmed) return
    setDepartureStops((previous) => [...previous, trimmed])
    setNewStop('')
  }

  const handleRemoveStop = (index) => {
    setDepartureStops((previous) => previous.filter((_, idx) => idx !== index))
  }

  const handlePublish = () => {
    const cleanDepartureStops = departureStops.map((stop) => stop.trim()).filter(Boolean).slice(0, 5)
    const cleanArrivalStops = arrivalStops.map((stop) => stop.trim()).filter(Boolean).slice(0, 5)
    const newRide = {
      id: `ride-${Date.now()}`,
      driverName: formData.fullName || 'Demo Driver',
      driverRating: 5.0,
      driverRides: 1,
      driverPhone: formData.phone || '+91 98765 43210',
      avatarBg: '#5b16a6',
      vehicleModel: formData.vehicleModel || 'Tata Nexon',
      vehicleColor: formData.vehicleColor || 'Purple',
      vehicleNumber: formData.vehicleNumber || 'KA 01 AB 1234',
      origin,
      destination,
      pickupPoints: cleanDepartureStops,
      dropPoints: cleanArrivalStops,
      routeStops: [...cleanDepartureStops, ...cleanArrivalStops],
      date,
      time,
      seatsAvailable: seatAvailability.length,
      seatsTotal: seatAvailability.length,
      seatsOccupied: [],
      pricePerSeat: Number(price),
      luggage: formData.luggageCapacity || '2 Bags per rider',
      routeDescription: 'Published driver pool ride. Smooth travel on highway.',
      instantBooking: true,
    }

    onPublishRide(newRide)
    setPublished(true)
  }

  return (
    <div className="space-y-4 pb-4">
      {/* Driver Header Banner */}
      <div className="rounded-2xl border border-brand-green/30 bg-gradient-to-br from-emerald-50 via-white to-brand-lavender p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Car className="text-brand-purple" size={20} />
          <div>
            <h2 className="text-[14px] font-extrabold text-[#231b2b]">Offer a Carpool Ride</h2>
            <p className="text-[10px] text-[#6e6872]">Share seats & split fuel cost on your route</p>
          </div>
        </div>

        {/* Registered Vehicle Summary Card */}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-2.5 border border-[#eae2f2]">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-purple text-[10px] font-bold text-white">
              🚘
            </span>
            <div>
              <p className="text-[11px] font-bold text-[#2a2430]">
                {formData.vehicleModel || 'Tata Nexon'} ({formData.vehicleColor || 'Purple'})
              </p>
              <p className="text-[9px] text-[#77717b]">{formData.vehicleNumber || 'KA 01 AB 1234'}</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800">
            Active Vehicle
          </span>
        </div>
      </div>

      {published ? (
        <div className="rounded-2xl border border-brand-green/40 bg-emerald-50 p-5 text-center text-emerald-950">
          <CheckCircle2 size={36} className="mx-auto text-brand-green mb-2" />
          <h3 className="text-[15px] font-bold">Your Ride is Published!</h3>
          <p className="mt-1 text-[11px] text-emerald-800">
            Passengers on your route from {origin} to {destination} can now see and book your pool.
          </p>
          <button
            type="button"
            onClick={() => setPublished(false)}
            className="mt-4 w-full rounded-control bg-brand-purple py-2 text-[11px] font-bold text-white shadow-xs"
          >
            Publish Another Ride
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Route details */}
          <div className="rounded-xl border border-brand-border bg-white p-3.5 space-y-2.5">
            <h3 className="text-[11px] font-bold text-[#312b35]">1. Route Details</h3>
            
            <div className="flex items-center gap-2 rounded-control border border-brand-border px-3 py-2">
              <MapPin size={15} className="text-brand-purple shrink-0" />
              <input
                type="text"
                placeholder="Starting Location (Origin)"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-transparent text-[11px] text-[#312b35] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 rounded-control border border-brand-border px-3 py-2">
              <MapPin size={15} className="text-brand-green shrink-0" />
              <input
                type="text"
                placeholder="Final Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-[11px] text-[#312b35] focus:outline-none"
              />
            </div>

            {/* Intermediate Stops */}
            <div>
              <label className="block text-[10px] font-semibold text-[#5f5965] mb-1">
                On-the-way Pickup Stops
              </label>
              
              <div className="space-y-1.5 mb-2">
                {departureStops.map((stop, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-md bg-brand-lavender px-2.5 py-1 text-[10px] text-[#312b35]">
                    <span>📍 Stop {idx + 1}: {stop}</span>
                    <button type="button" onClick={() => handleRemoveStop(idx)} className="text-rose-500 hover:text-rose-700">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add intermediate stop (e.g. Ramanagara Bypass)"
                  value={newStop}
                  onChange={(e) => setNewStop(e.target.value)}
                  className="flex-1 rounded-control border border-brand-border bg-white px-3 py-1.5 text-[10px] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddStop}
                  className="flex items-center gap-1 rounded-control bg-brand-lavender-strong px-3 text-[10px] font-bold text-brand-purple"
                >
                  <Plus size={12} /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Timing & Seats */}
          <div className="rounded-xl border border-brand-border bg-white p-3.5 space-y-2.5">
            <h3 className="text-[11px] font-bold text-[#312b35]">2. Schedule & Seats</h3>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-semibold text-[#77717b] mb-1">Departure Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-control border border-brand-border px-2.5 py-1.5 text-[10px] text-[#312b35]"
                />
              </div>

              <div>
                <label className="block text-[9px] font-semibold text-[#77717b] mb-1">Departure Time</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="08:30 AM"
                  className="w-full rounded-control border border-brand-border px-2.5 py-1.5 text-[10px] text-[#312b35]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div>
                <label className="block text-[9px] font-semibold text-[#77717b] mb-1">Configure Seats (tap to mark available)</label>
                <div className="rounded-xl border border-brand-border bg-white p-3">
                  <SeatMap vehicleType={vehicleType} editable initialAvailable={defaultAvailable} onChange={setSeatAvailability} />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-semibold text-[#77717b] mb-1">Price per Seat (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-control border border-brand-border px-2.5 py-1.5 text-[10px] text-[#312b35]"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <PrimaryButton onClick={handlePublish}>Publish Carpool Ride</PrimaryButton>
          </div>
        </div>
      )}
    </div>
  )
}
