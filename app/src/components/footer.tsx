"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUp } from "lucide-react"
import { FaBehance, FaDribbble, FaInstagram, FaLinkedinIn } from "react-icons/fa"

const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
]

const socialLinks = [
  { label: "Behance", href: "https://behance.net", icon: FaBehance },
  { label: "Dribbble", href: "https://dribbble.com", icon: FaDribbble },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
]

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 420)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <footer className="relative bg-background px-5 py-10 text-text sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]"
      />

      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div>
          <Link
            href="/"
            className="font-heading text-6xl leading-none text-text transition-colors hover:text-accent"
            aria-label="Sunil home"
          >
            Sunil
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-text/56">
            Graphic designer crafting identity systems, digital surfaces, and print-led stories.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <nav aria-label="Footer navigation" className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-semibold uppercase tracking-normal text-text"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3 sm:justify-end">
            {socialLinks.map((social) => {
              const Icon = social.icon

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 w-12 items-center justify-center border border-text/10 text-text transition-colors hover:border-accent hover:text-accent"
                  aria-label={social.label}
                >
                  <Icon aria-hidden="true" className="text-xl" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#222222] pt-6 text-xs font-semibold uppercase tracking-normal text-text/48 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 Sunil. All rights reserved.</p>
        <p>Design / Direction / Digital</p>
      </div>

      <button
        type="button"
        className={`fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center border border-accent bg-background text-accent transition-all duration-300 hover:bg-accent hover:text-background ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp aria-hidden="true" size={22} strokeWidth={1.8} />
      </button>
    </footer>
  )
}
