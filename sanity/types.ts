import type { PortableTextBlock } from "sanity"

// ── Shared ────────────────────────────────────────────────────────────────────

export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
}

export interface GalleryImage extends SanityImage {
  caption?: string
}

// ── Project ───────────────────────────────────────────────────────────────────

export type ProjectCategory = "branding" | "web" | "motion" | "print"

export interface Project {
  _id: string
  _createdAt: string
  title: string
  slug: { current: string }
  category: ProjectCategory
  coverImage: SanityImage
  images?: GalleryImage[]
  description?: PortableTextBlock[]
  client?: string
  year?: number
  tools?: string[]
  featured: boolean
  liveUrl?: string
  caseStudyUrl?: string
  order?: number
}

// ── Service ───────────────────────────────────────────────────────────────────

export interface Service {
  _id: string
  title: string
  icon: string
  shortDescription: string
  fullDescription?: PortableTextBlock[]
  order: number
}

// ── Testimonial ───────────────────────────────────────────────────────────────

export interface Testimonial {
  _id: string
  clientName: string
  company?: string
  avatar?: SanityImage
  quote: string
  rating: 1 | 2 | 3 | 4 | 5
}

// ── About ─────────────────────────────────────────────────────────────────────

export interface Skill {
  name: string
  level: number // 0–100
}

export interface About {
  _id: string
  bio: PortableTextBlock[]
  portrait?: SanityImage
  skills?: Skill[]
  cvFile?: { asset: { url: string } }
  yearsOfExperience?: number
  projectsCompleted?: number
  awardsWon?: number
}

// ── Site Settings ─────────────────────────────────────────────────────────────

export interface SocialLinks {
  instagram?: string
  behance?: string
  dribbble?: string
  linkedin?: string
  twitter?: string
  github?: string
  youtube?: string
}

export interface SiteSettings {
  _id: string
  seoTitle: string
  seoDescription: string
  email: string
  socialLinks?: SocialLinks
}
