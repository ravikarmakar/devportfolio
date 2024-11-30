import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { User } from "../types";

interface DownloadButtonProps {
  user: User | null; // Resume URL must be a string
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ user }) => {
  const resumeUrl = user?.resumeUrl;

  const handleDownload = () => {
    if (!resumeUrl) {
      alert("Resume URL not available.");
      return;
    }

    try {
      // Create a link element for downloading the file
      const link = document.createElement("a");
      link.href = resumeUrl; // Updated Cloudinary URL
      link.download = "Resume.pdf"; // Set the download file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error while trying to download the file:", error);
      alert("Failed to download the file. Please try again later.");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      className="px-6 py-3 bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-2"
    >
      <Download className="w-5 h-5" />
      Download CV
    </motion.button>
  );
};
