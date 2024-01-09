import express from "express";
import routes from "./routes/index"
import { connectDB } from "./database";
import { config } from "dotenv";

const app = express()
config()

app.use('/api/v1/',routes)

connectDB()

app.listen(7000,()=>{console.log("listening at port 7000")})