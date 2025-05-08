import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Spinner from "../../../components/icon/Spinner";
import FormField from "../../../components/ui/FormField";
import { contactMethods } from "../../../lib/Context";

export default function ContactSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [activeField, setActiveField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1500);

    console.log(formState);
  };

  return (
    <div ref={containerRef} className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Get</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
              In Touch
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Let's discuss your project or just say hello. I'd love to hear from
            you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3 bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <FormField
                    label="Your Name"
                    name="name"
                    value={formState.name}
                    required
                    activeField={activeField}
                    setActiveField={setActiveField}
                    onChange={handleChange}
                  />

                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formState.email}
                    required
                    activeField={activeField}
                    setActiveField={setActiveField}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <FormField
                    label="Subject"
                    name="subject"
                    value={formState.subject}
                    activeField={activeField}
                    setActiveField={setActiveField}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-8">
                  <div className="relative">
                    <motion.label
                      className={`absolute left-3 ${
                        activeField === "message" || formState.message
                          ? "-top-2 text-xs bg-gray-800 px-1 text-blue-400"
                          : "top-3 text-gray-400"
                      } transition-all duration-200 pointer-events-none`}
                      animate={{
                        top:
                          activeField === "message" || formState.message
                            ? -8
                            : 12,
                        fontSize:
                          activeField === "message" || formState.message
                            ? "0.75rem"
                            : "0.875rem",
                      }}
                    >
                      Your Message
                    </motion.label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20 transition-all duration-200"
                    ></textarea>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium rounded-lg"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0px 5px 15px rgba(99, 102, 241, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Spinner className="mr-2" />
                      Sending...
                    </span>
                  ) : (
                    <span>Send Message</span>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center py-10 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-300">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mr-4`}
                    >
                      <span className="text-xl">{method.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-sm font-medium mb-1">
                        {method.title}
                      </h3>
                      {method.link ? (
                        <motion.a
                          href={method.link}
                          className="text-white text-lg font-medium hover:text-blue-400 transition-colors"
                          whileHover={{ x: 3 }}
                        >
                          {method.value}
                        </motion.a>
                      ) : (
                        <span className="text-white text-lg font-medium">
                          {method.value}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
