import express from "express";
import {
  addVaultItem,
  getVaultItems,
  updateVaultItem,
  deleteVaultItem,
} from "../controllers/vaultController.js";

const router = express.Router();

// Create new vault item
router.post("/add", addVaultItem);

// Get all vault items
router.get("/get", getVaultItems); // ✅ matches frontend

// Update existing vault item
router.put("/:id", updateVaultItem);

// Delete vault item
router.delete("/:id", deleteVaultItem);

export default router;
