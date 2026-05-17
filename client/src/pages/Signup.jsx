import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        formData,
      );

      navigate("/login");
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-4 relative overflow-hidden selection:bg-green-500 selection:text-black">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* LOGO */}
      <Link
        to="/"
        className="mb-8 text-3xl font-black tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent"
      >
        SaileshHire
      </Link>

      {/* CARD */}
      <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl p-8 rounded-2xl border border-zinc-900 shadow-2xl">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-black">Create Account</h1>

          <p className="text-zinc-400 text-sm mt-2">
            Start conducting and attending technical interviews.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-green-500/50 outline-none text-white placeholder-zinc-600"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-green-500/50 outline-none text-white placeholder-zinc-600"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-green-500/50 outline-none text-white placeholder-zinc-600"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-green-500/50 outline-none text-white"
            >
              <option value="candidate">Candidate</option>

              <option value="interviewer">Interviewer</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3.5 rounded-xl transition duration-300 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* LOGIN */}
        <p className="text-zinc-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-400 hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
