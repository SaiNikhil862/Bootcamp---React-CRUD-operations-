import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Config/index.js"; 
import { asyncHandler } from "../middlewares/async.js";
import { UserModel } from "../Models/User.js";
import { ErrorResponse } from "../uitils/ErrorResponse.js"; 

// Protect Routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }

  try {
    // verify
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

    req.user = await UserModel.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    return next(
      new ErrorResponse("Not authorize to access this route1", 401)
    );
  }
});

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
