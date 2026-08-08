import { CarFront, Hash } from 'lucide-react'
import ScreenHeader from '../components/ScreenHeader'
import IconBadge from '../components/IconBadge'
import PrimaryButton from '../components/PrimaryButton'
import { FormField, SelectField } from '../components/FormField'
import { VEHICLE_FIELDS } from '../data/onboardingData'

export default function VehicleDetailsScreen({ formData, onBack, onNext, onFieldChange }) {
  return (
    <section className="flex min-h-full flex-col px-5 pb-8">
      <ScreenHeader title="Vehicle Details" onBack={onBack} />
      <div className="pt-7 text-center">
        <IconBadge icon={CarFront} label="Vehicle details" />
        <h2 className="mt-5 text-[15px] font-extrabold tracking-[-0.03em]">Enter Vehicle Details</h2>
      </div>

      <div className="mt-5 space-y-3">
        <FormField label="Vehicle Number" icon={Hash} value={formData.vehicleNumber} onChange={(event) => onFieldChange('vehicleNumber', event.target.value)} placeholder="KA 01 AB 1234" />
        {VEHICLE_FIELDS.map((field) => (
          <SelectField
            key={field.name}
            label={field.label}
            value={formData[field.name]}
            onChange={(event) => onFieldChange(field.name, event.target.value)}
            options={field.options}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <div className="mt-auto pt-7">
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </section>
  )
}
