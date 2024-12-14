import { ChangeEvent } from "react";

interface FormTextAreaProps {
  label: string;
  name: string;
  value?: string;
  placeholder?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

const FormTextArea = ({
  label,
  name,
  placeholder,
  error,
  onChange,
  value,
  required = false,
  rows = 4,
}: FormTextAreaProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        id={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-lg text-gray-300 bg-white dark:bg-secondary/20 border ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 dark:border-gray-600 focus:border-accent"
        } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormTextArea;
