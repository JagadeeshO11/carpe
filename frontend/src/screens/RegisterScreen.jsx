import { Phone, ShieldCheck } from 'lucide-react'
import RegistrationLayout from '../components/RegistrationLayout'

export default function RegisterScreen({ formData, onBack, onNext, onFieldChange, error }) {
  return (
    <RegistrationLayout
      title="C2C Personal Registration"
      subtitle="Step 1: Mobile & OTP Verification"
      currentStep="mobileOtp"
      onBack={onBack}
      actionLabel="Send OTP"
      onAction={onNext}
      actionHint={error}
    >
      <div className="registration-card registration-card--form registration-card--centered">
        <div className="registration-card__icon registration-card__icon--stacked">
          <ShieldCheck aria-hidden="true" size={38} strokeWidth={2.1} />
          <Phone aria-hidden="true" size={23} strokeWidth={2.2} className="registration-card__phone" />
        </div>
        <label htmlFor="register-phone" className="registration-field-label registration-field-label--left">Mobile Number</label>
        <div className="registration-phone-field">
          <span className="registration-country-code" aria-label="India country code">🇮🇳 +91</span>
          <input
            id="register-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={formData.phone}
            onChange={(event) => onFieldChange('phone', event.target.value)}
            placeholder="Enter Your Mobile Number"
            className="registration-input"
          />
        </div>
        {error && <p className="registration-error registration-error--left" role="alert">{error}</p>}
        <p className="registration-card__hint">We will send a 6-digit One Time Password (OTP) for verification.</p>
      </div>
    </RegistrationLayout>
  )
}
