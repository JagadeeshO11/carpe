import { useState } from 'react'
import { MapPin, Plus, Trash2, Car, CheckCircle2, CreditCard, ChevronRight, AlertCircle } from 'lucide-react'
import PrimaryButton from '../components/PrimaryButton'
import ScreenHeader from '../components/ScreenHeader'
import { DRIVER_DEPOSIT, PRICING_RULES } from '../data/carpoolData'

const MAX_STOPS = 5

export default function RideCreationScreen({ formData, vehicles = [], onPublishRide, onBack }) {
  const verifiedVehicles = vehicles.filter(v => v.verificationStatus === 'VERIFIED')
  const isVerified = formData?.driverVerificationStatus === 'VERIFIED'

  const [step, setStep] = useState(1) // 1=route, 2=schedule, 3=fare+deposit, 4=published
  const [selectedVehicle, setSelectedVehicle] = useState(verifiedVehicles[0]?.id || '')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [pickupStops, setPickupStops] = useState([''])
  const [dropStops, setDropStops] = useState([''])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [seats, setSeats] = useState(2)
  const [error, setError] = useState('')
  const [depositConfirmed, setDepositConfirmed] = useState(false)

  const vehicle = vehicles.find(v => v.id === selectedVehicle)
  const pricePerSeat = vehicle
    ? Math.round((PRICING_RULES[vehicle.fuelType] || 2.8) * 150) // mock 150km
    : 0

  const addStop = (type) => {
    const arr = type === 'pickup' ? pickupStops : dropStops
    const set = type === 'pickup' ? setPickupStops : setDropStops
    if (arr.length >= MAX_STOPS) return
    set([...arr, ''])
  }

  const updateStop = (type, idx, val) => {
    const arr = type === 'pickup' ? [...pickupStops] : [...dropStops]
    arr[idx] = val
    type === 'pickup' ? setPickupStops(arr) : setDropStops(arr)
  }

  const removeStop = (type, idx) => {
    const arr = (type === 'pickup' ? pickupStops : dropStops).filter((_, i) => i !== idx)
    type === 'pickup' ? setPickupStops(arr) : setDropStops(arr)
  }

  const validateStep1 = () => {
    if (!selectedVehicle) { setError('Select a verified vehicle.'); return false }
    if (!origin.trim()) { setError('Origin is required.'); return false }
    if (!destination.trim()) { setError('Destination is required.'); return false }
    if (origin.trim().toLowerCase() === destination.trim().toLowerCase()) { setError('Origin and destination cannot be the same.'); return false }
    return true
  }

  const validateStep2 = () => {
    if (!date) { setError('Departure date is required.'); return false }
    if (!time) { setError('Departure time is required.'); return false }
    return true
  }

  const handlePublish = () => {
    if (!depositConfirmed) { setError('Please confirm the ₹100 deposit payment.'); return }
    const allPickups = [origin, ...pickupStops.filter(s => s.trim())]
    const allDrops = [...dropStops.filter(s => s.trim()), destination]
    const newRide = {
      id: `ride-${Date.now()}`,
      driverName: formData?.fullName || 'Driver',
      driverRating: 5.0,
      driverRides: 0,
      driverPhone: formData?.phone || '',
      driverVerified: true,
      avatarBg: '#5b16a6',
      vehicleModel: vehicle?.vehicleModel || '',
      vehicleType: vehicle?.vehicleType || 'sedan',
      vehicleColor: vehicle?.vehicleColor || '',
      vehicleNumber: vehicle?.registrationNumber || '',
      fuelType: vehicle?.fuelType || 'petrol',
      origin,
      destination,
      pickupPoints: allPickups,
      dropPoints: allDrops,
      date,
      time,
      seatsAvailable: seats,
      seatsTotal: seats,
      seatsOccupied: [],
      pricePerSeat,
      distanceKm: 150,
      luggage: '2 Bags per rider',
      routeDescription: '',
      instantBooking: true,
      depositPaid: true,
      status: 'upcoming',
      acPolicy: 'AC on by default.',
      vehiclePhotos: vehicle?.photos || {},
    }
    onPublishRide(newRide)
    setStep(4)
  }

  if (!isVerified) {
    return (
      <div className="flex min-h-full flex-col">
        <ScreenHeader title="Post a Ride" onBack={onBack} />
        <div className="flex flex-1 flex-col items-center justify-center px-5 text-center space-y-3">
          <AlertCircle size={36} className="text-amber-500" />
          <p className="text-[14px] font-extrabold text-[#231b2b]">Verification Required</p>
          <p className="text-[11px] text-[#6e6872]">You must be a verified driver before posting rides. Your application is under review.</p>
          <button type="button" onClick={onBack} className="mt-2 rounded-control border border-brand-border px-6 py-2 text-[11px] font-bold text-[#312b35]">Go Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Post a Ride" onBack={onBack} />

      {/* Step indicator */}
      <div className="flex items-center gap-1 px-5 py-3">
        {[1,2,3].map(s => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${step >= s ? 'bg-brand-purple' : 'bg-[#e9e3ef]'}`} />
        ))}
      </div>

      <div className="flex-1 space-y-4 px-5 pb-6">

        {/* Step 1: Route */}
        {step === 1 && (
          <>
            <p className="text-[12px] font-bold text-[#312b35]">Step 1 — Route & Vehicle</p>

            <div>
              <label className="block text-[10px] font-semibold text-[#554e5b] mb-1">Select Your Vehicle *</label>
              {verifiedVehicles.length === 0 ? (
                <p className="text-[10px] text-rose-600 bg-rose-50 rounded px-3 py-2">No verified vehicles. Add and verify a vehicle first.</p>
              ) : (
                <div className="space-y-2">
                  {verifiedVehicles.map(v => (
                    <button key={v.id} type="button" onClick={() => setSelectedVehicle(v.id)}
                      className={`flex w-full items-center gap-3 rounded-control border px-3 py-2.5 text-left transition ${selectedVehicle === v.id ? 'border-brand-purple bg-brand-lavender-strong' : 'border-brand-border bg-white'}`}
                    >
                      <Car size={16} className="text-brand-purple shrink-0" />
                      <div className="flex-1 text-[10px]">
                        <p className="font-bold text-[#312b35]">{v.registrationNumber}</p>
                        <p className="text-[#6e6872]">{v.vehicleModel} · {v.fuelType}</p>
                      </div>
                      {selectedVehicle === v.id && <CheckCircle2 size={15} className="text-brand-purple" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {['Origin', 'Destination'].map((lbl, i) => {
              const val = i === 0 ? origin : destination
              const setter = i === 0 ? setOrigin : setDestination
              return (
                <div key={lbl}>
                  <label className="block text-[10px] font-semibold text-[#554e5b] mb-1">{lbl} City *</label>
                  <input value={val} onChange={e => setter(e.target.value)} placeholder={`e.g. ${i === 0 ? 'Bengaluru' : 'Mysuru'}`}
                    className="w-full rounded-control border border-brand-border bg-white px-3 py-2 text-[11px] focus:outline-none focus:border-brand-purple"
                  />
                </div>
              )
            })}

            {/* Pickup stops */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] font-semibold text-[#554e5b]">Pickup Stops (max {MAX_STOPS})</label>
                <span className="text-[9px] text-[#a29ca6]">{pickupStops.length}/{MAX_STOPS}</span>
              </div>
              <div className="space-y-1.5">
                {pickupStops.map((s, i) => (
                  <div key={i} className="flex gap-1.5">
                    <input value={s} onChange={e => updateStop('pickup', i, e.target.value)} placeholder={`Pickup stop ${i + 1}`}
                      className="flex-1 rounded-control border border-brand-border bg-white px-3 py-1.5 text-[11px] focus:outline-none"
                    />
                    <button type="button" onClick={() => removeStop('pickup', i)} className="text-rose-400 hover:text-rose-600"><Trash2 size={14} /></button>
                  </div>
                ))}
                {pickupStops.length < MAX_STOPS && (
                  <button type="button" onClick={() => addStop('pickup')}
                    className="flex items-center gap-1 text-[10px] font-semibold text-brand-purple hover:underline"
                  >
                    <Plus size={12} /> Add pickup stop
                  </button>
                )}
              </div>
            </div>

            {/* Drop stops */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] font-semibold text-[#554e5b]">Drop Points (max {MAX_STOPS})</label>
                <span className="text-[9px] text-[#a29ca6]">{dropStops.length}/{MAX_STOPS}</span>
              </div>
              <div className="space-y-1.5">
                {dropStops.map((s, i) => (
                  <div key={i} className="flex gap-1.5">
                    <input value={s} onChange={e => updateStop('drop', i, e.target.value)} placeholder={`Drop point ${i + 1}`}
                      className="flex-1 rounded-control border border-brand-border bg-white px-3 py-1.5 text-[11px] focus:outline-none"
                    />
                    <button type="button" onClick={() => removeStop('drop', i)} className="text-rose-400 hover:text-rose-600"><Trash2 size={14} /></button>
                  </div>
                ))}
                {dropStops.length < MAX_STOPS && (
                  <button type="button" onClick={() => addStop('drop')}
                    className="flex items-center gap-1 text-[10px] font-semibold text-brand-purple hover:underline"
                  >
                    <Plus size={12} /> Add drop point
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Step 2: Schedule & Seats */}
        {step === 2 && (
          <>
            <p className="text-[12px] font-bold text-[#312b35]">Step 2 — Schedule & Seats</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-[#554e5b] mb-1">Departure Date *</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                  className="w-full rounded-control border border-brand-border bg-white px-2 py-2 text-[10px] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#554e5b] mb-1">Departure Time *</label>
                <input type="time" value={time} onChange={e => setTime(e.target.value)}
                  className="w-full rounded-control border border-brand-border bg-white px-2 py-2 text-[10px] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-[#554e5b] mb-1">Available Seats</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} type="button" onClick={() => setSeats(n)}
                    className={`h-9 w-9 rounded-control border text-[11px] font-bold transition ${seats === n ? 'border-brand-purple bg-brand-purple text-white' : 'border-brand-border bg-white text-[#312b35]'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Step 3: Fare preview + ₹100 deposit */}
        {step === 3 && (
          <>
            <p className="text-[12px] font-bold text-[#312b35]">Step 3 — Fare Preview & Deposit</p>

            <div className="rounded-xl border border-brand-border bg-white p-4 space-y-2.5">
              <p className="text-[11px] font-bold text-[#312b35]">CarPe Fare Preview</p>
              <div className="text-[10px] space-y-1.5 text-[#554e5b]">
                <div className="flex justify-between"><span>Fare per seat</span><span className="font-bold text-brand-purple">₹{pricePerSeat}</span></div>
                <div className="flex justify-between"><span>Seats offered</span><span className="font-bold">{seats}</span></div>
                <div className="flex justify-between"><span>Potential earnings</span><span className="font-bold text-emerald-700">₹{pricePerSeat * seats}</span></div>
                <div className="flex justify-between text-[#a29ca6]"><span>CarPe commission (₹10/pax)</span><span>-₹{10 * seats}</span></div>
                <div className="flex justify-between font-bold pt-1 border-t border-brand-border text-[#312b35]">
                  <span>Net driver earnings</span><span className="text-emerald-700">₹{(pricePerSeat - 10) * seats}</span>
                </div>
              </div>
              <p className="text-[9px] text-[#a29ca6]">Fare is set by CarPe based on distance and fuel type. Drivers cannot modify fares.</p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard size={16} className="text-amber-600" />
                <p className="text-[12px] font-bold text-amber-900">₹{DRIVER_DEPOSIT} Refundable Ride Deposit</p>
              </div>
              <p className="text-[10px] text-amber-800 mb-3">
                A deposit of ₹{DRIVER_DEPOSIT} is required to post this ride.
                It will be refunded when the ride is completed. If you cancel, the deposit is forfeited.
              </p>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={depositConfirmed} onChange={e => setDepositConfirmed(e.target.checked)} className="accent-brand-purple mt-0.5" />
                <span className="text-[10px] text-amber-800 font-semibold">
                  I confirm the ₹{DRIVER_DEPOSIT} deposit and agree to the ride terms.
                </span>
              </label>
            </div>
          </>
        )}

        {/* Step 4: Published */}
        {step === 4 && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 size={36} className="text-brand-green" />
            </div>
            <p className="text-[16px] font-extrabold text-[#231b2b]">Ride Published!</p>
            <p className="text-[11px] text-[#6e6872] max-w-[240px]">
              Your ride from <strong>{origin}</strong> to <strong>{destination}</strong> is now live.
              Passengers can discover and book seats.
            </p>
            <div className="rounded-xl bg-brand-lavender p-3 text-[10px] text-[#312b35] w-full text-left space-y-1">
              <p><strong>Date:</strong> {date} at {time}</p>
              <p><strong>Seats:</strong> {seats}</p>
              <p><strong>Fare/seat:</strong> ₹{pricePerSeat}</p>
              <p><strong>Deposit:</strong> ₹{DRIVER_DEPOSIT} held</p>
            </div>
            <button type="button" onClick={onBack}
              className="mt-2 rounded-control border border-brand-border px-8 py-2.5 text-[11px] font-bold text-[#312b35]"
            >
              Back to Dashboard
            </button>
          </div>
        )}

        {error && step !== 4 && (
          <p className="text-[10px] font-semibold text-rose-600 bg-rose-50 rounded px-2 py-1">{error}</p>
        )}
      </div>

      {step < 3 && (
        <div className="px-5 pb-6">
          <PrimaryButton onClick={() => {
            setError('')
            if (step === 1 && !validateStep1()) return
            if (step === 2 && !validateStep2()) return
            setStep(s => s + 1)
          }}>
            Continue
          </PrimaryButton>
        </div>
      )}

      {step === 3 && (
        <div className="px-5 pb-6">
          <PrimaryButton onClick={handlePublish}>Publish Ride & Pay ₹{DRIVER_DEPOSIT} Deposit</PrimaryButton>
        </div>
      )}
    </div>
  )
}
