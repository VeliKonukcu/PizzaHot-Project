const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(cors({ origin: "http://localhost:5173" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/pizzas", async (req, res) => {
  try {
    const pizzas = await fs.readFile("data/pizzas.json", "utf8");
    res.json(JSON.parse(pizzas));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const order = req.body.order;

    if (!order || !order.items || order.items.length === 0) {
      return res.status(400).json({ message: "No data sent." });
    }

    const newOrder = {
      ...order,
      id: Date.now().toString(),
    };

    const orders = await fs.readFile("data/orders.json", "utf8");
    const allOrders = JSON.parse(orders);

    allOrders.push(newOrder);

    await fs.writeFile("data/orders.json", JSON.stringify(allOrders, null, 2));

    res.status(201).json({ message: "Order added!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
