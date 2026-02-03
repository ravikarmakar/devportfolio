import { useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import { useContactStore } from "../../../store/useContactStore";
import { useAuthStore } from "../../../store/useAuthStore";

// Modern Contact Method Card with Icon
const ContactMethodCard = memo(({ method, index }: { method: any; index: number }) => {
  const handleClick = () => {
    if (method.link) {
      window.open(method.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`group relative overflow-hidden rounded-2xl p-6 ${method.link ? "cursor-pointer" : ""
        }`}
    >
      {/* Gradient Background */}
      {/* <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} /> */}

      {/* Border */}
      <div className="absolute inset-0 border-2 border-gray-700/50 group-hover:border-blue-500/50 rounded-2xl transition-colors duration-300" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-lg`}>
            <span className="text-2xl">{method.icon}</span>
          </div>
          {method.link && (
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all duration-300" />
          )}
        </div>

        <h3 className="text-sm font-medium text-gray-400 mb-2">{method.title}</h3>
        <p className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors duration-300 break-all">
          {method.value}
        </p>
      </div>

      {/* Glow Effect on Hover */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`} />
    </motion.div>
  );
});

ContactMethodCard.displayName = "ContactMethodCard";

// Main Component
export default function ContactSection() {
  const { createContact, isLoading } = useContactStore();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }

      const result = await createContact(formData);

      if (result) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
      }
    },
    [formData, createContact]
  );

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden bg-[#0A0A0B]">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Hero Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              💬 Let's Connect
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Ready to Work </span>
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Together?
            </span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-20">
          <ContactMethodCard
            index={0}
            method={{
              title: "Email Me",
              value: user?.email || "ravi@example.com",
              icon: "📧",
              color: "from-blue-500 to-cyan-500",
              link: `mailto:${user?.email}`,
            }}
          />
          <ContactMethodCard
            index={1}
            method={{
              title: "Current Location",
              value: user?.location || "Bengaluru, KA",
              icon: "📍",
              color: "from-purple-500 to-pink-500",
            }}
          />
          <ContactMethodCard
            index={2}
            method={{
              title: "Phone",
              value: user?.phone || "+91 0000000000",
              icon: "📱",
              color: "from-orange-500 to-red-500",
              link: `tel:${user?.phone}`,
            }}
          />
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative">
            {/* Gradient Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 blur" />

            {/* Form Container */}
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-gray-700/50">
              {!isSubmitted ? (
                <>
                  <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Send Me a Message</h3>
                    <p className="text-gray-400">Fill out the form below and I'll get back to you soon</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Your Name <span className="text-blue-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Your Email <span className="text-blue-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                        placeholder="What's this about?"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Your Message <span className="text-blue-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                        placeholder="Tell me about your project or idea..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl px-8 py-4 flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      <span className="relative z-10">
                        {isLoading ? "Sending..." : "Send Message"}
                      </span>
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                      ) : (
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                      )}

                      {/* Button Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/50"
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-3">Message Sent Successfully!</h3>
                  <p className="text-gray-400 text-lg">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
