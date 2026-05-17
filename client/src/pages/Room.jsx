import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import CodeEditor from "../components/CodeEditor";
function Room() {
  const { roomId } = useParams();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const peerConnection = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localVideoRef.current.srcObject = stream;

      peerConnection.current = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });

      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });

      peerConnection.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            roomId,
            candidate: event.candidate,
          });
        }
      };

      // JOIN ROOM
      socket.emit("join-room", roomId);

      // USER JOINED
      socket.on("user-joined", async () => {
        const offer = await peerConnection.current.createOffer();

        await peerConnection.current.setLocalDescription(offer);

        socket.emit("offer", {
          roomId,
          offer,
        });
      });

      // RECEIVE OFFER
      socket.on("offer", async (offer) => {
        await peerConnection.current.setRemoteDescription(offer);

        const answer = await peerConnection.current.createAnswer();

        await peerConnection.current.setLocalDescription(answer);

        socket.emit("answer", {
          roomId,
          answer,
        });
      });

      // RECEIVE ANSWER
      socket.on("answer", async (answer) => {
        await peerConnection.current.setRemoteDescription(answer);
      });

      // RECEIVE ICE CANDIDATES
      socket.on("ice-candidate", async (candidate) => {
        try {
          await peerConnection.current.addIceCandidate(candidate);
        } catch (err) {
          console.log(err);
        }
      });
    };

    startVideo();

    return () => {
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [roomId]);

  return (
    <div className="h-screen bg-zinc-950 flex">
    
    {/* LEFT SIDE */}
    <div className="w-1/2 flex flex-col gap-4 p-4">
      
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        className="h-1/2 w-full rounded-xl border border-zinc-700 object-cover"
      />

      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="h-1/2 w-full rounded-xl border border-zinc-700 object-cover"
      />
    </div>

    {/* RIGHT SIDE */}
    <div className="w-1/2 h-full border-l border-zinc-800">
      <CodeEditor roomId={roomId} />
    </div>
  </div>
  );
}

export default Room;