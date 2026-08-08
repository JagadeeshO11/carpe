import { ChevronDown } from 'lucide-react'

export function FormField({ label, icon: Icon, value, onChange, placeholder, type = 'text', trailing, className = '' }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="mb-1.5 block text-[10px] font-semibold text-[#39343e]">{label}</span>}
      <span className="flex min-h-[40px] items-center gap-2 rounded-control border border-brand-border bg-white px-3 transition focus-within:border-brand-purple/60 focus-within:ring-2 focus-within:ring-brand-purple/10">
        {Icon && <Icon aria-hidden="true" size={15} strokeWidth={2} className="shrink-0 text-brand-purple" />}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[11px] text-[#29232e] placeholder:text-[#a09ba3] focus:outline-hidden"
        />
        {trailing}
      </span>
    </label>
  )
}

export function SelectField({ label, icon: Icon, value, onChange, options, placeholder }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-[10px] font-semibold text-[#39343e]">{label}</span>}
      <span className="relative flex min-h-[40px] items-center gap-2 rounded-control border border-brand-border bg-white px-3 transition focus-within:border-brand-purple/60 focus-within:ring-2 focus-within:ring-brand-purple/10">
        {Icon && <Icon aria-hidden="true" size={14} strokeWidth={2} className="shrink-0 text-brand-purple" />}
        <select
          value={value}
          onChange={onChange}
          className="min-w-0 flex-1 appearance-none bg-transparent pr-5 text-[11px] text-[#6e6872] focus:outline-hidden"
        >
          <option value="">{placeholder}</option>
          {options.filter((option) => option !== placeholder).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" size={14} strokeWidth={2} className="pointer-events-none absolute right-3 text-brand-purple" />
      </span>
    </label>
  )
}
