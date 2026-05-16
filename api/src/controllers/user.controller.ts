import type { Request, Response } from "express";
import { prisma } from "@/utils/prisma";

export const getDashboardData = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        memberships: {
          where: { status: "ACCEPTED" },
          include: {
            cooperative: true,
          },
        },
        transactions: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Calcul du solde (somme des cotisations - somme des retraits)
    const confirmedTransactions = await prisma.transactions.findMany({
      where: {
        userId: userId,
        status: "CONFIRMED",
      },
    });

    const balance = confirmedTransactions.reduce((acc, tx) => {
      if (tx.type === "COTISATION") return acc + tx.amount;
      if (tx.type === "RETRAIT") return acc - tx.amount;
      return acc;
    }, 0);

    const dashboardData = {
      balance,
      currency: "FCFA",
      cooperatives: user.memberships.map((m) => m.cooperative),
      transactions: user.transactions,
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Erreur Dashboard:", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des données du dashboard",
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, phoneNumber } = req.body;
  const userId = req.user.id;

  try {
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        name: name ? name : undefined,
        phoneNumber: phoneNumber ? phoneNumber : undefined,
      },
    });

    res.status(200).json({
      message: "Profil mis à jour avec succès",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erreur Update Profile:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du profil" });
  }
};
