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
  status: string;
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
  iconName?: string;
  description?: string;
  tags?: string[];
  categoryId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SkillCategory {
  _id: string;
  title: string;
  iconName?: string;
  description?: string;
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  subject: string;
  read: boolean;
  starred: boolean;
  archived: boolean;
  seenTimestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
