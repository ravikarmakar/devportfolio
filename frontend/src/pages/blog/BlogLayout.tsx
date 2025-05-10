import { Outlet } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";

const BlogLayout = () => {
  return (
    <BlogProvider>
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
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
