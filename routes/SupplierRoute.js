import express from "express";
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/Suppliers.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/suppliers", verifyUser, getSuppliers);
router.get("/suppliers/:id", verifyUser, getSupplierById);
router.post("/suppliers", verifyUser, createSupplier);
router.patch("/suppliers/:id", verifyUser, updateSupplier);
router.delete("/suppliers/:id", verifyUser, deleteSupplier);

export default router;
