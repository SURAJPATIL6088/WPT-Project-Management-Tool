import express from "express";
import { getConnection } from "../db.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const secretKey = "team66";
const connection = getConnection();

export function getProjects(req, res) {
  try {
    const sql = `SELECT * FROM projects`;
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching projects:", err);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ error: "Database error" });
      }
      res.send({ results });
    });
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "something went wrong" });
  }
}

export function updateProjectById(req, res) {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const sql = "UPDATE projects SET name = ?, description = ? WHERE id = ?";
    connection.query(sql, [name, description, id], (err, result) => {
      if (err) {
        console.error("Error updating project:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ id, name, description });
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "something went wrong" });
  }
}

export function deleteProject(req, res) {
  try {
    const id = req.params.id;
    const sql = `delete from projects where id=${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.error("Error deleting project:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Project deleted successfully" });
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "something went wrong" });
  }
}

export function createProject(req, res) {
  const { name, description } = req.body;

  const token = req.headers.authorization?.split(" ")[1];
  //console.log("server user token : ", token);

  if (!token) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;
    //console.log("decoded  ",decoded);
    //console.log("userId  ",userId);
    //console.log("server user id : ",userId);

    if (!name || !description || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sql =
      "INSERT INTO projects (name, description, created_by) VALUES (?, ?, ?)";
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
    console.error("Error decoding token:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function getProjectById(req, res) {
  try {
    const id = req.params.id;
    const sql = `select * from projects where id=${id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        console.error("Error fetching projects:", err);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ error: "Database error" });
      }
      res.status(StatusCodes.OK).json(result[0]);
    });
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "something went wrong" });
  }
}
