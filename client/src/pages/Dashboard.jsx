import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // CREATE INTERVIEW STATES
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // NEW
  const [candidateEmail, setCandidateEmail] =
    useState("");

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

  // FETCH ONLY CURRENT USER INTERVIEWS
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

  // SCHEDULE INTERVIEW
  const scheduleInterview = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !date ||
      !time ||
      !candidateEmail
    )
      return;

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

          // NEW
          candidateEmail,

          createdBy: user.email,
        }
      );

      setTitle("");
      setDate("");
      setTime("");
      setCandidateEmail("");

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

          <Link
            to="/interviewer-dashboard"
            className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent"
          >
            InterviewX
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 transition px-5 py-2.5 rounded-xl text-sm font-bold"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="p-4 sm:p-6 md:p-10">

        {/* HEADER */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 max-w-7xl mx-auto border-b border-zinc-900 pb-6">

          <div>
            <h1 className="text-3xl sm:text-4xl font-black">
              Interview Dashboard
            </h1>

            <p className="text-zinc-400 text-sm mt-1">
              Manage upcoming interviews.
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
              className="flex-1 p-2.5 px-4 rounded-lg bg-zinc-950 border border-zinc-850 outline-none"
            />

            <button
              type="submit"
              className="bg-green-500 text-black px-5 rounded-lg font-bold"
            >
              Join
            </button>

          </form>
        </header>

        {/* MAIN */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">

          {/* LEFT */}
          <section className="lg:col-span-1 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900">

            <h2 className="text-xl font-bold mb-4">
              📅 Schedule Interview
            </h2>

            <form
              onSubmit={scheduleInterview}
              className="space-y-4"
            >

              <input
                type="text"
                required
                placeholder="Interview Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-850"
              />

              {/* NEW */}
              <input
                type="email"
                required
                placeholder="Candidate Email"
                value={candidateEmail}
                onChange={(e) =>
                  setCandidateEmail(
                    e.target.value
                  )
                }
                className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-850"
              />

              <div className="grid grid-cols-2 gap-3">

                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-850"
                />

                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) =>
                    setTime(e.target.value)
                  }
                  className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-850"
                />

              </div>

              <button
                type="submit"
                disabled={loadingSchedule}
                className="w-full bg-white text-black font-bold py-3 rounded-xl"
              >
                {loadingSchedule
                  ? "Scheduling..."
                  : "Create Session"}
              </button>

            </form>
          </section>

          {/* RIGHT */}
          <section className="lg:col-span-2 space-y-4">

            <h2 className="text-xl font-bold">
              💻 Your Interviews (
              {interviews.length})
            </h2>

            {interviews.length === 0 ? (
              <div className="text-center py-16 bg-zinc-900/20 rounded-2xl border border-zinc-900">
                <p className="text-zinc-500">
                  No interviews scheduled yet.
                </p>
              </div>
            ) : (
              interviews.map((interview) => (
                <div
                  key={interview._id}
                  className="bg-zinc-900/30 p-5 rounded-2xl border border-zinc-900 flex flex-col sm:flex-row gap-4 justify-between sm:items-center"
                >

                  {/* LEFT */}
                  <div>

                    <h3 className="text-lg font-bold">
                      {interview.title}
                    </h3>

                    <p className="text-sm text-zinc-400 mt-1">
                      🗓️ {interview.date}
                    </p>

                    <p className="text-sm text-zinc-400">
                      ⏰ {interview.time}
                    </p>

                    <p className="text-sm text-zinc-500 mt-2">
                      Candidate:{" "}
                      {
                        interview.candidateEmail
                      }
                    </p>

                    <div className="pt-2">
                      <span className="text-xs bg-zinc-950 px-2 py-1 rounded-md text-zinc-400 font-mono border border-zinc-850">
                        ID: {interview.roomId}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        handleCopy(
                          interview.roomId
                        )
                      }
                      className="bg-zinc-800 text-zinc-300 px-4 py-3 rounded-xl text-xs"
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
                      className="bg-green-500 text-black px-5 py-3 rounded-xl font-bold text-xs"
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