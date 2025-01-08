import React from "react";

// Define the types for the user object
interface User {
  name: string;
  email: string;
  phone: string;
  location: string;
  profileSummary: string;
  profileImage?: string;
}

interface UserCardProps {
  user: User;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm bg-gray-800 text-white rounded-lg shadow-lg p-6">
        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <img
            src={user.profileImage || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* User Information */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
          <p className="text-sm mb-2">{user.email}</p>
          <p className="text-sm mb-4">{user.phone}</p>
          <p className="text-sm mb-4">{user.location}</p>
          <p className="text-sm mb-4">{user.profileSummary}</p>
        </div>

        {/* Edit Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => console.log("Edit user")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
