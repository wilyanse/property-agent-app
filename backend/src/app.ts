// app.ts
import express from "express";
import agentRoutes from "./routes/agent.routes";
import propertyRoutes from "./routes/property.routes";
import tenantRoutes from "./routes/tenant.routes";
import noteRoutes from "./routes/note.routes";
import cors from "cors";


const app = express();

// Enable CORS
app.use(cors({
  origin: "*", // allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use("/agents", agentRoutes);
app.use("/properties", propertyRoutes);
app.use("/tenants", tenantRoutes);
app.use("/notes", noteRoutes);

// health check to see if server is up and running
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

export default app;
