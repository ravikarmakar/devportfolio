import { motion } from "framer-motion";
import ProfileHeader from "./components/ProfileHeader";
import AboutSection from "./components/AboutSection";
import InterestsSection from "./components/InterestsSection";
import ProfessionalSummary from "./components/ProfessionalSummary";
import useUserStore from "../../store/useUserStore";
import { useEffect } from "react";
import GoalsSection from "./components/GoalsSection";
import EducationSection from "./components/EducationSection";
import ProfileHeaderLoading from "./components/skeletons/ProfileHeaderLoading";

const Profile = () => {
  const { fetchUserData, user, isLoading } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, [fetchUserData, user]);

  // const isLoading = true;

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {isLoading ? <ProfileHeaderLoading /> : <ProfileHeader user={user} />}
          <ProfessionalSummary user={user} />
          <AboutSection user={user} />
          <EducationSection />
          <InterestsSection />
          <GoalsSection />
        </motion.div>

        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>
    </section>
  );
};

export default Profile;
