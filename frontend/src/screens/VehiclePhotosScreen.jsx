import { Image as ImageIcon } from 'lucide-react'
import ScreenHeader from '../components/ScreenHeader'
import IconBadge from '../components/IconBadge'
import PrimaryButton from '../components/PrimaryButton'
import UploadCard from '../components/UploadCard'
import { PHOTO_SLOTS } from '../data/onboardingData'

export default function VehiclePhotosScreen({ formData, onBack, onNext, onUpload }) {
  return (
    <section className="flex min-h-full flex-col px-5 pb-8">
      <ScreenHeader title="Vehicle Photos" onBack={onBack} />
      <div className="pt-7 text-center">
        <IconBadge icon={ImageIcon} label="Vehicle photos" />
        <h2 className="mt-5 text-[15px] font-extrabold tracking-[-0.03em]">Upload Vehicle Photos</h2>
        <p className="mt-2 text-[11px] text-[#6e6872]">Add clear photos of your vehicle</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {PHOTO_SLOTS.map((slot) => (
          <UploadCard key={slot.key} id={`vehicle-${slot.key}`} label={slot.label} file={formData.uploads[slot.key]} onChange={(file) => onUpload(slot.key, file)} compact />
        ))}
      </div>

      <div className="mt-auto pt-7">
        <PrimaryButton onClick={onNext}>Complete &amp; Enter App</PrimaryButton>
      </div>
    </section>
  )
}
