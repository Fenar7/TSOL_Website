import { defineField, defineType } from "sanity";

export const blogPostType = defineType({
    name: "blogPost",
    title: "Blog Post",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required().min(3),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "excerpt",
            title: "Excerpt",
            description: "A short summary shown on the listing page",
            type: "text",
            rows: 3,
            validation: (rule) => rule.max(300),
        }),
        defineField({
            name: "date",
            title: "Publish Date",
            type: "date",
            initialValue: () => new Date().toISOString().split("T")[0],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "body",
            title: "Body",
            description: "Rich text content — you can also add images inline",
            type: "array",
            of: [
                { type: "block" },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alternative Text",
                            type: "string",
                            description: "Describe the image for accessibility",
                        }),
                        defineField({
                            name: "caption",
                            title: "Caption",
                            type: "string",
                        }),
                    ],
                },
            ],
        }),
    ],
    orderings: [
        {
            title: "Publish Date (newest)",
            name: "dateDesc",
            by: [{ field: "date", direction: "desc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "coverImage",
            date: "date",
        },
        prepare({ title, media, date }) {
            return {
                title,
                media,
                subtitle: date ?? "No date",
            };
        },
    },
});
