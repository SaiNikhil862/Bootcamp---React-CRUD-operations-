import { Router } from "express";

import {
  CreateBootCamps,
  getBootCamp,
  GetBootCamps,
  updateBootCamp,
  deleteBootCamp,
  bootCampPhotoUpload,
} from "../controllers/bootcamp.js";
import { authorize, protect } from "../middlewares/auth.js";
import { Courses } from "./course.js";
let router = Router();

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootCampPhotoUpload);
router.use("/:bootcampId/courses", Courses);
router.route("/").get(GetBootCamps);
router.route("/:id").get(getBootCamp);
router
  .route("/")
  .post(protect, authorize("publisher", "admin"), CreateBootCamps);
router
  .route("/:id")
  .put(protect, authorize("publisher", "admin"), updateBootCamp);
router
  .route("/:id")
  .delete(protect, authorize("publisher", "admin"), deleteBootCamp);

export { router as BootCamp };
