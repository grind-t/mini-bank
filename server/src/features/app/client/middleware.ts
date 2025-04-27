import express from "express";
import type { Request, Response, NextFunction } from "express";
import path from "path";

const buildPath = path.join(import.meta.dirname, "build");
const indexPath = path.join(buildPath, "index.html");

export const clientMiddleware = [
  express.static(buildPath),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "GET") {
      res.sendFile(indexPath);
    } else {
      next();
    }
  },
];
