import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, Pencil } from "lucide-react";
import useUserStore from "../../../store/useUserStore.js";
import FileUpload from "./elements/FileUpload.js";
import FormTextArea from "./elements/FormTextArea.js";
import FormInput from "./elements/FormInput.js";
import ActionButton from "./elements/ActionButton.js";
import { toast } from "react-hot-toast";

interface ProfileFormData {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  websiteUrl: string;
  bio: string;
  profileSummery: string;
  aboutMe: string;
  profileImage?: string | null;
  resumeFile?: string | null;
}

const ProfileTab = () => {
  const { fetchUserData, user, isLoading, updateUser } = useUserStore();

  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    websiteUrl: "",
    bio: "",
    profileSummery: "",
    aboutMe: "",
    profileImage: null,
    resumeFile: null,
  });

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [error, setError] = useState<string | null | undefined>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement>(null);

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

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      websiteUrl: "",
      bio: "",
      profileSummery: "",
      aboutMe: "",
      profileImage: null,
      resumeFile: null,
    });
    setIsUpdateMode(false);
  };

  const handleFileSelect = (file: File, fileType: "resume" | "image") => {
    const reader = new FileReader();

    if (fileType === "resume") {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed for resume.");
        return;
      }

      reader.onloadend = () => {
        setResumeFile(file); // Optional: Keep the original file object
        setFormData((prev) => ({ ...prev, resume: reader.result as string }));
        setError(null);
      };

      reader.readAsDataURL(file); // Read file as Data URL (Base64)
    } else if (fileType === "image") {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Only JPEG and PNG images are allowed.");
        return;
      }

      reader.onloadend = () => {
        setProfileImage(file); // Optional: Keep the original file object
        setFormData((prev) => ({ ...prev, image: reader.result as string })); // Save string data
        setError(null);
      };

      reader.readAsDataURL(file); // Read file as Data URL (Base64)
    }

    setError(null);
  };

  const handleFileRemove = (fileType: "resume" | "image") => {
    if (fileType === "resume") {
      setResumeFile(null);
      setFormData((prev) => ({ ...prev, resume: null }));
    } else if (fileType === "image") {
      setProfileImage(null);
      setFormData((prev) => ({ ...prev, image: null }));
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setError(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "email",
      "phone",
      "location",
      "websiteUrl",
      "bio",
      "profileSummery",
      "aboutMe",
    ];

    const hasEmptyFields = requiredFields.some(
      (field) => formData[field as keyof typeof formData] === ""
    );

    if (hasEmptyFields) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }
    try {
      await updateUser(formData);

      setFormData((prev) => ({
        ...prev,
        name: "",
        email: "",
        phone: "",
        location: "",
        websiteUrl: "",
        bio: "",
        profileSummery: "",
        aboutMe: "",
        profileImage: null,
        resumeFile: null,
      }));

      setResumeFile(null);
      setProfileImage(null);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

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
                {/* Profile Picture */}
                <FileUpload
                  label="Profile Picture"
                  name="profileImage"
                  accept="image/jpeg, image/png"
                  onFileSelect={(file) => handleFileSelect(file, "image")}
                  onFileRemove={() => handleFileRemove("image")}
                  fileInputRef={profileImageInputRef}
                  error={!profileImage ? "" : undefined}
                  required={true}
                  currentFile={profileImage?.name}
                />
              </div>

              {/* Profile Name */}
              <FormInput
                // icon={User}
                label="Name"
                placeholder="Enter your name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={error}
                required={true}
              />

              {/* Email */}
              <FormInput
                // icon={Mail}
                label="Email"
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={error}
                required={true}
              />

              {/* Phone */}
              <FormInput
                // icon={Phone}
                label="Phone"
                placeholder="Number"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={error}
                required={true}
              />

              {/* Location */}
              <FormInput
                // icon={MapPin}
                label="Location"
                placeholder="Location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                error={error}
                required={true}
              />

              {/* Website */}
              <FormInput
                // icon={Globe}
                label="Website"
                placeholder="Website"
                type="url"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleInputChange}
                error={error}
                required={true}
              />

              {/* All TextArea */}
              <div className="md:col-span-2">
                {/* Bio */}
                <FormTextArea
                  label="Bio"
                  placeholder="Add your Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  error={error ?? undefined}
                  required={true}
                  rows={4}
                />

                {/* About me */}
                <FormTextArea
                  label="About me"
                  placeholder="Write somthing about your"
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleInputChange}
                  error={error ?? undefined}
                  required={true}
                  rows={4}
                />

                {/* Proffessional Summary */}
                <FormTextArea
                  label="Proffessional Summary"
                  placeholder="Your Proffessional Summary here"
                  name="profileSummery"
                  value={formData.profileSummery}
                  onChange={handleInputChange}
                  error={error ?? undefined}
                  required={true}
                  rows={4}
                />
              </div>

              {/* Resume/CV */}
              <div className="md:col-span-2">
                <FileUpload
                  label="Upload Resume (PDF)"
                  name="resumeFile"
                  accept="application/pdf"
                  onFileSelect={(file) => handleFileSelect(file, "resume")}
                  onFileRemove={() => handleFileRemove("resume")}
                  fileInputRef={fileInputRef}
                  error={!resumeFile ? "" : undefined}
                  required={true}
                  currentFile={resumeFile?.name}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              {/* Reset */}
              <ActionButton
                label="Reset"
                type="reset"
                variant="secondary"
                icon={<X className="w-4 h-4" />}
                isLoading={false}
                onClick={handleReset}
              />

              {/* Update */}
              <ActionButton
                label={isUpdateMode ? "Update" : "Want to Update?"}
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading}
                icon={<Pencil className="w-4 h-4" />}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileTab;
