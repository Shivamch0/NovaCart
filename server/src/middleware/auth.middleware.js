import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(400, "Unauthorized request: Token missing...");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken || !decodedToken._id) {
      throw new ApiError(400, "Invalid token. Please log in again.");
    }

    const user = await User.findById(decodedToken._id).select(
      " -password -refreshToken",
    );
    if (!user) {
      throw new ApiError(400, "Invalid access token: user not found...");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token expired. Please refresh token.");
    }
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid token. Please log in again.");
    }

    throw new ApiError(401, "Unauthorized. Please log in.");
  }
});
