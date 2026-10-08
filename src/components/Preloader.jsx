export default function Preloader({ phase, full, runId }) {
  if (phase === 'done') return null
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] bg-surface flex flex-col items-center justify-center gap-6 overflow-hidden transition-opacity duration-500 ${
        phase === 'leaving' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ambient glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-surface-container-high/70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-surface-variant/50 blur-3xl pointer-events-none" />

      {/* logo with rotating dashed halo */}
      <div className="relative">
        <span className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary-container via-primary-fixed to-primary-container opacity-50 blur-xl" />
        <span className="animate-spin-slower absolute -inset-2.5 rounded-full border border-dashed border-primary/50" />
        <img
          src="/logo.png"
          alt=""
          className="relative h-24 w-24 rounded-full object-contain bg-[#f6efe6] p-1 ring-1 ring-primary/30 shadow-[0_16px_40px_-10px_rgba(118,90,38,0.5)]"
        />
        <span className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center ring-4 ring-surface">
          <span className="material-symbols-outlined text-[16px]">spa</span>
        </span>
      </div>

      {/* wordmark */}
      <div className="flex flex-col items-center leading-none">
        <span
          className="font-display-xl text-on-surface text-[34px] font-medium"
          style={{ letterSpacing: '0.05em', lineHeight: 1.1 }}
        >
          Amarpali
        </span>
        <span className="flex items-center gap-2 pt-2">
          <span className="h-px w-6 bg-primary-container/90" />
          <span
            className="font-label-sm uppercase text-primary text-[10px]"
            style={{ letterSpacing: '0.32em' }}
          >
            Beauty Studio · Roorkee
          </span>
          <span className="h-px w-6 bg-primary-container/90" />
        </span>
      </div>

      {/* progress */}
      <div className="flex flex-col items-center gap-3 pt-1">
        <div className="w-56 h-[3px] rounded-full bg-primary/15 overflow-hidden">
          <div
            key={runId}
            className="animate-loader-bar h-full rounded-full bg-gradient-to-r from-primary-container via-primary to-primary-container"
            style={{ animationDuration: `${full ? 2 : 0.9}s` }}
          />
        </div>
        <p className="font-label-md text-label-md text-outline animate-pulse">
          {full ? 'Preparing your sanctuary…' : 'Taking you there…'}
        </p>
      </div>
    </div>
  )
}
