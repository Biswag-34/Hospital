import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const strokeDash = useMemo(() => ({ duration: 2.4 }), [])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // SVG "draw" animation: animate all SVG geometry (path/circle/line)
      const svg = svgRef.current
      if (svg) {
        const shapes = Array.from(
          svg.querySelectorAll<SVGGeometryElement>('path, circle, line, polyline, rect')
        )

        shapes.forEach((el) => {
          const len = el.getTotalLength?.()
          if (!len || !Number.isFinite(len)) return
          el.style.strokeDasharray = `${len}`
          el.style.strokeDashoffset = `${len}`
        })

        gsap.to(shapes, {
          strokeDashoffset: 0,
          duration: strokeDash.duration,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Form panel entrance + field stagger
      const form = formRef.current
      if (form) {
        const items = form.querySelectorAll('.cu-anim')

        gsap.fromTo(
          form,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )

        gsap.fromTo(
          items,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [strokeDash.duration])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Soft background washes (theme-based, not teal/blue) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full blur-3xl opacity-70"
          style={{ background: 'rgba(156, 90, 60, 0.12)' }} /* primary */
        />
        <div
          className="absolute -bottom-56 -right-56 h-[560px] w-[560px] rounded-full blur-3xl opacity-70"
          style={{ background: 'rgba(107, 124, 89, 0.12)' }} /* secondary */
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* LEFT: Architectural + Indian jali/mandala lines */}
          <div
            className="
              lg:col-span-7
              relative overflow-hidden
              rounded-3xl
              border border-[var(--surface-border)]
              bg-[var(--surface)]/70 backdrop-blur
              p-6 sm:p-8 lg:p-10
            "
          >
            {/* Corner motif (static) */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply">
              <svg viewBox="0 0 800 520" className="h-full w-full" fill="none">
                {/* thin border frame */}
                <path
                  d="M60 80H740M60 440H740M80 60V460M720 60V460"
                  stroke="var(--secondary)"
                  strokeWidth="2"
                  opacity="0.35"
                />
                {/* jali grid */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const x = 120 + i * 52
                  return (
                    <path
                      key={`jali-v-${i}`}
                      d={`M${x} 110V410`}
                      stroke="var(--secondary)"
                      strokeWidth="1.6"
                      opacity="0.14"
                    />
                  )
                })}
                {Array.from({ length: 7 }).map((_, i) => {
                  const y = 140 + i * 42
                  return (
                    <path
                      key={`jali-h-${i}`}
                      d={`M110 ${y}H690`}
                      stroke="var(--primary)"
                      strokeWidth="1.6"
                      opacity="0.12"
                    />
                  )
                })}
                {/* mandala arcs */}
                <path
                  d="M220 140C310 70 490 70 580 140"
                  stroke="var(--primary)"
                  strokeWidth="2.6"
                  opacity="0.35"
                />
                <path
                  d="M250 395C330 450 470 450 550 395"
                  stroke="var(--secondary)"
                  strokeWidth="2.6"
                  opacity="0.30"
                />
              </svg>
            </div>

            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-heading)]">
                Contact Us
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-xl">
                Reach out for appointments, enquiries, or emergency guidance. Our team will respond promptly.
              </p>

              {/* Info chips */}
              <div className="mt-7 sm:mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-4 shadow-sm">
                  <Phone className="mt-0.5" size={18} style={{ color: 'var(--primary)' }} />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-heading)]">Call</p>
                    <p className="text-sm text-[var(--text-muted)]">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-4 shadow-sm">
                  <Mail className="mt-0.5" size={18} style={{ color: 'var(--primary)' }} />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-heading)]">Email</p>
                    <p className="text-sm text-[var(--text-muted)]">contact@qlinique.com</p>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-start gap-3 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-4 shadow-sm">
                  <MapPin className="mt-0.5" size={18} style={{ color: 'var(--primary)' }} />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-heading)]">Visit</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      123 Healthcare Avenue, Wellness City, India
                    </p>
                  </div>
                </div>
              </div>

              {/* SVG drawing area */}
              <div className="mt-8 sm:mt-10 relative">
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0))',
                  }}
                />

                <svg
                  ref={svgRef}
                  viewBox="0 0 900 420"
                  className="relative w-full h-[240px] sm:h-[280px] md:h-[320px]"
                  fill="none"
                >
                  {/* Blueprint + Indian architectural feel: frame + arches + plinth + jali */}
                  <path d="M70 335 L70 170 L215 85 L370 170 L370 335" stroke="var(--text-heading)" strokeWidth="2.8" opacity="0.55" />
                  <path d="M370 335 L370 150 L545 60 L730 150 L730 335" stroke="var(--text-heading)" strokeWidth="2.8" opacity="0.55" />
                  <path d="M70 335 L730 335" stroke="var(--text-heading)" strokeWidth="3.0" opacity="0.55" />

                  {/* vertical pillars (theme accents) */}
                  <path d="M215 85 L215 335" stroke="var(--primary)" strokeWidth="3.0" opacity="0.55" />
                  <path d="M545 60 L545 335" stroke="var(--secondary)" strokeWidth="3.0" opacity="0.50" />

                  {/* arch details */}
                  <path d="M130 205 C170 155, 270 155, 310 205" stroke="var(--primary)" strokeWidth="2.6" opacity="0.35" />
                  <path d="M430 200 C490 140, 610 140, 670 200" stroke="var(--secondary)" strokeWidth="2.6" opacity="0.33" />

                  {/* window/jali lines */}
                  <path d="M135 240 H305" stroke="var(--text-heading)" strokeWidth="2.2" opacity="0.28" />
                  <path d="M135 272 H305" stroke="var(--text-heading)" strokeWidth="2.2" opacity="0.28" />
                  <path d="M425 232 H635" stroke="var(--text-heading)" strokeWidth="2.2" opacity="0.28" />
                  <path d="M425 265 H635" stroke="var(--text-heading)" strokeWidth="2.2" opacity="0.28" />

                  {/* jali micro-grid */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const x = 450 + i * 22
                    return (
                      <path
                        key={`jg-v-${i}`}
                        d={`M${x} 225V275`}
                        stroke="var(--secondary)"
                        strokeWidth="1.6"
                        opacity="0.10"
                      />
                    )
                  })}
                  {Array.from({ length: 3 }).map((_, i) => {
                    const y = 238 + i * 18
                    return (
                      <path
                        key={`jg-h-${i}`}
                        d={`M440 ${y}H640`}
                        stroke="var(--primary)"
                        strokeWidth="1.6"
                        opacity="0.09"
                      />
                    )
                  })}

                  {/* curved accent line (ground/wave) */}
                  <path
                    d="M85 360 C220 305, 365 305, 520 360 C650 405, 780 405, 860 360"
                    stroke="var(--primary)"
                    strokeWidth="2.8"
                    opacity="0.28"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT: Form panel (≈45% on lg) */}
          <div className="lg:col-span-5">
            <div
              ref={formRef}
              className="
                h-full
                rounded-3xl
                border border-[var(--surface-border)]
                bg-[var(--surface)]
                shadow-lg
                p-6 sm:p-8 lg:p-10
              "
            >
              <h3 className="cu-anim text-lg sm:text-xl font-extrabold text-[var(--text-heading)]">
                Send a Message
              </h3>
              <p className="cu-anim mt-2 text-sm text-[var(--text-muted)]">
                Fill out the form and we will get back to you within 24 hours.
              </p>

              <form className="mt-6 grid gap-4">
                <div className="cu-anim">
                  <label className="text-sm font-semibold text-[var(--text-heading)]">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="
                      mt-2 w-full rounded-2xl
                      border border-[var(--surface-border)]
                      bg-white/40
                      px-4 py-3
                      text-[var(--text-heading)]
                      outline-none transition
                      focus:ring-4
                    "
                    style={{
                      boxShadow: 'none',
                    }}
                  />
                </div>

                <div className="cu-anim">
                  <label className="text-sm font-semibold text-[var(--text-heading)]">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="
                      mt-2 w-full rounded-2xl
                      border border-[var(--surface-border)]
                      bg-white/40
                      px-4 py-3
                      text-[var(--text-heading)]
                      outline-none transition
                      focus:ring-4
                    "
                  />
                </div>

                <div className="cu-anim">
                  <label className="text-sm font-semibold text-[var(--text-heading)]">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="
                      mt-2 w-full rounded-2xl
                      border border-[var(--surface-border)]
                      bg-white/40
                      px-4 py-3
                      text-[var(--text-heading)]
                      outline-none transition
                      focus:ring-4
                    "
                  />
                </div>

                <div className="cu-anim">
                  <label className="text-sm font-semibold text-[var(--text-heading)]">Message</label>
                  <textarea
                    rows={5}
                    placeholder="How can we help?"
                    className="
                      mt-2 w-full rounded-2xl
                      border border-[var(--surface-border)]
                      bg-white/40
                      px-4 py-3
                      text-[var(--text-heading)]
                      outline-none transition
                      focus:ring-4
                      resize-none
                    "
                  />
                </div>

                <button
                  type="button"
                  className="cu-anim btn-primary mt-2 inline-flex justify-center px-6 py-3 font-semibold shadow-sm active:scale-[0.98]"
                >
                  Submit
                </button>

                <p className="cu-anim text-xs text-[var(--text-muted)] text-center mt-2">
                  By submitting, you agree to be contacted by our team.
                </p>
              </form>

              {/* Focus ring color (theme primary) */}
              <style>{`
                #contact input:focus,
                #contact textarea:focus {
                  border-color: var(--primary);
                  box-shadow: 0 0 0 4px rgba(156, 90, 60, 0.16);
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
