import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import bfhlRoute from "./routes/bfhl.js";
import healthRoute from "./routes/health.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/bfhl", bfhlRoute);
app.use("/health", healthRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
