import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import SkillsTab from "../pages/admin/components/SkillsTab";
<<<<<<< HEAD
import ProjectsTab from "../pages/admin/components/ProjectsTab";
// import BlogsTab from "../pages/admin/components/BlogsTab";
=======
import BlogsTab from "../pages/admin/components/BlogsTab";
>>>>>>> portfolio-v2
import MessagesTab from "../pages/admin/components/MessagesTab";
import NewProfileView from "../pages/admin/profile/ProfileView";
import ViewProjec from "../pages/admin/project/ViewProjects";
import AddProject from "../pages/admin/project/AddProject";

const AdminRoutes = () => (
  <Routes>
    <Route element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="projects" element={<ViewProjec />} />
      <Route path="projects/create" element={<AddProject />} />
      <Route path="skills" element={<SkillsTab />} />
      {/* <Route path="blog" element={<BlogsTab />} /> */}
      <Route path="messages" element={<MessagesTab />} />
      <Route path="profile" element={<NewProfileView />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
