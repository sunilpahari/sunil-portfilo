import { client } from "./lib/client"
import type { Project, ProjectCategory, Service, Testimonial, About, SiteSettings } from "./types"

// ── Reusable image projection ─────────────────────────────────────────────────
const imageProjection = `{
  asset->,
  hotspot,
  alt
}`

const galleryImageProjection = `{
  asset->,
  hotspot,
  alt,
  caption
}`

// ── Projects ──────────────────────────────────────────────────────────────────

const projectFields = `
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  category,
  coverImage ${imageProjection},
  images[] ${galleryImageProjection},
  description,
  client,
  year,
  tools,
  featured,
  liveUrl,
  caseStudyUrl,
  order
`

/** Fetch all projects, ordered featured-first then by order */
export async function getAllProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(featured desc, order asc) {
    ${projectFields}
  }`
  return client.fetch(query, {}, { next: { revalidate: 60 } })
}

/** Fetch only featured projects */
export async function getFeaturedProjects(): Promise<Project[]> {
  const query = `*[_type == "project" && featured == true] | order(order asc) {
    ${projectFields}
  }`
  return client.fetch(query, {}, { next: { revalidate: 60 } })
}

/** Fetch projects filtered by category */
export async function getProjectsByCategory(
  category: "branding" | "web" | "motion" | "print"
): Promise<Project[]> {
  const query = `*[_type == "project" && category == $category] | order(order asc) {
    ${projectFields}
  }`
  return client.fetch(query, { category }, { next: { revalidate: 60 } })
}

/** Fetch a single project by slug */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    ${projectFields}
  }`
  return client.fetch(query, { slug }, { next: { revalidate: 60 } })
}

/** Fetch all project slugs (used by generateStaticParams) */
export async function getAllProjectSlugs(): Promise<string[]> {
  const query = `*[_type == "project"].slug.current`
  return client.fetch(query, {}, { next: { revalidate: 60 } })
}

/** Fetch projects paginated with optional category filter */
export async function getPaginatedProjects(
  start: number,
  limit: number,
  category?: ProjectCategory | "all"
): Promise<Project[]> {
  const categoryFilter = category && category !== "all" ? `&& category == $category` : ""
  const query = `*[_type == "project" ${categoryFilter}] | order(featured desc, order asc) [$start...$end] {
    ${projectFields}
  }`
  const end = start + limit
  return client.fetch(query, { category, start, end }, { next: { revalidate: 60 } })
}

// ── Services ──────────────────────────────────────────────────────────────────

/** Fetch all services ordered by display order */
export async function getAllServices(): Promise<Service[]> {
  const query = `*[_type == "service"] | order(order asc) {
    _id,
    title,
    icon,
    shortDescription,
    fullDescription,
    order
  }`
  return client.fetch(query, {}, { next: { revalidate: 60 } })
}

/** Fetch a single service by ID */
export async function getServiceById(id: string): Promise<Service | null> {
  const query = `*[_type == "service" && _id == $id][0] {
    _id,
    title,
    icon,
    shortDescription,
    fullDescription,
    order
  }`
  return client.fetch(query, { id }, { next: { revalidate: 60 } })
}

// ── Testimonials ──────────────────────────────────────────────────────────────

/** Fetch all testimonials */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  const query = `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    clientName,
    company,
    avatar ${imageProjection},
    quote,
    rating
  }`
  return client.fetch(query, {}, { next: { revalidate: 60 } })
}

/** Fetch testimonials with a minimum star rating */
export async function getTestimonialsByRating(
  minRating: 1 | 2 | 3 | 4 | 5 = 4
): Promise<Testimonial[]> {
  const query = `*[_type == "testimonial" && rating >= $minRating] | order(rating desc, _createdAt desc) {
    _id,
    clientName,
    company,
    avatar ${imageProjection},
    quote,
    rating
  }`
  return client.fetch(query, { minRating }, { next: { revalidate: 60 } })
}

// ── About ─────────────────────────────────────────────────────────────────────

/** Fetch the singleton About document */
export async function getAbout(): Promise<About | null> {
  const query = `*[_type == "about" && _id == "singleton-about"][0] {
    _id,
    bio,
    portrait ${imageProjection},
    skills[] {
      name,
      level
    },
    cvFile {
      asset-> { url }
    },
    yearsOfExperience,
    projectsCompleted,
    awardsWon
  }`
  return client.fetch(query, {}, { next: { revalidate: 60 } })
}

// ── Site Settings ─────────────────────────────────────────────────────────────

/** Fetch the singleton Site Settings document */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings" && _id == "singleton-siteSettings"][0] {
    _id,
    seoTitle,
    seoDescription,
    email,
    socialLinks {
      instagram,
      behance,
      dribbble,
      linkedin,
      twitter,
      github,
      youtube
    }
  }`
  return client.fetch(query, {}, { next: { revalidate: 60 } })
}
