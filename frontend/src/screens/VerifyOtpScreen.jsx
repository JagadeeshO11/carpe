import { useRef } from 'react'
import { ShieldCheck } from 'lucide-react'
import ScreenHeader from '../components/ScreenHeader'
import IconBadge from '../components/IconBadge'
import PrimaryButton from '../components/PrimaryButton'

export default function VerifyOtpScreen({ formData, onBack, onNext, onOtpChange }) {
  const inputRefs = useRef([])

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    onOtpChange(index, digit)
    if (digit && index < inputRefs.current.length - 1) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !formData.otp[index] && index > 0) inputRefs.current[index - 1]?.focus()
  }

  return (
    <section className="flex min-h-full flex-col px-5 pb-8">
      <ScreenHeader title="Verify OTP" onBack={onBack} />
      <div className="pt-11 text-center">
        <IconBadge icon={ShieldCheck} label="OTP security" />
        <h2 className="mt-6 text-[16px] font-extrabold tracking-[-0.03em]">Enter OTP</h2>
        <p className="mt-3 text-[11px] leading-6 text-[#6e6872]">We&apos;ve sent a 6-digit OTP to<br /><strong className="text-[#2b2630]">+91 98765 43210</strong></p>
      </div>

      <div className="mt-7 flex justify-between gap-2">
        {formData.otp.map((digit, index) => (
          <input
            key={index}
            ref={(element) => { inputRefs.current[index] = element }}
            value={digit}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            inputMode="numeric"
            maxLength={1}
            aria-label={`OTP digit ${index + 1}`}
            className="h-[45px] w-[43px] rounded-control border border-brand-border bg-white text-center text-[16px] font-bold text-[#2a2430] transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/10 focus:outline-hidden"
          />
        ))}
      </div>

      <button type="button" onClick={() => {}} className="mt-9 text-center text-[11px] font-bold text-brand-purple hover:text-brand-purple-dark">Resend OTP in 00:25</button>
      <div className="mt-auto pt-7">
        <PrimaryButton onClick={onNext}>Verify &amp; Continue</PrimaryButton>
      </div>
    </section>
  )
}
