import { useState } from 'react'
import { Navigation, Phone, ShieldAlert, CheckCircle2, Clock, MapPin, ChevronRight } from 'lucide-react'
import PrimaryButton from '../components/PrimaryButton'
import ScreenHeader from '../components/ScreenHeader'

const JOURNEY_STEPS = [
  { key: 'BOOKED', label: 'Booking Confirmed' },
  { key: 'OTP_PENDING', label: 'OTP Pending' },
  { key: 'VERIFIED', label: 'OTP Verified' },
  { key: 'JOURNEY_STARTED', label: 'Journey Started' },
  { key: 'COMPLETED', label: 'Completed' },
]

export default function ActiveRideScreen({ booking, ride, trustedContacts = [], onComplete, onBack }) {
  const [journeyStatus, setJourneyStatus] = useState('BOOKED')
  const [sosTriggered, setSosTriggered] = useState(false)
  const [sosModal, setSosModal] = useState(false)

  const currentStepIdx = JOURNEY_STEPS.findIndex(s => s.key === journeyStatus)

  const handleSos = () => {
    setSosTriggered(true)
    setSosModal(true)
  }

  const advanceStatus = () => {
    const next = JOURNEY_STEPS[currentStepIdx + 1]
    if (next) setJourneyStatus(next.key)
    if (next?.key === 'COMPLETED' && onComplete) onComplete()
  }

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Active Ride" onBack={onBack} />

      <div className="flex-1 space-y-4 px-5 pb-6 pt-4">

        {/* Status header */}
        <div className={`rounded-2xl p-4 text-white shadow-md ${journeyStatus === 'COMPLETED' ? 'bg-gradient-to-br from-emerald-500 to-brand-green' : 'bg-gradient-to-br from-brand-purple to-brand-purple-dark'}`}>
          <div className="flex items-center gap-2">
            <Navigation size={18} className={journeyStatus === 'JOURNEY_STARTED' ? 'animate-pulse' : ''} />
            <div>
              <p className="text-[13px] font-bold">{JOURNEY_STEPS[currentStepIdx]?.label}</p>
              <p className="text-[10px] text-white/80">{ride?.origin} → {ride?.destination}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            {JOURNEY_STEPS.map((step, i) => (
              <div key={step.key} className={`h-1.5 flex-1 rounded-full transition-all ${i <= currentStepIdx ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>

        {/* Journey OTP display */}
        {(journeyStatus === 'BOOKED' || journeyStatus === 'OTP_PENDING') && (
          <div className="rounded-xl border-2 border-brand-purple/30 bg-brand-lavender-strong p-3 text-center">
            <p className="text-[10px] text-[#5e5864]">Show this OTP to driver to start journey</p>
            <p className="text-[30px] font-extrabold tracking-[0.2em] text-brand-purple mt-1">{booking?.otp}</p>
          </div>
        )}

        {/* Booking info */}
        <div className="rounded-xl border border-brand-border bg-white p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#312b35]">
            <MapPin size={13} className="text-brand-purple shrink-0" />
            <span>{booking?.pickupPoint}</span>
            <ChevronRight size={12} className="text-brand-purple" />
            <span>{booking?.dropPoint}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#6e6872]">
            <span>Seat: <strong>{booking?.seatLabel}</strong></span>
            <span>{ride?.time} · {ride?.date}</span>
          </div>
        </div>

        {/* Driver info */}
        <div className="rounded-xl border border-brand-border bg-white p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple text-white text-[13px] font-bold">
              {ride?.driverName?.charAt(0) || 'D'}
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#312b35]">{ride?.driverName}</p>
              <p className="text-[9px] text-[#77717b]">{ride?.vehicleModel} · {ride?.vehicleNumber}</p>
            </div>
          </div>
          <a href={`tel:${ride?.driverPhone}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
            <Phone size={14} />
          </a>
        </div>

        {/* Step-by-step journey status */}
        <div className="rounded-xl border border-brand-border bg-white p-3.5">
          <p className="text-[11px] font-bold text-[#312b35] mb-3">Journey Progress</p>
          <div className="space-y-2.5">
            {JOURNEY_STEPS.map((step, i) => {
              const done = i < currentStepIdx
              const active = i === currentStepIdx
              return (
                <div key={step.key} className="flex items-center gap-2.5 text-[10px]">
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${done ? 'bg-brand-green' : active ? 'bg-brand-purple' : 'bg-[#e9e3ef]'}`}>
                    {done ? <CheckCircle2 size={12} className="text-white" /> : <span className={`h-2 w-2 rounded-full ${active ? 'bg-white animate-ping' : 'bg-[#bbb]'}`} />}
                  </div>
                  <span className={`font-medium ${active ? 'text-brand-purple font-bold' : done ? 'text-emerald-700' : 'text-[#a29ca6]'}`}>
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Emergency SOS */}
        {journeyStatus !== 'COMPLETED' && (
          <button
            type="button"
            onClick={handleSos}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[12px] font-extrabold transition ${sosTriggered ? 'bg-rose-100 text-rose-700 border border-rose-300' : 'bg-rose-600 text-white shadow-md hover:bg-rose-700'}`}
          >
            <ShieldAlert size={18} />
            {sosTriggered ? 'SOS Alert Sent ✓' : 'EMERGENCY SOS'}
          </button>
        )}

        {/* Advance status */}
        {journeyStatus !== 'COMPLETED' && (
          <button
            type="button"
            onClick={advanceStatus}
            className="w-full rounded-xl border border-brand-purple/30 bg-brand-lavender py-2.5 text-[10px] font-bold text-brand-purple hover:bg-brand-lavender-strong transition"
          >
            Simulate: {JOURNEY_STEPS[currentStepIdx + 1]?.label || 'Complete'}
          </button>
        )}

        {journeyStatus === 'COMPLETED' && (
          <div className="rounded-xl border border-brand-green/30 bg-emerald-50 p-4 text-center">
            <CheckCircle2 size={28} className="mx-auto text-brand-green mb-2" />
            <p className="text-[13px] font-bold text-emerald-900">Ride Completed!</p>
            <p className="text-[10px] text-emerald-700 mt-1">Please rate your driver below.</p>
          </div>
        )}
      </div>

      {journeyStatus === 'COMPLETED' && (
        <div className="px-5 pb-6">
          <PrimaryButton onClick={onComplete}>Rate Your Driver</PrimaryButton>
        </div>
      )}

      {/* SOS Modal */}
      {sosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-[320px] rounded-2xl bg-white p-5 text-center shadow-2xl">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 animate-bounce">
              <ShieldAlert size={24} className="text-rose-600" />
            </div>
            <h3 className="text-[15px] font-extrabold text-rose-900">Emergency Alert Sent!</h3>
            <p className="mt-1 text-[11px] text-[#6e6872]">Your location has been shared with:</p>
            <div className="mt-2 text-left space-y-1">
              {trustedContacts.map((c, i) => (
                <p key={i} className="text-[10px] text-rose-800 bg-rose-50 rounded px-2 py-1">
                  ✓ {c.name} — {c.phone}
                </p>
              ))}
            </div>
            <button type="button" onClick={() => setSosModal(false)} className="mt-4 w-full rounded-control bg-rose-600 py-2.5 text-[11px] font-bold text-white">
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
