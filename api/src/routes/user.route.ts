import { Router } from "express";
import { getDashboardData, updateProfile } from "@/controllers/user.controller";
import { isAuthenticated } from "@/middlewares/auth.middleware";

const userRoutes = Router();

userRoutes.get("/dashboard", isAuthenticated, getDashboardData);
userRoutes.patch("/profile", isAuthenticated, updateProfile);

export { userRoutes };
