import Vault from "../models/vaultModel.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Helper: get userId from token
const getUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("No token provided");

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

// ➕ Add vault item
export const addVaultItem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { title, username, password, url, notes } = req.body;

    if (!title || !username || !password) {
      return res.status(400).json({ message: "Title, username, and password are required" });
    }

    const item = await Vault.create({ userId, title, username, password, url, notes });
    res.status(201).json({ message: "Vault item added", item });
  } catch (error) {
    console.error("Vault Add Error:", error);
    res.status(500).json({ message: "Server error while adding vault item" });
  }
};

// 📦 Get vault items
export const getVaultItems = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const items = await Vault.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error("Vault Get Error:", error);
    res.status(500).json({ message: "Server error while fetching vault items" });
  }
};

// ✏️ Update vault item
export const updateVaultItem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vault item ID" });
    }

    const item = await Vault.findOne({ _id: id, userId });
    if (!item) return res.status(404).json({ message: "Item not found" });

    Object.assign(item, req.body);
    await item.save();

    res.status(200).json({ message: "Vault item updated", item });
  } catch (error) {
    console.error("Vault Update Error:", error);
    res.status(500).json({ message: "Server error while updating vault item" });
  }
};

// ❌ Delete vault item
export const deleteVaultItem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { id } = req.params;

    // Prevent invalid ObjectId crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vault item ID" });
    }

    const deleted = await Vault.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Vault item deleted successfully" });
  } catch (error) {
    console.error("Vault Delete Error:", error);
    res.status(500).json({ message: "Server error while deleting vault item" });
  }
};
