import { useRef } from 'react'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Projects from '../sections/projects'
import Achievements from '../sections/Achievements'
import Experience from '../sections/Experience'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null)

  return (
    <main id="home">
      <Hero heroRef={heroRef} />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
