import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://chatyrandom.netlify.app"],
  },
});

// Stocke les utilisateurs connectés { userId: socketId }
const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("✅ Un utilisateur connecté :", socket.id);

  // Récupère l'ID de l'utilisateur depuis la requête
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // Envoie la liste des utilisateurs en ligne
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Gestion de l'envoi de message
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    console.log(`📩 Message de ${senderId} à ${receiverId} :`, message);

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        senderId,
        message,
      });
      console.log(`✅ Message envoyé à ${receiverId} (socket: ${receiverSocketId})`);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Un utilisateur s'est déconnecté :", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
