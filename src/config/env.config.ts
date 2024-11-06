import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.URI,
  SECRET_KEY: process.env.SECRET_KEY,
};
