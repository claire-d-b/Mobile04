import express from "express";
import pg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || "claire",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "diary_app",
  password: process.env.DB_PASSWORD || "",
  port: Number(process.env.DB_PORT) || 5432,
});

// REGISTER USER
app.post("/users/register", async (req, res) => {
  const { login, password } = req.body;

  try {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      "INSERT INTO users(login, password) VALUES($1, $2) RETURNING id, login",
      [login, hashedPassword]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// LOGIN USER
app.post("/users/login", async (req, res) => {
  const { login, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE login = $1",
      [login]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.json({ message: "Login success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
