import express from "express";
import { deleteProject, getProjects, updateProject, createProject, getProjectById, assignedProjects } from "../controllers/projectController.js";
import {verifyToken} from '../middleware/verifyToken.js';
const router = express.Router();

router.get("/", verifyToken, getProjects);

router.post("/", verifyToken, createProject);

router.put("/:id", updateProject);

router.delete("/:id", verifyToken, deleteProject);

router.get("/:id", verifyToken, getProjectById);

router.get('/user/assigned', verifyToken, assignedProjects);

export default router;
