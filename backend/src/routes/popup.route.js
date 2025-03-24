import express from "express";
import {
  generatePopups,
  getPopups,
  popupVisibility,
} from "../controllers/popup.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/popups", protectRoute, getPopups);

router.post("/popups", protectRoute, generatePopups);
router.put("/popups/:id", protectRoute, popupVisibility);

export default router;
