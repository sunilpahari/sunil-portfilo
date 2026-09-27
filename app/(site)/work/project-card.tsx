"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "@/app/src/lib/gsap"
import { useGSAP } from "@gsap/react"
import type { Project } from "@/sanity/types"
import { urlFor } from "@/sanity/lib/image"
import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  project: Project
  className?: string
  priority?: boolean
  index: number
}

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTInIGhlaWdodD0nMTInIHZpZXdCb3g9JzAgMCAxMiAxMicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdiJz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScyJy8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9JzEyJyBoZWlnaHQ9JzEyJyBmaWxsPScjMTExMTExJy8+PGNpcmNsZSBjeD0nNicgY3k9JzYnIHI9JzYnIGZpbGw9JyNlOGZmMDAnIG9wYWNpdHk9Jy42JyBmaWx0ZXI9J3VybCgjYiknLz48L3N2Zz4="

export function ProjectCard({ project, className = "", priority = false, index }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Alternate overlay styles for a highly premium, custom feel
  const isAltColor = index % 2 === 1
  const overlayBgClass = isAltColor ? "bg-accent-2" : "bg-accent"
  const overlayTextClass = isAltColor ? "text-text" : "text-background"
  const tagBorderClass = isAltColor ? "border-text/25 text-text" : "border-background/25 text-background"

  // Setup GSAP hover animation
  const { contextSafe } = useGSAP({ scope: containerRef })

  const handleMouseEnter = contextSafe(() => {
    if (!overlayRef.current) return
    gsap.killTweensOf([overlayRef.current, ".overlay-reveal"])

    const tl = gsap.timeline()
    tl.to(overlayRef.current, {
      yPercent: 0,
      duration: 0.45,
      ease: "power2.out",
    })
    tl.fromTo(
      containerRef.current?.querySelectorAll(".overlay-reveal") || [],
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out",
      },
      "-=0.25"
    )
  })

  const handleMouseLeave = contextSafe(() => {
    if (!overlayRef.current) return
    gsap.killTweensOf([overlayRef.current, ".overlay-reveal"])

    const tl = gsap.timeline()
    tl.to(overlayRef.current, {
      yPercent: 100,
      duration: 0.4,
      ease: "power2.inOut",
    })
    tl.to(
      containerRef.current?.querySelectorAll(".overlay-reveal") || [],
      {
        y: -10,
        opacity: 0,
        duration: 0.2,
      },
      "<"
    )
  })

  // Format image URL
  const imageUrl = project.coverImage?.asset
    ? urlFor(project.coverImage).url()
    : `/images/project-${["fold", "grid", "noise", "orbit", "signal", "spectrum"][index % 6]}.png`

  // NextJS page path for project details
  const detailUrl = `/work/${project.slug}`

  return (
    <div
      ref={containerRef}
      className={`project-card group relative overflow-hidden border border-text/10 bg-surface rounded-none select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax Image Wrapper */}
      <div className="absolute inset-0 overflow-hidden">
        {/* The image is 120% height so it has 20% vertical scroll room */}
        <Image
          src={imageUrl}
          alt={`${project.title} project artwork`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          placeholder="blur"
          blurDataURL={blurPlaceholder}
          unoptimized
          className="parallax-image absolute -top-[10%] left-0 h-[120%] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      {/* Static Visual Info (Shows when not hovered - optional styling for mobile/fallback) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/90 via-background/40 to-transparent pt-12 md:hidden">
        <h3 className="text-2xl font-bold text-text truncate">{project.title}</h3>
        <p className="text-xs uppercase tracking-wider text-accent font-semibold mt-1">
          {project.category}
        </p>
      </div>

      {/* Hover Overlay */}
      <div
        ref={overlayRef}
        className={`absolute inset-0 ${overlayBgClass} ${overlayTextClass} flex flex-col justify-between p-6 md:p-8 translate-y-full pointer-events-none select-none`}
        style={{ transform: "translateY(100%)" }}
      >
        <div className="flex justify-between items-start">
          <span className={`overlay-reveal text-xs font-semibold uppercase tracking-widest border px-3 py-1 rounded-full ${tagBorderClass}`}>
            {project.category}
          </span>
          <div className="overlay-reveal">
            <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="overlay-reveal text-4xl sm:text-5xl md:text-6xl leading-none font-bold">
            {project.title}
          </h3>
          {project.year && (
            <p className="overlay-reveal text-sm font-semibold opacity-75">
              Client: {project.client || "Self"} &bull; {project.year}
            </p>
          )}
          <Link
            href={detailUrl}
            className="overlay-reveal mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wider underline pointer-events-auto w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            View Project Case Study
          </Link>
        </div>
      </div>
    </div>
  );
}
