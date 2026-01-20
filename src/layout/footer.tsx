import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Clock,
  Ambulance,
  Stethoscope,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

const departments = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Diagnostics',
  'Emergency Care',
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      const cols = gsap.utils.toArray<HTMLElement>('.ft-col')
      const bottom = footerRef.current?.querySelector('.ft-bottom')

      gsap.fromTo(
        cols,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )

      if (bottom) {
        gsap.fromTo(
          bottom,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-dark)', color: 'rgba(245,241,236,0.80)' }}
    >
      {/* Accent line */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(156,90,60,0.65), transparent)',
        }}
      />

      {/* Background ornaments: subtle Indian jali + mandala arcs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft glows */}
        <div
          className="absolute -top-24 left-1/3 h-[360px] w-[360px] rounded-full blur-3xl opacity-40"
          style={{ background: 'rgba(156, 90, 60, 0.20)' }}
        />
        <div
          className="absolute -bottom-28 right-1/4 h-[380px] w-[380px] rounded-full blur-3xl opacity-35"
          style={{ background: 'rgba(107, 124, 89, 0.18)' }}
        />

        {/* Large line art */}
        <svg
          className="absolute -left-24 -top-16 h-[360px] w-[360px] opacity-[0.16]"
          viewBox="0 0 320 320"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="160" cy="160" r="118" stroke="var(--secondary)" strokeWidth="2.6" opacity="0.55" />
          <circle cx="160" cy="160" r="82" stroke="var(--primary)" strokeWidth="3.0" opacity="0.55" strokeDasharray="9 8" />
          <path d="M70 200C95 235 225 235 250 200" stroke="var(--primary)" strokeWidth="3.0" opacity="0.5" />
          {/* jali grid */}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = 92 + i * 18
            return (
              <path key={`v-${i}`} d={`M${x} 95V225`} stroke="var(--secondary)" strokeWidth="1.4" opacity="0.12" />
            )
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const y = 95 + i * 18
            return (
              <path key={`h-${i}`} d={`M95 ${y}H225`} stroke="var(--primary)" strokeWidth="1.4" opacity="0.10" />
            )
          })}
        </svg>

        <svg
          className="absolute -right-24 -bottom-20 h-[420px] w-[420px] opacity-[0.14]"
          viewBox="0 0 380 380"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M60 220C120 120 260 120 320 220"
            stroke="var(--secondary)"
            strokeWidth="3.0"
            opacity="0.45"
          />
          <path
            d="M80 260C140 180 240 180 300 260"
            stroke="var(--primary)"
            strokeWidth="3.2"
            opacity="0.45"
          />
          <circle cx="190" cy="210" r="120" stroke="var(--primary)" strokeWidth="2.6" opacity="0.30" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand / About */}
          <div className="ft-col lg:col-span-4">
            <div className="flex items-center gap-3">
              <div
                className="h-11 w-11 rounded-2xl grid place-items-center border"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderColor: 'rgba(255,255,255,0.10)',
                }}
              >
                <Stethoscope size={18} style={{ color: 'rgba(245,241,236,0.90)' }} />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold tracking-tight" style={{ color: 'rgba(245,241,236,0.95)' }}>
                  Qlinique
                  <span style={{ color: 'var(--primary)' }}>.</span>
                </h3>
                <p className="text-xs" style={{ color: 'rgba(245,241,236,0.60)' }}>
                  Hospital & Diagnostic Center
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed" style={{ color: 'rgba(245,241,236,0.70)' }}>
              Compassionate, affordable care with modern diagnostics and a patient-first approach.
            </p>

            {/* CTA chips */}
            <div className="mt-6 grid gap-3">
              <div
                className="rounded-2xl px-4 py-3 flex items-start gap-3 border"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderColor: 'rgba(255,255,255,0.10)',
                }}
              >
                <Ambulance className="mt-0.5" size={18} style={{ color: 'var(--primary)' }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'rgba(245,241,236,0.92)' }}>
                    24/7 Emergency
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(245,241,236,0.62)' }}>
                    Rapid response and critical support
                  </p>
                </div>
              </div>

              <div
                className="rounded-2xl px-4 py-3 flex items-start gap-3 border"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderColor: 'rgba(255,255,255,0.10)',
                }}
              >
                <Clock className="mt-0.5" size={18} style={{ color: 'var(--secondary)' }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'rgba(245,241,236,0.92)' }}>
                    OPD Hours
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(245,241,236,0.62)' }}>
                    Mon–Sat: 9:00 AM – 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              {[
                { label: 'Facebook', Icon: Facebook },
                { label: 'Instagram', Icon: Instagram },
                { label: 'Twitter', Icon: Twitter },
                { label: 'LinkedIn', Icon: Linkedin },
              ].map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="h-10 w-10 rounded-full grid place-items-center transition"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                  }}
                >
                  <Icon size={18} style={{ color: 'rgba(245,241,236,0.86)' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="ft-col lg:col-span-3">
            <h4 className="text-lg font-semibold mb-5" style={{ color: 'rgba(245,241,236,0.92)' }}>
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 transition"
                    style={{ color: 'rgba(245,241,236,0.72)' }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full transition"
                      style={{ backgroundColor: 'rgba(156,90,60,0.65)' }}
                    />
                    <span className="group-hover:opacity-100" style={{ opacity: 0.95 }}>
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div className="ft-col lg:col-span-3">
            <h4 className="text-lg font-semibold mb-5" style={{ color: 'rgba(245,241,236,0.92)' }}>
              Departments
            </h4>

            <ul className="grid grid-cols-2 gap-y-3 text-sm">
              {departments.map((d) => (
                <li key={d} className="transition" style={{ color: 'rgba(245,241,236,0.72)' }}>
                  {d}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs" style={{ color: 'rgba(245,241,236,0.55)' }}>
              Comprehensive specialties with essential diagnostics and emergency readiness.
            </p>
          </div>

          {/* Contact */}
          <div className="ft-col lg:col-span-2">
            <h4 className="text-lg font-semibold mb-5" style={{ color: 'rgba(245,241,236,0.92)' }}>
              Contact
            </h4>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1" style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'rgba(245,241,236,0.72)' }}>
                  123 Healthcare Avenue,<br />
                  Wellness City, India
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'rgba(245,241,236,0.72)' }}>+91 98765 43210</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={18} style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'rgba(245,241,236,0.72)' }}>contact@qlinique.com</span>
              </li>
            </ul>

            {/* CTA */}
            <a
  href="/join-the-cause"
  className="mt-6 inline-flex w-full justify-center rounded-full px-2 py-3 font-semibold shadow-sm transition active:scale-[0.98]"
  style={{
    backgroundColor: 'var(--primary)',
    color: 'white',
  }}
>
  Join The Cause
</a>


            <p className="mt-3 text-xs" style={{ color: 'rgba(245,241,236,0.55)' }}>
              For emergencies, call immediately. For general enquiries, use the contact form.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="ft-bottom mt-10 sm:mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
          style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
        >
          <span style={{ color: 'rgba(245,241,236,0.60)' }}>
            © {new Date().getFullYear()} Qlinique. All rights reserved.
          </span>

          <div className="flex gap-6" style={{ color: 'rgba(245,241,236,0.60)' }}>
            <a href="#" className="hover:opacity-100 transition" style={{ opacity: 0.9 }}>
              Privacy Policy
            </a>
            <a href="#" className="hover:opacity-100 transition" style={{ opacity: 0.9 }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
