import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  HeartHandshake,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Join The Cause", href: "/join-the-cause" },
  { label: "Contact", href: "#contact" },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(footerRef)
      const cols = q(".ft-col")
      const donate = q(".ft-donate")[0]
      const bottom = q(".ft-bottom")[0]

      gsap.fromTo(
        cols,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      )

      if (donate) {
        gsap.fromTo(
          donate,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.05,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      if (bottom) {
        gsap.fromTo(
          bottom,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
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
      style={{
        background: "var(--bg-dark)",
        color: "rgba(239,230,220,0.78)",
      }}
    >
      {/* Accent line */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(111,51,64,0.75), transparent)",
        }}
      />

      {/* Subtle background glow (keep minimal) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 left-1/3 h-[320px] w-[320px] rounded-full blur-3xl opacity-40"
          style={{ background: "rgba(111, 51, 64, 0.22)" }}
        />
        <div
          className="absolute -bottom-28 right-1/4 h-[360px] w-[360px] rounded-full blur-3xl opacity-30"
          style={{ background: "rgba(135, 81, 93, 0.18)" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Donation highlight strip */}
        <div
          className="ft-donate rounded-3xl border p-5 sm:p-6 lg:p-7"
          style={{
            borderColor: "rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="flex gap-3">
              <div
                className="h-11 w-11 rounded-2xl grid place-items-center border shrink-0"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.10)",
                }}
              >
                <HeartHandshake size={18} style={{ color: "var(--primary)" }} />
              </div>

              <div>
                <p
                  className="text-xs font-semibold tracking-wide"
                  style={{ color: "rgba(239,230,220,0.62)" }}
                >
                  SUPPORT RURAL HEALTHCARE
                </p>
                <h3
                  className="mt-1 text-lg sm:text-xl font-extrabold tracking-tight"
                  style={{ color: "rgba(239,230,220,0.95)" }}
                >
                  Your donation helps deliver care to the last mile.
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "rgba(239,230,220,0.72)" }}
                >
                  We prioritize rural communities, disability care, and continuity of treatment—
                  so no one is denied support due to distance or financial barriers.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:justify-self-end">
              <a
                href="/join-the-cause"
                className="group inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold transition active:scale-[0.98]"
                style={{
                  background: "var(--primary)",
                  color: "var(--bg-page)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                Donate / Join The Cause
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold border transition hover:opacity-100 active:scale-[0.98]"
                style={{
                  borderColor: "rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(239,230,220,0.92)",
                  opacity: 0.95,
                }}
              >
                Volunteer / Partner
              </a>
            </div>
          </div>
        </div>

        {/* Main footer grid (trimmed, structured) */}
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="ft-col">
            <h4
              className="text-xl font-extrabold tracking-tight"
              style={{ color: "rgba(239,230,220,0.95)" }}
            >
              Antharaganga Hospital<span style={{ color: "var(--primary)" }}>.</span>
            </h4>

            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "rgba(239,230,220,0.72)" }}
            >
              A charitable rural hospital focused on long-term community impact—rural-first,
              disability-first, community-first.
            </p>

            {/* Social */}
            <div className="mt-5 flex gap-3">
              {[
                { label: "Facebook", Icon: Facebook, href: "#" },
                { label: "Instagram", Icon: Instagram, href: "#" },
                { label: "LinkedIn", Icon: Linkedin, href: "#" },
              ].map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-10 w-10 rounded-full grid place-items-center transition hover:-translate-y-[1px]"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <Icon size={18} style={{ color: "rgba(239,230,220,0.86)" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="ft-col">
            <h4 className="text-lg font-semibold mb-4" style={{ color: "rgba(239,230,220,0.92)" }}>
              Links
            </h4>

            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 transition hover:opacity-100"
                    style={{ color: "rgba(239,230,220,0.72)" }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full transition"
                      style={{ backgroundColor: "rgba(111,51,64,0.78)" }}
                    />
                    <span className="group-hover:opacity-100" style={{ opacity: 0.92 }}>
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs" style={{ color: "rgba(239,230,220,0.56)" }}>
              Transparency and community trust are central to our work.
            </p>
          </div>

          {/* Contact (clean + real fields only) */}
          <div className="ft-col">
            <h4 className="text-lg font-semibold mb-4" style={{ color: "rgba(239,230,220,0.92)" }}>
              Contact
            </h4>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1" style={{ color: "var(--primary)" }} />
                <span style={{ color: "rgba(239,230,220,0.72)" }}>
                  {/* Replace with your real address */}
                  Rural Campus, Antharaganga Region,<br />
                  Karnataka, India
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} style={{ color: "var(--primary)" }} />
                <a
                  href="tel:+919876543210"
                  style={{ color: "rgba(239,230,220,0.72)" }}
                  className="hover:opacity-100 transition"
                >
                  +91 98765 43210
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={18} style={{ color: "var(--primary)" }} />
                <a
                  href="mailto:contact@antharaganga.org"
                  style={{ color: "rgba(239,230,220,0.72)" }}
                  className="hover:opacity-100 transition"
                >
                  contact@antharaganga.org
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Clock size={18} style={{ color: "var(--secondary)" }} />
                <span style={{ color: "rgba(239,230,220,0.72)" }}>
                  OPD: Mon–Sat • 9:00 AM – 8:00 PM
                </span>
              </li>
            </ul>

            <p className="mt-5 text-xs" style={{ color: "rgba(239,230,220,0.55)" }}>
              For emergencies, call immediately. For general enquiries, use the contact form.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="ft-bottom mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
          style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
        >
          <span style={{ color: "rgba(239,230,220,0.60)" }}>
            © {new Date().getFullYear()} Antharaganga Hospital. All rights reserved.
          </span>

          <div className="flex gap-6" style={{ color: "rgba(239,230,220,0.60)" }}>
            <a href="#" className="hover:opacity-100 transition" style={{ opacity: 0.9 }}>
              Privacy
            </a>
            <a href="#" className="hover:opacity-100 transition" style={{ opacity: 0.9 }}>
              Terms
            </a>
          </div>
        </div>
      </div>

      <style>{`
        footer a:focus-visible {
          outline: none;
          box-shadow: var(--ring);
          border-radius: 9999px;
        }
      `}</style>
    </footer>
  )
}
