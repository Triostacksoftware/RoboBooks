import express from "express";
import { getAllCmsSections, getCmsSection } from "../controllers/cmsController.js";

const router = express.Router();

router.get("/", getAllCmsSections);
router.get("/:section", getCmsSection);

export default router;
