// schemas/blog.ts
import { BiPen } from "react-icons/bi";

const blog = {
  name: "blog",
  title: "Blog Post",
  type: "document",
  icon: BiPen,
  fields: [
    {
      name: "title",
      title: "Post Title",
      type: "string",
      description: "Keep the title catchy!",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL ke liye slug (e.g., my-first-blog)",
      options: { source: "title", maxLength: 96 }, // Title se automatically slug generate ho jayega
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Blog ka chhota sa summary jo list mein dikhega",
    },
    {
      name: "content",
      title: "Content",
      type: "array", // Sanity ka rich text editor
      of: [{ type: "block" }],
      description: "Yahan apna poora blog likhein",
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },
  ],
};

export default blog;