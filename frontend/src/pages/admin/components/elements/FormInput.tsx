interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string | null;
  register?: any;
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
        {...(register && register(name))}
        type={type}
        id={name}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-md shadow-sm ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        } sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormInput;
