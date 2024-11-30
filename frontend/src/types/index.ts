export interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  profileImageUrl: string;
  // socialLinks: Object;
  currLocation: string;
  mobileNumber: string;
  resumeUrl: string;
  profileSummery: string;
  websiteUrl: string;
  aboutMe: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  imgUrl: string;
  technologies: string[];
  links: {
    github: string;
    hosted: string;
  };
  priority: number;
  tags: string[];
  deatils: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  level: number;
  description: string;
}

export interface SkillCategory {
  _id: string;
  title: string;
  icon: string;
  description: string;
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
}
