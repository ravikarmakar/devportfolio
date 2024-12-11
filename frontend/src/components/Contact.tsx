import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import useUserStore from "../store/useUserStore";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  const { user } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await axiosInstance.post("/message/contact", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setFormData({
        name: "",
        email: "",
        message: "",
        subject: "",
      });

      toast.success("Message sent successfully!");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title inline-flex items-center justify-center gap-2">
            {/* <BookOpen className="w-8 h-8 text-accent" /> */}
            Get in touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Contact me for collaboration, professional inquiries, or project
            opportunities. I am open to connecting and discussing how I can
            contribute to your goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Let's Talk</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="text-accent mr-4" size={24} />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:contact@example.com"
                    className="text-textLight/70 hover:text-accent"
                  >
                    {user?.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="text-accent mr-4" size={24} />
                <div>
                  <p className="font-medium">Phone</p>
                  <a
                    href="tel:+1234567890"
                    className="text-textLight/70 hover:text-accent"
                  >
                    {`+91 ${user?.mobileNumber}`}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="text-accent mr-4" size={24} />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-textLight/70">{user?.currLocation}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="card space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-secondary/20 border border-secondary/30 focus:border-accent focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-secondary/20 border border-secondary/30 focus:border-accent focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="subject"
                id="subject"
                name="subject"
                maxLength={25}
                minLength={5}
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-secondary/20 border border-secondary/30 focus:border-accent focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-secondary/20 border border-secondary/30 focus:border-accent focus:outline-none"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span> Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span> Send Message</span>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

{
  /* <Send size={20} />
<span> Send Message</span> */
}
