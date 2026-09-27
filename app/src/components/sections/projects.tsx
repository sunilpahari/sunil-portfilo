"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { RevealHeading } from "@/app/src/components/reveal-heading"

const filters = ["All", "Branding", "UI/UX", "Motion", "Print", "Identity"]

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTInIGhlaWdodD0nMTInIHZpZXdCb3g9JzAgMCAxMiAxMicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdiJz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScyJy8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9JzEyJyBoZWlnaHQ9JzEyJyBmaWxsPScjMTExMTExJy8+PGNpcmNsZSBjeD0nNicgY3k9JzYnIHI9JzYnIGZpbGw9JyNlOGZmMDAnIG9wYWNpdHk9Jy42JyBmaWx0ZXI9J3VybCgjYiknLz48L3N2Zz4="

const projects = [
  {
    title: "Spectrum House",
    categories: ["Branding", "Identity"],
    image: "/images/project-spectrum.png",
    className: "lg:col-span-7 lg:row-span-2",
    sizes: "(min-width: 1024px) 58vw, 100vw",
  },
  {
    title: "Orbit UI",
    categories: ["UI/UX", "Web Design"],
    image: "/images/project-orbit.png",
    className: "lg:col-span-5",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    title: "Noise Index",
    categories: ["Print", "Identity"],
    image: "/images/project-noise.png",
    className: "lg:col-span-5",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    title: "Fold Studio",
    categories: ["Branding", "Print"],
    image: "/images/project-fold.png",
    className: "lg:col-span-6",
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
  {
    title: "Signal Motion",
    categories: ["Motion", "Web Design"],
    image: "/images/project-signal.png",
    className: "lg:col-span-6 lg:row-span-2",
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
  {
    title: "Gridline Campaign",
    categories: ["UI/UX", "Branding"],
    image: "/images/project-grid.png",
    className: "lg:col-span-6",
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
]

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter))

  return (
    <section id="work" aria-label="Work" className="bg-background px-5 py-20 text-text sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 border-b border-text/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-normal text-accent">
              Selected Work
            </p>
            <RevealHeading className="text-6xl sm:text-7xl lg:text-8xl">
              Projects
            </RevealHeading>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`border px-4 py-2 text-xs font-semibold uppercase tracking-normal transition-colors ${
                  activeFilter === filter
                    ? "border-accent bg-accent text-background"
                    : "border-text/15 text-text hover:border-accent hover:text-accent"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeFilter}
          className="grid auto-rows-[minmax(360px,44vw)] grid-cols-1 gap-4 md:auto-rows-[430px] lg:grid-cols-12 lg:auto-rows-[320px]"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
        >
          {visibleProjects.map((project) => (
            <motion.article
              key={project.title}
              className={`${project.className} group relative min-h-[360px] overflow-hidden border border-text/10 bg-surface`}
              variants={cardVariants}
            >
              <Image
                src={project.image}
                alt={`${project.title} project artwork`}
                fill
                sizes={project.sizes}
                loading="lazy"
                placeholder="blur"
                blurDataURL={blurPlaceholder}
                unoptimized
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-accent/80 p-5 text-background transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0 sm:p-7">
                <h3 className="text-4xl text-background sm:text-5xl">
                  {project.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="border border-background/30 px-2.5 py-1 text-xs font-bold uppercase tracking-normal"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="mt-5 inline-flex text-sm font-bold uppercase tracking-normal"
                  aria-label={`View ${project.title}`}
                >
                  View &rarr;
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
