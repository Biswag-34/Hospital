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
    <article className="work-card card relative overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="
            w-full object-cover
            h-[170px]
            sm:h-[190px]
            md:h-[210px]
            lg:h-[220px]
          "
        />

        {/* subtle overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(31,42,36,0.06) 0%, rgba(31,42,36,0.34) 100%)',
          }}
        />

        {/* Tag */}
        {tag && (
          <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold border backdrop-blur"
              style={{
                background: 'rgba(250, 246, 241, 0.78)',
                borderColor: 'var(--surface-border)',
                color: 'var(--text-heading)',
              }}
            >
              {tag}
            </span>
          </div>
        )}

        {/* Title strip */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <div
            className="rounded-3xl px-4 py-3 sm:px-5 sm:py-4 border backdrop-blur"
            style={{
              background: 'rgba(250, 246, 241, 0.84)',
              borderColor: 'var(--surface-border)',
            }}
          >
            <h3
              className="text-[16px] sm:text-[18px] font-extrabold leading-snug"
              style={{ color: 'var(--text-heading)' }}
            >
              {title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 sm:px-6 py-5 sm:py-6">
        {/* Description clamp (2 lines) */}
        <p
          className="text-sm sm:text-[15px] leading-relaxed"
          style={{
            color: 'var(--text-body)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {desc}
        </p>

        {/* Bullets (max 3) each clamp 2 lines */}
        <ul className="mt-3 sm:mt-4 grid gap-2">
          {bullets.slice(0, 3).map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: 'var(--primary)' }}
              />
              <span
                className="text-sm sm:text-[15px]"
                style={{
                  color: 'var(--text-body)',
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

        {/* Bottom accent */}
        <div
          className="mt-5 h-[2px] w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(156,90,60,0.40), transparent)',
          }}
        />
      </div>
    </article>
  )
}
