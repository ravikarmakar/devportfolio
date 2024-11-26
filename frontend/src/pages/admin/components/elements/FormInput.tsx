interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  register: any;
  required?: boolean;
}

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  register,
  required = false,
}: FormInputProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name)}
        type={type}
        id={name}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 dark:border-gray-600 focus:border-accent"
        } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
