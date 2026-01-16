// app.ts
import express from "express";
import agentRoutes from "./routes/agent.routes";
import cors from "cors";


const app = express();

// Enable CORS
app.use(cors({
  origin: "*", // allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use("/agents", agentRoutes);

// health check to see if server is up and running
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

export default app;
