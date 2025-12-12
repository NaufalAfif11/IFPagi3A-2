import express from 'express';
import multer from 'multer';
import { fetchKebutuhan, 
         fetchKebutuhanById, 
         addKebutuhan, 
         editKebutuhan, 
         removeKebutuhan, 
         searchKebutuhan, 
         fetchPenyediaByKebutuhan,
         } from '../controllers/kebutuhanController.js';

const upload = multer({ dest: "uploads/" });

const router = express.Router();


router.get("/search", searchKebutuhan);
router.get("/", fetchKebutuhan);
router.get("/:id", fetchKebutuhanById);
router.post("/", upload.single("dokumen"), addKebutuhan);
router.put("/:id", upload.single("dokumen"), editKebutuhan);
router.delete("/:id", removeKebutuhan);
router.get("/:id/penyedia", fetchPenyediaByKebutuhan);


export default router;