import { asyncHandler } from "../middlewares/async.js";
import path from "path";
import { BootCampModel } from "../Models/BootCamp.js";
import { ErrorResponse } from "./../uitils/ErrorResponse.js";
import { MAX_PHOTO_UPLOAD, PHOTO_UPLOAD } from "./../Config/index.js";
/*@Desc GET ROUTES
  @ACCESS PUBLIC
  @ROUTE '/api/v1/bootcamp'
*/
export let GetBootCamps = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify(req.query);
  let reqQuery = { ...req.query };
  let removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach(param => delete reqQuery[param]);

  queryStr = queryStr.replace(/\b(gtr|gte|lt|lte|in)\b/g, match => `$${match}`);
  query = BootCampModel.find(JSON.parse(queryStr)).populate("courses");
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await BootCampModel.countDocuments();
  query.skip(startIndex).limit(limit);

  let bootcamps = await query;
  //pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});

/*@Desc POST ROUTES
  @ACCESS PUBLIC
  @ROUTE '/api/v1/bootcamp/id'
*/

export let getBootCamp = asyncHandler(async (req, res, next) => {
  let bootCamp = await BootCampModel.findById(req.params.id);
  if (!bootCamp) {
    return next(new ErrorResponse(`Bootcamp not found`, 404));
  }
  res.status(200).json({ success: true, data: bootCamp });
});

/*@Desc POST ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/bootcamp'
*/
export let CreateBootCamps = asyncHandler(async (req, res, next) => {
  let bootcamp = await BootCampModel.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "created new Bootcamp", data: bootcamp });
});

/*@Desc PUT ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/bootcamp/id'
*/

export let updateBootCamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await BootCampModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found`, 404));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

/*@Desc DELETE ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/bootcamp/id'
*/

export let deleteBootCamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await BootCampModel.findById(req.params.id, {
    runValidators: true,
  });
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found`, 404));
  }
  bootcamp.remove();
  res.status(200).json({ success: true, data: {} });
});

export let bootCampPhotoUpload = asyncHandler(async (req, res, next) => {
  let bootcamp = await BootCampModel.findById(req.params.id, {
    runValidators: true,
  });
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found`, 404));
  }
  if (!req.files) {
    return next(new ErrorResponse(`please upload file`), 400);
  }
  let file = req.files.photo;
  console.log(file);
  if (!file.mimetype.startsWith("image")) {
    return next(
      new ErrorResponse(`Please upload a image file ex: png , jpg`, 400)
    );
  }
  if (file.size > MAX_PHOTO_UPLOAD) {
    new ErrorResponse(
      `Please upload a image less than ${MAX_PHOTO_UPLOAD}`,
      400
    );
  }
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  file.mv(`${PHOTO_UPLOAD}/${file.name}`, async err => {
    if (err) {
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
    await BootCampModel.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(201).json({ success: true, data: file.name });
  });
});
