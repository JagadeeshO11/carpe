export default function IconBadge({ icon: Icon, label }) {
  return (
    <div
      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-lavender-strong text-brand-purple"
      aria-label={label}
    >
      <Icon aria-hidden="true" size={30} strokeWidth={2.2} />
    </div>
  )
}
