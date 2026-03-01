// sanity/sanity.query.ts
import { groq } from "next-sanity";
import client from "./sanity.client";

// 1. Profile Fetch Karne Ki Query
export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"]{
      _id,
      fullName,
      headline,
      profileImage {alt, "image": asset->url},
      shortBio,
      skills[]{
        categoryName,
        skillList
      }
    }`
  );
}

// 2. Blogs Fetch Karne Ki Query (Jo humne naya banaya tha)
export async function getBlogs() {
  return client.fetch(
    groq`*[_type == "blog"] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      coverImage { alt, "image": asset->url },
      excerpt,
      publishedAt
    }`
  );
}

// 3. Projects Fetch Karne Ki Query
export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"]{
      _id,
      name,
      "slug": slug.current,
      projectUrl,
      coverImage { alt, "image": asset->url },
    }`
  );
}