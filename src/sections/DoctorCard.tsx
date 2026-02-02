export type Doctor = {
  name: string
  spec: string
  img: string
}

export default function DoctorCard({ name, spec, img }: Doctor) {
  return (
    <div className="group relative">
      {/* Image block */}
      <div
        className="
          relative overflow-hidden rounded-3xl
          bg-[var(--surface)]
          border border-[var(--surface-border)]
          shadow-[var(--shadow-soft)]
        "
      >
        <img
          src={img}
          alt={name}
          loading="lazy"
          className="
            h-[260px] w-full object-cover
            sm:h-[300px]
            md:h-[320px]
            lg:h-[340px]
            transition-transform duration-700 ease-out
            group-hover:scale-[1.025]
          "
        />

        {/* Warm readability overlay (theme-based, NOT black) */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t
            from-[var(--primary-soft)]
            via-transparent
            to-transparent
          "
        />

        {/* Designation badge */}
        <div className="absolute bottom-4 right-4">
          <div
            className="
              rounded-2xl
              bg-[var(--surface-muted)]/90 backdrop-blur
              px-4 py-2
              border border-[var(--surface-border)]
              shadow-[var(--shadow-soft)]
            "
          >
            <p className="text-xs font-semibold tracking-wide text-[var(--primary)]">
              {spec}
            </p>
          </div>
        </div>
      </div>

      {/* Name */}
      <div className="mt-4 text-center">
        <h3 className="text-base sm:text-lg font-semibold text-[var(--text-heading)]">
          {name}
        </h3>
      </div>
    </div>
  )
}
