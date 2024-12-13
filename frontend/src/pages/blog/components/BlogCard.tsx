import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import { BlogPost } from "../type/blog";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-secondary/20 rounded-xl overflow-hidden group"
    >
      <Link to={`/blog/${post.id}`}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock size={16} />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-accent transition-colors">
            {post.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {post.author.name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Calendar size={16} />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
