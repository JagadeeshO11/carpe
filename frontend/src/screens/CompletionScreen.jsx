import { CheckCircle2, CreditCard, Info, ShieldCheck, UserRound } from 'lucide-react'
import RegistrationLayout from '../components/RegistrationLayout'
import { PAYMENT_SUMMARY } from '../data/onboardingData'

function formatCurrency(amount) {
  return `₹${amount}`
}

export default function CompletionScreen({ formData, onBack, onComplete }) {
  return (
    <RegistrationLayout
      title={<><span className="completion-heading__accent">Person</span> Verified!</>}
      subtitle="Your profile is successfully verified and ready to create agreements."
      currentStep="complete"
      onBack={onBack}
      actionLabel="Continue to CarPe"
      onAction={onComplete}
    >
      <div className="completion-stack">
        <section className="completion-status-card" aria-labelledby="verification-status-title">
          <div className="completion-status-card__icon" aria-hidden="true">
            <ShieldCheck size={42} strokeWidth={1.8} />
            <CheckCircle2 size={23} strokeWidth={2.5} />
          </div>
          <div className="completion-status-card__copy">
            <h2 id="verification-status-title">You are now <span>Verified and Active</span></h2>
            <p>Your identity is verified via Aadhaar eKYC. You can now create and sign agreements securely.</p>
          </div>
        </section>

        <section className="completion-payment-card" aria-labelledby="payment-summary-title">
          <div className="completion-section-heading">
            <span className="completion-section-heading__icon"><CreditCard aria-hidden="true" size={21} strokeWidth={2.1} /></span>
            <h2 id="payment-summary-title">PAYMENT SUMMARY</h2>
          </div>
          <div className="completion-fee-grid">
            <div className="completion-fee-item">
              <h3>Profile Verification</h3>
              <strong className="completion-fee-item__amount completion-fee-item__amount--green">{formatCurrency(PAYMENT_SUMMARY.profileVerification.amount)}</strong>
              <p>{PAYMENT_SUMMARY.profileVerification.label}</p>
              <span className="completion-success-badge"><CheckCircle2 aria-hidden="true" size={16} strokeWidth={2.6} /> Completed Successfully</span>
            </div>
            <div className="completion-fee-item">
              <h3>Agreement Creation</h3>
              <strong className="completion-fee-item__amount completion-fee-item__amount--blue">{formatCurrency(PAYMENT_SUMMARY.agreementCreation.amount)}</strong>
              <p>{PAYMENT_SUMMARY.agreementCreation.label}</p>
              <div className="completion-payment-note"><Info aria-hidden="true" size={17} strokeWidth={2.2} /> {PAYMENT_SUMMARY.agreementCreation.note}</div>
            </div>
          </div>
        </section>

        <section className="completion-details-card" aria-labelledby="your-details-title">
          <div className="completion-section-heading">
            <span className="completion-section-heading__icon"><UserRound aria-hidden="true" size={21} strokeWidth={2.1} /></span>
            <h2 id="your-details-title">YOUR DETAILS</h2>
          </div>
          <dl className="completion-details-list">
            <div><dt>Mobile Number</dt><dd>+91 {formData.phone || '—'}</dd></div>
            <div><dt>Email</dt><dd>{formData.email || 'Not provided'}</dd></div>
            <div><dt>Verification</dt><dd><ShieldCheck aria-hidden="true" size={15} /> Verified via Aadhaar eKYC</dd></div>
          </dl>
        </section>
      </div>
    </RegistrationLayout>
  )
}
