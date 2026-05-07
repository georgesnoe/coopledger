import type { Request, Response } from "express";
import { prisma } from "utils/prisma";

export async function proposeVote(req: Request, res: Response) {
  const { subject, proposals, endDate } = req.body;

  if (!subject || !proposals || !endDate) {
    return res
      .status(400)
      .json({ message: "Les champs ne sont pas renseignés" });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const vote = await tx.votes.create({
        data: {
          subject: subject as string,
          proposals: proposals as string[],
          endDate: new Date(endDate),
          creatorId: req.session.user.id,
        },
      });

      res.status(201).json(vote);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite" });
  }

  return res.end();
}

export async function castVote(req: Request, res: Response) {
  const { voteId, userId } = req.body;

  if (!voteId || !userId) {
    return res
      .status(400)
      .json({ message: "Les champs ne sont pas renseignés" });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const vote = await tx.votes.findUnique({
        where: {
          id: voteId,
        },
      });

      if (!vote) {
        return res.status(404).json({ message: "Le vote n'existe pas" });
      }

      const voteCast = await tx.voteCasts.create({
        data: {
          voteId: voteId,
          userId: userId,
        },
      });

      res.status(201).json(voteCast);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite" });
  }

  return res.end();
}
