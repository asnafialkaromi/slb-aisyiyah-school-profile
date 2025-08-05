import React, { useState } from "react";
import AuthService from "../api/services/AuthService";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await AuthService.login(username, password);
      if (res?.data.token) {
        navigate("/admin", { replace: true });
        localStorage.setItem("token", res.data.token);
      } else {
        setError("Login gagal. Periksa kembali username dan password Anda.");
      }
    } catch {
      setError("Login gagal. Periksa kembali username dan password Anda.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div role="alert" class="alert alert-error alert-soft">
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="Masukkan username"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukkan password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="input w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={loading}
          >
            {loading ? <span className="loading loading-dots"></span> : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
