import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Mail,
  Phone,
  MapPin,
  HeartHandshake,
  Users,
  HandHeart,
  Building2,
  ArrowRight,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const involvedRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const anim = useMemo(() => ({ duration: 0.85 }), [])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const runPanel = (panel: HTMLDivElement | null) => {
        if (!panel) return
        const items = panel.querySelectorAll('.cu-anim')

        gsap.fromTo(
          panel,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: anim.duration,
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
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
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

      runPanel(contactRef.current)
      runPanel(involvedRef.current)
    }, sectionRef)

    return () => ctx.revert()
  }, [anim.duration])

  const card =
    'rounded-3xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]'

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section relative overflow-hidden bg-[var(--bg-section)] py-16 sm:py-20 lg:py-24"
    >
      {/* Soft background washes (theme-driven, not old RGBA) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full blur-3xl opacity-70 bg-[var(--primary-soft)]" />
        <div className="absolute -bottom-56 -right-56 h-[560px] w-[560px] rounded-full blur-3xl opacity-70 bg-[var(--calm-soft)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT: Contact details + CTA */}
          <div
            ref={contactRef}
            className={[
              'lg:col-span-7 relative overflow-hidden h-full',
              'rounded-3xl border border-[var(--surface-border)]',
              'bg-[var(--surface)]/88 backdrop-blur-xl',
              'p-6 sm:p-8 lg:p-10',
              'shadow-[var(--shadow-soft)]',
            ].join(' ')}
          >
            {/* Corner motif (subtle, theme colors) */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply">
              <svg viewBox="0 0 800 520" className="h-full w-full" fill="none">
                <path
                  d="M60 80H740M60 440H740M80 60V460M720 60V460"
                  stroke="var(--surface-border)"
                  strokeWidth="2"
                  opacity="0.55"
                />
                {Array.from({ length: 11 }).map((_, i) => {
                  const x = 120 + i * 52
                  return (
                    <path
                      key={`jali-v-${i}`}
                      d={`M${x} 110V410`}
                      stroke="var(--primary)"
                      strokeWidth="1.6"
                      opacity="0.10"
                    />
                  )
                })}
                {Array.from({ length: 7 }).map((_, i) => {
                  const y = 140 + i * 42
                  return (
                    <path
                      key={`jali-h-${i}`}
                      d={`M110 ${y}H690`}
                      stroke="var(--calm)"
                      strokeWidth="1.6"
                      opacity="0.10"
                    />
                  )
                })}
                <path
                  d="M220 140C310 70 490 70 580 140"
                  stroke="var(--primary)"
                  strokeWidth="2.6"
                  opacity="0.28"
                />
                <path
                  d="M250 395C330 450 470 450 550 395"
                  stroke="var(--calm)"
                  strokeWidth="2.6"
                  opacity="0.22"
                />
              </svg>
            </div>

            <div className="relative flex h-full flex-col">
              <p className="cu-anim text-xs font-bold tracking-widest text-[var(--text-muted)]">
                CONTACT US
              </p>

              <h2 className="cu-anim mt-3 text-2xl font-extrabold leading-tight text-[var(--text-heading)] sm:text-3xl lg:text-4xl">
                Antharagange Rural Hospital &amp; Research Center
              </h2>

              {/* Contact info blocks */}
              <div className="cu-anim mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-muted)]/70 p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 text-[var(--primary)]" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-heading)]">Address</p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        Antharagange, Kolar District, Karnataka
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-muted)]/70 p-4">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 text-[var(--primary)]" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-heading)]">Phone</p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">+91 98765 43210</p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-muted)]/70 p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 text-[var(--primary)]" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-heading)]">Email</p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">contact@qlinique.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="cu-anim mt-5 text-sm font-semibold text-[var(--text-heading)] sm:text-base">
                Healing rural lives with compassion, dignity, and purpose.
              </p>

              {/* CTA row pinned near bottom */}
              <div className="cu-anim mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                <a
                  href="mailto:contact@qlinique.com"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold shadow-sm transition active:scale-[0.98]"
                >
                  <Mail size={18} />
                  Email Us
                </a>

                <a
                  href="tel:+919876543210"
                  className={[
                    'inline-flex items-center justify-center gap-2',
                    'rounded-2xl border border-[var(--surface-border)]',
                    'bg-[var(--surface-muted)]/70',
                    'px-6 py-3 font-semibold text-[var(--text-heading)]',
                    'transition hover:bg-[var(--surface-muted)]',
                    'active:scale-[0.98]',
                  ].join(' ')}
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: GET INVOLVED */}
          <div className="lg:col-span-5">
            <div
              ref={involvedRef}
              className={[
                'h-full relative overflow-hidden',
                card,
                'p-6 sm:p-8 lg:p-10',
                'shadow-[var(--shadow-strong)]',
              ].join(' ')}
            >
              {/* Premium soft overlay (theme-driven) */}
              <div
                className="pointer-events-none absolute inset-0 opacity-65"
                style={{
                  background:
                    'radial-gradient(700px 260px at 20% 0%, var(--primary-soft), transparent 60%), radial-gradient(700px 300px at 100% 35%, var(--calm-soft), transparent 55%)',
                }}
              />

              <div className="relative flex h-full flex-col">
                <div className="cu-anim inline-flex w-fit items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-muted)]/70 px-3 py-1">
                  <HeartHandshake size={14} className="text-[var(--primary)]" />
                  <span className="text-xs font-bold tracking-widest text-[var(--text-muted)]">
                    GET INVOLVED
                  </span>
                </div>

                <h3 className="cu-anim mt-4 text-xl font-extrabold text-[var(--text-heading)] sm:text-2xl">
                  We welcome
                </h3>

                <div className="mt-6 grid gap-3">
                  {[
                    {
                      icon: <Building2 size={18} className="text-[var(--primary)]" />,
                      title: 'CSR and institutional partnerships',
                      desc: 'Support programs and infrastructure for rural care.',
                    },
                    {
                      icon: <Users size={18} className="text-[var(--primary)]" />,
                      title: 'Healthcare and academic collaborations',
                      desc: 'Partner in training, research, and outreach.',
                    },
                    {
                      icon: <HandHeart size={18} className="text-[var(--primary)]" />,
                      title: 'Volunteers and medical professionals',
                      desc: 'Contribute time, skills, and care to serve communities.',
                    },
                    {
                      icon: <HeartHandshake size={18} className="text-[var(--primary)]" />,
                      title: 'Donors who believe in equitable rural healthcare',
                      desc: 'Help sustain compassionate, dignified rural treatment.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="cu-anim group rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-muted)]/65 p-4 transition hover:bg-[var(--surface-muted)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-2">
                          {item.icon}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--text-heading)] sm:text-base">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
                            {item.desc}
                          </p>
                        </div>

                        <ArrowRight
                          className="ml-auto mt-1 opacity-0 transition group-hover:opacity-60"
                          size={18}
                          style={{ color: 'var(--text-muted)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Closing line pinned bottom */}
                <div className="cu-anim mt-auto pt-6">
                  <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] px-5 py-4">
                    <p className="text-sm font-semibold text-[var(--text-heading)] sm:text-base">
                      Together, we can create lasting impact in rural health.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        #contact a:focus-visible {
          outline: none;
          box-shadow: var(--ring);
          border-radius: 18px;
        }
      `}</style>
    </section>
  )
}
