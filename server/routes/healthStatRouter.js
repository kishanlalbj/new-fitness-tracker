import express from "express";
import HealthStatController from "../controllers/HealthStatController.js";
import verifyJwt from "../middlewares/verifyJwt.js";
const router = express();

router.post("/", verifyJwt, HealthStatController.addStats);

router.get("/", verifyJwt, HealthStatController.getStats);

export default router;
