import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      // Optional — no validation required
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Ongoing", value: "Ongoing" },
          { title: "Completed", value: "Completed" },
        ],
        layout: "radio",
      },
      initialValue: "Ongoing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "serviceCategory",
      title: "Service Category",
      type: "string",
      description: "Which service does this project belong to?",
      options: {
        list: [
          { title: "Architecture", value: "architecture" },
          { title: "Interiors", value: "interiors" },
          { title: "Landscaping", value: "landscaping" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Additional Images",
      description: "Add multiple project images for the gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "body",
      title: "Body",
      description: "Rich text content for the project detail page (optional)",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
    prepare({ title, media }) {
      return {
        title: title ?? "Untitled project",
        media,
      };
    },
  },
});
