import Hero from "@/app/src/components/sections/hero"
import MarqueeTicker from "@/app/src/components/sections/marquee-ticker"
import About from "@/app/src/components/sections/about"
import Projects from "@/app/src/components/sections/projects"
import Services from "@/app/src/components/sections/services"
import Testimonials from "@/app/src/components/sections/testimonials"
import Contact from "@/app/src/components/sections/contact"
import { Footer } from "@/app/src/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <MarqueeTicker />
      <About />
      <Projects />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
