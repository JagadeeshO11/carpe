import { CheckCircle2, Car, ShieldCheck } from 'lucide-react'
import RegistrationLayout from '../components/RegistrationLayout'

const DRIVER_BENEFITS = [
  'Share empty seats on journeys you already take',
  'Meet verified passengers in your route network',
  'Keep more of your fuel cost in your pocket',
]

export default function DriverIntroScreen({ onBack, onNext }) {
  return (
    <RegistrationLayout
      title="For Drivers"
      subtitle="Turn empty seats into shared journeys."
      currentStep={null}
      onBack={onBack}
      onAction={onNext}
      actionLabel="Continue to Driver Registration"
      showProgress={false}
      className="driver-intro-screen"
    >
      <div className="driver-intro">
        <div className="driver-intro__badge"><Car aria-hidden="true" size={38} strokeWidth={1.9} /><span>DRIVE & SHARE</span></div>
        <h2>Earn while you drive.</h2>
        <p className="driver-intro__body">Offer safe, reliable seats on your route and make every journey count.</p>
        <div className="driver-intro__highlight"><ShieldCheck aria-hidden="true" size={20} strokeWidth={2.1} /> 0% commission on your first 5 rides.</div>
        <ul className="driver-intro__benefits">
          {DRIVER_BENEFITS.map((benefit) => (
            <li key={benefit}><CheckCircle2 aria-hidden="true" size={18} strokeWidth={2.3} /> {benefit}</li>
          ))}
        </ul>
      </div>
    </RegistrationLayout>
  )
}