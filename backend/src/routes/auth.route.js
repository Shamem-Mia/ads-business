import express from "express";
import {
  login,
  logout,
  signup,
  // updateProfile,
  checkAuth,
  updateCoin,
  getCoinBalance,
  withdraw,
  getAllWithdrawalRequests,
  updateWithdrawalRequest,
  searchUserByPin,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
// import multer from "multer";
const router = express.Router();
// import { v4 as uuidv4 } from "uuid";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const random = uuidv4();
//     cb(null, random + "" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

// router.put(
//   "/update-profile",
//   upload.single("profilePic"),
//   protectRoute,
//   updateProfile
// );
router.get("/check", protectRoute, checkAuth);
router.put("/coin-update", protectRoute, updateCoin);
// router.get("/coin-balance", protectRoute, getCoinBalance);
router.get("/coin-balance", protectRoute, getCoinBalance);

router.post("/withdraw", protectRoute, withdraw);

router.get(
  "/withdrawal-requests",
  protectRoute,
  isAdmin,
  getAllWithdrawalRequests
);

router.put(
  "/withdrawal-requests/:requestId",
  protectRoute,
  updateWithdrawalRequest
);

router.get("/search-user", protectRoute, isAdmin, searchUserByPin);

export default router;
