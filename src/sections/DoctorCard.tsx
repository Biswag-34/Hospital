export type Doctor = {
  name: string
  spec: string
  img: string
}

export default function DoctorCard({ name, spec, img }: Doctor) {
  return (
    <div className="group flex flex-col items-center text-center">
      {/* ===== Blob Portrait (NO card rectangle) ===== */}
      <div
        className="
          relative
          w-[220px] h-[220px]
          sm:w-[240px] sm:h-[240px]
          lg:w-[260px] lg:h-[260px]
          transition-transform duration-500 ease-out
          group-hover:-translate-y-1
        "
      >
        {/* soft outer glow ring */}
        <div
          className="
            absolute inset-0
            rounded-[42%_58%_62%_38%/44%_36%_64%_56%]
            bg-[var(--surface)]
            border border-[var(--surface-border)]
            shadow-[var(--shadow-soft)]
            transition-shadow duration-500
            group-hover:shadow-[var(--shadow-strong)]
          "
        />

        {/* image blob mask */}
        <div
          className="
            absolute inset-[10px]
            overflow-hidden
            rounded-[42%_58%_62%_38%/44%_36%_64%_56%]
            bg-[var(--surface-muted)]
          "
        >
          <img
            src={img}
            alt={name}
            loading="lazy"
            className="
              h-full w-full
              object-cover object-center
              transition-transform duration-700 ease-out
              group-hover:scale-[1.06]
            "
          />

          {/* subtle premium overlay */}
          <div
            className="
              pointer-events-none absolute inset-0
              bg-[linear-gradient(to_bottom,rgba(255,255,255,0.14),rgba(255,255,255,0.00))]
            "
          />
        </div>

        {/* tiny accent dot (optional, adds “design”) */}
        <span
          className="
            absolute -bottom-2 left-1/2 -translate-x-1/2
            h-3 w-3 rounded-full
            bg-[var(--calm-soft)]
            shadow-[var(--shadow-soft)]
          "
          aria-hidden="true"
        />
      </div>

      {/* ===== Text OUTSIDE the blob ===== */}
      <div className="mt-5">
        <h3 className="text-base sm:text-lg font-semibold text-[var(--text-heading)]">
          {name}
        </h3>

        <p className="mt-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide
          bg-[var(--surface)]
          border border-[var(--surface-border)]
          text-[var(--primary)]
          shadow-[var(--shadow-soft)]
        ">
          {spec}
        </p>
      </div>
    </div>
  )
}
