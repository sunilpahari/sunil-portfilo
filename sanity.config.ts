import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemas"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"

export default defineConfig({
  name: "portfolio-studio",
  title: "Portfolio Studio",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // ── Singleton: About ──────────────────────────────
            S.listItem()
              .title("About")
              .id("about")
              .child(
                S.document()
                  .schemaType("about")
                  .documentId("singleton-about")
              ),
            // ── Singleton: Site Settings ──────────────────────
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("singleton-siteSettings")
              ),
            S.divider(),
            // ── Collections ───────────────────────────────────
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
