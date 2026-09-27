"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { RevealHeading } from "@/app/src/components/reveal-heading"

const services = [
  {
    title: "Brand Identity",
    description:
      "Distinctive visual systems, logo suites, typography, and guidelines built for recognition.",
    tags: ["Strategy", "Logo", "Guidelines"],
  },
  {
    title: "Web Design",
    description:
      "Responsive portfolio, product, and campaign interfaces with strong art direction and clean flow.",
    tags: ["Responsive", "Editorial", "Launch"],
  },
  {
    title: "Motion Graphics",
    description:
      "Kinetic type, animated brand assets, launch loops, and social-first motion systems.",
    tags: ["Animation", "Social", "Campaign"],
  },
  {
    title: "Print Design",
    description:
      "Posters, packaging, books, lookbooks, and tactile pieces with sharp hierarchy and finish.",
    tags: ["Posters", "Packaging", "Editorial"],
  },
  {
    title: "UI/UX Design",
    description:
      "User-focused digital systems, wireframes, prototypes, and polished interface libraries.",
    tags: ["Prototype", "Systems", "Product"],
  },
]

const revealVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.36,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.24,
      ease: "easeInOut",
    },
  },
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <section
      id="services"
      aria-label="Services"
      className="bg-surface px-5 py-20 text-text sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-4 border-b border-[#222222] pb-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-normal text-accent">
              Services
            </p>
            <RevealHeading className="text-6xl sm:text-7xl lg:text-8xl">
              What I Build
            </RevealHeading>
          </div>
          <p className="max-w-2xl text-base leading-7 text-text/64 md:justify-self-end">
            From raw visual direction to production-ready systems, each service is shaped to make
            the brand easier to recognize, use, and remember.
          </p>
        </div>

        <div className="border-t border-[#222222]">
          {services.map((service, index) => {
            const isActive = activeIndex === index

            return (
              <motion.article
                key={service.title}
                className="group border-b border-[#222222]"
                onHoverStart={() => setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(null)}
                onFocusCapture={() => setActiveIndex(index)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setActiveIndex(null)
                  }
                }}
              >
                <button
                  type="button"
                  className="flex w-full flex-col gap-5 py-6 text-left sm:py-8 lg:grid lg:grid-cols-[120px_minmax(0,1fr)_56px] lg:items-center"
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  aria-expanded={isActive}
                >
                  <span className="font-heading text-5xl leading-none text-accent sm:text-6xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-5xl leading-none text-text transition-colors group-hover:text-accent sm:text-6xl lg:text-7xl">
                    {service.title}
                  </span>
                  <span className="inline-flex h-12 w-12 items-center justify-center border border-accent text-accent transition-colors group-hover:bg-accent group-hover:text-surface">
                    <ArrowUpRight aria-hidden="true" size={24} strokeWidth={1.8} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      variants={revealVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="overflow-hidden"
                    >
                      <div className="grid gap-5 pb-8 lg:grid-cols-[120px_minmax(0,1fr)]">
                        <div aria-hidden="true" />
                        <div className="relative overflow-hidden bg-background p-5 sm:p-7">
                          <motion.div
                            className="absolute inset-x-0 bottom-0 h-full bg-accent/80"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                          />
                          <div className="relative text-background">
                            <p className="max-w-3xl text-lg leading-8">
                              {service.description}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              {service.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="border border-background/35 px-3 py-1 text-xs font-bold uppercase tracking-normal"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
