import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import API from "../../services/api";

/**
 * Seller Login Page
 * -----------------
 * Only shop owners log in.
 */

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/seller/login", {
        email,
        password,
      });

      localStorage.setItem("seller", JSON.stringify(data));

      navigate("/seller/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };


  return (
    <AuthLayout>
      <h2 className="text-xl font-semibold mb-1">
        Seller Login
      </h2>
      <p className="text-sm text-muted mb-6">
        Login to manage your shop and products
      </p>

      <form onSubmit={handleLogin}>
        <Input
          label="Email address"
          type="email"
          placeholder="shop@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          className="mt-2"
        >
          Login
        </Button>
      </form>

      <p className="text-sm text-center mt-6">
        Don’t have a shop account?{" "}
        <Link
          to="/seller/signup"
          className="text-accent font-medium hover:underline"
        >
          Register your shop
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
