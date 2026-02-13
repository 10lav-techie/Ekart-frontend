import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import API from "../../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data } = await API.post("/seller/forgot-password", {
        email,
      });

      setMessage(data.message);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Forgot Password
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          Enter your registered email to receive reset link
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Email address"
          type="email"
          placeholder="shop@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          className="mt-4"
        >
          Send Reset Link
        </Button>
      </form>

      {message && (
        <div className="mt-6 text-center text-sm text-blue-600">
          {message}
        </div>
      )}

      <p className="text-sm text-center mt-6">
        Remember your password?{" "}
        <Link
          to="/seller/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
