import { Router } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { getConnection } from "../db.js";

const connection = getConnection();
const secretKey = "team66";

export const registerAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: "Validation Error" });

  const { username, password } = req.body;
  const qry = `SELECT * FROM users WHERE username = '${username}'`;
  connection.query(qry, async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await hash(password, 10);

    connection.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword],
      (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "User registered successfully" });
      }
    );
  });
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const qry = `SELECT * FROM users WHERE username = '${username}'`;

  connection.query(qry, async (err, results) => {
    if (results.length === 0)
      return res.status(400).json({ error: "Invalid credentials" });

    const validPassword = await compare(password, results[0].password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: results[0].id }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  });
};
