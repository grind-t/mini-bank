import express from "express";
import path from "path";

export const clientMiddleware = express.static(
  path.join(import.meta.dirname, "build")
);
