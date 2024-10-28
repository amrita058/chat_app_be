import mongoose from "mongoose";
import { env } from "./config";

export const connectDB = async () => {
  if (env.URI != undefined) {
    try {
      await mongoose.connect(env.URI);
    } catch (err: any) {
      console.log("not connected", err);
    }
    mongoose.connection.on("open", () => {
      console.log("connection open");
    });
    mongoose.connection.on("error", (err) => {
      console.error("Connection error:", err);
    });
  } else {
    console.log("not connected");
  }
};
