import React from "react";
import { Loader2 } from "lucide-react";

interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

const ActionButton = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  isLoading = false,
  icon,
  fullWidth = false,
  disabled = false,
}: ActionButtonProps) => {
  const baseStyles =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200";
  const variantStyles = {
    primary: "bg-accent hover:bg-accent/90 text-white",
    secondary:
      "bg-gray-200 dark:bg-secondary/20 hover:bg-gray-300 dark:hover:bg-secondary/30 text-gray-700 dark:text-gray-200",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${isLoading ? "cursor-wait" : ""}
      `}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {label}
    </button>
  );
};

export default ActionButton;
