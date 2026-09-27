"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { RevealHeading } from "@/app/src/components/reveal-heading"

const testimonials = [
  {
    quote:
      "Sunil translated a messy early-stage brand into a visual system that felt confident, flexible, and instantly recognizable.",
    name: "Mira Shah",
    company: "Northline Studio",
    avatar: "/images/avatar-mira.svg",
  },
  {
    quote:
      "The web direction had the rare mix of sharp visual taste and practical UX thinking. Our launch finally felt like us.",
    name: "Jonas Reid",
    company: "Format Works",
    avatar: "/images/avatar-jonas.svg",
  },
  {
    quote:
      "From identity to motion assets, every piece landed with intent. The campaign looked premium without losing momentum.",
    name: "Alina Verma",
    company: "Signal Supply",
    avatar: "/images/avatar-alina.svg",
  },
]

const slideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
    transition: {
      duration: 0.32,
      ease: "easeInOut",
    },
  }),
}

const wrapIndex = (index: number) =>
  (index + testimonials.length) % testimonials.length

export default function Testimonials() {
  const [[activeIndex, direction], setActive] = useState([0, 1])
  const activeTestimonial = testimonials[activeIndex]

  const paginate = useCallback((nextDirection: number) => {
    setActive(([currentIndex]) => [
      wrapIndex(currentIndex + nextDirection),
      nextDirection,
    ])
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => paginate(1), 5000)

    return () => window.clearInterval(timer)
  }, [paginate])

  return (
    <section
      aria-label="Testimonials"
      className="overflow-hidden bg-surface px-5 py-20 text-text sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 border-b border-[#222222] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-normal text-accent">
              Testimonials
            </p>
            <RevealHeading className="text-6xl sm:text-7xl lg:text-8xl">
              Client Notes
            </RevealHeading>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center border border-accent text-accent transition-colors hover:bg-accent hover:text-surface"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
            >
              <ArrowLeft aria-hidden="true" size={22} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center border border-accent text-accent transition-colors hover:bg-accent hover:text-surface"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
            >
              <ArrowRight aria-hidden="true" size={22} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="relative min-h-[420px] border border-[#222222] bg-background p-6 sm:min-h-[460px] sm:p-8 lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-2 font-heading text-[12rem] leading-none text-accent sm:left-8 sm:text-[16rem]"
          >
            &ldquo;
          </div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.22}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) paginate(1)
                if (info.offset.x > 70) paginate(-1)
              }}
              className="relative z-10 flex min-h-[340px] flex-col justify-end gap-10 pt-24 sm:min-h-[360px] lg:pt-28"
            >
              <blockquote className="max-w-5xl font-sans text-3xl italic leading-tight text-text sm:text-5xl lg:text-6xl">
                {activeTestimonial.quote}
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden border border-accent bg-surface sm:h-16 sm:w-16">
                  <Image
                    src={activeTestimonial.avatar}
                    alt={`${activeTestimonial.name} avatar`}
                    fill
                    sizes="64px"
                    loading="lazy"
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-normal text-text">
                    {activeTestimonial.name}
                  </p>
                  <p className="mt-1 text-sm text-text/56">
                    {activeTestimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 right-6 z-20 flex gap-2 sm:bottom-8 sm:right-8">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                className={`h-2.5 transition-all ${
                  index === activeIndex ? "w-8 bg-accent" : "w-2.5 bg-text/30"
                }`}
                onClick={() =>
                  setActive(([currentIndex]) => [
                    index,
                    index > currentIndex ? 1 : -1,
                  ])
                }
                aria-label={`Show testimonial from ${testimonial.name}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
