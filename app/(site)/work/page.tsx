import type { Metadata } from "next"
import type { Project } from "@/sanity/types"
import { getPaginatedProjects } from "@/sanity/queries"
import { WorkClient } from "./work-client"

export const metadata: Metadata = {
  title: "Work | Sunil Portfolio",
  description: "Explore the selected work, graphic design projects, and case studies by Sunil.",
  openGraph: {
    title: "Work | Sunil Portfolio",
    description: "Explore the selected work, graphic design projects, and case studies by Sunil.",
  },
}

export default async function WorkPage() {
  let initialProjects: Project[] = []

  try {
    // Fetch the first batch of 6 projects for the initial Server-Side Render (SSR)
    initialProjects = await getPaginatedProjects(0, 6)
  } catch (error) {
    console.warn("Failed to fetch projects from Sanity server-side. Falling back to client-side mock data.", error)
  }

  return (
    <main className="min-h-screen bg-background">
      <WorkClient initialProjects={initialProjects} />
    </main>
  )
}
