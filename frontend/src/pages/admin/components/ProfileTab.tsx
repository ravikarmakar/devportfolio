import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Save,
  X,
  User,
  Mail,
  MapPin,
  Phone,
  Globe,
  FileText,
  Briefcase,
} from "lucide-react";
import { axiosInstance } from "../../../lib/axios";
import useUserStore from "../../../store/useUserStore.js";
import toast from "react-hot-toast";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  websiteUrl: string;
  bio: string;
  profileSummery: string;
  aboutMe: string;
}

const ProfileTab = () => {
  const { fetchUserData, user } = useUserStore();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    websiteUrl: "",
    bio: "",
    profileSummery: "",
    aboutMe: "",
  });

  useEffect(() => {
    fetchUserData();
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.mobileNumber,
        location: user.currLocation,
        websiteUrl: user.websiteUrl,
        bio: user.bio,
        profileSummery: user.profileSummery,
        aboutMe: user.aboutMe,
      });
    }
  }, [fetchUserData]);

  // console.log(user);
  // const handleImageRemove = () => {
  //   setFormData((prev) => ({ ...prev, image: null }));
  //   if (fileInputRef.current) fileInputRef.current.value = "";
  // };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Create FormData instance
      const data = new FormData();

      // Append form data
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("location", formData.location);
      data.append("websiteUrl", formData.websiteUrl);
      data.append("bio", formData.bio);
      data.append("profileSummery", formData.profileSummery);
      data.append("aboutMe", formData.aboutMe);

      // Addimg profileImage if it exists
      if (profileImage) {
        data.append("profileImage", profileImage);
      } else {
        console.error("Profile image is missing!");
      }

      // Check and add resumeFile if it exists
      if (resumeFile) {
        data.append("resumeFile", resumeFile);
      } else {
        console.error("Resume file is missing!");
      }

      // Send data to backend
      await axiosInstance.put(`/admin/user/${user?._id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear form data
      // setFormData({
      //   name: "",
      //   email: "",
      //   phone: "",
      //   location: "",
      //   website: "",
      //   bio: "",
      //   profileSummery: "",
      //   aboutMe: "",
      // });

      setProfileImage(null);
      setResumeFile(null);

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error("Error updating profile:", error);
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({
    icon: Icon,
    label,
    name,
    value,
    type = "text",
  }: {
    icon: any;
    label: string;
    name: string;
    value: string;
    type?: string;
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-secondary/20 text-gray-900 dark:text-gray-100 
                   focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>
    </div>
  );

  const FileUploadField = ({
    label,
    accept,
    file,
    onChange,
    onRemove,
  }: {
    label: string;
    accept: string;
    file: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      {file ? (
        <div className="flex items-center gap-2 p-2 bg-accent/10 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-gray-300 flex-1 truncate">
            {file.name}
          </span>
          <button
            type="button"
            onClick={onRemove}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full text-red-500"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            accept={accept}
            onChange={onChange}
            className="hidden"
            id={label}
          />
          <label
            htmlFor={label}
            className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 
                     dark:border-gray-600 rounded-lg cursor-pointer hover:border-accent transition-colors"
          >
            <Upload className="h-6 w-6 text-gray-400" />
            <span className="text-sm text-gray-500">
              Click to upload or drag and drop
            </span>
          </label>
        </div>
      )}
    </div>
  );

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Profile Management
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update your personal information and profile details
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white dark:bg-secondary/20 shadow rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <FileUploadField
                  label="Profile Picture"
                  accept="image/*"
                  file={profileImage}
                  onChange={handleImageUpload}
                  onRemove={() => setProfileImage(null)}
                />
              </div>

              <InputField
                icon={User}
                label="Full Name"
                name="name"
                value={formData.name}
              />

              {/* <InputField
                icon={Briefcase}
                label="About Me"
                name="title"
                value={formData.aboutMe}
             
              /> */}

              <InputField
                icon={Mail}
                label="Email"
                name="email"
                value={formData.email}
                type="email"
              />

              <InputField
                icon={Phone}
                label="Phone"
                name="phone"
                value={formData.phone}
              />

              <InputField
                icon={MapPin}
                label="Location"
                name="location"
                value={formData.location}
              />

              <InputField
                icon={Globe}
                label="Website"
                name="website"
                value={formData.websiteUrl}
                type="url"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-secondary/20 text-gray-900 dark:text-gray-100 
                           focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  About me <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-secondary/20 text-gray-900 dark:text-gray-100 
                           focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Proffessional Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="profileSummery"
                  value={formData.profileSummery}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-secondary/20 text-gray-900 dark:text-gray-100 
                           focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <FileUploadField
                  label="Resume/CV"
                  accept=".pdf,.doc,.docx"
                  file={resumeFile}
                  onChange={handleResumeUpload}
                  onRemove={() => setResumeFile(null)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg 
                         hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">
                      <Upload className="h-5 w-5" />
                    </span>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileTab;
