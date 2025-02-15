import { Routes, Route } from "react-router-dom";
import BlogLayout from "../pages/blog/BlogLayout";
import BlogList from "../pages/blog/pages/BlogList";
import BlogPost from "../pages/blog/pages/BlogPost";
import Resources from "../pages/blog/pages/Resources";

const BlogRoutes = () => (
  <Routes>
    <Route element={<BlogLayout />}>
      <Route index element={<BlogList />} />
      <Route path=":id" element={<BlogPost />} />
      <Route path="resources" element={<Resources />} />
    </Route>
  </Routes>
);

export default BlogRoutes;
