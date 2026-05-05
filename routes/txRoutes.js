import express from "express";
import { transfer } from "../controllers/txController.js";

const router = express.Router();

// Transfer funds
router.post("/sendMoney", transfer);

export default router;