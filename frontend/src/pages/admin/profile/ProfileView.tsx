import { useState, FormEvent } from "react";
import {
  Edit,
  X,
  Save,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import toast from "react-hot-toast";

export default function ProfileView() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, updateProfile, isLoading } = useAuthStore();

  const [profile, setProfile] = useState({
    username: user?.username,
    email: user?.email,
    phone: user?.phone,
    location: user?.location,
    techRole: user?.techRole,
    experience: user?.experience,
    bio: user?.bio,
    imageUrl: user?.imageUrl,
  });

  const [formData, setFormData] = useState({ ...profile });
  const [selectedFiles, setSelectedFiles] = useState<{
    image?: File;
    pdf?: File;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    setSelectedFiles((prev) => ({
      ...prev,
      [name]: files[0], // name="image" or name="pdf"
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined) {
        form.append(key, value.toString());
      }
    });

    if (selectedFiles.image) form.append("image", selectedFiles.image);
    if (selectedFiles.pdf) form.append("pdf", selectedFiles.pdf);

    const updatedData = await updateProfile(form);
    if (updatedData) {
      setProfile(updatedData);
      setIsDialogOpen(false);
      toast.success("Profile update successfully");
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      {/* Header with title and edit button */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">Profile View</h1>
        <button
          onClick={() => {
            setFormData({ ...profile });
            setIsDialogOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Edit size={16} />
          Edit Profile
        </button>
      </div>

      {/* Profile Content */}
      {/* <div className="rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"> */}
      <div className="md:flex">
        {/* imageUrl section */}
        <div className="md:w-1/3 p-6 flex flex-col items-center justify-center border-r">
          <div className="h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-gray-200">
            <img
              src={profile.imageUrl}
              alt={profile.username}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-center">{profile.username}</h2>
          <p className="text-gray-600 text-center">{profile.techRole}</p>
        </div>

        {/* Profile details */}
        <div className="md:w-2/3 p-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-2 border-b">
              <Mail size={18} className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{profile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 border-b">
              <Phone size={18} className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>{profile.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 border-b">
              <MapPin size={18} className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p>{profile.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 border-b">
              <Briefcase size={18} className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Position</p>
                <p>{profile.techRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 border-b">
              <Calendar size={18} className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p>{profile.experience}+ Years Exp</p>
              </div>
            </div>
            {/* </div> */}

            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Bio</p>
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="rounded-lg dark:bg-secondary/70 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.techRole}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="joined"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-gray-800"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border rounded-md bg-gray-800"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                />

                <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
                  Upload PDF
                </label>
                <input
                  type="file"
                  name="pdf"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isLoading}
                  className="px-4 py-2 border rounded-md text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Save size={16} />
                  )}
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
