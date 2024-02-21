import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./model/mongoDB.js";

import customersRoutes from "./routes/routes.js";
import ticketsRoutes from "./routes/routes.js";
// ... other imports

const app = express();
const port = 3001;

import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    // origin: "http://localhost:3000", // Update with your client's URL
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

app.use(cors());
app.use(express.json());

app.use(customersRoutes);
app.use(ticketsRoutes);

// ... other route usages

// Socket.io setup and other configurations
// ...

server.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  try {
    await connectDB();
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed", err);
  }
});
