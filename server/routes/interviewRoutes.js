import express from "express";

import {
  createInterview,
  getInterviews,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/", createInterview);

router.get("/", getInterviews);

export default router;