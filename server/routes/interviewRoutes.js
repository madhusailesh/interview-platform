import express from "express";

import {
  createInterview,
  getInterviews,
  updateInterviewStatus,
} from "../controllers/interviewController.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  createInterview
);

// GET
router.get(
  "/",
  getInterviews
);

// UPDATE STATUS
router.put(
  "/:id/status",
  updateInterviewStatus
);

export default router;