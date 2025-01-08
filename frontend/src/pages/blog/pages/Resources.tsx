import { motion } from "framer-motion";
import { useBlog } from "../context/BlogContext";
import ResourceCard from "../components/ResourceCard";
import { Book, Video, PenTool, Newspaper } from "lucide-react";

const Resources = () => {
  const { resources, loading } = useBlog();

  const categories = [
    { name: "Frontend", icon: Book },
    { name: "Backend", icon: PenTool },
    { name: "DevOps", icon: Video },
    { name: "Career", icon: Newspaper },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">
          Learning Resources
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A curated collection of resources that helped me in my development
          journey
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-secondary/20 p-4 rounded-xl text-center hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex p-3 bg-accent/10 rounded-lg mb-3">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-medium dark:text-white">{category.name}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default Resources;
