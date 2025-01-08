import { BlogPost, ResourceItem } from "../type/blog";

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "My Journey from Physics to Full Stack Development",
    excerpt:
      "How I transitioned from studying quantum mechanics to building web applications...",
    content: `
      # My Journey from Physics to Full Stack Development

      When I first started my journey in Physics, I never imagined I'd end up becoming a Full Stack Developer. Here's my story...

      ## The Beginning
      As a Physics student, I was always fascinated by how things worked at their most fundamental level...

      ## The Transition
      My programming journey began when I needed to analyze data for my physics experiments...

      ## Learning Web Development
      I started with the basics: HTML, CSS, and JavaScript...

      ## Where I Am Now
      Today, I work with modern technologies like React, Node.js, and MongoDB...
    `,
    category: "Career Journey",
    tags: ["Career Change", "Web Development", "Learning"],
    author: {
      name: "Ravi Karmakar",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    },
    coverImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    publishedAt: "2024-03-15",
    readTime: 5,
  },
  {
    id: "2",
    title: "Building Modern Web Applications with React and TypeScript",
    excerpt:
      "A comprehensive guide to creating scalable and type-safe React applications...",
    content: `
      # Building Modern Web Applications

      In this post, I'll share my experience and best practices for building modern web applications...

      ## Why TypeScript?
      TypeScript adds static typing to JavaScript, making our code more reliable...

      ## React Best Practices
      Let's explore some key principles for building maintainable React applications...
    `,
    category: "Technical Guide",
    tags: ["React", "TypeScript", "Web Development"],
    author: {
      name: "Ravi Karmakar",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    },
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    publishedAt: "2024-03-10",
    readTime: 8,
  },
  {
    id: "3",
    title: "Building Modern Web Applications with React and TypeScript",
    excerpt:
      "A comprehensive guide to creating scalable and type-safe React applications...",
    content: `
      # Building Modern Web Applications

      In this post, I'll share my experience and best practices for building modern web applications...

      ## Why TypeScript?
      TypeScript adds static typing to JavaScript, making our code more reliable...

      ## React Best Practices
      Let's explore some key principles for building maintainable React applications...
    `,
    category: "Technical Guide",
    tags: ["React", "TypeScript", "Web Development"],
    author: {
      name: "Ravi Karmakar",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    },
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    publishedAt: "2024-03-10",
    readTime: 8,
  },
  {
    id: "4",
    title: "Building Modern Web Applications with React and TypeScript",
    excerpt:
      "A comprehensive guide to creating scalable and type-safe React applications...",
    content: `
      # Building Modern Web Applications

      In this post, I'll share my experience and best practices for building modern web applications...

      ## Why TypeScript?
      TypeScript adds static typing to JavaScript, making our code more reliable...

      ## React Best Practices
      Let's explore some key principles for building maintainable React applications...
    `,
    category: "Technical Guide",
    tags: ["React", "TypeScript", "Web Development"],
    author: {
      name: "Ravi Karmakar",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    },
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    publishedAt: "2024-03-10",
    readTime: 8,
  },
];

export const mockResources: ResourceItem[] = [
  {
    id: "1",
    title: "React Documentation",
    description:
      "Official React documentation - your best resource for learning React",
    category: "Frontend",
    link: "https://react.dev",
    icon: "https://react.dev/favicon.ico",
    type: "article",
  },
  {
    id: "2",
    title: "Node.js Crash Course",
    description: "Complete Node.js tutorial for beginners",
    category: "Backend",
    link: "https://nodejs.org",
    icon: "https://nodejs.org/favicon.ico",
    type: "course",
  },
];
