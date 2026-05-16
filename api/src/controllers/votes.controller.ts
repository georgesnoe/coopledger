import type { Request, Response } from "express";
import { VoteStatus, type VoteType } from "@/db/enums";
import { prisma } from "@/utils/prisma";
import { emit } from "@/utils/events";

export async function proposeVote(req: Request, res: Response) {
  const {
    subject,
    description,
    proposals,
    endDate,
    type,
    cooperativeId,
    amount,
    beneficiary,
    paymentDeadline,
  } = req.body;

  if (!subject || !proposals || !endDate || !type || !cooperativeId) {
    return res
      .status(400)
      .json({ message: "Les champs obligatoires ne sont pas renseignés" });
  }

  try {
    const vote = await prisma.$transaction(async (tx) => {
      const membership = await tx.memberships.findUnique({
        where: {
          userId_cooperativeId: { userId: req.user.id, cooperativeId },
        },
      });

      if (
        !membership ||
        (membership.grade !== "ADMIN" && membership.grade !== "TREASURER")
      ) {
        throw Object.assign(new Error("Seul le bureau peut proposer un vote"), {
          statusCode: 403,
        });
      }

      const voterCount = await tx.memberships.count({
        where: { cooperativeId, status: "ACCEPTED" },
      });

      return tx.votes.create({
        data: {
          subject: subject as string,
          description: description as string,
          proposals: proposals as string[],
          endDate: new Date(endDate),
          type: type as VoteType,
          cooperativeId,
          amount: amount ? Number(amount) : null,
          beneficiary: beneficiary as string,
          paymentDeadline: paymentDeadline ? new Date(paymentDeadline) : null,
          totalEligibleVoters: voterCount,
          creatorId: req.user.id,
        },
      });
    });

    res.status(201).json(vote);

    emit("vote.proposed", { voteId: vote.id, cooperativeId });
  } catch (error: any) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message });
  }
}

export async function castVote(req: Request, res: Response) {
  const { voteId, choiceIndex } = req.body;

  if (!voteId || choiceIndex === undefined) {
    return res.status(400).json({ message: "ID de vote ou choix manquant" });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const vote = await tx.votes.findUnique({
        where: { id: voteId },
        include: { _count: { select: { VoteCasts: true } } },
      });

      if (!vote || vote.status !== VoteStatus.OPEN) {
        throw Object.assign(new Error("Le vote n'est pas ouvert"), {
          statusCode: 404,
        });
      }

      const membership = await tx.memberships.findUnique({
        where: {
          userId_cooperativeId: {
            userId: req.user.id,
            cooperativeId: vote.cooperativeId,
          },
        },
      });

      if (!membership || membership.status !== "ACCEPTED") {
        throw Object.assign(
          new Error("Vous n'êtes pas membre actif de cette coopérative"),
          { statusCode: 403 },
        );
      }

      const cast = await tx.voteCasts.create({
        data: {
          voteId: voteId,
          userId: req.user.id,
          choiceIndex: choiceIndex,
        },
      });

      await tx.memberships.update({
        where: {
          userId_cooperativeId: {
            userId: req.user.id,
            cooperativeId: vote.cooperativeId,
          },
        },
        data: { lastActiveAt: new Date() },
      });

      let wasApproved = false;

      if (vote._count.VoteCasts + 1 >= vote.totalEligibleVoters) {
        const allCasts = await tx.voteCasts.findMany({
          where: { voteId: voteId },
        });

        const counts = allCasts.reduce((acc: any, cast: any) => {
          acc[cast.choiceIndex] = (acc[cast.choiceIndex] || 0) + 1;
          return acc;
        }, {});

        const winningChoice = Object.keys(counts).reduce((a, b) =>
          counts[Number(a)] > counts[Number(b)] ? a : b,
        );

        await tx.votes.update({
          where: { id: voteId },
          data: { status: VoteStatus.APPROVED },
        });

        wasApproved = true;
      }

      return { cast, wasApproved, voteSubject: vote.subject, voteId: vote.id, cooperativeId: vote.cooperativeId };
    });

    res.status(201).json(result.cast);

    if (result.wasApproved) {
      emit("vote.approved", {
        voteId: result.voteId,
        cooperativeId: result.cooperativeId,
        subject: result.voteSubject,
      });
    }
  } catch (error: any) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message });
  }
}
