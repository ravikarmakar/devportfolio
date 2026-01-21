import { useEffect, useState, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  texts: string[];
}

// Memoized cursor component to prevent re-renders
const Cursor = memo(() => (
  <span className="inline-block w-1 h-6 ml-1 bg-blue-400 animate-pulse" />
));
Cursor.displayName = "Cursor";

// Animation config - defined outside component to avoid recreation
const motionConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, delay: 0.6 },
};

export const TypewriterText = memo<TypewriterTextProps>(({ texts }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Memoize current text to avoid recalculation
  const currentText = useMemo(() => texts[textIndex], [texts, textIndex]);

  // Memoize display text based on char index
  const displayText = useMemo(
    () => currentText.substring(0, charIndex),
    [currentText, charIndex]
  );

  // Memoize the typing logic
  const handleTyping = useCallback(() => {
    if (isPaused) return;

    if (isDeleting) {
      if (charIndex > 0) {
        setCharIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (charIndex < currentText.length) {
        setCharIndex((prev) => prev + 1);
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 1500);
      }
    }
  }, [charIndex, currentText.length, isDeleting, isPaused, texts.length]);

  useEffect(() => {
    if (isPaused) return;

    const delay = isDeleting ? 50 : 100;
    const timeout = setTimeout(handleTyping, delay);

    return () => clearTimeout(timeout);
  }, [handleTyping, isDeleting, isPaused]);

  return (
    <motion.h2
      className="mb-6 text-xl font-light text-blue-300 md:text-2xl"
      {...motionConfig}
    >
      {displayText}
      <Cursor />
    </motion.h2>
  );
});

TypewriterText.displayName = "TypewriterText";
