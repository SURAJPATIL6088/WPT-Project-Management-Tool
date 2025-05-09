import express from "express";
import { getConnection } from "../db.js";
import jwt from "jsonwebtoken";
const router = express.Router();

const secretKey = "team66";
const connection = getConnection();

router.get("/", (req, res) => {
  const qry = `SELECT * FROM projects`;
  connection.query(qry, (err, results) => {
    if (err) {
      console.error("Error fetching projects:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { name, description } = req.body;

  const token = req.headers.authorization?.split(' ')[1];
  //console.log("server user token : ", token);

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }
  
  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId; 
    //console.log("decoded  ",decoded);
    //console.log("userId  ",userId);
    //console.log("server user id : ",userId);

    if (!name || !description || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = "INSERT INTO projects (name, description, created_by) VALUES (?, ?, ?)";
    connection.query(sql, [name, description, userId], (err, result) => {
      if (err) {
        console.error("Error creating project:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({
        id: result.insertId,
        name,
        description,
        created_by: userId,
      });
    });
  } catch (err) {
    console.error('Error decoding token:', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const sql = "UPDATE projects SET name = ?, description = ? WHERE id = ?";
  connection.query(sql, [name, description, id], (err, result) => {
    if (err) {
      console.error("Error updating project:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ id, name, description });
  });
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM projects WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting project:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Project deleted successfully" });
  });
});

export default router;
