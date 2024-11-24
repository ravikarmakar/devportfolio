import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Calendar,
  Download,
  Briefcase,
} from "lucide-react";
import useUserStore from "../../store/useUserStore";
import { useEffect } from "react";

const AdminPage = () => {
  const { user, fetchUserData } = useUserStore();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-secondary/20 rounded-2xl p-8 backdrop-blur-sm"
        >
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">
            <h1>Admin Pannel</h1>
            <div className="relative mb-4">
              <img
                src={user?.profileImageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-accent object-cover"
              />
              {/* <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-secondary/20"></div> */}
            </div>
            <h1 className="text-3xl font-bold mb-2 dark:text-white">
              {user?.name}
            </h1>
            <p className="text-accent text-lg mb-4">Full Stack Developer</p>
            <div className="flex gap-4 mb-6">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-accent/10 rounded-full text-accent hover:bg-accent hover:text-white transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-accent/10 rounded-full text-accent hover:bg-accent hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <Download size={20} />
              Download Resume
            </motion.button>
          </div>

          {/* Profile Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Personal Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="text-accent" size={20} />
                  <p className="dark:text-gray-300">{user?.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-accent" size={20} />
                  <p className="dark:text-gray-300">{`+91 ${user?.mobileNumber}`}</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-accent" size={20} />
                  <p className="dark:text-gray-300">{user?.currLocation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-accent" size={20} />
                  <p className="dark:text-gray-300">Joined January 2022</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Professional Summary
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Briefcase className="text-accent mt-1" size={20} />
                  <div>
                    <p className="dark:text-gray-300">
                      Passionate full-stack developer with expertise in MERN
                      stack development. Specialized in building scalable web
                      applications and implementing modern UI/UX designs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdminPage;
