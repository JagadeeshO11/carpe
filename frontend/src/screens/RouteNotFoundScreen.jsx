import { ArrowLeft, CircleAlert } from 'lucide-react'

export default function RouteNotFoundScreen({ pathname, onGoHome }) {
  return (
    <section className="flex min-h-full flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-lavender-strong text-brand-purple">
        <CircleAlert aria-hidden="true" size={32} strokeWidth={1.9} />
      </div>
      <h1 className="mt-5 text-[20px] font-extrabold text-[#17121c]">Page not found</h1>
      <p className="mt-2 max-w-[280px] text-[12px] leading-5 text-[#6e6872]">
        This CarPe route does not exist. The requested URL was kept unchanged.
      </p>
      <code className="mt-3 max-w-full truncate rounded-lg bg-[#faf8fc] px-3 py-2 text-[10px] text-[#5f5962]">{pathname}</code>
      <button type="button" onClick={onGoHome} className="mt-6 flex items-center gap-2 rounded-full bg-brand-purple px-5 py-3 text-[12px] font-bold text-white transition hover:bg-brand-purple-dark">
        <ArrowLeft aria-hidden="true" size={16} /> Back to CarPe
      </button>
    </section>
  )
}
