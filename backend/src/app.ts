import express from "express";
import cors from "cors";
import { createRoutes } from "./routes";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(createRoutes());

  app.get("/health-check", (req, res) => res.json({ ok: true }));

  return app;
}