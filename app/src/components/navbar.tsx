"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import type { Variants } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
]

const overlayVariants: Variants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.24,
      ease: "easeInOut",
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.28,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.14,
    },
  },
}

const overlayLinkVariants: Variants = {
  closed: {
    opacity: 0,
    y: 24,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: "easeOut",
    },
  },
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 12)
  })

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <>
      <motion.header
        className="fixed left-0 top-0 z-50 w-full border-b px-5 py-4 transition-colors sm:px-8 lg:px-12"
        animate={{
          backgroundColor: isScrolled ? "#111111" : "rgba(17, 17, 17, 0)",
          backdropFilter: isScrolled ? "blur(18px)" : "blur(0px)",
          borderColor: isScrolled ? "rgba(232, 255, 0, 0.2)" : "rgba(232, 255, 0, 0)",
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="font-heading text-4xl leading-none tracking-normal text-text sm:text-5xl"
            aria-label="Sunil home"
          >
            Sunil
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-sm font-medium uppercase tracking-normal text-text"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-accent/35 text-text md:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
          >
            <Menu aria-hidden="true" size={24} strokeWidth={1.8} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] flex min-h-screen flex-col bg-surface px-5 py-4 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="font-heading text-4xl leading-none tracking-normal text-text"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Sunil home"
              >
                Sunil
              </Link>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center border border-accent/45 text-text"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X aria-hidden="true" size={24} strokeWidth={1.8} />
              </button>
            </div>

            <motion.div className="flex flex-1 flex-col justify-center gap-7">
              {navItems.map((item) => (
                <motion.div key={item.href} variants={overlayLinkVariants}>
                  <Link
                    href={item.href}
                    className="nav-link font-heading text-6xl leading-none tracking-normal text-text"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
