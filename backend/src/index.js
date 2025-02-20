import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Configuration correcte de CORS
app.use(
  cors({
    origin: "https://chatyrandom.netlify.app",
    credentials: true, // Active l’envoi des cookies et tokens
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Autoriser les requêtes OPTIONS automatiquement
app.options("*", cors());

// ✅ Middleware de debug (Affiche la taille du body des requêtes)
app.use((req, res, next) => {
  console.log("📦 Taille du body:", JSON.stringify(req.body).length, "bytes");
  next();
});

// ✅ Routes API
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Gérer le déploiement en production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ✅ Démarrer le serveur
server.listen(PORT, () => {
  console.log(`🚀 Server is running on PORT: ${PORT}`);
  connectDB();
});
