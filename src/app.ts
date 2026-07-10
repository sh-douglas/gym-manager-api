import express from "express";
import cors from "cors";

import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    api: "Ok",
    status: "Running",
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
