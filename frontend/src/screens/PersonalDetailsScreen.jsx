import { CreditCard, ShieldCheck } from 'lucide-react'
import RegistrationLayout from '../components/RegistrationLayout'

export default function PersonalDetailsScreen({ formData, onBack, onNext, onFieldChange, error }) {
  return (
    <RegistrationLayout
      title="Aadhaar eKYC"
      subtitle="Step 2: Secure identity verification"
      currentStep="aadhaarEkyc"
      onBack={onBack}
      actionLabel="Continue"
      onAction={onNext}
      actionHint={error}
    >
      <div className="registration-card registration-card--form registration-card--centered">
        <div className="registration-card__icon">
          <CreditCard aria-hidden="true" size={40} strokeWidth={2.1} />
        </div>
        <h2 className="registration-card__title">Aadhaar eKYC</h2>
        <p className="registration-card__body">Verify your identity securely to continue your digital sale agreement registration.</p>
        <label htmlFor="aadhaar-number" className="registration-field-label registration-field-label--left registration-field-label--spaced">Aadhaar Number</label>
        <div className="registration-input-field">
          <input
            id="aadhaar-number"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={12}
            value={formData.aadhaarNumber}
            onChange={(event) => onFieldChange('aadhaarNumber', event.target.value.replace(/\D/g, '').slice(0, 12))}
            placeholder="Enter Aadhaar number"
            className="registration-input"
          />
        </div>
        {error && <p className="registration-error registration-error--left" role="alert">{error}</p>}
        <p className="registration-card__hint"><ShieldCheck aria-hidden="true" size={16} strokeWidth={2.1} /> Your Aadhaar is used only for secure identity verification.</p>
      </div>
    </RegistrationLayout>
  )
}
