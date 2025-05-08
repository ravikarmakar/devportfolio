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
    years: "5 Month - 2024",
    degree: "Full Stack Development Certification",
    institution: "Tech Bootcamp - Apna College",
    location: "Online",
    description:
      "Completed a hands-on full stack web development bootcamp covering HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB. Gained practical experience through real-world projects, including building REST APIs and deploying applications.",
    color: "from-emerald-500 to-green-400",
  },
];

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "AI & Machine Learning",
    image: "https://i.ytimg.com/vi/7E6um7NGmeE/maxresdefault.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    description:
      "A full-stack e-commerce application built using the MERN stack. Features include user authentication, product management, shopping cart functionality, and payment integration with Stripe and Razorpay.",
    link: "https://github.com",
    sourceLink: "https://github.com/e-commerce-platform",
    details:
      "This E-Commerce platform offers a seamless shopping experience built on the MERN stack. It includes features like user authentication, product listings, category filtering, cart management, and secure payments via Stripe and Razorpay. Admin users can manage products, track orders, and update inventory in real-time. The application also supports responsive design for mobile devices and integrates RESTful APIs for efficient client-server communication.",
  },
  {
    id: 2,
    title: "Real-Time Chat Application",
    category: "web",
    image: "https://i.ytimg.com/vi/otaQKODEUFs/maxresdefault.jpg",
    technologies: ["React", "Solidity", "Ethereum", "Web3.js"],
    description:
      "A real-time chat application utilizing Socket.io for instant messaging. Includes features like user authentication, chat rooms, typing indicators, and message persistence using MongoDB.",
    link: "https://github.com/novuhq/chat-app",
    sourceLink: "https://github.com/real-time-chat-app",
    details:
      "This real-time chat application provides seamless messaging using Socket.io for low-latency communication between users. Built with React for a responsive frontend and Node.js backend, it features secure user authentication, persistent chat history using MongoDB, typing indicators, and room-based conversations. It also explores blockchain integration through Web3.js and Solidity, enabling potential decentralized chat features and secure user verification on the Ethereum network. The app supports multiple chat rooms and is optimized for both desktop and mobile devices.",
  },
  {
    id: 3,
    title: "Spotify Clone",
    category: "Blockchain",
    image: "https://i.ytimg.com/vi/amFYvQK4huo/maxresdefault.jpg",
    technologies: ["React", "Solidity", "Ethereum", "Web3.js"],
    description:
      "A Spotify clone built with React and Tailwind CSS, integrating the Spotify Web API for music playback, playlist management, and user authentication.",
    link: "https://github.com",
    sourceLink: "https://github.com/spotify-clone",
    details:
      "This Spotify clone delivers a sleek and responsive music streaming experience using React and Tailwind CSS. It features playlist creation, real-time music playback using the Spotify Web API, and secure user authentication. While primarily a frontend-focused application, it explores Web3 integration through Web3.js and Solidity, enabling potential blockchain-based features like music ownership verification, token-based access, or artist tipping. This project demonstrates how modern web technologies and decentralized principles can be combined for future-ready media platforms.",
  },
  {
    id: 4,
    title: "Gaming Hub",
    category: "Augmented Reality",
    image:
      "https://t3.ftcdn.net/jpg/02/85/90/44/360_F_285904463_52tKiXp592qUhmg24eS3f4k1kGQSji3f.jpg",
    technologies: ["React", "Chakra UI", "API Integration"],
    description:
      "A gaming hub application that allows users to browse and search for games by genre, platform, and release date. Built with React.",
    link: "https://github.com",
    sourceLink: "https://github.com/gaming-hub",
    details:
      "Gaming Hub is a dynamic web application designed for gamers to discover and explore a wide range of video games. It features category-wise browsing, search filters by genre, platform, and release date, and live data fetched via third-party game APIs. The frontend is built using React and styled with Chakra UI for a responsive and accessible design. This project showcases efficient API integration, state management, and modern UI practices for delivering an engaging gaming discovery experience.",
  },
  {
    id: 5,
    title: "Developer Portfolio",
    category: "Cybersecurity",
    image: "https://i.ytimg.com/vi/ifOJ0R5UQOc/maxresdefault.jpg",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    description:
      "A personal developer portfolio showcasing projects, skills, and contact information. Built with React, styled using Tailwind CSS, and enhanced with animations from Framer Motion.",
    link: "https://github.com",
    sourceLink: "https://github.com/developer-portfolio",
    details:
      "This Developer Portfolio is a modern and responsive personal website crafted using React and styled with Tailwind CSS. It features smooth animations powered by Framer Motion to enhance user experience. The portfolio includes sections for project showcases, technical skills, an about section, and contact details. Designed with a focus on clean UI and accessibility, it effectively represents a developer’s professional presence and personal brand online.",
  },
  // {
  //   id: 6,
  //   title: "Smart City Platform",
  //   category: "IoT",
  //   image: "https://via.placeholder.com/600x400.png?text=My+Project",
  //   technologies: ["Python", "MQTT", "React", "MongoDB"],
  //   description:
  //     "IoT platform that integrates various smart city sensors and provides actionable insights.",
  //   link: "https://github.com",
  //   sourceLink: "https://github.com/smart-city-platform",
  //   details:
  //     "This comprehensive platform connects and manages thousands of IoT sensors distributed throughout urban environments. Using MQTT for lightweight, reliable communications, the system collects data from traffic sensors, environmental monitors, and utility meters. The Python backend processes this data in real-time, storing results in MongoDB for flexible querying. The React frontend presents city managers with intuitive dashboards and alerts, transforming raw data into actionable insights.",
  // },
];
