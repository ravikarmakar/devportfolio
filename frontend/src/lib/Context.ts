export const contactMethods = [
  {
    icon: "✉️",
    title: "Email",
    value: "ravikarmkar94475@gmail.com",
    link: "mailto:hello@yourname.com",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: "📱",
    title: "Phone",
    value: "+91 6200091078",
    link: "tel:+15551234567",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: "📍",
    title: "Location",
    value: "Bengaluru",
    link: null,
    color: "from-amber-500 to-orange-400",
  },
];

export const skills = [
  {
    category: "Frontend",
    skills: [
      {
        name: "React.js",
        level: 99,
        icon: "💠", // React component-like symbol
        description:
          "React.js is a powerful JavaScript library used to build fast and interactive user interfaces. It helps in creating single-page applications by breaking the UI into reusable components, making the development process more efficient and organized.",
      },
      {
        name: "Redux",
        level: 70,
        icon: "🧠", // Manages brain/state
        description:
          "Redux is a state management tool often used with React. It allows you to store and manage the entire application's state in one place, making it easier to handle complex data flow and debug your application.",
      },
      {
        name: "TypeScript",
        level: 80,
        icon: "📘", // Programming bluebook
        description:
          "TypeScript is a typed superset of JavaScript that helps developers catch errors before running the code. It improves code quality, offers better tooling, and helps in building large-scale applications with ease.",
      },
      {
        name: "Tailwind CSS",
        level: 88,
        icon: "🖌️", // Styling
        description:
          "Tailwind CSS is a utility-first CSS framework that provides pre-defined classes to style your HTML elements directly. It helps in building modern, responsive, and customizable designs quickly without writing custom CSS from scratch.",
      },
    ],
    color: "bg-gradient-to-br from-blue-500 to-cyan-300",
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Node.js",
        level: 88,
        icon: "🌐", // Server-side/web globe
        description:
          "Node.js is a runtime environment that allows you to run JavaScript on the server side. It is used to build scalable and high-performance backend services and APIs, especially for real-time applications like chat apps or streaming services.",
      },
      {
        name: "Express.js",
        level: 85,
        icon: "🚀", // Fast/lightweight
        description:
          "Express.js is a minimal and flexible Node.js framework that simplifies the process of building backend web applications and RESTful APIs. It provides tools to handle routing, middleware, and HTTP requests efficiently.",
      },
      {
        name: "RESTful APIs",
        level: 84,
        icon: "🔗", // Connection between systems
        description:
          "RESTful APIs follow a standard set of rules that allow different software applications to communicate with each other over the internet. They are used to create, read, update, and delete data (CRUD) between client and server.",
      },
    ],
    color: "bg-gradient-to-br from-green-500 to-emerald-300",
  },
  {
    category: "DevOps",
    skills: [
      {
        name: "MongoDB",
        level: 82,
        icon: "🗂️", // Document database
        description:
          "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents instead of rows and columns. It is ideal for handling large volumes of unstructured or semi-structured data and allows fast read and write operations.",
      },
      {
        name: "Git",
        level: 89,
        icon: "🧬", // Version/branches
        description:
          "Git is a version control system that helps developers track changes in their codebase, collaborate with team members, and manage different versions of a project. It's essential for team-based development workflows.",
      },
      {
        name: "Docker",
        level: 74,
        icon: "📦", // Container/packaged app
        description:
          "Docker is a tool that allows developers to package applications and their dependencies into containers. These containers ensure the app runs smoothly across different environments without compatibility issues.",
      },
      {
        name: "Security",
        level: 80,
        icon: "🛡️", // Protection
        description:
          "Security in development involves protecting software, systems, and data from threats, vulnerabilities, and attacks. This includes practices like authentication, authorization, encryption, and secure coding.",
      },
    ],
    color: "bg-gradient-to-br from-purple-500 to-violet-300",
  },
];

export const education = [
  {
    id: 1,
    years: "2020 - 2023",
    degree: "Bachelor of Science in Physics",
    institution: "B.S.K. College, Barharwa",
    location: "Barharwa, Jharkhand",
    description:
      "Completed a comprehensive undergraduate program focused on core concepts of Physics including Mechanics, Thermodynamics, and Quantum Physics. Developed strong analytical and problem-solving skills through lab work and research assignments.",
    gpa: "7.7/10",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    years: "2024",
    degree: "Full Stack Development Certification",
    institution: "Remote - Apna College",
    location: "Online",
    description:
      "Completed a hands-on full stack web development bootcamp covering HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB. Gained practical experience through real-world projects, including building REST APIs and deploying applications.",
    color: "from-emerald-500 to-green-400",
  },
];

export const mockBlogPosts = [
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

export const mockResources = [
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
