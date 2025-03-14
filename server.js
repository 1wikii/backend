import express from "express";
import connection from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

//GET semua post
app.get("/posts", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM posts");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//OST create postingan
app.post("/posts", async (req, res) => {
  const { brand, name, price } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO posts (brand, name, price) VALUES (?, ?, ?)",
      [brand, name, price]
    );
    res.json({ id: result.insertId, brand, name, price});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update posttingan
app.put("/posts/:id", async (req, res) => {
  const { brand, name, price } = req.body;
  const { id } = req.params;
  try {
    await connection.query(
      "UPDATE posts SET brand = ?, name = ?, price = ? WHERE id = ?",
      [brand, name, price, id]
    );
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE posttingan
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM posts WHERE id = ?", [id]);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
