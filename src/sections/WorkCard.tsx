export type WorkItem = {
  title: string
  subtitle: string
  desc: string
  bullets: string[]
  image: string
  tag?: string
}

export default function WorkCard({
  title,
  subtitle,
  desc,
  bullets,
  image,
  tag,
}: WorkItem) {
  return (
    <article
      className="
        work-card card relative overflow-hidden
        border border-[var(--surface-border)]
        bg-[var(--surface)]
        shadow-[var(--shadow-soft)]
        transition
        hover:shadow-[var(--shadow-strong)]
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="
            h-[170px] w-full object-cover-fit
            sm:h-[190px]
            md:h-[210px]
            lg:h-[220px]
            transition-transform duration-700 ease-out
            group-hover:scale-[1.03]
          "
        />

        {/* soft brand overlay (theme-driven, NOT dark green/black) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(111,51,64,0.06) 0%, rgba(111,51,64,0.30) 100%)',
          }}
        />

        {/* Tag */}
        {tag && (
          <div className="absolute left-4 top-4 sm:left-5 sm:top-5 ">
            <span
              className="
                inline-flex rounded-full px-3 py-1 text-xs font-semibold
                border backdrop-blur
                bg-[var(--surface-muted)]/85
                text-[var(--text-heading)]
              "
              style={{ borderColor: 'var(--surface-border)' }}
            >
              {tag}
            </span>
          </div>
        )}

        {/* Title strip */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <div
            className="
              rounded-3xl px-4 py-3 sm:px-5 sm:py-4
              border 
              bg-[var(--surface)]/56
            "
            style={{ borderColor: 'var(--surface-border)' }}
          >
            <h3 className="text-[16px] sm:text-[18px] font-extrabold leading-snug text-[var(--text-heading)]">
              {title}
            </h3>
            <p className="mt-1 font-semibold text-xs sm:text-sm text-[var(--text-muted)]">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        {/* Description clamp (2 lines) */}
        <p
          className="text-sm leading-relaxed text-[var(--text-body)] sm:text-[15px]"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {desc}
        </p>

        {/* Bullets (max 3) each clamp 2 lines */}
        <ul className="mt-3 grid gap-2 sm:mt-4">
          {bullets.slice(0, 3).map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: 'var(--primary)' }}
              />
              <span
                className="text-sm text-[var(--text-body)] sm:text-[15px]"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {b}
              </span>
            </li>
          ))}
        </ul>

        {/* Bottom accent (theme-based, no RGBA constants) */}
        <div
          className="mt-5 h-[2px] w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--primary-soft), transparent)',
          }}
        />
      </div>

      {/* tiny focus ring helper (if card becomes clickable later) */}
      <style>{`
        .work-card:focus-visible {
          outline: none;
          box-shadow: var(--ring);
        }
      `}</style>
    </article>
  )
}
