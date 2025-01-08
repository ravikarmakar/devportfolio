import { Outlet } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import BlogSidebar from "./sidebar/BlogSidebar";

const BlogLayout = () => {
  return (
    <BlogProvider>
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
              <BlogSidebar />
            </aside>
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </BlogProvider>
  );
};

export default BlogLayout;
