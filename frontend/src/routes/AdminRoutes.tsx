import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import SkillsTab from "../pages/admin/components/SkillsTab";
import ProjectsTab from "../pages/admin/components/ProjectsTab";
import BlogsTab from "../pages/admin/components/BlogsTab";
import MessagesTab from "../pages/admin/components/MessagesTab";
import ProfileTab from "../pages/admin/components/ProfileTab";

const AdminRoutes = () => (
  <Routes>
    <Route element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="projects" element={<ProjectsTab />} />
      <Route path="skills" element={<SkillsTab />} />
      <Route path="blog" element={<BlogsTab />} />
      <Route path="messages" element={<MessagesTab />} />
      <Route path="profile" element={<ProfileTab />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
