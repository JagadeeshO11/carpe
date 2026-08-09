import { useRef } from 'react'
import { ShieldCheck } from 'lucide-react'
import RegistrationLayout from '../components/RegistrationLayout'

export default function VerifyOtpScreen({ formData, onBack, onNext, onOtpChange, error }) {
  const inputRefs = useRef([])
  const isDriver = formData.selectedRole === 'driver'

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    onOtpChange(index, digit)
    if (digit && index < inputRefs.current.length - 1) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !formData.otp[index] && index > 0) inputRefs.current[index - 1]?.focus()
  }

  return (
    <RegistrationLayout
      title="Verify OTP"
      subtitle={isDriver ? 'Step 1: Mobile & OTP Verification' : 'Confirm your mobile number to continue.'}
      currentStep="mobileOtp"
      showProgress={isDriver}
      onBack={onBack}
      actionLabel="Verify & Continue"
      onAction={onNext}
      actionHint={error}
    >
      <div className="registration-card registration-card--form registration-card--centered">
        <div className="registration-card__icon">
          <ShieldCheck aria-hidden="true" size={42} strokeWidth={2.1} />
        </div>
        <h2 className="registration-card__title">Enter OTP</h2>
        <p className="registration-card__body">We&apos;ve sent a 6-digit OTP to<br /><strong>{formData.phone ? `+91 ${formData.phone}` : '+91 mobile number'}</strong></p>
        <div className="registration-otp-grid" role="group" aria-label="One-time password">
          {formData.otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => { inputRefs.current[index] = element }}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              inputMode="numeric"
              maxLength={1}
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              aria-label={`OTP digit ${index + 1}`}
              className="registration-otp-input"
            />
          ))}
        </div>
        <button type="button" onClick={() => {}} className="registration-resend">Resend OTP</button>
      </div>
    </RegistrationLayout>
  )
}
