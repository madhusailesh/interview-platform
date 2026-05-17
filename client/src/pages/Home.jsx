import { Link, Navigate } from "react-router-dom";

function Home() {
  // Check if user is already logged in
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500 selection:text-black">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-zinc-900 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          InterviewX
        </h1>

        <div className="flex items-center gap-3 md:gap-4">
          <Link
            to="/login"
            className="text-sm md:text-base text-zinc-400 hover:text-white px-4 py-2 rounded-xl transition font-medium"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm md:text-base bg-green-500 px-4 md:px-5 py-2 rounded-xl hover:bg-green-400 text-black font-semibold shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition duration-300"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 md:py-32 overflow-hidden">
        
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black max-w-5xl leading-[1.1] tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
          Real-Time Interview <br className="hidden sm:inline" /> Platform
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg md:text-xl mt-6 max-w-2xl leading-relaxed">
          Conduct technical interviews with video calls, collaborative coding,
          chat, screen sharing, and scheduling — all in one seamless platform.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto px-6 sm:px-0">
          <Link
            to="/signup"
            className="bg-green-500 px-8 py-4 rounded-xl text-base md:text-lg font-semibold hover:bg-green-400 text-black shadow-xl shadow-green-500/10 hover:shadow-green-500/20 transition duration-300 text-center"
          >
            Get Started Free
          </Link>

          <Link
            to="/login"
            className="bg-zinc-900 border border-zinc-800 px-8 py-4 rounded-xl text-base md:text-lg font-semibold hover:bg-zinc-800 hover:border-zinc-700 transition duration-300 text-center"
          >
            Watch Demo
          </Link>
        </div>

        {/* FEATURES SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 w-full max-w-6xl px-2 sm:px-4">
          
          {/* Card 1 */}
          <div className="group bg-zinc-900/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-zinc-900 hover:border-zinc-800/80 hover:bg-zinc-900/60 transition duration-300 text-left">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 mb-5 group-hover:border-green-500/30 transition">
              <span className="text-2xl">🎥</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-zinc-100">
              Video Meetings
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              High-quality real-time video and audio communication powered by WebRTC for lag-free technical evaluations.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-zinc-900/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-zinc-900 hover:border-zinc-800/80 hover:bg-zinc-900/60 transition duration-300 text-left">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 mb-5 group-hover:border-green-500/30 transition">
              <span className="text-2xl">💻</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-zinc-100">
              Collaborative Coding
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Shared Monaco code editor with real-time sync, syntax highlighting, and multi-language support.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-zinc-900/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-zinc-900 hover:border-zinc-800/80 hover:bg-zinc-900/60 transition duration-300 text-left sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 mb-5 group-hover:border-green-500/30 transition">
              <span className="text-2xl">📅</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-zinc-100">
              Easy Scheduling
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Schedule interviews, send automated invites, and manage all your upcoming candidate sessions in one dashboard.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;