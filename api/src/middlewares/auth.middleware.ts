import { UserRole } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { prisma } from "@/utils/prisma";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const session = await prisma.sessions.findFirst({
      where: { token, expiresAt: { gte: new Date() } },
      include: { users: true },
    });

    if (!session) {
      return res.status(401).json({ message: "Session not found or expired" });
    }

    req.user = session.users;

    next();
  } catch (error: unknown) {
    console.error("Auth Middleware Error:", error);
    if (error instanceof Error) {
      return res.status(401).json({ message: error.message });
    }

    return res.status(401).json({ message: "Unauthorized" });
  }
}
