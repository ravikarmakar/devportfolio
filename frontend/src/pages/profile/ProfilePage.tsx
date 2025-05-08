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
    <section className="py-20 px-6">
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
