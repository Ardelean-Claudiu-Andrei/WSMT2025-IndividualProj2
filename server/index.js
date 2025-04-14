const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/items", async (req, res) => {
  const { name, price, stock } = req.body;
  console.log("RECEIVED:", { name, price, stock });
  if (typeof name !== "string" || name.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "Name must be at least 2 characters." });
  }
  if (isNaN(price) || price < 0) {
    return res.status(400).json({ error: "Price must be a positive number." });
  }
  if (!Number.isInteger(stock) || stock < 0) {
    return res
      .status(400)
      .json({ error: "Stock must be a non-negative integer." });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO items (name, price, stock) VALUES (?, ?, ?)",
      [name, price, stock]
    );
    res.status(201).json({ id: result.insertId, name, price, stock });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/items", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM items");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/items/:id", async (req, res) => {
  const { name, price, stock } = req.body;
  const { id } = req.params;

  if (typeof name !== "string" || name.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "Name must be at least 2 characters." });
  }
  if (isNaN(price) || price < 0) {
    return res.status(400).json({ error: "Price must be a positive number." });
  }
  if (!Number.isInteger(stock) || stock < 0) {
    return res
      .status(400)
      .json({ error: "Stock must be a non-negative integer." });
  }

  try {
    const [result] = await db.execute(
      "UPDATE items SET name = ?, price = ?, stock = ? WHERE id = ?",
      [name, price, stock, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ updated: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM items WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ deleted: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
