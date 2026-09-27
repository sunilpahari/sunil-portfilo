import { revalidatePath, revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

// Map Sanity document types to the paths/tags they affect
const TYPE_TO_TAGS: Record<string, string[]> = {
  project: ["projects"],
  service: ["services"],
  testimonial: ["testimonials"],
  about: ["about"],
  siteSettings: ["siteSettings"],
}

const TYPE_TO_PATHS: Record<string, string[]> = {
  project: ["/", "/work", "/projects"],
  service: ["/", "/services"],
  testimonial: ["/"],
  about: ["/about"],
  siteSettings: ["/"],
}

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current?: string }
    }>(req, process.env.SANITY_WEBHOOK_SECRET)

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid webhook signature" },
        { status: 401 }
      )
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: "Missing document type in body" },
        { status: 400 }
      )
    }

    const { _type, slug } = body

    // Revalidate tags
    const tags = TYPE_TO_TAGS[_type] ?? []
    for (const tag of tags) {
      revalidateTag(tag, "default")
    }

    // Revalidate paths
    const paths = TYPE_TO_PATHS[_type] ?? ["/"]
    for (const path of paths) {
      revalidatePath(path, "page")
    }

    // Also revalidate the specific project page if slug is present
    if (_type === "project" && slug?.current) {
      revalidatePath(`/work/${slug.current}`, "page")
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      type: _type,
      tags,
      paths,
    })
  } catch (err: unknown) {
    console.error("Revalidation error:", err)
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    )
  }
}
