import { Mail, Phone, ShieldCheck, UsersRound } from 'lucide-react'
import RegistrationLayout from '../components/RegistrationLayout'

export default function PassengerAuthScreen({ formData, onBack, onNext, onFieldChange, onSocialSignIn, onUseEmail, error }) {
  const isEmailAuth = formData.authMethod === 'email'
  return (
    <RegistrationLayout
      title="Find your next shared ride"
      subtitle={isEmailAuth ? 'Sign in securely with your email address.' : 'Sign in securely with your mobile number.'}
      showProgress={false}
      onBack={onBack}
      actionLabel={isEmailAuth ? 'Send email OTP' : 'Send OTP'}
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
        <label htmlFor="passenger-auth" className="registration-field-label registration-field-label--left">{isEmailAuth ? 'Email address' : 'Mobile number'}</label>
        {isEmailAuth ? (
          <div className="auth-panel__input-with-icon">
            <Mail aria-hidden="true" size={21} />
            <input id="passenger-auth" type="email" autoComplete="email" value={formData.email} onChange={(event) => onFieldChange('email', event.target.value)} placeholder="you@example.com" />
          </div>
        ) : <div className="registration-phone-field">
          <span className="registration-country-code">+91</span>
          <Phone aria-hidden="true" size={22} className="auth-panel__field-icon" />
          <input id="passenger-auth" type="tel" inputMode="numeric" autoComplete="tel" value={formData.phone} onChange={(event) => onFieldChange('phone', event.target.value)} placeholder="Enter 10-digit mobile number" className="registration-input" />
        </div>}
        {error && <p className="registration-error registration-error--left" role="alert">{error}</p>}
        <p className="auth-panel__note"><ShieldCheck aria-hidden="true" size={16} /> We will send a one-time password to verify your account.</p>
      </div>
      <div className="auth-panel__social" aria-label="Other sign-in options">
        <div className="auth-panel__divider"><span>or continue with</span></div>
        <div className="auth-panel__social-buttons">
          <button type="button" className="auth-panel__provider auth-panel__provider--google" onClick={() => onSocialSignIn('google')}>
            <span className="auth-panel__provider-mark" aria-hidden="true">G</span> Google
          </button>
          <button type="button" className="auth-panel__provider auth-panel__provider--facebook" onClick={() => onSocialSignIn('facebook')}>
            <span className="auth-panel__provider-mark" aria-hidden="true">f</span> Facebook
          </button>
          <button type="button" className="auth-panel__provider auth-panel__provider--email" onClick={onUseEmail}>
            <Mail aria-hidden="true" size={18} /> Email
          </button>
        </div>
        <p className="auth-panel__social-note">Your social account is only used to sign you in securely.</p>
      </div>
      <p className="auth-panel__route-hint">Already a passenger? Use the same number to continue.</p>
    </RegistrationLayout>
  )
}
