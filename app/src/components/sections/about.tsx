"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { RevealHeading } from "@/app/src/components/reveal-heading"

const skills = [
  { label: "Brand Identity", value: 94 },
  { label: "UI/UX Systems", value: 88 },
  { label: "Motion Direction", value: 76 },
  { label: "Print Design", value: 84 },
]

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTInIGhlaWdodD0nMTInIHZpZXdCb3g9JzAgMCAxMiAxMicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdiJz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScyJy8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9JzEyJyBoZWlnaHQ9JzEyJyBmaWxsPScjMTExMTExJy8+PGNpcmNsZSBjeD0nNicgY3k9JzYnIHI9JzYnIGZpbGw9JyNlOGZmMDAnIG9wYWNpdHk9Jy42JyBmaWx0ZXI9J3VybCgjYiknLz48L3N2Zz4="

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: "easeOut",
    },
  },
}

export default function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="relative isolate overflow-hidden bg-background px-5 py-20 text-text sm:px-8 lg:px-12 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-[0.14]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23f0f0f0' fill-opacity='0.72'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 -z-10 -translate-x-1/2 font-heading text-[8rem] leading-none text-text/[0.035] sm:text-[12rem] lg:text-[18rem]"
      >
        ABOUT
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(320px,0.82fr)_minmax(0,1fr)] lg:items-center">
        <motion.div
          className="relative mx-auto w-full max-w-xl"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -bottom-4 -right-4 h-full w-full border-2 border-accent sm:-bottom-6 sm:-right-6" />
          <div className="relative aspect-[4/5] overflow-hidden border border-text/15 bg-surface">
            <Image
              src="/images/about-portrait.png"
              alt="Graphic designer portrait"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL={blurPlaceholder}
              unoptimized
              className="object-cover"
            />
          </div>

          <motion.div
            className="absolute -left-2 top-8 border border-accent bg-background px-4 py-3 text-accent shadow-[8px_8px_0_var(--accent)] sm:-left-8 sm:px-5 sm:py-4"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.22, duration: 0.48, ease: "easeOut" }}
          >
            <p className="font-heading text-4xl leading-none sm:text-5xl">5+</p>
            <p className="mt-1 max-w-[8rem] text-xs font-semibold uppercase tracking-normal">
              Years Experience
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.24 }}
        >
          <motion.p
            className="mb-4 text-xs font-semibold uppercase tracking-normal text-accent"
            variants={itemVariants}
          >
            About the Designer
          </motion.p>
          <RevealHeading className="mb-6 text-6xl sm:text-7xl lg:text-8xl">
            Visual clarity with a sharp edge.
          </RevealHeading>
          <motion.p className="max-w-2xl text-lg leading-8 text-text/72" variants={itemVariants}>
            I craft identity systems, editorial layouts, digital interfaces, and motion-led campaigns
            for brands that need to feel immediate, memorable, and built with intent.
          </motion.p>

          <motion.div className="mt-10 space-y-6" variants={itemVariants}>
            {skills.map((skill) => (
              <div key={skill.label}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold uppercase tracking-normal text-text">
                    {skill.label}
                  </p>
                  <p className="text-sm font-semibold text-accent">{skill.value}%</p>
                </div>
                <div className="h-2 overflow-hidden bg-surface">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.a
            href="/Sunil-CV.pdf"
            download
            className="mt-10 inline-flex border border-dashed border-accent px-6 py-4 text-sm font-bold uppercase tracking-normal text-accent transition-colors hover:bg-accent hover:text-background"
            variants={itemVariants}
          >
            Download CV
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
