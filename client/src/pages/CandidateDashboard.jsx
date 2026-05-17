import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CandidateDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [interviews, setInterviews] =
    useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const fetchInterviews = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/interviews?email=${user.email}`
      );

      setInterviews(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* NAVBAR */}
      <nav className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-black">
              Candidate Portal
            </h1>

            <p className="text-zinc-500 text-sm mt-1">
              Welcome back, {user.name}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 px-5 py-2 rounded-xl font-bold"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-6">

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6">
            <p className="text-zinc-500 text-sm">
              Upcoming Interviews
            </p>

            <h2 className="text-4xl font-black mt-2">
              {interviews.length}
            </h2>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6">
            <p className="text-zinc-500 text-sm">
              Role
            </p>

            <h2 className="text-2xl font-bold mt-2 capitalize">
              Candidate
            </h2>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6">
            <p className="text-zinc-500 text-sm">
              Email
            </p>

            <h2 className="text-lg font-semibold mt-2 break-all">
              {user.email}
            </h2>
          </div>

        </div>

        {/* INTERVIEWS */}
        <div className="space-y-5">

          <h2 className="text-2xl font-bold">
            Your Interviews
          </h2>

          {interviews.length === 0 ? (
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-10 text-center text-zinc-500">
              No interviews assigned yet.
            </div>
          ) : (
            interviews.map((interview) => (
              <div
                key={interview._id}
                className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-5 md:items-center"
              >

                <div>

                  <h3 className="text-2xl font-bold">
                    {interview.title}
                  </h3>

                  <p className="text-zinc-400 mt-2">
                    📅 {interview.date}
                  </p>

                  <p className="text-zinc-400">
                    ⏰ {interview.time}
                  </p>

                  <p className="text-zinc-500 mt-2">
                    Room ID:
                    {" "}
                    {interview.roomId}
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/room/${interview.roomId}`
                    )
                  }
                  className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold"
                >
                  Join Interview
                </button>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;