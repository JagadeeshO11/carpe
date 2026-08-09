import { CheckCircle2, Copy, Car, Package, MapPin, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import PrimaryButton from '../components/PrimaryButton'
import ScreenHeader from '../components/ScreenHeader'
import { PASSENGER_CONDUCT_RULES } from '../data/onboardingData'

export default function BookingConfirmScreen({ booking, ride, onViewActiveRide, onBack }) {
  const [copied, setCopied] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [gallerySlide, setGallerySlide] = useState(0)

  const photos = ride?.vehiclePhotos ? Object.entries(ride.vehiclePhotos).filter(([, v]) => v) : []

  const copyOtp = () => {
    navigator.clipboard?.writeText(booking.otp).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Booking Confirmed!" onBack={onBack} />

      <div className="flex-1 space-y-4 px-5 pb-6 pt-4">
        {/* Success banner */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-brand-green p-4 text-white shadow-md text-center">
          <CheckCircle2 size={32} className="mx-auto mb-2" />
          <h2 className="text-[15px] font-extrabold">Booking Confirmed!</h2>
          <p className="mt-1 text-[10px] text-white/80">
            {ride?.origin} → {ride?.destination} · {booking?.date} · {booking?.time}
          </p>
        </div>

        {/* Journey OTP */}
        <div className="rounded-xl border-2 border-brand-purple/30 bg-brand-lavender-strong p-4 text-center">
          <p className="text-[10px] font-semibold text-[#5e5864] mb-2">Your Journey OTP — Show to Driver at Pickup</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-[36px] font-extrabold tracking-[0.15em] text-brand-purple">{booking?.otp}</span>
            <button type="button" onClick={copyOtp} className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/20 transition">
              {copied ? <CheckCircle2 size={16} className="text-brand-green" /> : <Copy size={16} />}
            </button>
          </div>
          <p className="mt-1 text-[9px] text-[#a29ca6]">Do not share with anyone other than your driver.</p>
        </div>

        {/* Booking details */}
        <div className="rounded-xl border border-brand-border bg-white p-3.5 space-y-2">
          <p className="text-[11px] font-bold text-[#312b35]">Booking Details</p>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {[
              ['Pickup', booking?.pickupPoint],
              ['Drop', booking?.dropPoint],
              ['Seat', booking?.seatLabel],
              ['Trolley', booking?.hasTrolley ? '1 Reserved' : 'Not needed'],
              ['Advance Paid', `₹${booking?.advance}`],
              ['Balance to Driver', `₹${booking?.remainingToPay}`],
            ].map(([label, val]) => (
              <div key={label}>
                <p className="text-[#817b84]">{label}</p>
                <p className="font-semibold text-[#312b35]">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle gallery */}
        <div className="rounded-xl border border-brand-border bg-white p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#312b35]">
              <Car size={14} className="text-brand-purple" />
              <span>Vehicle: {ride?.vehicleModel}</span>
            </div>
            <button
              type="button"
              onClick={() => setShowGallery(!showGallery)}
              className="text-[10px] font-bold text-brand-purple hover:underline"
            >
              {showGallery ? 'Hide' : 'View'} Photos
            </button>
          </div>

          {showGallery && (
            <div className="mt-3">
              {photos.length > 0 ? (
                <div className="space-y-2">
                  <div className="relative h-32 w-full rounded-lg bg-brand-lavender flex items-center justify-center text-[10px] text-[#a29ca6]">
                    <Car size={30} className="text-brand-purple/30" />
                    <span className="absolute bottom-2 text-[9px]">Photo preview not available in prototype</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-[10px] text-[#a29ca6]">
                  <Car size={24} className="text-brand-purple/30 mb-1" />
                  No photos uploaded yet for this vehicle.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Passenger conduct rules */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-[11px] font-bold text-amber-900 mb-2">Passenger Code of Conduct</p>
          <ul className="space-y-1.5">
            {PASSENGER_CONDUCT_RULES.map((rule, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[10px] text-amber-800">
                <span className="mt-0.5 text-amber-500 shrink-0">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-5 pb-6">
        <PrimaryButton onClick={onViewActiveRide}>Track My Ride</PrimaryButton>
      </div>
    </div>
  )
}
