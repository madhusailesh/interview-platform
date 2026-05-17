import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   MONGODB CONNECTION
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

/* =========================
   AUTH ROUTES
========================= */

app.use("/api/auth", authRoutes);

/* =========================
   HTTP SERVER
========================= */

const server = http.createServer(app);

/* =========================
   SOCKET.IO
========================= */

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // JOIN ROOM
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    console.log(`${socket.id} joined ${roomId}`);

    socket.to(roomId).emit(
      "user-joined",
      socket.id
    );
  });

  // OFFER
  socket.on("offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("offer", offer);
  });

  // ANSWER
  socket.on("answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("answer", answer);
  });

  // ICE CANDIDATE
  socket.on(
    "ice-candidate",
    ({ roomId, candidate }) => {
      socket
        .to(roomId)
        .emit("ice-candidate", candidate);
    }
  );

  // CODE EDITOR
  socket.on(
    "code-change",
    ({ roomId, code }) => {
      socket
        .to(roomId)
        .emit("receive-code", code);
    }
  );

  // CHAT
  socket.on(
    "send-message",
    ({ roomId, data }) => {
      socket
        .to(roomId)
        .emit("receive-message", data);
    }
  );

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

/* =========================
   SERVER START
========================= */

server.listen(5000, () => {
  console.log("Server running on port 5000");
});