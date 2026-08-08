import { Smartphone } from 'lucide-react'
import ScreenHeader from '../components/ScreenHeader'
import IconBadge from '../components/IconBadge'
import PrimaryButton from '../components/PrimaryButton'

export default function RegisterScreen({ formData, onBack, onNext, onFieldChange }) {
  return (
    <section className="flex min-h-full flex-col px-5 pb-8">
      <ScreenHeader title="Register" onBack={onBack} />
      <div className="pt-11 text-center">
        <IconBadge icon={Smartphone} label="Mobile phone" />
        <h2 className="mt-6 text-[16px] font-extrabold tracking-[-0.03em]">Enter Mobile Number</h2>
        <p className="mx-auto mt-3 max-w-[230px] text-[11px] leading-6 text-[#6e6872]">We&apos;ll send you an OTP to verify<br />your number</p>
      </div>

      <div className="mt-7">
        <label className="flex h-[48px] items-center rounded-control border border-brand-purple/30 bg-white px-3 transition focus-within:border-brand-purple focus-within:ring-2 focus-within:ring-brand-purple/10">
          <span className="border-r border-brand-border pr-3 text-[12px] font-medium text-[#3f3943]">+91</span>
          <input
            type="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={(event) => onFieldChange('phone', event.target.value)}
            placeholder="Enter mobile number"
            aria-label="Mobile number"
            className="min-w-0 flex-1 bg-transparent px-3 text-[12px] text-[#312b35] placeholder:text-[#a29ca6] focus:outline-hidden"
          />
        </label>
        <div className="mt-5">
          <PrimaryButton onClick={onNext}>Send OTP</PrimaryButton>
        </div>
      </div>

      <p className="mt-auto pb-3 text-center text-[10px] leading-5 text-[#77717b]">
        By continuing, you agree to our<br />
        <button type="button" onClick={() => {}} className="font-bold text-brand-purple">Terms of Use</button> an <button type="button" onClick={() => {}} className="font-bold text-brand-purple">Privacy Policy</button>
      </p>
    </section>
  )
}
