import { Router } from "express";
import {
  CreateCourse,
  deleteCourse,
  updateCourse,
} from "../controllers/courses.js";
import { getCourses } from "./../controllers/courses.js";
let router = Router({ mergeParams: true });
router.route("/").get(getCourses).post(CreateCourse);
router.route("/:id").get(getCourses).put(updateCourse).delete(deleteCourse);

export { router as Courses };
