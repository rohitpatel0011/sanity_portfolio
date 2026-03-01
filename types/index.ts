// types/index.ts

export type ProfileType = {
  _id: string;
  fullName: string;
  headline: string;
  profileImage: {
    alt: string;
    image: string;
  };
  shortBio: string;
  skills: {
    categoryName: string;
    skillList: string[];
  }[];
};

// Blog aur Project ke types bhi yahi add kar lete hain aage ke liye
export type BlogType = {
  _id: string;
  title: string;
  slug: string;
  coverImage: { alt: string; image: string };
  excerpt: string;
  publishedAt: string;
};

export type ProjectType = {
  _id: string;
  name: string;
  slug: string;
  projectUrl: string;
  coverImage: { alt: string; image: string };
};