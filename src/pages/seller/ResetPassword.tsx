import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import API from "../../services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data } = await API.put(
        `/seller/reset-password/${token}`,
        { password }
      );

      setMessage(data.message);

      setTimeout(() => {
        navigate("/seller/login");
      }, 2000);

    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Invalid or expired token"
      );
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Reset Password
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          Enter your new password
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          className="mt-4"
        >
          Reset Password
        </Button>
      </form>

      {message && (
        <div className="mt-6 text-center text-sm text-blue-600">
          {message}
        </div>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
