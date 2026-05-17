import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(""); // Agar user type karna shuru kare toh error hidden ho jaye
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const data = res.data;

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "interviewer") {
        navigate("/interviewer-dashboard");
      } else {
        navigate("/candidate-dashboard");
      }
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
          "Invalid email or password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-4 relative overflow-hidden selection:bg-green-500 selection:text-black">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Logo / Link back to home */}
      <Link
        to="/"
        className="mb-8 text-2xl font-black tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent hover:opacity-80 transition"
      >
        SaileshHire
      </Link>

      <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl p-6 sm:p-10 rounded-2xl border border-zinc-900/80 shadow-2xl">
        <div className="space-y-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-400">
            Enter your credentials to access your interview dashboard
          </p>
        </div>

        {/* Dynamic Error Message Banner */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 animate-fade-in">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@company.com"
              onChange={handleChange}
              value={formData.email}
              className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 text-white placeholder-zinc-600 outline-none transition duration-200 text-sm sm:text-base"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <a
                href="#"
                className="text-xs text-zinc-500 hover:text-green-400 transition"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              onChange={handleChange}
              value={formData.password}
              className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 text-white placeholder-zinc-600 outline-none transition duration-200 text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3.5 rounded-xl shadow-lg shadow-green-500/10 hover:shadow-green-500/20 transition duration-300 flex items-center justify-center text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-zinc-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-green-400 font-medium hover:underline transition"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
