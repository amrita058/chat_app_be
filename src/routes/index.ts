import { Router } from "express";
import userRoutes from "./user.route";
// import postRoutes from "./postRoutes";

const router = Router();

router.use("/users", userRoutes);
// router.use('/posts',postRoutes)

export default router;
