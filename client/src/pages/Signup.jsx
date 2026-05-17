import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        formData
      );

      alert("Signup successful");

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-950">
      <form
        onSubmit={handleSignup}
        className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4"
      >
        <h1 className="text-white text-3xl font-bold">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800 text-white"
        />

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

        <button className="w-full bg-green-500 py-3 rounded text-white">
          Signup
        </button>

        <p className="text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;