import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth-routes.js";
import studentRoutes from "./routes/student-routes.js";

import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth/", authRoutes);
app.use("/students", studentRoutes);

app.get("/health", (req, res) => {
  res.json({
    api: "Ok",
    status: "Running",
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
