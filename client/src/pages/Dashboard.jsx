import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // CREATE INTERVIEW STATES
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loadingSchedule, setLoadingSchedule] =
    useState(false);

  // JOIN ROOM STATE
  const [joinRoomId, setJoinRoomId] =
    useState("");

  // INTERVIEWS
  const [interviews, setInterviews] =
    useState([]);

  // COPY STATE
  const [copiedId, setCopiedId] =
    useState("");

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  // GENERATE SHORT ROOM ID
  const generateRoomId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const generatePart = () => {
      let part = "";

      for (let i = 0; i < 3; i++) {
        part += chars.charAt(
          Math.floor(
            Math.random() * chars.length
          )
        );
      }

      return part;
    };

    return `${generatePart()}-${generatePart()}-${generatePart()}`;
  };

  // FETCH INTERVIEWS
  const fetchInterviews = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/interviews`
      );

      setInterviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  // SCHEDULE INTERVIEW
  const scheduleInterview = async (e) => {
    e.preventDefault();

    if (!title || !date || !time) return;

    setLoadingSchedule(true);

    try {
      const roomId = generateRoomId();

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/interviews`,
        {
          title,
          date,
          time,
          roomId,
        }
      );

      setTitle("");
      setDate("");
      setTime("");

      fetchInterviews();
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSchedule(false);
    }
  };

  // JOIN EXISTING ROOM
  const joinExistingRoom = (e) => {
    e.preventDefault();

    if (!joinRoomId.trim()) return;

    navigate(`/room/${joinRoomId.trim()}`);
  };

  // COPY ROOM ID
  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-5 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/dashboard"
            className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent"
          >
            InterviewX
          </Link>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 transition px-5 py-2.5 rounded-xl text-sm font-bold"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="p-4 sm:p-6 md:p-10 selection:bg-green-500 selection:text-black">

        {/* HEADER SECTION */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 max-w-7xl mx-auto border-b border-zinc-900 pb-6">

          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Interview Dashboard
            </h1>

            <p className="text-zinc-400 text-sm mt-1">
              Manage upcoming evaluations and
              live rooms instantly.
            </p>
          </div>

          {/* QUICK JOIN */}
          <form
            onSubmit={joinExistingRoom}
            className="flex gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 w-full md:w-auto max-w-md"
          >

            <input
              type="text"
              placeholder="Enter Room ID"
              value={joinRoomId}
              onChange={(e) =>
                setJoinRoomId(e.target.value)
              }
              className="flex-1 p-2.5 px-4 rounded-lg bg-zinc-950 border border-zinc-850 outline-none text-sm placeholder-zinc-600 focus:border-green-500/40 transition"
            />

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-400 text-black px-5 rounded-lg font-bold text-sm tracking-wide transition duration-300"
            >
              Join
            </button>

          </form>
        </header>

        {/* MAIN GRID */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">

          {/* LEFT PANEL */}
          <section className="lg:col-span-1 bg-zinc-900/40 backdrop-blur-sm p-6 rounded-2xl border border-zinc-900 shadow-xl sticky top-28">

            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-100">
              <span>📅</span>
              Schedule Interview
            </h2>

            <form
              onSubmit={scheduleInterview}
              className="space-y-4"
            >

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Interview Title
                </label>

                <input
                  type="text"
                  required
                  placeholder="Frontend Developer Technical..."
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-850 focus:border-green-500/50 outline-none transition text-sm text-white placeholder-zinc-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Date
                  </label>

                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-850 focus:border-green-500/50 outline-none transition text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Time
                  </label>

                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
                    }
                    className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-850 focus:border-green-500/50 outline-none transition text-sm text-white"
                  />
                </div>

              </div>

              <button
                type="submit"
                disabled={loadingSchedule}
                className="w-full bg-zinc-100 hover:bg-white text-black font-bold py-3 rounded-xl transition duration-300 text-sm mt-2 disabled:opacity-50"
              >
                {loadingSchedule
                  ? "Scheduling..."
                  : "Create Session Link"}
              </button>

            </form>
          </section>

          {/* RIGHT PANEL */}
          <section className="lg:col-span-2 space-y-4">

            <h2 className="text-xl font-bold flex items-center gap-2 mb-2 text-zinc-100">
              <span>💻</span>
              Active Sessions ({interviews.length})
            </h2>

            {interviews.length === 0 ? (
              <div className="text-center py-16 bg-zinc-900/20 rounded-2xl border border-zinc-900 border-dashed">
                <p className="text-zinc-500 text-sm">
                  No interviews scheduled yet.
                </p>
              </div>
            ) : (
              interviews.map((interview) => (
                <div
                  key={interview._id}
                  className="group bg-zinc-900/30 hover:bg-zinc-900/50 p-5 sm:p-6 rounded-2xl border border-zinc-900 hover:border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between sm:items-center transition duration-300"
                >

                  {/* LEFT */}
                  <div className="space-y-1">

                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition">
                      {interview.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400">

                      <span className="flex items-center gap-1 text-zinc-300">
                        🗓️ {interview.date}
                      </span>

                      <span className="hidden sm:inline text-zinc-700">
                        •
                      </span>

                      <span className="flex items-center gap-1 text-zinc-300">
                        ⏰ {interview.time}
                      </span>

                    </div>

                    <div className="pt-2">

                      <span className="text-xs bg-zinc-950 px-2.5 py-1 rounded-md text-zinc-400 font-mono border border-zinc-850 select-all">
                        ID: {interview.roomId}
                      </span>

                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">

                    <button
                      onClick={() =>
                        handleCopy(
                          interview.roomId
                        )
                      }
                      className="flex-1 sm:flex-none text-xs bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl font-medium min-w-[85px] transition"
                    >
                      {copiedId ===
                      interview.roomId
                        ? "Copied! ✅"
                        : "Copy ID"}
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/room/${interview.roomId}`
                        )
                      }
                      className="flex-1 sm:flex-none text-xs bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-black border border-green-500/20 px-5 py-3 rounded-xl font-bold transition duration-300"
                    >
                      Join Room
                    </button>

                  </div>
                </div>
              ))
            )}

          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;