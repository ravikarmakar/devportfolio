import { motion } from "framer-motion";

export default function FormField({
  label,
  name,
  type = "text",
  value,
  required = false,
  activeField,
  setActiveField,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  required?: boolean;
  activeField: string | null;
  setActiveField: React.Dispatch<React.SetStateAction<string | null>>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div className="relative">
      <motion.label
        className={`absolute left-3 ${
          activeField === name || value
            ? "-top-2 text-xs bg-gray-800 px-1 text-blue-400"
            : "top-3 text-gray-400"
        } transition-all duration-200 pointer-events-none`}
        animate={{
          top: activeField === name || value ? -8 : 12,
          fontSize: activeField === name || value ? "0.75rem" : "0.875rem",
        }}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </motion.label>
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        onFocus={() => setActiveField(name)}
        onBlur={() => setActiveField(null)}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20 transition-all duration-200"
      />
    </div>
  );
}
