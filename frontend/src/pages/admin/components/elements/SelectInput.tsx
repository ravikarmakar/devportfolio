interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string | null | undefined;
  className?: string;
}

const SelectInput = ({
  label,
  name,
  value,
  options,
  onChange,
  error,
  className = "",
}: SelectInputProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm text-blue-500 font-medium dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-lg text-gray-300 dark:bg-secondary/20 border ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 dark:border-gray-600 focus:border-accent"
        } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors ${className}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectInput;
