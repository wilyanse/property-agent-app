// app.ts
import express from "express";
import agentRoutes from "./routes/agent.routes";

const app = express();
app.use(express.json());
app.use("/agents", agentRoutes);

// health check to see if server is up and running
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

export default app;
