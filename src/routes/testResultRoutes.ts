import { Router } from "express";
import { createTestResult } from "../controllers/testResultController";

const router: Router = Router();

router.post("/add-test-result",createTestResult)

export default router;