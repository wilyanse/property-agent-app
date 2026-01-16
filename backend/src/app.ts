// app.ts
import express from "express";
import agentRoutes from "./routes/agent.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use("/agents", agentRoutes);

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// health check to see if server is up and running
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

export default app;
