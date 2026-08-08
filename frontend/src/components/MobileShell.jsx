export default function MobileShell({ children }) {
  return (
    <main className="flex h-dvh w-full items-center justify-center bg-white sm:bg-[#f8f5fa] sm:p-3 overflow-hidden font-sans text-[#17121c]">
      <div className="flex h-full sm:h-[calc(100dvh-1.5rem)] sm:max-h-[780px] w-full max-w-md flex-col bg-white sm:rounded-2xl sm:shadow-2xl overflow-hidden border-0 sm:border sm:border-brand-purple/15">
        {children}
      </div>
    </main>
  )
}
