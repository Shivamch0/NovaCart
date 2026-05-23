import { User } from "../model/user.model.js";

// Utils Import
import { ApiResponse } from "../utils/apiResponse.js";
import { asynHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = asynHandler(async (req, res) => {
  const { userName, fullName, email, password } = req.body;
  if (!userName || !fullName || !email || !password) {
    throw new ApiError(400, "Fill all the fields...");
  }

  const existedUser = await User.findOne({ email, userName });
  if (existedUser) {
    throw new ApiError(
      400,
      "User with this email or Username already exists...",
    );
  }

  const user = await User.create({
    userName,
    fullName,
    email: email.toLowerCase(),
    password,
  });

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if(!createdUser){
    throw new ApiError(400 , "Something went wrong while creating user...")
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  return res.status(200)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken" , refreshToken , options)
        .json(new ApiResponse(200 , {user : createdUser } , "User Created Successfully..." ))
});
