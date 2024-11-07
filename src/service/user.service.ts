import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { env } from "../config";
import User from "../entities/user.entity";
import { ErrorHandler } from "../config/error.config";
import { IUserRegisterParams } from "../validation/user.validation";

export const loginUser = async (user: any) => {
  try {
    const data = await User.findOne({ userName: user.userName });
    if (data) {
      const isMatch = await bcrypt.compare(
        user.password,
        data.password as string
      );
      if (isMatch) {
        const accessToken = jwt.sign(
          { _id: data._id.toString() },
          env.SECRET_KEY as Secret,
          { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
          { _id: data._id.toString() },
          env.REFRESH_TOKEN_SECRET_KEY as Secret,
          { expiresIn: "30d" }
        );
        return { accessToken, refreshToken };
      } else {
        const error = new ErrorHandler("Incorrect password", 401);
        throw error;
      }
    } else {
      const error = new ErrorHandler("User not found", 404);
      throw error;
    }
  } catch (e) {
    console.log("service", e);
    throw e;
  }
};

export const registerUser = async (user: IUserRegisterParams) => {
  try {
    console.log("success validation");
    const checkUserName = await User.findOne({ userName: user.userName });
    if (checkUserName) {
      const error = new ErrorHandler("Username taken", 409);
      error.name = "userName";
      throw error;
    }
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new User(user);
    console.log("check user name", checkUserName);

    const insertedUser = await newUser.save();
    return {
      success: true,
      message: "User registered successfully",
      data: insertedUser,
    };
  } catch (e) {
    console.log("error in register user", e);
    throw e;
  }
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      env.REFRESH_TOKEN_SECRET_KEY as Secret
    ) as any;
    const data = await User.findOne({ _id: decoded._id });
    if (data) {
      const accessToken = jwt.sign(
        { _id: data._id.toString() },
        env.SECRET_KEY as Secret,
        { expiresIn: "1h" }
      );
      return { accessToken };
    } else {
      const error = new ErrorHandler("User not found", 404);
      throw error;
    }
  } catch (e) {
    throw e;
  }
};
