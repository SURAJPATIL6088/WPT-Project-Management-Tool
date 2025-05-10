import express from "express";
import { deleteProject, getProjects, updateProjectById, createProject, getProjectById } from "../controllers/projectController.js";
const router = express.Router();

router.get("/", getProjects);

router.post("/", createProject);

router.put("/:id", updateProjectById);

router.delete("/:id", deleteProject);

router.get("/:id", getProjectById);

export default router;
