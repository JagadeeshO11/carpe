import { ArrowLeft } from 'lucide-react'

export default function ScreenHeader({ title, onBack }) {
  return (
    <header className="grid grid-cols-[40px_1fr_40px] items-center px-5 pt-2">
      <button
        type="button"
        onClick={onBack}
        className="flex h-10 w-10 items-center justify-start text-brand-purple transition hover:text-brand-purple-dark"
        aria-label={`Back from ${title}`}
      >
        <ArrowLeft aria-hidden="true" size={21} strokeWidth={2.2} />
      </button>
      <h1 className="text-center text-[15px] font-extrabold tracking-[-0.02em] text-brand-purple">{title}</h1>
      <span aria-hidden="true" />
    </header>
  )
}
