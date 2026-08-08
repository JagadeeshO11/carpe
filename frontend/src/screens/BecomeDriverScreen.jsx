import { CarFront } from 'lucide-react'
import ScreenHeader from '../components/ScreenHeader'
import IconBadge from '../components/IconBadge'
import PrimaryButton from '../components/PrimaryButton'
import { DRIVER_OPTIONS } from '../data/onboardingData'

export default function BecomeDriverScreen({ formData, onBack, onNext, onFieldChange }) {
  const selectOption = (value) => onFieldChange('driverIntent', value)

  return (
    <section className="flex min-h-full flex-col px-5 pb-8">
      <ScreenHeader title="Become a Driver?" onBack={onBack} />
      <div className="pt-9 text-center">
        <IconBadge icon={CarFront} label="Driver option" />
        <h2 className="mt-5 text-[15px] font-extrabold tracking-[-0.03em]">Want to offer rides too?</h2>
        <p className="mt-2 text-[11px] leading-5 text-[#6e6872]">If you plan to become a driver later,<br />you can add your details now.</p>
      </div>

      <div className="mt-7 space-y-4" role="radiogroup" aria-label="Driver preference">
        {DRIVER_OPTIONS.map((option) => {
          const selected = formData.driverIntent === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => selectOption(option.id)}
              className={`flex min-h-[88px] w-full items-start justify-between rounded-control border px-4 py-4 text-left transition ${selected ? 'border-brand-purple bg-brand-lavender-strong' : 'border-[#eee9f0] bg-white hover:border-brand-purple/35'}`}
            >
              <span>
                <span className="block text-[11px] font-bold text-[#312b35]">{option.title}</span>
                <span className="mt-2 block text-[10px] leading-4 text-[#77717b]">{option.description[0]}<br />{option.description[1]}</span>
              </span>
              <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-brand-purple' : 'border-[#d9d4dc]'}`} aria-hidden="true">
                {selected && <span className="h-2 w-2 rounded-full bg-brand-purple" />}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-auto pt-7">
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </section>
  )
}
