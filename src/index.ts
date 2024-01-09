import express from "express";
import routes from "./routes/index"

const app = express()

app.use('/api/v1/',routes)

app.listen(7000,()=>{console.log("listening at port 7000")})