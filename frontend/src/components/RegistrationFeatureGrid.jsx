import { Fingerprint, LockKeyhole, Shield, ShieldCheck } from 'lucide-react'

const FEATURES = [
  { label: 'Secure Legal', icon: ShieldCheck, tone: 'blue' },
  { label: 'Aadhaar eKYC', icon: Fingerprint, tone: 'green' },
  { label: 'Bank-Grade Protection', icon: LockKeyhole, tone: 'gold' },
  { label: 'DSDP Compliant', icon: Shield, tone: 'purple' },
]

export default function RegistrationFeatureGrid() {
  return (
    <ul className="registration-features" aria-label="Security features">
      {FEATURES.map(({ label, icon: Icon, tone }) => (
        <li key={label} className="registration-feature">
          <span className={`registration-feature__icon registration-feature__icon--${tone}`}>
            <Icon aria-hidden="true" size={23} strokeWidth={2.1} />
          </span>
          <span>{label}</span>
        </li>
      ))}
    </ul>
  )
}
