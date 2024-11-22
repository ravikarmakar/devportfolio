import { motion } from "framer-motion";
import { GithubIcon, Linkedin, Twitter, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`py-8 px-6 transition-colors duration-200 dark:bg-bgDark/50 bg-gray-50 backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-accent mb-2">DevPortfolio</h3>
            <p className="dark:text-textLight/70 text-gray-600">
              Building the future, one line at a time.
            </p>
          </div>

          <div className="flex space-x-6 mb-6 md:mb-0">
            <motion.a
              href="https://github.com/ravikarmakar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="dark:text-textLight/70 text-gray-600 hover:text-accent transition-colors"
            >
              <GithubIcon size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="dark:text-textLight/70 text-gray-600 hover:text-accent transition-colors"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="https://x.com/ravi_karmakar4"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="dark:text-textLight/70 text-gray-600 hover:text-accent transition-colors"
            >
              <Twitter size={24} />
            </motion.a>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            className="p-2 bg-accent rounded-full text-white hover:bg-accent/90 transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        </div>

        <div className="mt-8 pt-8 border-t dark:border-secondary/30 border-gray-200 text-center dark:text-textLight/50 text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} DevPortfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
