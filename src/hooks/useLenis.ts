import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2, // ✅ supported in v1.0.42
      easing: (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // ✅ Typed global access
    window.lenis = lenis

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Sync with GSAP
    lenis.on('scroll', ScrollTrigger.update)
    ScrollTrigger.refresh()

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()

      if (window.lenis === lenis) {
        window.lenis = null
      }
    }
  }, [])
}
