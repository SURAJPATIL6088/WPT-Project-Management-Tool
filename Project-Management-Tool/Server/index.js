import express from "express";
import cors from "cors";
const app = express();
import authRoutes from "./routes/auth.js";

app.use(cors());
app.use(express.json()); 

app.use("/api/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});