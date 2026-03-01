// schemas/profile.ts
import { BiUser } from "react-icons/bi";

const profile = {
  name: "profile",
  title: "Profile",
  type: "document", // 'document' ka matlab hai aap iska naya record bana sakte hain
  icon: BiUser,
  fields: [
    {
      name: "fullName",
      title: "Full Name",
      type: "string",
    },
    {
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Short sentence about what you do",
    },
    {
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true }, // Hotspot se image crop adjust kar sakte hain
    },
    {
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      rows: 4,
    },
   // schemas/profile.ts (Sirf skills wala hissa update karna hai)

    {
      name: "skills",
      title: "Skills Categories",
      type: "array",
      description: "Apni skills ko category wise add karein",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "categoryName",
              title: "Category Name",
              type: "string",
              description: "E.g., Frontend, Backend, AI & Modern Tech",
            },
            {
              name: "skillList",
              title: "Skill List",
              type: "array",
              of: [{ type: "string" }],
              description: "E.g., React.js, Next.js, HTML5",
            },
          ],
        },
      ],
    }
  ],
};

export default profile;