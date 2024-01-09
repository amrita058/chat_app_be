import Enquirer from "enquirer";
import { IUser, userSchema } from "./validators";
import User from "./models/user.model";
import { config } from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const enquirer = new Enquirer();

config();

const createAdmin = async () => {
  //CONNECTION TO DATABASE
  if (process.env.MONGODB_URI != undefined) {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on("open", () => {
      console.log("connected");
    });
  } else {
    console.log("not connected");
  }

  //GET ADMIN CREDENTIALS
  const username = await enquirer.prompt({
    type: "input",
    name: "username",
    message: "Enter the admin username",
  });

  const password = await enquirer.prompt({
    type: "password",
    name: "password",
    message: "Enter the admin password",
  });

  const email = await enquirer.prompt({
    type: "input",
    name: "email",
    message: "Enter the email",
  });

  const promptUser: IUser = {
    userName: (username as any).username,
    email: (email as any).email,
    password: await bcrypt.hash((password as any).password, 10),
  };

  const parsedUser = userSchema.safeParse(promptUser);

  if (!parsedUser.success) {
    parsedUser.error.issues.forEach((issue) => {
      console.log(`Message: ${issue.message}`);
    });
  } else {
    //ADD ADMIN TO DATABASE
    const user = new User(promptUser);
    try {
      await user.save();
      console.log("Admin successfully created");
      process.exit();
    } catch (err: any) {
      if (err.message.includes("duplicate key error")) {
        if (err.message.includes("userName")) {
          console.log(`Username  is already taken.`);
        } else {
          console.log("Email is already in use");
        }
      } else console.log(err.message);
      process.exit();
    }
  }
};

createAdmin();
