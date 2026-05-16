import { Router } from "express";
import {
  initiatePayment,
  paymentCallback,
} from "@/controllers/payments.controller";
import { isAuthenticated } from "@/middlewares/auth.middleware";

const paymentsRoutes = Router();

paymentsRoutes.post("/initiate", isAuthenticated, initiatePayment);
paymentsRoutes.post("/callback", paymentCallback);

export { paymentsRoutes };
