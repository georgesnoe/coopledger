import "dotenv/config";
import { createServer } from "node:http";
import { toNodeHandler } from "better-auth/node";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { FedaPay } from "fedapay";
import morgan from "morgan";
import cron from "node-cron";
import { Server } from "socket.io";
import { env } from "@/config/env";
import {
  TransactionStatus,
  TransactionType,
  VoteStatus,
  VoteType,
} from "@/db/enums";
import { isAuthenticated } from "@/middlewares/auth.middleware";
import { cooperativesRoutes } from "@/routes/cooperatives.route";
import { otpRoutes } from "@/routes/otp.route";
import { paymentsRoutes } from "@/routes/payments.route";
import { userRoutes } from "@/routes/user.route";
import { votesRoutes } from "@/routes/votes.route";
import { auth } from "@/utils/auth";
import { prisma } from "@/utils/prisma";

FedaPay.setApiKey(env.FEDAPAY_SECRET_KEY);
FedaPay.setEnvironment("sandbox");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Cron job to check for expired votes and trigger obligations
cron.schedule("0 * * * *", async () => {
  console.log("[Cron] Checking for expired votes and recurring fees...");
  try {
    // 1. Mark expired votes
    const expiredVotes = await prisma.votes.findMany({
      where: {
        status: VoteStatus.OPEN,
        endDate: { lt: new Date() },
      },
    });

    for (const vote of expiredVotes) {
      await prisma.votes.update({
        where: { id: vote.id },
        data: { status: VoteStatus.EXPIRED },
      });
      console.log(`Vote ${vote.id} marked as EXPIRED`);
    }

    // 2. Handle approved COTISATION obligations
    const approvedCotisations = await prisma.votes.findMany({
      where: {
        status: VoteStatus.APPROVED,
        type: VoteType.COTISATION,
      },
    });

    for (const vote of approvedCotisations) {
      const members = await prisma.memberships.findMany({
        where: {
          cooperativeId: vote.cooperativeId,
          status: "ACCEPTED",
        },
      });

      for (const member of members) {
        const alreadyPaid = await prisma.transactions.findFirst({
          where: {
            userId: member.userId,
            voteId: vote.id,
            status: TransactionStatus.CONFIRMED,
          },
        });

        if (!alreadyPaid) {
          await prisma.transactions.create({
            data: {
              amount: vote.amount || 0,
              type: TransactionType.COTISATION,
              status: TransactionStatus.PENDING,
              userId: member.userId,
              cooperativeId: vote.cooperativeId,
              voteId: vote.id,
            },
          });
        }
      }
    }

    // 3. Handle Recurring Fees
    const recurringFees = await prisma.recurringFees.findMany();
    for (const fee of recurringFees) {
      const members = await prisma.memberships.findMany({
        where: { cooperativeId: fee.cooperativeId, status: "ACCEPTED" },
      });

      for (const member of members) {
        // Simplified: create a pending transaction for the recurring fee every month
        // In production, we would check if the fee for the current month was already paid
        await prisma.transactions.create({
          data: {
            amount: fee.amount,
            type: TransactionType.COTISATION,
            status: TransactionStatus.PENDING,
            userId: member.userId,
            cooperativeId: fee.cooperativeId,
            // No voteId for recurring fees
          },
        });
      }
    }
  } catch (error) {
    console.error("[Cron Error]", error);
  }
});

app.get("/api/governance", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const membership = await prisma.memberships.findFirst({
      where: { userId, status: "ACCEPTED" },
      include: { cooperative: true },
    });

    if (!membership) {
      return res
        .status(404)
        .json({ message: "Aucune coopérative active trouvée" });
    }

    const cooperativeId = membership.cooperativeId;
    const activeVotes = await prisma.votes.findMany({
      where: { cooperativeId, status: "OPEN" },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { VoteCasts: true },
        },
      },
    });

    const finishedVotes = await prisma.votes.findMany({
      where: { cooperativeId, status: { not: "OPEN" } },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        _count: {
          select: { VoteCasts: true },
        },
      },
    });

    res.json({
      cooperative: membership.cooperative,
      activeVotes,
      finishedVotes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des données de gouvernance",
    });
  }
});
app.use("/api/auth/whatsapp", otpRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/cooperatives", cooperativesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/votes", votesRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  console.error("Unhandled error:", err);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

io.on("connection", (_) => {
  console.log("A user connected");
});

server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

export { io };
export default app;
