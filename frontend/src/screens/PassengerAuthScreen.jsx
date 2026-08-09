import { ArrowRight, Phone, ShieldCheck, UsersRound } from 'lucide-react'
import RegistrationLayout from '../components/RegistrationLayout'

export default function PassengerAuthScreen({ formData, onBack, onNext, onFieldChange, error }) {
  return (
    <RegistrationLayout
      title="Find your next shared ride"
      subtitle="Sign in securely with your mobile number."
      showProgress={false}
      onBack={onBack}
      actionLabel="Send OTP"
      onAction={onNext}
      actionHint={error}
      className="auth-panel auth-panel--passenger"
    >
      <div className="auth-panel__hero">
        <span className="auth-panel__icon"><UsersRound aria-hidden="true" size={35} /></span>
        <h2>Passenger access</h2>
        <p>Verify your number to browse and book rides.</p>
      </div>
      <div className="auth-panel__card">
        <label htmlFor="passenger-phone" className="registration-field-label registration-field-label--left">Mobile number</label>
        <div className="registration-phone-field">
          <span className="registration-country-code">+91</span>
          <Phone aria-hidden="true" size={22} className="auth-panel__field-icon" />
          <input
            id="passenger-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={formData.phone}
            onChange={(event) => onFieldChange('phone', event.target.value)}
            placeholder="Enter 10-digit mobile number"
            className="registration-input"
          />
        </div>
        {error && <p className="registration-error registration-error--left" role="alert">{error}</p>}
        <p className="auth-panel__note"><ShieldCheck aria-hidden="true" size={16} /> We will send a one-time password to verify your account.</p>
      </div>
      <p className="auth-panel__route-hint">Already a passenger? Use the same number to continue.</p>
    </RegistrationLayout>
  )
}
