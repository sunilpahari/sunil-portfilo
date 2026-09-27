import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Overall title for SEO purposes.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Overall description for SEO purposes.",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "email",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Platform Name",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "Profile URL",
              type: "url",
            }),
          ],
        },
      ],
    }),
  ],
});