import { fromNodeHeaders } from "better-auth/node";
import { UserRole } from "@/db/enums";
import type { NextFunction, Request, Response } from "express";
import { auth } from "@/utils/auth";
import { prisma } from "@/utils/prisma";

declare global {
  namespace Express {
    interface Request {
      session: typeof auth.$Infer.Session;
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
    // better-auth's getSession expects a request object. 
    // We wrap the existing request and ensure the session token is where it expects it.
    const session = await auth.api.getSession({
      headers: {
        ...fromNodeHeaders(req.headers),
        "authorization": `Bearer ${token}`,
        "better-auth.session-token": token,
      },
    });

    if (!session) {
      return res.status(401).json({ message: "Session not found or expired" });
    }

    req.session = session;

    next();
  } catch (error: unknown) {
    console.error("Auth Middleware Error:", error);
    if (error instanceof Error) {
      return res.status(401).json({ message: error.message });
    }

    return res.status(401).json({ message: "Unauthorized" });
  }
}

export async function isPlatformAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isAdmin = await prisma.users.findUnique({
    where: {
      id: user.id,
      role: UserRole.ADMIN,
    },
  });

  if (!isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}
