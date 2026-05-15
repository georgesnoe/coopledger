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
    // Manually set the session token header that better-auth expects
    // better-auth often looks for the session token in the cookies or a specific header
    const session = await auth.api.getSession({
      headers: {
        ...fromNodeHeaders(req.headers),
        "better-auth.session-token": token,
      },
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    req.session = session;

    next();
  } catch (error: unknown) {
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
