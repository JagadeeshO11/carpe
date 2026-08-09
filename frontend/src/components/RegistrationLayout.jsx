import { ArrowLeft, ArrowRight, Headphones } from 'lucide-react'
import RegistrationProgress from './RegistrationProgress'

export default function RegistrationLayout({
  title,
  subtitle,
  currentStep,
  onBack,
  children,
  actionLabel,
  onAction,
  actionDisabled = false,
  showProgress = true,
  showBack = true,
  actionHint,
  className = '',
  onSupport = () => {},
}) {
  return (
    <section className={`registration-screen ${className}`.trim()}>
      <header className="registration-header">
        {showBack ? (
          <button type="button" onClick={onBack} className="registration-header__back" aria-label="Go back">
            <ArrowLeft aria-hidden="true" size={22} strokeWidth={2.4} />
          </button>
        ) : <span className="registration-header__placeholder" aria-hidden="true" />}

        <div className="registration-wordmark" aria-label="CarPe">
          Car<span>Pe</span>
          <small>SMART. SOCIAL. TRUSTED.</small>
        </div>

        <span className="registration-header__placeholder" aria-hidden="true" />
      </header>

      <div className="registration-scroll">
        <div className="registration-content">
          {title && (
            <div className="registration-heading">
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>
          )}
          {showProgress && <RegistrationProgress currentStep={currentStep} />}
          {children}
        </div>
      </div>

      {actionLabel && (
        <footer className="registration-footer">
          {actionHint && <p className="registration-footer__hint">{actionHint}</p>}
          <button
            type="button"
            onClick={onAction}
            disabled={actionDisabled}
            className="registration-action"
          >
            <span>{actionLabel}</span>
            <ArrowRight aria-hidden="true" size={27} strokeWidth={2.6} />
          </button>
          <div className="registration-support">
            <span className="registration-support__label">
              <Headphones aria-hidden="true" size={19} strokeWidth={2.2} />
              Need help?
            </span>
            <button type="button" onClick={onSupport} className="registration-support__link">
              Contact Support
              <ArrowRight aria-hidden="true" size={17} strokeWidth={2.5} />
            </button>
          </div>
        </footer>
      )}
    </section>
  )
}
