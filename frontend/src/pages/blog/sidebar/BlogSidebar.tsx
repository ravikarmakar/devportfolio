import { motion } from "framer-motion";
import { useBlog } from "../context/BlogContext";
import { Book, Video, PenTool, Newspaper, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BlogSidebar = () => {
  const { selectedCategory, setSelectedCategory } = useBlog();

  const categories = [
    { id: "all", label: "All Posts", icon: Book },
    { id: "Career Journey", label: "Career Journey", icon: Video },
    { id: "Technical Guide", label: "Technical Guides", icon: PenTool },
    { id: "Tutorials", label: "Tutorials", icon: Newspaper },
  ];

  return (
    <aside className="space-y-6">
      <div className="bg-white dark:bg-secondary/20 rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          <Link to="/" className="relative group text-accent">
            <span className="flex items-center gap-4">
              <ArrowLeft size={25} />
              DevPortfolio
            </span>
            {/* Custom underline */}
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </h1>

        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Categories
        </h2>
        <nav className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ x: 5 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? "bg-accent text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-accent/10 hover:text-accent"
                }`}
              >
                <Icon size={20} />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      <div className="bg-white dark:bg-secondary/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Quick Links
        </h2>
        <nav className="space-y-2">
          <a
            href="/blog/resources"
            className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
          >
            Learning Resources
          </a>
          <a
            href="/blog/latest"
            className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
          >
            Latest Posts
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default BlogSidebar;
