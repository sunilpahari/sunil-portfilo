import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "portrait",
      title: "Portrait Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Skill Name",
              type: "string",
            }),
            defineField({
              name: "level",
              title: "Skill Level",
              type: "string",
              options: {
                list: [
                  { title: "Beginner", value: "beginner" },
                  { title: "Intermediate", value: "intermediate" },
                  { title: "Advanced", value: "advanced" },
                  { title: "Expert", value: "expert" },
                ],
              },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "cvFile",
      title: "CV File",
      type: "file",
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
    }),
    defineField({
      name: "projectsCompleted",
      title: "Projects Completed",
      type: "number",
    }),
    defineField({
      name: "awardsWon",
      title: "Awards Won",
      type: "number",
    }),
  ],
});