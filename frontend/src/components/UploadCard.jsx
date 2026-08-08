import { Camera, FileCheck } from 'lucide-react'

export default function UploadCard({ id, label, file, onChange, compact = false }) {
  return (
    <label
      htmlFor={id}
      className={`group flex cursor-pointer flex-col items-center justify-center rounded-control border border-dashed border-brand-purple/40 bg-white text-center transition hover:border-brand-purple hover:bg-brand-lavender ${compact ? 'min-h-[122px] px-2' : 'min-h-[144px] px-3'}`}
    >
      <input id={id} type="file" accept="image/*,.pdf" className="sr-only" onChange={(event) => onChange(event.target.files?.[0] ?? null)} />
      {file ? (
        <FileCheck aria-hidden="true" size={25} strokeWidth={1.9} className="text-brand-purple" />
      ) : (
        <Camera aria-hidden="true" size={25} strokeWidth={1.9} className="text-brand-purple transition group-hover:scale-105" />
      )}
      <span className="mt-3 max-w-full truncate text-[10px] font-medium text-[#48414d]">{file?.name ?? label}</span>
      {file && <span className="mt-1 text-[9px] text-brand-purple">Selected</span>}
    </label>
  )
}
