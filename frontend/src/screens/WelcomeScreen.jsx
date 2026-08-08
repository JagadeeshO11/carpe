import PrimaryButton from '../components/PrimaryButton'
import WelcomeIllustration from '../components/WelcomeIllustration'

export default function WelcomeScreen({ onNext, onExploreApp }) {
  return (
    <section className="flex min-h-full flex-col px-5 pb-8 text-center">
      <div className="pt-24">
        <div className="text-[50px] font-extrabold leading-none tracking-[-0.08em] text-brand-purple">
          Car<span className="text-brand-green">Pe</span>
        </div>
        <p className="mt-6 text-[16px] leading-[1.55] text-[#2d2731]">
          Intercity Rides.<br />
          <strong>Trusted People.</strong><br />
          <strong>Better Journeys.</strong>
        </p>
      </div>

      <div className="mt-auto">
        <WelcomeIllustration />
        <div className="mt-3 space-y-2">
          <PrimaryButton onClick={onNext}>Get Started</PrimaryButton>
          <button
            type="button"
            onClick={onExploreApp}
            className="w-full rounded-control border border-brand-purple/40 bg-brand-lavender py-2.5 text-[11px] font-bold text-brand-purple hover:bg-brand-lavender-strong transition"
          >
            Explore Carpool Prototype
          </button>
          <p className="mt-3 text-[11px] text-[#817b84]">
            Already have an account? <button type="button" onClick={onExploreApp} className="font-bold text-brand-purple hover:text-brand-purple-dark">Login</button>
          </p>
        </div>
      </div>
    </section>
  )
}
