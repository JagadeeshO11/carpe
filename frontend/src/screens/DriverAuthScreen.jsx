import { Car, LogIn, Mail, Phone, ShieldCheck, UserPlus } from 'lucide-react'
import RegistrationLayout from '../components/RegistrationLayout'

export default function DriverAuthScreen({ formData, onBack, onNext, onFieldChange, onRegistrationModeChange, onSocialSignIn, onUseEmail, error }) {
  const isRegistering = formData.registrationMode === 'register'
  const isEmailAuth = !isRegistering && formData.authMethod === 'email'

  return (
    <RegistrationLayout
      title={isRegistering ? 'Create your driver account' : 'Driver sign in'}
      subtitle={isRegistering ? 'Start your driver verification journey.' : isEmailAuth ? 'Sign in securely with your email address.' : 'Access your driver dashboard securely.'}
      showProgress={false}
      onBack={onBack}
      actionLabel={isRegistering ? 'Continue to OTP' : isEmailAuth ? 'Send email OTP' : 'Send OTP'}
      onAction={onNext}
      actionHint={error}
      className="auth-panel auth-panel--driver"
    >
      <div className="auth-panel__hero">
        <span className="auth-panel__icon"><Car aria-hidden="true" size={35} /></span>
        <h2>Driver portal</h2>
        <p>{isRegistering ? 'Create your driver account and complete verification.' : 'Sign in to manage rides and earnings.'}</p>
      </div>
      <div className="auth-panel__switch" role="tablist" aria-label="Driver authentication">
        <button type="button" role="tab" aria-selected={!isRegistering} onClick={() => onRegistrationModeChange('login')} className={!isRegistering ? 'auth-panel__switch-button auth-panel__switch-button--active' : 'auth-panel__switch-button'}><LogIn size={17} /> Sign in</button>
        <button type="button" role="tab" aria-selected={isRegistering} onClick={() => onRegistrationModeChange('register')} className={isRegistering ? 'auth-panel__switch-button auth-panel__switch-button--active' : 'auth-panel__switch-button'}><UserPlus size={17} /> Register</button>
      </div>
      <div className="auth-panel__card">
        <label htmlFor="driver-auth" className="registration-field-label registration-field-label--left">{isEmailAuth ? 'Email address' : 'Mobile number'}</label>
        {isEmailAuth ? <div className="auth-panel__input-with-icon"><Mail aria-hidden="true" size={21} /><input id="driver-auth" type="email" autoComplete="email" value={formData.email} onChange={(event) => onFieldChange('email', event.target.value)} placeholder="you@example.com" /></div> : <div className="registration-phone-field">
          <span className="registration-country-code">+91</span>
          <Phone aria-hidden="true" size={22} className="auth-panel__field-icon" />
          <input id="driver-auth" type="tel" inputMode="numeric" autoComplete="tel" value={formData.phone} onChange={(event) => onFieldChange('phone', event.target.value)} placeholder="Enter 10-digit mobile number" className="registration-input" />
        </div>}
        {error && <p className="registration-error registration-error--left" role="alert">{error}</p>}
        <p className="auth-panel__note"><ShieldCheck aria-hidden="true" size={16} /> {isRegistering ? 'We will verify your mobile number before identity checks.' : 'OTP sign-in only. No onboarding needed.'}</p>
      </div>
      {!isRegistering && (
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
          <p className="auth-panel__social-note">Driver verification remains required before you can post rides.</p>
        </div>
      )}
    </RegistrationLayout>
  )
}
