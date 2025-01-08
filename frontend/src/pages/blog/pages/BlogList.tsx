import { useBlog } from "../context/BlogContext";
import BlogCard from "../components/BlogCard";
import FeaturedPost from "../components/FeaturedPost";

const BlogList = () => {
  const { posts, selectedCategory, loading } = useBlog();

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const featuredPost = posts[0];
  const remainingPosts = filteredPosts.slice(1);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Featured Post */}
      {featuredPost && <FeaturedPost post={featuredPost} />}

      {/* Post Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {remainingPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
