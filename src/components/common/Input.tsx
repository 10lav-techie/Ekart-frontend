import type { InputHTMLAttributes } from "react";

/**
 * Input Props
 * -----------
 * Extends native input props so it behaves
 * exactly like a standard HTML input.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Input Component
 * ---------------
 * - Label support
 * - Error handling
 * - Helper text
 * - Clean focus & error states
 */
const Input = ({
  label,
  error,
  helperText,
  className = "",
  ...rest
}: InputProps) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-xl border text-sm
          bg-white text-slate-800
          placeholder:text-slate-500
          transition duration-200
          focus:outline-none
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-400"
              : "border-slate-300 focus:ring-2 focus:ring-blue-500"

          }
          ${className}
        `}
        {...rest}
      />


      {helperText && !error && (
        <p className="text-xs text-slate-500 mt-1">{helperText}</p>

      )}

      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
