import {
  approveCooperativeJoin,
  createCooperative,
  getCooperatives,
  getCooperativeMembers,
  getMyMembership,
  joinCooperative,
} from "@/controllers/cooperatives.controller";
import { Router } from "express";
import {
  isAuthenticated,
  isPlatformAdmin,
} from "@/middlewares/auth.middleware";
import { upload } from "@/utils/upload";

const cooperativesRoutes = Router();

cooperativesRoutes.post(
  "/create",
  upload.fields([
    { name: "status_document", maxCount: 1 },
    { name: "proof_document", maxCount: 1 },
    { name: "identity_document", maxCount: 1 },
    { name: "business_plan_document", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  isAuthenticated,
  createCooperative,
);
cooperativesRoutes.get("/", isAuthenticated, getCooperatives);
cooperativesRoutes.get("/:id/members", isAuthenticated, getCooperativeMembers);
cooperativesRoutes.get("/:id/membership/me", isAuthenticated, getMyMembership);
cooperativesRoutes.post("/join", isAuthenticated, joinCooperative);
cooperativesRoutes.post(
  "/join/approve",
  isAuthenticated,
  isPlatformAdmin,
  approveCooperativeJoin,
);

export { cooperativesRoutes };
