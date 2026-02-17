import Hero from '../sections/Hero'
import About from '../sections/About'
import OurWork from '../sections/OurWork'
import Doctors from '../sections/Doctors'
import Testimonials from '../sections/Testimonials'
import Contact from '../sections/Contact'
import ServicesShowcase from '../sections/Services'
import CauseImpactSection from '../sections/Important'
import BrandPartnersStrip from '../sections/PArtner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CauseImpactSection />
      <About />
      <ServicesShowcase />
      <OurWork />
      <Doctors />
      <Testimonials />
      <Contact />
      <BrandPartnersStrip />
    </>
  )
}
