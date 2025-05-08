import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, BookOpen } from "lucide-react";
import { toast } from "react-hot-toast";

import { useContactStore } from "../store/useContectStore";

// Components
import FormInput from "../pages/admin/components/elements/FormInput";
import FormTextArea from "../pages/admin/components/elements/FormTextArea";
import ActionButton from "../pages/admin/components/elements/ActionButton";
import { useAuthStore } from "../store/useAuthStore";

interface contactFormData {
  name: string;
  email: string;
  message: string;
  subject: string;
}

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,

    threshold: 0.1,
  });

  const { user } = useAuthStore();
  const { sendMessage, isLoading, error } = useContactStore();

  const [formData, setFormData] = useState<contactFormData>({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields before submitting.");
      return; // Stop form submission
    }

    await sendMessage(formData);

    setFormData({
      name: "",
      email: "",
      message: "",
      subject: "",
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
            <BookOpen className="w-8 h-8 text-accent" />
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
                    {`+91 ${user?.phone}`}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="text-accent mr-4" size={24} />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-textLight/70">{user?.location}</p>
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
            {/* Name */}
            <FormInput
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              error={error}
            />

            {/* Email */}
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={error}
            />

            {/* Subject */}
            <FormInput
              label="Subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              error={error}
            />

            {/* Message */}
            <FormTextArea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={error ?? ""}
              required
            />

            <ActionButton
              label="Send Message"
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              isLoading={isLoading}
              disabled={isLoading}
              icon={<Send size={20} />}
            />
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
