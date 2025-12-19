import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  updateJobStatus
} from "../controllers/jobController.js";

const router = express.Router();

router.route("/")
  .post(protect, createJob)
  .get(protect, getJobs);

router.route("/:id")
  .patch(protect, updateJob)
  .delete(protect, deleteJob);

router.patch("/:id/status", protect, updateJobStatus);

export default router;
