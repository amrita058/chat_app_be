import Enquirer from "enquirer";
import { IUser, userSchema } from "./validators";
import User from "./models/user.model";
import { config } from "dotenv";
import mongoose from "mongoose";

const enquirer = new Enquirer();

config();

const createAdmin = async () => {
  if (process.env.URI != undefined) {
    await mongoose.connect(process.env.URI);
    mongoose.connection.on("open", () => {
      console.log("connected");
    });
  } else {
    console.log("not connected");
  }

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
    password: (password as any).password,
  };

  const parsedUser = userSchema.safeParse(promptUser);

  if (!parsedUser.success) {
    parsedUser.error.issues.forEach((issue) => {
      console.log(`Message: ${issue.message}`);
    });
  } else {
    //CONNECTION TO DATABASE
    const user = new User(promptUser);
    try {
      await user.save();
    } catch (err) {}
  }
};

createAdmin();
