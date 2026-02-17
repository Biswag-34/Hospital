import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, LayoutGrid, Map, X, ChevronLeft, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type GalleryItem = {
  id: string
  src: string
  alt: string
  tag?: string
}

type FloorPlan = {
  id: string
  label: string
  src: string
  alt: string
  note?: string
}

type ViewerItem = {
  id: string
  src: string
  alt: string
  kind: 'gallery' | 'floorplan'
}

export default function Building() {
  const pageRef = useRef<HTMLElement>(null)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activePlan, setActivePlan] = useState(0)

  const buildingGallery: GalleryItem[] = useMemo(
    () => [
      { id: 'b1', src: '/building/current-1.jpg', alt: 'Current hospital building - front view', tag: 'Exterior' },
      { id: 'b2', src: '/building/current-2.jpg', alt: 'Current hospital building - side view', tag: 'Exterior' },
      { id: 'b3', src: '/building/current-3.jpg', alt: 'Current hospital building - entry', tag: 'Exterior' },
      { id: 'b4', src: '/building/current-4.jpg', alt: 'Current hospital building - construction detail', tag: 'Progress' },
      { id: 'b5', src: '/building/current-5.jpg', alt: 'Current hospital building - interior / corridor', tag: 'Interior' },
      { id: 'b6', src: '/building/current-6.jpg', alt: 'Current hospital building - wide shot', tag: 'Exterior' },
    ],
    []
  )

  const floorPlans: FloorPlan[] = useMemo(
    () => [
      { id: 'fp1', label: 'Basement / Stage-1', src: '/building/basement.png', alt: 'Basement floor plan', note: 'Stage-1 completed (Basement)' },
      { id: 'fp2', label: 'Ground Floor', src: '/building/ground.png', alt: 'Ground floor plan', note: 'OPD / Pharmacy / Diagnostics / Rehab' },
      { id: 'fp3', label: 'First Floor', src: '/building/first.png', alt: 'First floor plan', note: 'Wards / service integration' },
    ],
    []
  )

  const viewerItems: ViewerItem[] = useMemo(
    () => [
      ...buildingGallery.map((x) => ({ id: x.id, src: x.src, alt: x.alt, kind: 'gallery' as const })),
      ...floorPlans.map((x) => ({ id: x.id, src: x.src, alt: x.alt, kind: 'floorplan' as const })),
    ],
    [buildingGallery, floorPlans]
  )

  const shortTitle = (alt: string) => {
    const cleaned = alt.replace(/^Current hospital building\s*-\s*/i, '').trim()
    return cleaned.length > 36 ? cleaned.slice(0, 36).trim() + '…' : cleaned
  }

  useEffect(() => {
    if (!pageRef.current) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.hb-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>('.hb-stagger').forEach((wrap) => {
        const children = wrap.querySelectorAll('.hb-item')
        gsap.fromTo(
          children,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: wrap, start: 'top 82%', toggleActions: 'play none none none' },
          }
        )
      })

      gsap.fromTo(
        '.hb-heroGlow',
        { y: 0 },
        {
          y: 40,
          ease: 'none',
          scrollTrigger: { trigger: '.hb-hero', start: 'top top', end: 'bottom top', scrub: 1 },
        }
      )

      // Hover zoom (smooth)
      gsap.utils.toArray<HTMLElement>('[data-hb-card]').forEach((cardEl) => {
        const img = cardEl.querySelector<HTMLElement>('[data-hb-img]')
        if (!img) return

        const onEnter = () => gsap.to(img, { scale: 1.1, duration: 0.9, ease: 'power3.out' })
        const onLeave = () => gsap.to(img, { scale: 1, duration: 0.9, ease: 'power3.out' })

        cardEl.addEventListener('mouseenter', onEnter)
        cardEl.addEventListener('mouseleave', onLeave)
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const prevOverflowRef = useRef<string | null>(null)

  useEffect(() => {
    if (!lightboxOpen) return

    const root = document.documentElement
    prevOverflowRef.current = root.style.overflow
    root.style.overflow = 'hidden'

    return () => {
      root.style.overflow = prevOverflowRef.current ?? ''
      prevOverflowRef.current = null
    }
  }, [lightboxOpen])

  const openGalleryAt = (i: number) => {
    setActiveIndex(i)
    setLightboxOpen(true)
  }

  const openPlan = (planIndex: number) => {
    setActiveIndex(buildingGallery.length + planIndex)
    setLightboxOpen(true)
  }

  const close = () => setLightboxOpen(false)

  const prev = () => setActiveIndex((p) => (p - 1 + buildingGallery.length) % buildingGallery.length)
  const next = () => setActiveIndex((p) => (p + 1) % buildingGallery.length)

  const card = 'rounded-3xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]'

  const current = viewerItems[activeIndex]
  const isGallery = current?.kind === 'gallery'

  return (
    <section ref={pageRef} className="bg-[var(--bg-section)]">
      {/* ================= HERO ================= */}
      <div className="hb-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="hb-heroGlow absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="hb-reveal max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text-muted)] shadow-[var(--shadow-soft)]">
              <Building2 size={14} className="text-[var(--primary)]" />
              Current Hospital Building
            </p>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-heading)] sm:text-4xl lg:text-5xl">
              A living build — designed for rural access, built for dignity
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-body)] sm:text-lg">
              This gallery highlights the <span className="font-semibold text-[var(--calm)]">current hospital structure</span>{' '}
              and the <span className="font-semibold text-[var(--primary)]">floor plan</span> that defines how care, movement,
              and services will work together — with a clean, future-ready layout.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-strong)] transition hover:opacity-95 active:scale-[0.98]"
              >
                <LayoutGrid size={16} />
                View Gallery
              </a>

              <a
                href="#floorplan"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text-heading)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--surface-muted)] active:scale-[0.98]"
              >
                <Map size={16} className="text-[var(--primary)]" />
                View Floor Plan
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= GALLERY (COLLAGE / NO WHITE SPACE) ================= */}
      <div id="gallery" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="hb-reveal mt-2 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--text-heading)] sm:text-3xl">Building Photo Gallery</h2>
            <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
              Collage-style grid with uneven heights. No top/bottom white gaps.
            </p>
          </div>

          <span className="rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text-muted)] shadow-[var(--shadow-soft)]">
            {buildingGallery.length} photos
          </span>
        </div>

        {/* Collage grid (use fixed row height + varied row-span) */}
        <div
          className={[
            'hb-stagger mt-8 grid gap-5',
            'grid-cols-2 lg:grid-cols-12',
            '[grid-auto-rows:12px] sm:[grid-auto-rows:14px]',
          ].join(' ')}
        >
          {buildingGallery.map((img, i) => {
            // Collage pattern: (col-span / row-span)
            const layout =
              i % 6 === 0
                ? 'col-span-2 lg:col-span-7 row-span-[26]'
                : i % 6 === 1
                  ? 'col-span-1 lg:col-span-5 row-span-[18]'
                  : i % 6 === 2
                    ? 'col-span-1 lg:col-span-5 row-span-[20]'
                    : i % 6 === 3
                      ? 'col-span-1 lg:col-span-4 row-span-[18]'
                      : i % 6 === 4
                        ? 'col-span-1 lg:col-span-4 row-span-[24]'
                        : 'col-span-2 lg:col-span-4 row-span-[20]'

            return (
              <button
                key={img.id}
                type="button"
                onClick={() => openGalleryAt(i)}
                data-hb-card
                className={[
                  'hb-item group relative overflow-hidden rounded-3xl text-left',
                  'border border-[var(--surface-border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]',
                  'transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-strong)]',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40',
                  layout,
                ].join(' ')}
              >
                {/* IMPORTANT: image is absolute + object-cover => no white space */}
                <div className="relative h-full w-full">
                  <img
                    src={img.src}
                    alt={img.alt}
                    data-hb-img
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-95" />

                  {/* Sheen */}
                  <div
                    className={[
                      'pointer-events-none absolute inset-0 opacity-0',
                      'bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.18),transparent)]',
                      'translate-x-[-60%] group-hover:opacity-100 group-hover:translate-x-[60%]',
                      'transition-all duration-700',
                    ].join(' ')}
                  />

                  {/* Chips */}
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    {img.tag ? (
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md">
                        {img.tag}
                      </span>
                    ) : null}
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md">
                      #{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white/80">Current Build</p>
                        <p className="mt-1 truncate text-base font-extrabold text-white">{shortTitle(img.alt)}</p>
                      </div>

                      <span
                        className={[
                          'shrink-0 rounded-full px-4 py-2 text-xs font-extrabold',
                          'border border-white/15 bg-white/10 text-white/95 backdrop-blur-md',
                          'transition group-hover:bg-white/15',
                        ].join(' ')}
                      >
                        View
                      </span>
                    </div>
                  </div>

                  {/* Hover glow ring */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/0 transition group-hover:ring-white/10" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ================= FLOOR PLAN ================= */}
      <div id="floorplan" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="hb-reveal flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--text-heading)] sm:text-3xl">Hospital Floor Plan</h2>
            <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
              Select a plan below to preview. Click the preview to open full-screen.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className={['hb-reveal lg:col-span-8 p-5 sm:p-6', card].join(' ')}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Selected Plan</p>
                <h3 className="mt-1 text-lg font-extrabold text-[var(--text-heading)]">{floorPlans[activePlan]?.label}</h3>
                {floorPlans[activePlan]?.note ? (
                  <p className="mt-2 text-sm text-[var(--text-body)]">{floorPlans[activePlan]?.note}</p>
                ) : null}
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-muted)] px-4 py-2 text-xs font-semibold text-[var(--text-muted)]">
                <Map size={14} className="text-[var(--primary)]" />
                Open full-screen
              </span>
            </div>

            <button
              type="button"
              onClick={() => openPlan(activePlan)}
              className="mt-5 group relative block w-full overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--bg-page)]"
            >
              <img
                src={floorPlans[activePlan]?.src}
                alt={floorPlans[activePlan]?.alt}
                className="h-[320px] w-full object-contain p-3 sm:h-[420px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </div>

          <div className="hb-stagger lg:col-span-4 grid gap-4">
            {floorPlans.map((fp, i) => {
              const active = i === activePlan
              return (
                <button
                  key={fp.id}
                  type="button"
                  onClick={() => setActivePlan(i)}
                  className={[
                    'hb-item text-left overflow-hidden rounded-3xl border shadow-[var(--shadow-soft)] transition',
                    active
                      ? 'border-[var(--primary)]/40 bg-[var(--primary-soft)]'
                      : 'border-[var(--surface-border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)]',
                  ].join(' ')}
                >
                  <div className="flex gap-4 p-4">
                    <div className="h-16 w-20 overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--bg-page)]">
                      <img src={fp.src} alt={fp.alt} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-[var(--text-heading)]">{fp.label}</p>
                      {fp.note ? <p className="mt-1 text-xs text-[var(--text-muted)]">{fp.note}</p> : null}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ================= LIGHTBOX ================= */}
      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-[9999] grid place-items-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-black/40 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <p className="truncate text-sm font-semibold text-white/90">{current?.alt}</p>

              <button
                type="button"
                onClick={close}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/15"
              >
                <X size={16} />
                Close
              </button>
            </div>

            <div className="relative">
              <img src={current?.src} alt={current?.alt} className="max-h-[78vh] w-full object-contain" />

              {isGallery ? (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-3 text-white/90 backdrop-blur-sm transition hover:bg-white/15"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-3 text-white/90 backdrop-blur-sm transition hover:bg-white/15"
                    aria-label="Next"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
