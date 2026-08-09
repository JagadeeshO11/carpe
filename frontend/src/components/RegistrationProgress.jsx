import { Check, CircleCheck, CreditCard, Mail, Smartphone } from 'lucide-react'

const REGISTRATION_STEPS = [
  { id: 'mobileOtp', label: 'Mobile OTP', icon: Smartphone },
  { id: 'aadhaarEkyc', label: 'Aadhaar eKYC', icon: CreditCard },
  { id: 'contactInfo', label: 'Contact Info', icon: Mail },
  { id: 'complete', label: 'Complete', icon: CircleCheck },
]

export default function RegistrationProgress({ currentStep }) {
  const activeIndex = Math.max(0, REGISTRATION_STEPS.findIndex((step) => step.id === currentStep))

  return (
    <ol className="registration-progress" aria-label="Registration progress">
      {REGISTRATION_STEPS.map(({ id, label, icon: Icon }, index) => {
        const isComplete = index < activeIndex
        const isActive = index === activeIndex
        const status = isComplete ? 'complete' : isActive ? 'active' : 'upcoming'

        return (
          <li key={id} className={`registration-progress__item registration-progress__item--${status}`}>
            <span className="registration-progress__connector" aria-hidden="true" />
            <span
              className="registration-progress__icon"
              aria-current={isActive ? 'step' : undefined}
              title={label}
            >
              {isComplete ? <Check aria-hidden="true" size={19} strokeWidth={3} /> : <Icon aria-hidden="true" size={18} strokeWidth={2.2} />}
            </span>
            <span className="registration-progress__label">{label}</span>
          </li>
        )
      })}
    </ol>
  )
}
