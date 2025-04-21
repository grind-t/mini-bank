import express from "express";
import { authMiddleware } from "#app/auth/middleware.ts";
import { clientMiddleware } from "#app/client/middleware.ts";
import { trpcMiddleware } from "#app/trpc/middleware.ts";
import { env } from "process";

const app = express();
app.set("trust proxy", true);
app.use("/auth", authMiddleware);
app.use("/trpc", trpcMiddleware);
app.use(clientMiddleware);
app.listen(env.PORT);
