import { IdCard } from 'lucide-react'
import ScreenHeader from '../components/ScreenHeader'
import IconBadge from '../components/IconBadge'
import PrimaryButton from '../components/PrimaryButton'
import UploadCard from '../components/UploadCard'

export default function DrivingLicenceScreen({ formData, onBack, onNext, onUpload }) {
  return (
    <section className="flex min-h-full flex-col px-5 pb-8">
      <ScreenHeader title="Driving Licence" onBack={onBack} />
      <div className="pt-9 text-center">
        <IconBadge icon={IdCard} label="Driving licence" />
        <h2 className="mt-5 text-[15px] font-extrabold tracking-[-0.03em]">Upload Driving Licence</h2>
        <p className="mt-2 text-[11px] text-[#6e6872]">Ensure all details are visible</p>
      </div>

      <div className="mt-7 space-y-4">
        <UploadCard id="licence-front" label="Upload Front Side" file={formData.uploads.licenceFront} onChange={(file) => onUpload('licenceFront', file)} />
        <UploadCard id="licence-back" label="Upload Back Side" file={formData.uploads.licenceBack} onChange={(file) => onUpload('licenceBack', file)} />
      </div>

      <div className="mt-auto pt-7">
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </section>
  )
}
