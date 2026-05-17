import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login successful");

      navigate("/");
    } catch (err) {
      console.log(err);

      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-950">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4"
      >
        <h1 className="text-white text-3xl font-bold">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800 text-white"
        />

        <button className="w-full bg-blue-500 py-3 rounded text-white">
          Login
        </button>

        <p className="text-zinc-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;