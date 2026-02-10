import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bfhlRoutes from "./routes/bfhl.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/bfhl", bfhlRoutes);

app.get("/", (req, res) => {
  res.send("BFHL API is running");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
