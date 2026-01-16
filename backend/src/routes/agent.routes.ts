// routes/agent.routes.ts
import express from "express";
import * as agentService from "../services/agent.service";

const router = express.Router();

router.post("/", (req, res) => {
  const agent = agentService.createOrUpdateAgent(req.body);
  res.status(201).json(agent);
});

router.get("/", (_, res) => {
  res.json(agentService.getAllAgents());
});

router.get("/:id", (req, res) => {
  const agent = agentService.getAgentById(req.params.id);
  if (!agent) return res.status(404).json({ message: "Not found" });
  res.json(agent);
});

router.delete("/:id", (req, res) => {
  const deleted = agentService.deleteAgent(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.status(204).send();
});

export default router;
