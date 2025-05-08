import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div>
      {/* Sidebar or navigation links for project sections */}
      <Outlet /> {/* This renders the content of nested routes */}
    </div>
  );
};

export default ProfileLayout;
