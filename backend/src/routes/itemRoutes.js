import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create item
router.post("/", async (req, res) => {
  try {
    const { name, price, description, category} = req.body;

    const newItem = await Item.create({
      name,
      price,
      description,
      category,

    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.json({ message: "Item deleted"});
  } catch (error) {
 res.status(500).json({ message: error.message });
  }
});

export default router;
