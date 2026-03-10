/** @format */

import { defineField, defineType } from "sanity";
import { BiPen } from "react-icons/bi";

export default defineType({
  name: "blog",
  title: "Blog Post",
  type: "document",
  icon: BiPen,
  fields: [
    defineField({
      name: "title",
      title: "Post Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "markdown",
      description: "Yahan apni puri post Markdown format me likhein.",
    }),
  ],
});
