import { Router } from "express";
import * as UserController from "../controller/user.controller";
import {
  validateLoginSchema,
  validateRegisterSchema,
} from "../middleware/validateUser.middleware";
import { verifyJwt } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", validateLoginSchema, UserController.loginUser);
router.post("/register", validateRegisterSchema, UserController.registerUser);
router.post("/refresh", UserController.refreshToken);
router.get("/", verifyJwt, (req, res) => {
  res.send("Hello from user route");
});

export default router;
