import { ArrowRight, ShieldCheck, UserRound, UsersRound } from 'lucide-react'
import JourneyIllustration from '../components/JourneyIllustration'
import RegistrationLayout from '../components/RegistrationLayout'
import { ROLE_OPTIONS } from '../data/onboardingData'

const ROLE_ICONS = {
  passenger: UsersRound,
  driver: UserRound,
}

export default function RoleSelectionScreen({ onSelectRole, onOpenAdmin }) {
  return (
    <RegistrationLayout showBack={false} showProgress={false} className="role-selection-screen">
      <div className="role-selection">
        <p className="role-selection__eyebrow">YOUR TRUSTED INTERCITY CARPOOL</p>
        <h1>Move better, together.</h1>
        <p className="role-selection__intro">Split costs, reduce traffic, and travel with people you can trust.</p>

        <JourneyIllustration />

        <div className="role-selection__heading">
          <h2>Choose how you want to use CarPe</h2>
          <p>You can change this later from your profile.</p>
        </div>

        <div className="role-selection__options" role="group" aria-label="Choose your CarPe role">
          {ROLE_OPTIONS.map(({ id, label, description, accent }) => {
            const Icon = ROLE_ICONS[id]
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectRole(id)}
                className={`role-card role-card--${accent}`}
                aria-label={`${label}: ${description}`}
              >
                <span className="role-card__icon"><Icon aria-hidden="true" size={25} strokeWidth={2.1} /></span>
                <span className="role-card__copy">
                  <strong>{label}</strong>
                  <span>{description}</span>
                </span>
                <ArrowRight aria-hidden="true" size={21} strokeWidth={2.3} className="role-card__arrow" />
              </button>
            )
          })}
        </div>

        <div className="role-selection__trust"><ShieldCheck aria-hidden="true" size={18} strokeWidth={2.1} /> Verified profiles <span aria-hidden="true">•</span> Secure payments</div>
        {onOpenAdmin && <button type="button" onClick={onOpenAdmin} className="registration-admin-link">Admin Panel</button>}
      </div>
    </RegistrationLayout>
  )
}
