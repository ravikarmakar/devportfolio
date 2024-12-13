import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { BlogPost } from "../type/blog";

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl bg-white dark:bg-secondary/20"
    >
      <Link to={`/blog/${post.id}`} className="block group">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-[16/9] md:aspect-auto">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          </div>

          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                Featured
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                {post.category}
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4 dark:text-white group-hover:text-accent transition-colors">
              {post.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium dark:text-white">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Author
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-accent group-hover:gap-4 transition-all">
              Read More <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default FeaturedPost;
