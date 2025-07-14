import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import { authorizeUser } from "../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.use(authorizeUser);
router.route("/me").get(getCurrentUser);
router.route("/logout").post(logoutUser);

export default router;
