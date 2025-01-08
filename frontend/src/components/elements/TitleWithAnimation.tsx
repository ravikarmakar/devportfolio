// TitleWithAnimation.jsx
import { motion } from "framer-motion";

const TitleWithAnimation = ({ text }: any) => {
  return (
    <motion.h2
      className="text-xl font-semibold text-white mb-2 relative inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      {text}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.h2>
  );
};

export default TitleWithAnimation;
