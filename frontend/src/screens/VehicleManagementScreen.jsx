import { useState } from 'react'
import { Car, Plus, Trash2, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react'
import PrimaryButton from '../components/PrimaryButton'
import ScreenHeader from '../components/ScreenHeader'
import { VEHICLE_TYPE_OPTIONS, FUEL_TYPE_OPTIONS } from '../data/onboardingData'

const MAX_VEHICLES = 3

const VERIFICATION_BADGE = {
  VERIFIED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  REJECTED: 'bg-rose-50 text-rose-600 border-rose-200',
}

export default function VehicleManagementScreen({ vehicles = [], onAddVehicle, onRemoveVehicle, onBack }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ registrationNumber: '', vehicleModel: '', vehicleType: '', fuelType: '', vehicleColor: '', rcDetails: '' })
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleAdd = () => {
    setError('')
    if (!form.registrationNumber.trim()) { setError('Vehicle registration number is required.'); return }
    if (!form.vehicleType) { setError('Please select a vehicle type.'); return }
    if (!form.fuelType) { setError('Please select a fuel type.'); return }
    if (!form.vehicleModel.trim()) { setError('Vehicle model is required.'); return }

    const duplicate = vehicles.find(v => v.registrationNumber.replace(/\s/g, '').toLowerCase() === form.registrationNumber.replace(/\s/g, '').toLowerCase())
    if (duplicate) { setError('This registration number is already registered.'); return }

    onAddVehicle({ ...form, id: `veh-${Date.now()}`, verificationStatus: 'PENDING', photos: {} })
    setForm({ registrationNumber: '', vehicleModel: '', vehicleType: '', fuelType: '', vehicleColor: '', rcDetails: '' })
    setShowForm(false)
  }

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="My Vehicles" onBack={onBack} />

      <div className="flex-1 space-y-4 px-5 pb-6 pt-4">
        {/* Max vehicles info */}
        <div className="flex items-center justify-between rounded-xl bg-brand-lavender px-3 py-2 text-[10px]">
          <span className="font-semibold text-[#312b35]">Registered Vehicles</span>
          <span className={`font-extrabold ${vehicles.length >= MAX_VEHICLES ? 'text-rose-600' : 'text-brand-purple'}`}>
            {vehicles.length} / {MAX_VEHICLES}
          </span>
        </div>

        {vehicles.length >= MAX_VEHICLES && !showForm && (
          <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[10px] text-amber-800">
            <AlertCircle size={15} className="shrink-0" />
            You have reached the maximum of {MAX_VEHICLES} vehicles. Remove one to add another.
          </div>
        )}

        {/* Vehicle list */}
        {vehicles.length === 0 && !showForm && (
          <div className="flex flex-col items-center justify-center py-10 text-center text-[#a29ca6]">
            <Car size={32} className="mb-2 text-brand-purple/30" />
            <p className="text-[12px] font-bold">No vehicles registered</p>
            <p className="mt-1 text-[10px]">Add your first vehicle to start offering rides.</p>
          </div>
        )}

        {vehicles.map(veh => (
          <div key={veh.id} className="rounded-xl border border-[#eee8f3] bg-white p-3.5 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[12px] font-extrabold text-[#231b2b]">{veh.registrationNumber}</p>
                  <span className={`rounded-full border px-2 py-0.5 text-[8px] font-bold ${VERIFICATION_BADGE[veh.verificationStatus] || VERIFICATION_BADGE.PENDING}`}>
                    {veh.verificationStatus}
                  </span>
                </div>
                <p className="text-[10px] text-[#6e6872] mt-0.5">{veh.vehicleModel} · {VEHICLE_TYPE_OPTIONS.find(o => o.value === veh.vehicleType)?.label || veh.vehicleType}</p>
                <p className="text-[10px] text-[#6e6872]">Fuel: {veh.fuelType} · Color: {veh.vehicleColor || '—'}</p>
                {veh.rcDetails && <p className="text-[9px] text-[#a29ca6] mt-0.5">RC: {veh.rcDetails}</p>}
              </div>
              <button type="button" onClick={() => onRemoveVehicle(veh.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}

        {/* Add vehicle form */}
        {showForm && (
          <div className="rounded-xl border border-brand-purple/20 bg-white p-4 space-y-3 shadow-xs">
            <p className="text-[12px] font-bold text-[#312b35]">Add New Vehicle</p>

            {[
              { key: 'registrationNumber', label: 'Registration Number *', placeholder: 'e.g. KA 01 AB 1234' },
              { key: 'vehicleModel', label: 'Vehicle Model *', placeholder: 'e.g. Tata Nexon' },
              { key: 'vehicleColor', label: 'Vehicle Color', placeholder: 'e.g. White' },
              { key: 'rcDetails', label: 'RC Details', placeholder: 'e.g. RC valid until 2031' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-[10px] font-semibold text-[#554e5b] mb-1">{label}</label>
                <input
                  type="text"
                  value={form[key]}
                  onChange={e => set(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full rounded-control border border-brand-border bg-white px-3 py-2 text-[11px] text-[#312b35] focus:outline-none focus:border-brand-purple"
                />
              </div>
            ))}

            <div>
              <label className="block text-[10px] font-semibold text-[#554e5b] mb-1">Vehicle Type *</label>
              <select value={form.vehicleType} onChange={e => set('vehicleType', e.target.value)}
                className="w-full rounded-control border border-brand-border bg-white px-3 py-2 text-[11px] text-[#312b35] focus:outline-none"
              >
                {VEHICLE_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-[#554e5b] mb-1">Fuel Type *</label>
              <select value={form.fuelType} onChange={e => set('fuelType', e.target.value)}
                className="w-full rounded-control border border-brand-border bg-white px-3 py-2 text-[11px] text-[#312b35] focus:outline-none"
              >
                {FUEL_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {error && <p className="text-[10px] font-semibold text-rose-600 bg-rose-50 rounded px-2 py-1">{error}</p>}

            <div className="flex gap-2 pt-1">
              <button type="button" onClick={() => { setShowForm(false); setError('') }}
                className="flex-1 rounded-control border border-brand-border py-2 text-[11px] font-bold text-[#6e6872]"
              >
                Cancel
              </button>
              <button type="button" onClick={handleAdd}
                className="flex-1 rounded-control bg-brand-purple py-2 text-[11px] font-bold text-white"
              >
                Add Vehicle
              </button>
            </div>
          </div>
        )}

        {!showForm && vehicles.length < MAX_VEHICLES && (
          <button type="button" onClick={() => setShowForm(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-brand-purple/40 bg-brand-lavender py-3 text-[11px] font-bold text-brand-purple hover:bg-brand-lavender-strong transition"
          >
            <Plus size={16} /> Add Vehicle
          </button>
        )}
      </div>
    </div>
  )
}
