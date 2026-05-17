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

  // FILTERS
  const upcomingInterviews =
    interviews.filter(
      (interview) =>
        interview.status ===
        "scheduled"
    );

  const completedInterviews =
    interviews.filter(
      (interview) =>
        interview.status ===
        "completed"
    );

  const cancelledInterviews =
    interviews.filter(
      (interview) =>
        interview.status ===
        "cancelled"
    );

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  // FETCH
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
            className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl font-bold"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-6">

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

          <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Upcoming Interviews
            </p>

            <h2 className="text-4xl font-black mt-2">
              {upcomingInterviews.length}
            </h2>

          </div>

          <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Completed Interviews
            </p>

            <h2 className="text-4xl font-black mt-2">
              {completedInterviews.length}
            </h2>

          </div>

          <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6">

            <p className="text-zinc-500 text-sm">
              Cancelled Interviews
            </p>

            <h2 className="text-4xl font-black mt-2">
              {cancelledInterviews.length}
            </h2>

          </div>

        </div>

        {/* UPCOMING */}
        <section className="mb-14">

          <h2 className="text-2xl font-bold mb-5">
            🚀 Upcoming Interviews
          </h2>

          {upcomingInterviews.length === 0 ? (

            <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-10 text-center text-zinc-500">
              No upcoming interviews.
            </div>

          ) : (

            <div className="space-y-5">

              {upcomingInterviews.map(
                (interview) => (
                  <div
                    key={interview._id}
                    className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-5 md:items-center"
                  >

                    {/* LEFT */}
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

                      <p className="text-yellow-400 text-sm mt-3">
                        Status: Scheduled
                      </p>

                    </div>

                    {/* RIGHT */}
                    <button
                      onClick={() =>
                        navigate(
                          `/room/${interview.roomId}`
                        )
                      }
                      className="bg-green-500 hover:bg-green-400 transition text-black px-6 py-3 rounded-xl font-bold"
                    >
                      Join Interview
                    </button>

                  </div>
                )
              )}

            </div>

          )}

        </section>

        {/* COMPLETED */}
        <section className="mb-14">

          <h2 className="text-2xl font-bold mb-5">
            ✅ Completed Interviews
          </h2>

          {completedInterviews.length === 0 ? (

            <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-10 text-center text-zinc-500">
              No completed interviews.
            </div>

          ) : (

            <div className="space-y-5">

              {completedInterviews.map(
                (interview) => (
                  <div
                    key={interview._id}
                    className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6"
                  >

                    <h3 className="text-2xl font-bold">
                      {interview.title}
                    </h3>

                    <p className="text-zinc-400 mt-2">
                      📅 {interview.date}
                    </p>

                    <p className="text-zinc-400">
                      ⏰ {interview.time}
                    </p>

                    <p className="text-green-400 mt-3 font-medium">
                      Interview Completed
                    </p>

                  </div>
                )
              )}

            </div>

          )}

        </section>

        {/* CANCELLED */}
        <section>

          <h2 className="text-2xl font-bold mb-5">
            ❌ Cancelled Interviews
          </h2>

          {cancelledInterviews.length === 0 ? (

            <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-10 text-center text-zinc-500">
              No cancelled interviews.
            </div>

          ) : (

            <div className="space-y-5">

              {cancelledInterviews.map(
                (interview) => (
                  <div
                    key={interview._id}
                    className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6"
                  >

                    <h3 className="text-2xl font-bold">
                      {interview.title}
                    </h3>

                    <p className="text-zinc-400 mt-2">
                      📅 {interview.date}
                    </p>

                    <p className="text-zinc-400">
                      ⏰ {interview.time}
                    </p>

                    <p className="text-red-400 mt-3 font-medium">
                      Interview Cancelled
                    </p>

                  </div>
                )
              )}

            </div>

          )}

        </section>

      </div>
    </div>
  );
}

export default CandidateDashboard;