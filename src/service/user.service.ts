import * as UserRepository from "../repository/user.repository";
// import { IUser, IItem } from "../Repository/User.types";
// const bcrypt = require("bcrypt");

//business logic

// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "kishimotosekai@gmail.com",
//     pass: "onxwqrvgwiwbebwq",
//   },
// });

export const loginUser = async (user: any) => {
  try {
    const data = await UserRepository.loginUser(user);
    //   console.log("At service", data);
    //   if (data && (await bcrypt.compare(user.password, data.password))) {
    //     const user = { userName: data.userName, role: data.role };
    //     const token = jwt.sign(data, process.env.SECRET_KEY);
    //     console.log("this is token", token, { userName: data.userName });
    //     console.log(JSON.stringify(data));
    //     return { token };
    //   } else {
    //     const error = new Error("User does not exist");
    //     error.name = "401";
    //     throw error;
    //   }
  } catch (e) {
    console.log("service", e);
    throw e;
  }
  return "hello";
};
