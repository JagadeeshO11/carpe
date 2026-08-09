import { ArrowRight, CheckCircle2, ChevronDown, Chrome, Mail, Phone, ShieldCheck, UserRound, UserRoundPlus } from 'lucide-react'
import RegistrationFeatureGrid from '../components/RegistrationFeatureGrid'
import RegistrationLayout from '../components/RegistrationLayout'

export default function WelcomeScreen({ formData, onNext, onOpenAdmin, onFieldChange, onRegistrationModeChange, error }) {
  const registrationMode = formData.registrationMode || 'login'

  return (
    <RegistrationLayout showBack={false} showProgress={false} className="registration-screen--welcome">
      <div className="registration-welcome">
        <h1 className="registration-welcome__title">Welcome Back! <span aria-hidden="true">👋</span></h1>
        <p className="registration-welcome__subtitle">Secure access to your digital sale agreements.</p>

        <div className="registration-mode" role="tablist" aria-label="Registration mode">
          <button
            type="button"
            role="tab"
            aria-selected={registrationMode === 'login'}
            onClick={() => (onRegistrationModeChange || onFieldChange)('login')}
            className={`registration-mode__button ${registrationMode === 'login' ? 'registration-mode__button--active' : ''}`}
          >
            <span className="registration-mode__button-content"><UserRound aria-hidden="true" size={20} /> Login</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={registrationMode === 'register'}
            onClick={() => (onRegistrationModeChange || onFieldChange)('register')}
            className={`registration-mode__button ${registrationMode === 'register' ? 'registration-mode__button--active' : ''}`}
          >
            <span className="registration-mode__button-content"><UserRoundPlus aria-hidden="true" size={20} /> Register</span>
          </button>
        </div>

        <div className="registration-entry-field">
          <label htmlFor="entry-phone" className="registration-field-label">Mobile Number</label>
          <div className="registration-phone-field">
            <button type="button" className="registration-country-code" aria-label="Country code India">
              +91 <ChevronDown aria-hidden="true" size={18} strokeWidth={2.2} />
            </button>
            <Phone aria-hidden="true" size={26} strokeWidth={2.1} className="registration-phone-icon" />
            <input
              id="entry-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={formData.phone}
              onChange={(event) => onFieldChange('phone', event.target.value)}
              placeholder="Enter mobile number"
              className="registration-input"
            />
          </div>
          {error && <p className="registration-error" role="alert">{error}</p>}
        </div>

        <button type="button" onClick={onNext} className="registration-action registration-entry-action">
          <span>Send OTP</span>
          <ArrowRight aria-hidden="true" size={27} strokeWidth={2.6} />
        </button>

        <div className="registration-divider"><span>or continue with</span></div>
        <div className="registration-alternatives">
          <button type="button" className="registration-alternative" onClick={() => {}}>
            <Chrome aria-hidden="true" size={24} strokeWidth={2.1} />
            Google
          </button>
          <button type="button" className="registration-alternative registration-alternative--gmail" onClick={() => {}}>
            <Mail aria-hidden="true" size={24} strokeWidth={2.3} />
            Gmail
          </button>
        </div>

        <RegistrationFeatureGrid />

        <div className="registration-consent">
          <span className="registration-consent__lead"><CheckCircle2 aria-hidden="true" size={20} strokeWidth={2.2} /> By continuing, you agree to our</span>
          <span className="registration-consent__links">
            <button type="button" className="registration-link" onClick={() => {}}>Terms &amp; Conditions</button>
            <span aria-hidden="true">•</span>
            <button type="button" className="registration-link" onClick={() => {}}>Privacy Policy</button>
          </span>
        </div>

        <div className="registration-trust-badge"><ShieldCheck aria-hidden="true" size={18} strokeWidth={2.2} /> Trusted by 10,000+ users across India</div>

        {onOpenAdmin && <button type="button" onClick={onOpenAdmin} className="registration-admin-link">Admin Panel</button>}
      </div>
    </RegistrationLayout>
  )
}
