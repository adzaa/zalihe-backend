import express from "express";
import {
  getSirovine,
  getSirovinaById,
  createSirovina,
  updateSirovina,
  deleteSirovina,
} from "../controllers/Sirovine.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/sirovine", verifyUser, getSirovine);
router.get("/sirovine/:id", verifyUser, getSirovinaById);
router.post("/sirovine", verifyUser, createSirovina);
router.patch("/sirovine/:id", verifyUser, updateSirovina);
router.delete("/sirovine/:id", verifyUser, deleteSirovina);

export default router;
