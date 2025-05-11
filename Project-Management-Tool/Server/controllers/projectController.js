import express from "express";
import { getConnection } from "../db.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { header } from "express-validator";

const secretKey = "team66";
const connection = getConnection();

export function getProjects(req, res) {
  try {
    const userId = req.userId;
    const sql = `SELECT * FROM projects where created_by=${userId}`;
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

export function updateProject(req, res) {
  try {
    const id = req.params.id;
    const { name, description, assigned_to, deadline, status } = req.body;
    const sql = `
      UPDATE projects 
      SET name = ?, description = ?, assigned_to = ?, deadline = ?, status = ?
      WHERE id = ?`;

    connection.query(
      sql,
      [name, description, assigned_to || null, deadline || null, status, id],
      (err, result) => {
        if (err) {
          console.error("Error updating project:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.json({
          id,
          name,
          description,
          assigned_to,
          deadline,
          status,
        });
      }
    );
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
  const { name, description, deadline } = req.body;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;

    if (!name || !description || !deadline) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `insert into projects(name, description, created_by, deadline) values(?, ?, ?, ?)`;
    connection.query(
      sql,
      [name, description, userId, deadline],
      (error, result) => {
        if (error) {
          console.error("Error creating project:", error);
          return res.status(500).json({ error: "Database error" });
        }

        res.json({
          id: result.insertId,
          name,
          description,
          created_by: userId,
          deadline,
          status: "pending",
        });
      }
    );
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
        console.error("Error fetching projects:", error);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ error: "Database error" });
      }
      console.log(result);
      res.status(StatusCodes.OK).json(result[0]);
    });
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "something went wrong" });
  }
}

export function assignedProjects(req, res) {
  try {
    const userId = req.userId;

    const sql = `
      SELECT p.id, p.name, p.description, p.deadline, p.status, u.username 
      FROM projects p 
      INNER JOIN users u ON u.id = p.assigned_to 
      WHERE p.assigned_to = ${userId}
    `;

    connection.query(sql, (error, result) => {
      if (error) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Database Error" });
      }
      res.json({ result: result });
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "something went wrong" });
  }
}

