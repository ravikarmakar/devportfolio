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
    years: "5 Month - 2024",
    degree: "Full Stack Development Certification",
    institution: "Tech Bootcamp - Apna College",
    location: "Online",
    description:
      "Completed a hands-on full stack web development bootcamp covering HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB. Gained practical experience through real-world projects, including building REST APIs and deploying applications.",
    color: "from-emerald-500 to-green-400",
  },
];

// export const projects = [
//   {
//     id: 1,
//     title: "E-Commerce Platform",
//     category: "web",
//     image: "https://i.ytimg.com/vi/TwYKwaEjJd4/maxresdefault.jpg",
//     tags: ["React", "Node.js", "MongoDB"],
//     description:
//       "A full-stack e-commerce platform with user authentication, product management, and payment processing.",
//     link: "#",
//     featured: true,
//     color: "from-blue-500 to-cyan-400",
//   },
//   {
//     id: 2,
//     title: "Travel Companion App",
//     category: "mobile",
//     image: "/api/placeholder/600/400",
//     tags: ["React Native", "Firebase", "Maps API"],
//     description:
//       "A mobile application that helps travelers plan trips, discover local attractions, and navigate new cities.",
//     link: "#",
//     featured: true,
//     color: "from-purple-500 to-pink-400",
//   },
//   {
//     id: 3,
//     title: "Dashboard UI Kit",
//     category: "design",
//     image: "/api/placeholder/600/400",
//     tags: ["Figma", "UI Design", "Design System"],
//     description:
//       "A comprehensive UI kit for creating modern admin dashboards with over 200 components.",
//     link: "#",
//     color: "from-amber-500 to-orange-400",
//   },
//   {
//     id: 4,
//     title: "Social Media Analytics",
//     category: "web",
//     image: "/api/placeholder/600/400",
//     tags: ["TypeScript", "D3.js", "Express"],
//     description:
//       "A web application for analyzing and visualizing social media engagement and audience metrics.",
//     link: "#",
//     color: "from-emerald-500 to-green-400",
//   },
//   {
//     id: 5,
//     title: "Fitness Tracker",
//     category: "mobile",
//     image: "/api/placeholder/600/400",
//     tags: ["Flutter", "Firebase", "Health API"],
//     description:
//       "A cross-platform mobile app for tracking workouts, nutrition, and progress towards fitness goals.",
//     link: "#",
//     color: "from-rose-500 to-red-400",
//   },
//   {
//     id: 6,
//     title: "Portfolio Template",
//     category: "design",
//     image: "/api/placeholder/600/400",
//     tags: ["Tailwind CSS", "Framer Motion", "React"],
//     description:
//       "A customizable portfolio template for developers and designers to showcase their work.",
//     link: "#",
//     color: "from-indigo-500 to-blue-400",
//   },
// ];

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "web",
    image: "https://i.ytimg.com/vi/7E6um7NGmeE/maxresdefault.jpg",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    description:
      "A full-stack e-commerce application built using the MERN stack. Features include user authentication, product management, shopping cart functionality, and payment integration with Stripe and Razorpay.",
    link: "https://github.com/arjuntheprogrammer/E-COMMERCE-ReactJS-NodeJS-MongoDB",
    featured: true,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Real-Time Chat Application",
    category: "web",
    image: "https://i.ytimg.com/vi/otaQKODEUFs/maxresdefault.jpg",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    description:
      "A real-time chat application utilizing Socket.io for instant messaging. Includes features like user authentication, chat rooms, typing indicators, and message persistence using MongoDB.",
    link: "https://github.com/novuhq/chat-app",
    featured: true,
    color: "from-purple-500 to-pink-400",
  },
  {
    id: 3,
    title: "Spotify Clone",
    category: "web",
    image: "https://i.ytimg.com/vi/amFYvQK4huo/maxresdefault.jpg",
    tags: ["React", "Tailwind CSS", "Spotify API"],
    description:
      "A Spotify clone built with React and Tailwind CSS, integrating the Spotify Web API for music playback, playlist management, and user authentication.",
    link: "https://github.com/furkananter/spotify-clone",
    featured: true,
    color: "from-green-500 to-emerald-400",
  },
  {
    id: 4,
    title: "Gaming Hub",
    category: "web",
    image:
      "https://t3.ftcdn.net/jpg/02/85/90/44/360_F_285904463_52tKiXp592qUhmg24eS3f4k1kGQSji3f.jpg",
    tags: ["React", "Chakra UI", "API Integration"],
    description:
      "A gaming hub application that allows users to browse and search for games by genre, platform, and release date. Built with React.",
    link: "https://github.com/MdAbbas110/game-hub-react",
    featured: true,
    color: "from-red-500 to-orange-400",
  },
  {
    id: 5,
    title: "Developer Portfolio",
    category: "web",
    image: "https://i.ytimg.com/vi/ifOJ0R5UQOc/maxresdefault.jpg",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    description:
      "A personal developer portfolio showcasing projects, skills, and contact information. Built with React, styled using Tailwind CSS, and enhanced with animations from Framer Motion.",
    link: "https://github.com/realstoman/react-tailwindcss-portfolio",
    featured: true,
    color: "from-indigo-500 to-blue-400",
  },
  // {
  //   id: 6,
  //   title: "My Personal Project",
  //   category: "web",
  //   image: "https://via.placeholder.com/600x400.png?text=My+Project",
  //   tags: ["React", "Node.js", "Express", "MongoDB"],
  //   description:
  //     "A personal project demonstrating full-stack development skills, including user authentication, CRUD operations, and responsive design.",
  //   link: "#",
  //   featured: false,
  //   color: "from-gray-500 to-gray-400",
  // },
];
