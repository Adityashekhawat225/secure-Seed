import mongoose from "mongoose";

const vaultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }, // encrypted on client
  url: String,
  notes: String,
}, { timestamps: true });

export default mongoose.models.Vault || mongoose.model("Vault", vaultSchema);
