import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button Props
 * ------------
 * We extend native button props so this component
 * behaves exactly like a real HTML button.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
}

/**
 * Button Component
 * ----------------
 * Design-system level button
 * - Multiple variants
 * - Multiple sizes
 * - Loading state
 * - Fully accessible
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  className = "",
  ...rest
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-accent text-black hover:bg-blue-700 focus:ring-accent",
    secondary:
      "bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-800",
    outline:
      "border border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const disabledStyles =
    "disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabledStyles}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="animate-pulse">Processing...</span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
