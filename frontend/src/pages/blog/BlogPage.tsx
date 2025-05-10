import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Tag,
  Search,
  BookOpen,
  Code,
  Monitor,
  Database,
  Layers,
  Star,
} from "lucide-react";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "Building Scalable APIs with Node.js and Express",
    excerpt:
      "Learn how to architect robust, maintainable backends that can handle millions of requests.",
    category: "Backend",
    readTime: "8 min",
    date: "May 2, 2025",
    image: "/api/placeholder/800/600",
    featured: true,
    tags: ["Node.js", "Express", "REST API"],
  },
  {
    id: 2,
    title: "Modern State Management with React Hooks",
    excerpt:
      "Forget Redux! See how Context API and custom hooks can simplify your state management.",
    category: "Frontend",
    readTime: "6 min",
    date: "Apr 28, 2025",
    image: "/api/placeholder/800/600",
    featured: true,
    tags: ["React", "Hooks", "State Management"],
  },
  {
    id: 3,
    title: "Creating Stunning Animations with Framer Motion",
    excerpt:
      "Take your UI to the next level with these advanced animation techniques for React.",
    category: "Design",
    readTime: "5 min",
    date: "Apr 20, 2025",
    image: "/api/placeholder/800/600",
    featured: true,
    tags: ["React", "Animation", "UX"],
  },
  {
    id: 4,
    title: "Optimizing Database Queries for High-Traffic Applications",
    excerpt:
      "Learn performance tuning techniques that can make your app 10x faster.",
    category: "Database",
    readTime: "7 min",
    date: "Apr 15, 2025",
    image: "/api/placeholder/800/600",
    featured: false,
    tags: ["PostgreSQL", "Performance", "SQL"],
  },
  {
    id: 5,
    title: "The Complete Guide to Authentication in Next.js",
    excerpt:
      "Implement secure, robust auth flows in your Next.js applications with ease.",
    category: "Security",
    readTime: "9 min",
    date: "Apr 10, 2025",
    image: "/api/placeholder/800/600",
    featured: false,
    tags: ["Next.js", "Authentication", "Security"],
  },
  {
    id: 6,
    title: "Building a Serverless Architecture with AWS Lambda",
    excerpt:
      "Cut costs and improve scalability by embracing the serverless paradigm.",
    category: "Cloud",
    readTime: "10 min",
    date: "Apr 5, 2025",
    image: "/api/placeholder/800/600",
    featured: false,
    tags: ["AWS", "Serverless", "Lambda"],
  },
];

// Topic categories for the blog
const blogTopics = [
  { name: "All", icon: <BookOpen size={18} /> },
  { name: "Frontend", icon: <Monitor size={18} /> },
  { name: "Backend", icon: <Code size={18} /> },
  { name: "Database", icon: <Database size={18} /> },
  { name: "Architecture", icon: <Layers size={18} /> },
  { name: "Trending", icon: <Star size={18} /> },
];

const BlogPage = () => {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayPosts, setDisplayPosts] = useState(blogPosts);

  // Filter posts based on selected topic and search query
  useEffect(() => {
    let filtered = blogPosts;

    if (selectedTopic !== "All") {
      filtered = filtered.filter((post) => post.category === selectedTopic);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setDisplayPosts(filtered);
  }, [selectedTopic, searchQuery]);

  const featuredPosts = blogPosts.filter((post) => post.featured);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const glowVariants = {
    initial: { opacity: 0.3 },
    animate: {
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:px-8">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-blue-600/30 blur-3xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Full Stack Insights
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="md:text-xl text-gray-300 max-w-3xl mx-auto">
              Deep dives into modern web development, from frontend finesse to
              backend brilliance. Code snippets, best practices, and
              architectural insights from real-world projects.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-gray-800/70 border border-gray-700 p-6 rounded-2xl backdrop-blur-lg"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Code size={24} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Code First</h3>
              <p className="text-gray-400">
                Practical tutorials with working code examples you can implement
                right away in your projects.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-800/70 border border-gray-700 p-6 rounded-2xl backdrop-blur-lg"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Layers size={24} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Full Stack Perspective</h3>
              <p className="text-gray-400">
                Explore the complete development cycle from UI/UX to database
                optimization and deployment.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-800/70 border border-gray-700 p-6 rounded-2xl backdrop-blur-lg"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Star size={24} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Industry Best Practices
              </h3>
              <p className="text-gray-400">
                Insights from production environments and enterprise-level
                applications you won't find elsewhere.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold">Featured Articles</h2>
              <div className="w-16 h-1 bg-blue-500 mt-2"></div>
            </div>
            <div className="mt-4 md:mt-0">
              <motion.a
                href="/blog/all"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                whileHover={{ x: 5 }}
              >
                View all articles
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.a>
            </div>
          </motion.div>

          {/* Main featured post */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            <motion.div
              className="lg:col-span-3 relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-96 bg-gray-800">
                <img
                  src={featuredPosts[0].image}
                  alt={featuredPosts[0].title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-3 flex items-center">
                    <span className="bg-blue-500 text-xs font-semibold text-white px-3 py-1 rounded-full">
                      {featuredPosts[0].category}
                    </span>
                    <span className="ml-3 flex items-center text-gray-400 text-sm">
                      <Clock size={14} className="mr-1" />{" "}
                      {featuredPosts[0].readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {featuredPosts[0].title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {featuredPosts[0].excerpt}
                  </p>
                  <motion.a
                    href={`/blog/${featuredPosts[0].id}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Read Article
                    <ArrowRight size={16} className="ml-2" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2 grid grid-cols-1 gap-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {featuredPosts.slice(1, 3).map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 flex flex-col md:flex-row h-auto"
                >
                  <div className="md:w-2/5 h-48 md:h-auto relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 md:w-3/5 flex flex-col justify-center">
                    <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded mb-2">
                      {post.category}
                    </span>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1" /> {post.readTime}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Topics and Search */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex overflow-x-auto pb-2 md:pb-0 scrollbar-hide space-x-2 w-full md:w-auto">
              {blogTopics.map((topic) => (
                <button
                  key={topic.name}
                  onClick={() => setSelectedTopic(topic.name)}
                  className={`px-4 py-2 rounded-full flex items-center whitespace-nowrap text-sm ${
                    selectedTopic === topic.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-2">{topic.icon}</span>
                  {topic.name}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Blog grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {displayPosts.length > 0 ? (
              displayPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm transform transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-500 text-xs font-semibold text-white px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-400 mb-3">
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1" /> {post.readTime}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="font-bold text-xl mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded"
                        >
                          <Tag size={10} className="mr-1" /> {tag}
                        </span>
                      ))}
                    </div>

                    <motion.a
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-blue-400 text-sm hover:text-blue-300 font-medium"
                      whileHover={{ x: 3 }}
                    >
                      Read More
                      <ArrowRight size={14} className="ml-1" />
                    </motion.a>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-400 text-lg">
                  No articles found matching your search.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTopic("All");
                  }}
                  className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </motion.div>

          {/* Newsletter Subscription */}
          {/* <motion.div
            className="mt-20 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-800/40 p-8 rounded-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated with the Latest in Web Development
              </h3>
              <p className="text-gray-300 mb-6">
                Get exclusive content, early access to new articles, and
                insights straight to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-5 py-3 rounded-lg bg-gray-700/70 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg whitespace-nowrap"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </div>

              <p className="text-gray-400 text-sm mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div> */}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
