import { useState } from 'react'
import { AlertTriangle, CheckCircle2, ChevronRight, MapPin, Shield, UserRound } from 'lucide-react'

export default function PassengerProfileScreen({ formData, onGoToOnboarding, onEmergencySos }) {
  const [showSosModal, setShowSosModal] = useState(false)

  const contacts = formData.contacts || []

  const handleTriggerSos = () => {
    setShowSosModal(true)
    onEmergencySos?.()
  }

  return (
    <div className="space-y-4 pb-4">
      <div className="rounded-2xl border border-brand-purple/20 bg-gradient-to-br from-brand-lavender-strong via-white to-brand-lavender p-4 text-center shadow-xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple text-[22px] font-extrabold text-white shadow-md">
          {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'P'}
        </div>
        <h2 className="mt-2 text-[15px] font-extrabold text-[#241c2c]">{formData.fullName || 'Demo Passenger'}</h2>
        <p className="text-[10px] font-bold text-brand-purple">Passenger Profile</p>
        <p className="text-[10px] text-[#6e6872]">
          {formData.phone || '+91 00000 00000'} | {formData.email || 'passenger@example.com'}
        </p>

        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[9px] font-bold text-emerald-800">
            <CheckCircle2 size={11} className="text-emerald-700" /> Identity Verified
          </span>
          <span className="flex items-center gap-1 rounded-full bg-brand-purple/10 px-2.5 py-0.5 text-[9px] font-bold text-brand-purple">
            <Shield size={11} /> Safety Score 100%
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-brand-border bg-white p-3.5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#312b35]">
            <UserRound size={15} className="text-brand-purple" />
            <span>Passenger Travel Profile</span>
          </div>
          <span className="text-[9px] font-bold text-brand-purple">Verified Passenger</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] bg-brand-lavender p-2.5 rounded-lg">
          <div>
            <span className="block text-[#817b84] text-[9px]">Default Role</span>
            <span className="font-bold text-[#2d2731]">Passenger</span>
          </div>
          <div>
            <span className="block text-[#817b84] text-[9px]">Booking Status</span>
            <span className="font-bold text-[#2d2731]">Ready to Book</span>
          </div>
          <div>
            <span className="block text-[#817b84] text-[9px]">Identity</span>
            <span className="font-bold text-[#2d2731]">Verified</span>
          </div>
          <div>
            <span className="block text-[#817b84] text-[9px]">Safety Contacts</span>
            <span className="font-bold text-[#2d2731]">{contacts.length || 3} Linked</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-brand-border bg-white p-3.5 space-y-2 shadow-xs">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#312b35]">
          <MapPin size={15} className="text-brand-purple" />
          <span>Passenger Preferences</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] bg-[#f9f7fc] p-2.5 rounded-lg">
          <div>
            <span className="block text-[#817b84] text-[9px]">Seat Preference</span>
            <span className="font-bold text-[#2d2731]">Any available</span>
          </div>
          <div>
            <span className="block text-[#817b84] text-[9px]">Luggage</span>
            <span className="font-bold text-[#2d2731]">1 small bag</span>
          </div>
          <div>
            <span className="block text-[#817b84] text-[9px]">Pickup Flexibility</span>
            <span className="font-bold text-[#2d2731]">40 minutes</span>
          </div>
          <div>
            <span className="block text-[#817b84] text-[9px]">Payment</span>
            <span className="font-bold text-[#2d2731]">Advance enabled</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="text-rose-600 shrink-0" size={18} />
          <div>
            <p className="text-[11px] font-bold text-rose-900">Emergency SOS Alert</p>
            <p className="text-[9px] text-rose-700">1-tap alert to trusted contacts</p>
          </div>
        </div>
        <button type="button" onClick={handleTriggerSos} className="rounded-control bg-rose-600 px-3 py-1.5 text-[10px] font-bold text-white shadow-xs hover:bg-rose-700">
          SOS Alert
        </button>
      </div>

      <div className="rounded-xl border border-brand-border bg-white p-3.5 space-y-2 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#312b35]">Trusted Emergency Contacts</span>
          <span className="text-[9px] font-bold text-brand-purple">{contacts.length || 3} Contacts</span>
        </div>

        <div className="space-y-1.5 pt-1">
          {contacts.map((contact, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg bg-[#f9f7fc] px-2.5 py-1.5 text-[10px]">
              <div>
                <p className="font-bold text-[#2a2430]">{contact.name}</p>
                <p className="text-[9px] text-[#77717b]">{contact.phone}</p>
              </div>
              <a href={`tel:${contact.phone}`} className="text-brand-purple hover:underline font-bold text-[9px]">Call</a>
            </div>
          ))}
        </div>
      </div>

      <button type="button" onClick={onGoToOnboarding} className="flex w-full items-center justify-between rounded-xl border border-brand-border bg-white p-3 text-[11px] font-bold text-[#312b35] hover:bg-brand-lavender transition">
        <span>Re-configure Passenger Profile</span>
        <ChevronRight size={16} className="text-brand-purple" />
      </button>

      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-[320px] rounded-2xl bg-white p-4 text-center shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-2 animate-bounce">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-[15px] font-extrabold text-rose-900">Emergency SOS Sent!</h3>
            <p className="mt-1 text-[11px] text-[#5e5864]">Your live location was sent to your trusted contacts.</p>
            <button type="button" onClick={() => setShowSosModal(false)} className="mt-4 w-full rounded-control bg-rose-600 py-2 text-[11px] font-bold text-white">
              Dismiss Alert
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
