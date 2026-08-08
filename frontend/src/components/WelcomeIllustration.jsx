import { MapPin, CarFront } from 'lucide-react'

const buildings = [
  { left: '2%', height: '44%', width: '15%' },
  { left: '15%', height: '66%', width: '13%' },
  { left: '29%', height: '53%', width: '15%' },
  { left: '45%', height: '72%', width: '13%' },
  { left: '59%', height: '49%', width: '15%' },
  { left: '75%', height: '62%', width: '14%' },
  { left: '89%', height: '42%', width: '12%' },
]

export default function WelcomeIllustration() {
  return (
    <div className="relative mx-auto h-[235px] w-full max-w-[335px] overflow-hidden rounded-t-[44%] bg-gradient-to-b from-white to-brand-lavender-strong/80">
      <div className="absolute inset-x-0 bottom-[69px] h-[112px] opacity-80">
        {buildings.map((building, index) => (
          <span key={index} className="skyline-building" style={building}>
            {index % 2 === 0 && <i className="skyline-window left-2 top-4" />}
          </span>
        ))}
        <span className="absolute bottom-4 left-[20%] h-[48px] w-[2px] rotate-[55deg] bg-brand-purple/25" />
        <span className="absolute bottom-8 left-[51%] h-[58px] w-[2px] -rotate-[54deg] bg-brand-purple/25" />
        <span className="absolute bottom-7 left-[73%] h-[54px] w-[2px] rotate-[53deg] bg-brand-purple/25" />
        <MapPin className="absolute left-[13%] top-11 text-brand-purple" size={25} strokeWidth={2.8} fill="currentColor" />
        <MapPin className="absolute left-[49%] top-2 text-[#d9b9ed]" size={28} strokeWidth={2.6} fill="currentColor" />
        <MapPin className="absolute right-[13%] top-16 text-brand-purple" size={26} strokeWidth={2.8} fill="currentColor" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[106px] bg-gradient-to-t from-[#eee2f4] to-transparent" />
      <div className="absolute bottom-[21px] left-1/2 -translate-x-1/2 text-brand-purple drop-shadow-[0_9px_8px_rgb(70_16_128/0.25)]">
        <CarFront aria-label="Purple CarPe vehicle" size={122} strokeWidth={1.25} fill="currentColor" />
      </div>
    </div>
  )
}
