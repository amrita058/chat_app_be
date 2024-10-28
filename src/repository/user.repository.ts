import { ObjectId } from "mongodb";
const { MongoClient } = require("mongodb");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
import User from "../models/user.model";

//connection to database
// const client = new MongoClient(uri);
// const database = client.db("webdevelopment");

export const loginUser = async (user: any) => {
  try {
    // const users = database.collection("users");
    const data = await User.findOne({ userName: user.userName });
    console.log("At repo", data);
    return data;
  } catch (e) {
    console.log("catch", e);
    throw e;
  }
};
