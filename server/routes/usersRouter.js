import express from "express";
import UsersController from "../controllers/UsersController.js";
import verifyJwt from "../middlewares/verifyJwt.js";
const router = express();

router.post("/register", UsersController.register);

router.post("/login", UsersController.login);

router.get("/profile", verifyJwt, UsersController.getProfile);

router.get("/me", verifyJwt, UsersController.getMe);

router.post("/logout", verifyJwt, UsersController.logout);

router.get("/refresh-token", UsersController.refreshToken);

export default router;
