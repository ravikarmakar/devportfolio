import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlog } from "../context/BlogContext";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { id } = useParams();
  const { posts } = useBlog();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/blog" className="text-accent hover:underline">
          Return to blog
        </Link>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-accent hover:underline mb-8"
      >
        <ArrowLeft size={20} />
        Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-8">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-xl mb-8"
        />
        <h1 className="text-4xl font-bold mb-4 dark:text-white">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-medium dark:text-white">{post.author.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Author</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* Tags */}
      <div className="mt-8 pt-8 border-t dark:border-gray-800">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Share */}
      <div className="mt-8 flex justify-center">
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
          <Share2 size={20} />
          Share this post
        </button>
      </div>
    </motion.article>
  );
};

export default BlogPost;
