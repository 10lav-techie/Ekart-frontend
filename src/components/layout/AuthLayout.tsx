import { ReactNode } from "react";

/**
 * AuthLayout Props
 * ----------------
 * Wraps authentication pages (Login, Signup)
 */
interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * AuthLayout
 * ----------
 * - Centers auth forms
 * - Adds subtle background
 * - Ensures consistent spacing & branding
 */
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Outer container */}
      <div className="w-full max-w-md px-4">
        {/* Branding */}
        <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Local<span className="text-blue-600">Kart</span>
        </h1>

          <p className="text-sm text-slate-500 mt-1">

            Discover shops near you
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-soft p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
