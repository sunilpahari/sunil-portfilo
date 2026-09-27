"use client"

import { useState, useRef, useEffect } from "react"
import { gsap, ScrollTrigger } from "@/app/src/lib/gsap"
import { useGSAP } from "@gsap/react"
import { ProjectCard } from "./project-card"
import type { Project, ProjectCategory } from "@/sanity/types"
import { getPaginatedProjects } from "@/sanity/queries"
import { Loader2 } from "lucide-react"

// Rich high-quality mock projects as a fallback
const MOCK_PROJECTS: Project[] = [
  {
    _id: "mock-1",
    _createdAt: "2026-01-01T00:00:00.000Z",
    title: "Spectrum House",
    slug: { current: "spectrum-house" },
    category: "branding",
    coverImage: { _type: "image", asset: { _ref: "mock-ref-1", _type: "reference" } },
    featured: true,
    client: "Spectrum Int.",
    year: 2025,
    tools: ["Figma", "Illustrator", "Brand Strategy"],
  },
  {
    _id: "mock-2",
    _createdAt: "2026-01-02T00:00:00.000Z",
    title: "Orbit UI",
    slug: { current: "orbit-ui" },
    category: "web",
    coverImage: { _type: "image", asset: { _ref: "mock-ref-2", _type: "reference" } },
    featured: false,
    client: "Orbit Labs",
    year: 2026,
    tools: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    _id: "mock-3",
    _createdAt: "2026-01-03T00:00:00.000Z",
    title: "Noise Index",
    slug: { current: "noise-index" },
    category: "print",
    coverImage: { _type: "image", asset: { _ref: "mock-ref-3", _type: "reference" } },
    featured: false,
    client: "Noise Publishing",
    year: 2025,
    tools: ["InDesign", "Typography", "Print Layout"],
  },
  {
    _id: "mock-4",
    _createdAt: "2026-01-04T00:00:00.000Z",
    title: "Fold Studio",
    slug: { current: "fold-studio" },
    category: "branding",
    coverImage: { _type: "image", asset: { _ref: "mock-ref-4", _type: "reference" } },
    featured: false,
    client: "Fold Co.",
    year: 2024,
    tools: ["Identity Design", "Packaging", "Art Direction"],
  },
  {
    _id: "mock-5",
    _createdAt: "2026-01-05T00:00:00.000Z",
    title: "Signal Motion",
    slug: { current: "signal-motion" },
    category: "motion",
    coverImage: { _type: "image", asset: { _ref: "mock-ref-5", _type: "reference" } },
    featured: true,
    client: "Signal Media",
    year: 2025,
    tools: ["After Effects", "Cinema 4D", "Sound Design"],
  },
  {
    _id: "mock-6",
    _createdAt: "2026-01-06T00:00:00.000Z",
    title: "Gridline Campaign",
    slug: { current: "gridline-campaign" },
    category: "web",
    coverImage: { _type: "image", asset: { _ref: "mock-ref-6", _type: "reference" } },
    featured: false,
    client: "Gridline Corp",
    year: 2026,
    tools: ["Next.js", "GSAP", "Three.js"],
  },
  {
    _id: "mock-7",
    _createdAt: "2026-01-07T00:00:00.000Z",
    title: "Vortex Branding",
    slug: { current: "vortex-branding" },
    category: "branding",
    coverImage: { _type: "image", asset: { _ref: "mock-ref-7", _type: "reference" } },
    featured: false,
    client: "Vortex Inc.",
    year: 2025,
    tools: ["Vector Design", "Branding", "Creative Suite"],
  },
  {
    _id: "mock-8",
    _createdAt: "2026-01-08T00:00:00.000Z",
    title: "Aero UI Kit",
    slug: { current: "aero-ui" },
    category: "web",
    coverImage: { _type: "image", asset: { _ref: "mock-ref-8", _type: "reference" } },
    featured: false,
    client: "Aero Design System",
    year: 2026,
    tools: ["Figma", "React Components", "Storybook"],
  },
  {
    _id: "mock-9",
    _createdAt: "2026-01-09T00:00:00.000Z",
    title: "Quantum Poster",
    slug: { current: "quantum-poster" },
    category: "print",
    coverImage: { _type: "image", asset: { _ref: "mock-ref-9", _type: "reference" } },
    featured: false,
    client: "Quantum Labs",
    year: 2024,
    tools: ["Lithography", "Poster Design", "Printmaking"],
  },
  {
    _id: "mock-10",
    _createdAt: "2026-01-10T00:00:00.000Z",
    title: "Flux Loop",
    slug: { current: "flux-loop" },
    category: "motion",
    coverImage: { _type: "image", asset: { _ref: "mock-ref-10", _type: "reference" } },
    featured: false,
    client: "Flux Agency",
    year: 2025,
    tools: ["Animate", "Lottie", "SVG Animation"],
  },
  {
    _id: "mock-11",
    _createdAt: "2026-01-11T00:00:00.000Z",
    title: "Lumina Identity",
    slug: { current: "lumina-identity" },
    category: "branding",
    coverImage: { _type: "image", asset: { _ref: "mock-ref-11", _type: "reference" } },
    featured: false,
    client: "Lumina Spas",
    year: 2025,
    tools: ["Brand Guidelines", "Stationery", "Web Layouts"],
  },
  {
    _id: "mock-12",
    _createdAt: "2026-01-12T00:00:00.000Z",
    title: "Apex Landing",
    slug: { current: "apex-landing" },
    category: "web",
    coverImage: { _type: "image", asset: { _ref: "mock-ref-12", _type: "reference" } },
    featured: true,
    client: "Apex SaaS",
    year: 2026,
    tools: ["Vercel", "TailwindCSS", "Next.js"],
  },
]

