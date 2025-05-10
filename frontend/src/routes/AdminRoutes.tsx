import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import SkillsTab from "../pages/admin/components/SkillsTab";
import MessagesTab from "../pages/admin/components/MessagesTab";
import NewProfileView from "../pages/admin/profile/ProfileView";
import ViewProject from "../pages/admin/project/ViewProjects";
import AddProject from "../pages/admin/project/AddProject";

const AdminRoutes = () => (
  <Routes>
    <Route element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="projects" element={<ViewProject />} />
      <Route path="projects/create" element={<AddProject />} />
      <Route path="skills" element={<SkillsTab />} />
      <Route path="messages" element={<MessagesTab />} />
      <Route path="profile" element={<NewProfileView />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
