import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    icon: () => "🎬",
    fields: [
        defineField({
            name: "thumbnail",
            title: "Thumbnail Image",
            type: "image",
            description: "Cover image shown on the card before the video plays.",
            options: { hotspot: true },
            validation: (R) => R.required(),
        }),
        defineField({
            name: "video",
            title: "Video File",
            type: "file",
            description: "Upload an MP4, MOV, or WebM video.",
            options: { accept: "video/*" },
            validation: (R) => R.required(),
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower number = shown first.",
            initialValue: 10,
        }),
    ],
    preview: {
        select: { media: "thumbnail" },
        prepare({ media }) {
            return { title: "Testimonial Video", media };
        },
    },
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
});
