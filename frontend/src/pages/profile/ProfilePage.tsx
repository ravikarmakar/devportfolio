import { motion } from "framer-motion";
import ProfileHeader from "./components/ProfileHeader";
import AboutSection from "./components/AboutSection";
import InterestsSection from "./components/InterestsSection";
import ProfessionalSummary from "./components/ProfessionalSummary";
import GoalsSection from "./components/GoalsSection";
import EducationSection from "./components/EducationSection";
import ProfileHeaderLoading from "./components/skeletons/ProfileHeaderLoading";
import { useAuthStore } from "../../store/useAuthStore";

const Profile = () => {
  const { user, isLoading } = useAuthStore();

  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {isLoading ? (
            <ProfileHeaderLoading />
          ) : (
            user && <ProfileHeader user={user} />
          )}
          {user && <ProfessionalSummary user={user} />}
          {user && <AboutSection user={user} />}
          <EducationSection />
          <InterestsSection />
          <GoalsSection />
        </motion.div>

        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden -z-10">
          <div className="absolute w-64 h-64 rounded-full top-1/4 left-1/4 bg-accent/5 mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute w-64 h-64 rounded-full top-1/2 right-1/4 bg-purple-500/5 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute w-64 h-64 rounded-full bottom-1/4 left-1/2 bg-pink-500/5 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>
    </section>
  );
};

export default Profile;
