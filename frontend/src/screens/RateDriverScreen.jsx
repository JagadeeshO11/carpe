import { useState } from 'react'
import { Star, AlertCircle } from 'lucide-react'
import PrimaryButton from '../components/PrimaryButton'
import ScreenHeader from '../components/ScreenHeader'
import { CARPE_COMMISSION, CARPE_COMMISSION_PENALTY } from '../data/carpoolData'

export default function RateDriverScreen({ booking, ride, onSubmit, onBack }) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isPenaltyRating = rating > 0 && rating <= 3
  const nextCommission = isPenaltyRating ? CARPE_COMMISSION_PENALTY : CARPE_COMMISSION

  const handleSubmit = () => {
    if (!rating) return
    setSubmitted(true)
    onSubmit({ bookingId: booking?.id, rating, comment })
  }

  if (submitted) {
    return (
      <div className="flex min-h-full flex-col">
        <ScreenHeader title="Rating Submitted" onBack={onBack} />
        <div className="flex flex-1 flex-col items-center justify-center px-5 text-center space-y-4">
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={28} className={i <= rating ? 'fill-amber-400 text-amber-400' : 'text-[#e0dbe4]'} />
            ))}
          </div>
          <p className="text-[15px] font-extrabold text-[#231b2b]">Thanks for your feedback!</p>
          {isPenaltyRating && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-[10px] text-amber-800">
              <p className="font-bold mb-1">⚠ Low Rating — Commission Notice</p>
              <p>
                Since you gave {rating} stars, CarPe's commission on the driver's
                <strong> next ride</strong> will be ₹{CARPE_COMMISSION_PENALTY} instead of ₹{CARPE_COMMISSION}.
                Driver advance for next ride: ₹{50 - CARPE_COMMISSION_PENALTY}.
              </p>
              <p className="mt-1 text-amber-700">This reverts to normal (₹{CARPE_COMMISSION}) after the next ride.</p>
            </div>
          )}
          <button type="button" onClick={onBack}
            className="mt-4 w-full rounded-control border border-brand-border py-2.5 text-[11px] font-bold text-[#312b35]"
          >
            Back to History
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Rate Your Driver" onBack={onBack} />

      <div className="flex-1 space-y-5 px-5 pb-6 pt-6">
        {/* Driver info */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple text-[22px] font-extrabold text-white shadow-md">
            {ride?.driverName?.charAt(0) || 'D'}
          </div>
          <p className="mt-2 text-[14px] font-extrabold text-[#231b2b]">{ride?.driverName}</p>
          <p className="text-[10px] text-[#6e6872]">{ride?.vehicleModel} · {booking?.pickupPoint} → {booking?.dropPoint}</p>
        </div>

        {/* Star rating */}
        <div>
          <p className="mb-3 text-center text-[11px] font-semibold text-[#554e5b]">How was your ride?</p>
          <div className="flex items-center justify-center gap-2">
            {[1,2,3,4,5].map(i => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(0)}
              >
                <Star
                  size={36}
                  className={`transition ${i <= (hovered || rating) ? 'fill-amber-400 text-amber-400' : 'text-[#e0dbe4]'}`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="mt-2 text-center text-[11px] font-bold text-[#312b35]">
              {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
            </p>
          )}
        </div>

        {/* Penalty notice */}
        {isPenaltyRating && (
          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[10px] text-amber-800">
            <AlertCircle size={15} className="shrink-0 text-amber-600 mt-0.5" />
            <p>Ratings of 3 stars or below will increase CarPe's commission to ₹{CARPE_COMMISSION_PENALTY} on the driver's next ride.</p>
          </div>
        )}

        {/* Comment */}
        <div>
          <label className="block text-[10px] font-semibold text-[#554e5b] mb-1.5">Comments (optional)</label>
          <textarea
            rows={3}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Share details about your experience..."
            className="w-full rounded-control border border-brand-border bg-white px-3 py-2 text-[11px] text-[#312b35] placeholder:text-[#a29ca6] focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 resize-none"
          />
        </div>
      </div>

      <div className="px-5 pb-6">
        <PrimaryButton onClick={handleSubmit} disabled={!rating}>
          Submit Rating
        </PrimaryButton>
      </div>
    </div>
  )
}
