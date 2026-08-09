import { Mail } from 'lucide-react'
import RegistrationLayout from '../components/RegistrationLayout'

export default function ContactInfoScreen({ formData, onBack, onNext, onFieldChange, error }) {
  return (
    <RegistrationLayout
      title="Contact Information"
      subtitle="Step 3: Email & notification settings"
      currentStep="contactInfo"
      onBack={onBack}
      actionLabel="Confirm Consent & Complete"
      onAction={onNext}
      actionHint={error}
    >
      <div className="registration-card registration-card--form">
        <label htmlFor="contact-email" className="registration-field-label">Email Address (Optional)</label>
        <div className="registration-input-field registration-input-field--icon">
          <Mail aria-hidden="true" size={23} strokeWidth={2.1} />
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(event) => onFieldChange('email', event.target.value)}
            placeholder="your.email@example.com"
            className="registration-input"
          />
        </div>
        {error && <p className="registration-error" role="alert">{error}</p>}
        <p className="registration-card__notice">Your email is used to send completed eSigned PDF agreement copies and audit timestamps.</p>
      </div>
    </RegistrationLayout>
  )
}
