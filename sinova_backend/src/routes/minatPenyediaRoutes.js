import express from "express";
import multer from "multer";
import { ajukanProposal, getPeminatByKebutuhan, approvePenyedia } from "../controllers/minatPenyediaController.js";
import { authMiddleware, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/proposal",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  authMiddleware,
  checkRole("penyedia"),
  upload.single("file"),
  ajukanProposal
);

router.get(
  "/:kebutuhanId",
  authMiddleware,
  checkRole("pengguna"),
  getPeminatByKebutuhan
);

router.post(
  "/:id/approve",
  authMiddleware,
  checkRole("pengguna", "penyedia"),
  approvePenyedia
);

export default router;
