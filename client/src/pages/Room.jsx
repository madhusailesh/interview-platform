import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../socket";
import CodeEditor from "../components/CodeEditor";
import Chat from "../components/Chat";
import { 
  Mic, MicOff, Video, VideoOff, Monitor, Copy, LogOut, 
  Code, MessageSquare, Video as VideoIcon 
} from "lucide-react";

function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [activeTab, setActiveTab] = useState("video"); // Mobile switch ("video" | "code" | "chat")

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStream.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        peerConnection.current = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });

        peerConnection.current.ontrack = (event) => {
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
        };

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", { roomId, candidate: event.candidate });
          }
        };

        socket.emit("join-room", roomId);

        socket.on("user-joined", async () => {
          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);
          socket.emit("offer", { roomId, offer });
        });

        socket.on("offer", async (offer) => {
          await peerConnection.current.setRemoteDescription(offer);
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          socket.emit("answer", { roomId, answer });
        });

        socket.on("answer", async (answer) => {
          await peerConnection.current.setRemoteDescription(answer);
        });

        socket.on("ice-candidate", async (candidate) => {
          try {
            await peerConnection.current.addIceCandidate(candidate);
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
        console.log("MEDIA ERROR:", err);
      }
    };

    startVideo();

    return () => {
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [roomId]);

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      const sender = peerConnection.current.getSenders().find((s) => s.track.kind === "video");

      if (sender) sender.replaceTrack(screenTrack);
      if (localVideoRef.current) localVideoRef.current.srcObject = screenStream;

      screenTrack.onended = async () => {
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const cameraTrack = cameraStream.getVideoTracks()[0];
        sender.replaceTrack(cameraTrack);
        if (localVideoRef.current) localVideoRef.current.srcObject = cameraStream;
        localStream.current = cameraStream;
      };
    } catch (err) {
      console.log(err);
    }
  };

  const toggleMute = () => {
    const audioTrack = localStream.current.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsMuted(!audioTrack.enabled);
  };

  const toggleCamera = () => {
    const videoTrack = localStream.current.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsCameraOff(!videoTrack.enabled);
  };

  const copyRoomLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Room link copied!");
  };

  const leaveRoom = () => {
    if (peerConnection.current) peerConnection.current.close();
    socket.disconnect();
    navigate("/");
  };

  return (
    <div className="h-screen w-screen bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden font-sans select-none">
      
      {/* 1. TOP HEADER */}
      <header className="h-14 border-b border-zinc-900 bg-zinc-900/40 backdrop-blur-md flex items-center justify-between px-4 lg:px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <h1 className="text-sm md:text-base font-semibold tracking-wide flex items-center gap-2">
            Live Workspace 
            <span className="text-zinc-600 text-xs font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800/60 hidden sm:inline">
              {roomId}
            </span>
          </h1>
        </div>

        {/* MOBILE NAVIGATION TABS */}
        <div className="flex lg:hidden bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs font-medium">
          <button 
            onClick={() => setActiveTab("video")} 
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${activeTab === "video" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
          >
            <VideoIcon size={14} /> <span className="hidden sm:inline">Videos</span>
          </button>
          <button 
            onClick={() => setActiveTab("code")} 
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${activeTab === "code" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
          >
            <Code size={14} /> <span className="hidden sm:inline">Editor</span>
          </button>
          <button 
            onClick={() => setActiveTab("chat")} 
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${activeTab === "chat" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
          >
            <MessageSquare size={14} /> <span className="hidden sm:inline">Chat</span>
          </button>
        </div>

        <button
          onClick={copyRoomLink}
          className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs md:text-sm px-3 py-1.5 rounded-xl transition"
        >
          <Copy size={14} />
          <span className="hidden sm:inline">Copy Link</span>
        </button>
      </header>

      {/* 2. MAIN HUB (Dynamically calculated viewport height) */}
      <main className="flex-1 flex overflow-hidden min-h-0 relative">
        
        {/* LEFT COMPONENT: VIDEO STREAMS (Perfect aspect-ratio grids) */}
        <div className={`w-full lg:w-[40%] p-4 flex flex-col justify-center gap-4 transition-all duration-300 min-h-0 ${activeTab === "video" ? "flex" : "hidden lg:flex"}`}>
          <div className="w-full h-full grid grid-rows-2 lg:grid-rows-2 lg:grid-cols-1 gap-4 items-center justify-center overflow-y-auto">
            
            {/* LOCAL VIDEO CONTAINER */}
            <div className="relative w-full h-full aspect-video lg:max-h-[42vh] bg-zinc-900 rounded-2xl border border-zinc-800/80 overflow-hidden shadow-xl flex items-center justify-center">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]" // Added mirror effect for user's ease
              />
              <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium border border-zinc-800 text-zinc-300">
                You {isMuted && "• Muted"}
              </div>
              {isCameraOff && (
                <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center text-zinc-500 font-medium text-sm">
                  Camera is off
                </div>
              )}
            </div>

            {/* REMOTE VIDEO CONTAINER */}
            <div className="relative w-full h-full aspect-video lg:max-h-[42vh] bg-zinc-900 rounded-2xl border border-zinc-800/80 overflow-hidden shadow-xl flex items-center justify-center">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium border border-zinc-800 text-zinc-300">
                Remote User
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COMPONENT: CODE EDITOR & CHAT HUB */}
        <div className={`w-full lg:w-[60%] flex flex-col border-l border-zinc-900 bg-zinc-900/10 min-h-0 ${activeTab !== "video" ? "flex" : "hidden lg:flex"}`}>
          
          {/* CODE EDITOR WORKSPACE */}
          <div className={`flex-[3] min-h-0 ${activeTab === "code" || activeTab === "video" ? "flex flex-col" : "hidden lg:flex lg:flex-col"}`}>
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-zinc-900/20 border-b border-zinc-900 text-xs font-semibold text-zinc-400 shrink-0">
              <Code size={14} className="text-blue-500" /> Collaborative Editor
            </div>
            <div className="flex-1 overflow-hidden min-h-0">
              <CodeEditor roomId={roomId} />
            </div>
          </div>

          {/* ROOM CHAT PANEL */}
          <div className={`flex-[2] border-t border-zinc-900 bg-zinc-950/20 min-h-0 ${activeTab === "chat" ? "flex flex-col" : "hidden lg:flex lg:flex-col"}`}>
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-zinc-900/20 border-b border-zinc-900 text-xs font-semibold text-zinc-400 shrink-0">
              <MessageSquare size={14} className="text-purple-500" /> Room Chat
            </div>
            <div className="flex-1 overflow-hidden min-h-0">
              <Chat roomId={roomId} />
            </div>
          </div>

        </div>
      </main>

      {/* 3. STICKY GLOBAL CONTROL BAR (Always visible on all screen sizes, locked at bottom) */}
      <footer className="h-20 bg-zinc-900/90 backdrop-blur-lg border-t border-zinc-900/80 flex items-center justify-center gap-4 px-6 shrink-0 z-20">
        <button
          onClick={toggleMute}
          className={`p-3.5 rounded-xl transition duration-200 shadow-lg ${isMuted ? "bg-red-500 hover:bg-red-600 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50"}`}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <button
          onClick={toggleCamera}
          className={`p-3.5 rounded-xl transition duration-200 shadow-lg ${isCameraOff ? "bg-red-500 hover:bg-red-600 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50"}`}
        >
          {isCameraOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>

        <button
          onClick={startScreenShare}
          className="p-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50 transition duration-200 shadow-lg"
        >
          <Monitor size={20} />
        </button>

        <div className="w-[1px] h-8 bg-zinc-800 mx-2 hidden sm:block" />

        <button
          onClick={leaveRoom}
          className="p-3.5 rounded-xl bg-red-600/10 hover:bg-red-600 border border-red-500/20 text-red-400 hover:text-white transition duration-200 shadow-lg font-medium flex items-center gap-2"
        >
          <LogOut size={20} />
          <span className="hidden sm:inline text-sm">Leave Room</span>
        </button>
      </footer>
      
    </div>
  );
}

export default Room;