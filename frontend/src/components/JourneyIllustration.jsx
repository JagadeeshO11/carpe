import { ArrowRight, Car, MapPin } from 'lucide-react'

export default function JourneyIllustration() {
  return (
    <div className="journey-illustration" aria-hidden="true">
      <span className="journey-illustration__pin journey-illustration__pin--start"><MapPin size={23} strokeWidth={2.2} /></span>
      <span className="journey-illustration__track" />
      <span className="journey-illustration__car"><Car size={30} strokeWidth={2} /></span>
      <ArrowRight className="journey-illustration__arrow" size={22} strokeWidth={2.3} />
      <span className="journey-illustration__pin journey-illustration__pin--end"><MapPin size={23} strokeWidth={2.2} /></span>
    </div>
  )
}
