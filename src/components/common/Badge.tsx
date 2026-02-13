import type { ReactNode } from "react";

/**
 * Badge Props
 * -----------
 * Lightweight component for labels & statuses
 */
interface BadgeProps {
  children: ReactNode;
  variant?: "new" | "top" | "open" | "closed" | "default";
  className?: string;
}

/**
 * Badge Component
 * ---------------
 * - Small
 * - High contrast
 * - Consistent across the app
 */
const Badge = ({
  children,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const variants = {
    new: "bg-blue-100 text-blue-700",
    top: "bg-orange-100 text-orange-700",
    open: "bg-green-100 text-green-700",
    closed: "bg-red-100 text-red-700",
    default: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1 rounded-full
        text-xs font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
