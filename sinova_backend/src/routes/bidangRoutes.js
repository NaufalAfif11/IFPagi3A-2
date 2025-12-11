import express from "express";
import { getAllBidang } from "../controllers/bidangController.js";

const router = express.Router();

router.get("/", getAllBidang);

export default router;