interface WorkClientProps {
  initialProjects: Project[]
}

const filters: Array<{ label: string; value: ProjectCategory | "all" }> = [
  { label: "All", value: "all" },
  { label: "Branding", value: "branding" },
  { label: "Web", value: "web" },
  { label: "Motion", value: "motion" },
  { label: "Print", value: "print" },
]

export function WorkClient({ initialProjects }: WorkClientProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all")
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>(initialProjects)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // Track the index where new items start (to animate only them during load more)
  const [newItemsStartIndex, setNewItemsStartIndex] = useState<number>(-1)

  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const headingSubtitleRef = useRef<HTMLParagraphElement>(null)
  const isFirstRender = useRef(true)

  // Fetch logic from Sanity with mock fallback
  const fetchProjects = async (offset: number, filter: ProjectCategory | "all") => {
    try {
      // If mock project ID is used, it will trigger the catch block
      if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.includes("mock")) {
        throw new Error("Using mock credentials")
      }
      return await getPaginatedProjects(offset, 6, filter)
    } catch (e) {
      // Filter the local mock projects list
      const filtered = MOCK_PROJECTS.filter((p) => filter === "all" || p.category === filter)
      return filtered.slice(offset, offset + 6)
    }
  }

  // 1. Entrance timeline for title text
  useGSAP(
    () => {
      if (!headingRef.current) return

      const charSpans = headingRef.current.querySelectorAll(".char-span")
      const timeline = gsap.timeline()

      // Entrance animation
      timeline
        .fromTo(
          headingSubtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        )
        .fromTo(
          charSpans,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        // Stagger in the initial cards
        .fromTo(
          ".project-card",
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3"
        )
    },
    { scope: containerRef }
  )

  // 2. Parallax and Card animation triggers
  useGSAP(
    () => {
      // Re-setup parallax on scroll for all images
      const images = gsap.utils.toArray<HTMLElement>(".parallax-image")
      const scrollTriggersList: ScrollTrigger[] = []

      images.forEach((img, i) => {
        const speed = 10 + (i % 3) * 6 // Vary speed (10%, 16%, 22%) for visual depth
        const trigger = ScrollTrigger.create({
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            // Scroll Trigger scrub mapping from -speed to +speed
            const yPercent = -speed + self.progress * (speed * 2)
            gsap.set(img, { yPercent })
          },
        })
        scrollTriggersList.push(trigger)
      })

      // If we loaded more items, animate only the new items
      if (newItemsStartIndex !== -1) {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card")
        const newCards = cards.slice(newItemsStartIndex)

        gsap.fromTo(
          newCards,
          { scale: 0.9, opacity: 0, y: 25 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: "power2.out",
            onComplete: () => {
              setNewItemsStartIndex(-1)
            },
          }
        )
      }

      // Refresh ScrollTrigger to recalculate bounds after render
      ScrollTrigger.refresh()

      // Cleanup
      return () => {
        scrollTriggersList.forEach((t) => t.kill())
      }
    },
    { dependencies: [displayedProjects, newItemsStartIndex], scope: containerRef }
  )

  // 3. Filter change effect
  const handleFilterClick = async (filter: ProjectCategory | "all") => {
    if (filter === activeFilter || loading) return
    setLoading(true)
    setActiveFilter(filter)

    // Animate out current cards
    gsap.to(".project-card", {
      scale: 0.92,
      opacity: 0,
      y: 20,
      duration: 0.35,
      stagger: 0.03,
      ease: "power2.inOut",
      onComplete: async () => {
        // Fetch new filter batch (offset = 0)
        const newProjects = await fetchProjects(0, filter)
        setDisplayedProjects(newProjects)

        // Check if there are more
        const nextBatch = await fetchProjects(newProjects.length, filter)
        setHasMore(nextBatch.length > 0)
        setLoading(false)
        setNewItemsStartIndex(-1)
      },
    })
  }

  // 4. Load More button action
  const handleLoadMore = async () => {
    if (loading) return
    setLoading(true)

    const currentLength = displayedProjects.length
    const nextBatch = await fetchProjects(currentLength, activeFilter)

    if (nextBatch.length > 0) {
      setNewItemsStartIndex(currentLength)
      setDisplayedProjects((prev) => [...prev, ...nextBatch])

      // Check if there are still more projects
      const peekNext = await fetchProjects(currentLength + nextBatch.length, activeFilter)
      setHasMore(peekNext.length > 0)
    } else {
      setHasMore(false)
    }
    setLoading(false)
  }

  // Manual splitting of text into characters
  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char-span inline-block select-none pointer-events-none">
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  }

  // Layout assignment: featured items are full-span/large
  const getGridClasses = (index: number, featured: boolean) => {
    if (featured) {
      return "col-span-1 md:col-span-2 lg:col-span-2 h-[420px] md:h-[500px]"
    }

    const indexMod = index % 3
    if (indexMod === 0) {
      return "col-span-1 h-[280px] md:h-[340px]"
    } else if (indexMod === 1) {
      return "col-span-1 h-[340px] md:h-[420px]"
    } else {
      return "col-span-1 h-[300px] md:h-[380px]"
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background px-5 py-24 text-text sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Block */}
        <header className="mb-14 lg:mb-20 flex flex-col gap-6 border-b border-text/10 pb-10">
          <div>
            <p ref={headingSubtitleRef} className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent opacity-0">
              Selected Work
            </p>
            <h1
              ref={headingRef}
              className="text-7xl sm:text-8xl md:text-9xl tracking-tighter leading-none"
              aria-label="Projects Portfolio"
            >
              {splitText("PROJECTS")}
            </h1>
          </div>

          {/* Filter Pills */}
          <div className="flex w-full items-center justify-between gap-4 mt-6">
            <div className="flex w-full overflow-x-auto pb-2 scrollbar-none md:overflow-visible md:pb-0">
              <div className="flex gap-2.5 whitespace-nowrap">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    className={`border px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-full ${
                      activeFilter === filter.value
                        ? "border-accent bg-accent text-background scale-105 shadow-lg shadow-accent/15"
                        : "border-text/10 bg-surface/50 text-text hover:border-accent hover:text-accent"
                    }`}
                    onClick={() => handleFilterClick(filter.value)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Project Grid */}
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 grid-flow-row-dense">
            {displayedProjects.map((project, index) => {
              const gridClass = getGridClasses(index, project.featured)
              return (
                <ProjectCard
                  key={project._id}
                  project={project}
                  className={gridClass}
                  index={index}
                  priority={index < 2}
                />
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-text/10 bg-surface/20">
            <p className="text-muted text-sm font-semibold uppercase tracking-wider">No Projects Found</p>
            <p className="text-xs text-text/50 mt-1">Check back later or configure your Sanity data.</p>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && displayedProjects.length > 0 && (
          <div className="mt-16 flex justify-center lg:mt-24">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              type="button"
              className="group relative inline-flex items-center justify-center border border-accent px-10 py-4 text-xs font-bold uppercase tracking-widest text-accent hover:bg-accent hover:text-background transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </span>
              ) : (
                <span>Load More Work</span>
              )}
            </button>
          </div>
        )}
        
      </div>
    </div>
  )
}
