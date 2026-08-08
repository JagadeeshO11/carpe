import { CalendarDays, Mail, UserRound } from 'lucide-react'
import ScreenHeader from '../components/ScreenHeader'
import IconBadge from '../components/IconBadge'
import PrimaryButton from '../components/PrimaryButton'
import { FormField } from '../components/FormField'

export default function PersonalDetailsScreen({ formData, onBack, onNext, onFieldChange }) {
  return (
    <section className="flex min-h-full flex-col px-5 pb-8">
      <ScreenHeader title="Personal Details" onBack={onBack} />
      <div className="pt-9 text-center">
        <IconBadge icon={UserRound} label="Personal details" />
        <h2 className="mt-5 text-[15px] font-extrabold tracking-[-0.03em]">Tell us about yourself</h2>
      </div>

      <div className="mt-6 space-y-4">
        <FormField icon={UserRound} placeholder="Full Name" value={formData.fullName} onChange={(event) => onFieldChange('fullName', event.target.value)} />
        <FormField icon={Mail} placeholder="Email Address (optional)" type="email" value={formData.email} onChange={(event) => onFieldChange('email', event.target.value)} />
        <FormField icon={CalendarDays} placeholder="Date of Birth" type="date" value={formData.dateOfBirth} onChange={(event) => onFieldChange('dateOfBirth', event.target.value)} />
        <label className="flex min-h-[40px] items-center gap-2 rounded-control border border-brand-border bg-white px-3 transition focus-within:border-brand-purple/60 focus-within:ring-2 focus-within:ring-brand-purple/10">
          <UserRound aria-hidden="true" size={15} strokeWidth={2} className="shrink-0 text-brand-purple" />
          <select value={formData.gender} onChange={(event) => onFieldChange('gender', event.target.value)} aria-label="Gender" className="min-w-0 flex-1 appearance-none bg-transparent text-[11px] text-[#6e6872] focus:outline-hidden">
            <option value="">Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Prefer not to say</option>
          </select>
          <span className="text-[16px] text-brand-purple" aria-hidden="true">⌄</span>
        </label>
      </div>

      <div className="mt-auto pt-9">
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </section>
  )
}
