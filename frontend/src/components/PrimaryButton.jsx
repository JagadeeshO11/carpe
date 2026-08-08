export default function PrimaryButton({ children, onClick, type = 'button', disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="h-[46px] w-full rounded-control bg-brand-purple px-4 text-[13px] font-bold text-white shadow-[0_6px_15px_rgb(91_22_166/0.16)] transition hover:bg-brand-purple-dark active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  )
}
