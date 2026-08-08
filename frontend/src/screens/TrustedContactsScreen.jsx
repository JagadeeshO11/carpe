import { Pencil, Plus, UsersRound } from 'lucide-react'
import { useState } from 'react'
import ScreenHeader from '../components/ScreenHeader'
import IconBadge from '../components/IconBadge'
import PrimaryButton from '../components/PrimaryButton'

export default function TrustedContactsScreen({ formData, onBack, onNext, onContactAdd, onContactChange }) {
  const [editingIndex, setEditingIndex] = useState(null)

  return (
    <section className="flex min-h-full flex-col px-5 pb-8">
      <ScreenHeader title="Trusted Emergency Contacts" onBack={onBack} />
      <div className="pt-7 text-center">
        <IconBadge icon={UsersRound} label="Trusted contacts" />
        <h2 className="mt-5 text-[15px] font-extrabold tracking-[-0.03em]">Add 3 Trusted Contacts</h2>
        <p className="mt-2 text-[11px] leading-5 text-[#6e6872]">They will be notified in case of<br />emergency</p>
      </div>

      <div className="mt-5 space-y-1">
        {formData.contacts.map((contact, index) => (
          <div key={`${contact.phone}-${index}`} className="flex min-h-[56px] items-center gap-3 border-b border-[#f0ebf2] py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-purple text-[12px] font-bold text-white">{index + 1}</span>
            {editingIndex === index ? (
              <div className="min-w-0 flex-1 space-y-1">
                <input value={contact.name} onChange={(event) => onContactChange(index, 'name', event.target.value)} aria-label={`Contact ${index + 1} name`} className="w-full border-b border-brand-border bg-transparent text-[10px] font-semibold focus:outline-hidden" />
                <input value={contact.phone} onChange={(event) => onContactChange(index, 'phone', event.target.value)} aria-label={`Contact ${index + 1} phone`} className="w-full border-b border-brand-border bg-transparent text-[9px] text-[#77717b] focus:outline-hidden" />
              </div>
            ) : (
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-semibold text-[#312b35]">{contact.name}</p>
                <p className="mt-0.5 text-[9px] text-[#77717b]">{contact.phone}</p>
              </div>
            )}
            <button type="button" onClick={() => setEditingIndex(editingIndex === index ? null : index)} className="flex h-8 w-8 shrink-0 items-center justify-center text-[#5f5962] hover:text-brand-purple" aria-label={`Edit contact ${index + 1}`}>
              <Pencil aria-hidden="true" size={15} strokeWidth={1.8} />
            </button>
          </div>
        ))}
      </div>

      <button type="button" onClick={onContactAdd} className="mt-4 flex h-[40px] items-center justify-center gap-1 rounded-control border border-dashed border-brand-purple/45 text-[11px] font-bold text-brand-purple transition hover:bg-brand-lavender">
        <Plus aria-hidden="true" size={16} strokeWidth={2.3} /> Add Another Contact
      </button>
      <div className="mt-auto pt-4">
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
        <button type="button" onClick={onNext} className="mt-3 w-full text-center text-[10px] font-bold text-brand-purple hover:text-brand-purple-dark">Skip for now</button>
      </div>
    </section>
  )
}
