import express from "express";
import cors from "cors";
const app = express();
import authRoutes from "./routes/auth.js";
import projectRoutes from './routes/projects.js';
import userRouter from "./routes/user.js";

app.use(cors());
app.use(express.json()); 

app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter);
app.use("/api/projects", projectRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});