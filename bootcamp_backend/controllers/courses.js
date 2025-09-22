import { CourseModel } from "../Models/CourseModel.js";

import { asyncHandler } from "../middlewares/async.js";
import { BootCampModel } from "../Models/BootCamp.js";
import { ErrorResponse } from "./../uitils/ErrorResponse.js";
/*@Desc GET ROUTES
  @ACCESS PUBLIC
  @ROUTE '/api/v1/bootcamps/:bootcampId/courses'
*/

export let getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = CourseModel.find({
      bootcamp: req.params.bootcampId,
    });
  } else {
    query = CourseModel.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }
  const courses = await query;
  res.status(200).json({
    success: true,
    message: "fetch courses",
    data: courses,
    count: courses.length,
  });
});

/*@Desc POST ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/bootcamps/:bootcampId/courses'
*/

export let CreateCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  console.log(req.body.bootcamp);
  console.log(req.params)
  const bootcamp = await BootCampModel.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`no bootcamp with id of ${req.params.bootcampId}`, 404)
    );
  }
  let course = await CourseModel.create(req.body);
  res.status(201).json({
    success: true,
    message: "created new course",
    data: course,
  });
});

export let updateCourse = asyncHandler(async (req, res, next) => {
  let course = await CourseModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    return next(new ErrorResponse(`course not found`, 404));
  }
  res.status(201).json({ success: true, data: course });
});

/*@Desc DELETE ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/bootcamp/id'
*/

export let deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await CourseModel.findById(req.params.id, {
    runValidators: true,
  });
  if (!course) {
    return next(new ErrorResponse(`course not found`, 404));
  }
  await course.remove();
  res.status(200).json({ success: true, data: {} });
});
