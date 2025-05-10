import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TypewriterText: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentText = texts[textIndex];

        if (isDeleting) {
          setDisplayText(currentText.substring(0, displayText.length - 1));

          if (displayText.length === 1) {
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % texts.length);
          }
        } else {
          setDisplayText(currentText.substring(0, displayText.length + 1));

          if (displayText.length === currentText.length) {
            // Pause at the end of the word
            setTimeout(() => {
              setIsDeleting(true);
            }, 1500);
            return;
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts]);

  return (
    <motion.h2
      className="mb-6 text-xl font-light text-blue-300 md:text-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      {displayText}
      <span className="inline-block w-1 h-6 ml-1 bg-blue-400 animate-pulse" />
    </motion.h2>
  );
};
