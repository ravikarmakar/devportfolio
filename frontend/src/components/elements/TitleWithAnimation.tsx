// TitleWithAnimation.jsx
import { motion } from "framer-motion";

const TitleWithAnimation = ({ text }: any) => {
  return (
    <motion.h2
      className="section-title"
      initial={{ color: "white" }} // Initial text color
      whileHover={{
        color: "#007BFF", // Hover text color
        transition: { duration: 1 }, // Smooth transition},
      }}
    >
      {text}

      {/* Underline animation */}
      <motion.div
        className="absolute bottom-0 left-0 bg-blue-500 h-0.5 w-full"
        initial={{ width: "0%", left: "40%" }} // Start from middle
        whileHover={{
          width: "100%", // Full width of underline on hover
          left: 0, // Move underline to the left when hovered
          transition: { duration: 0.5, ease: "easeInOut" }, // Smooth transition
        }}
      />
    </motion.h2>
  );
};

export default TitleWithAnimation;
