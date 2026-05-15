import type { Request, Response } from "express";
import { cloudinary, pinata } from "@/utils/storage";
import {
  generateCoopKey,
} from "@/services/crypto.service";
import { prisma } from "@/utils/prisma";

export async function createCooperative(req: Request, res: Response) {
  const { name, description, founders, latitude, longitude } = req.body;

  if (!req.files) {
    return res.status(400).json({ message: "Missing required files" });
  }

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const logo = files?.logo ? files?.logo[0] : null;
  const statusDocument = files?.status_document[0];
  const proofDocument = files?.proof_document[0];
  const identityDocument = files?.identity_document[0];
  const businessPlanDocument = files?.business_plan_document[0];

  if (
    !name ||
    !description ||
    !founders ||
    !statusDocument ||
    !proofDocument ||
    !identityDocument
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const uploadFile = async (file: Express.Multer.File) => {
      const blob = new Blob([new Uint8Array(file.buffer)]);
      const fileObj = new File([blob], file.filename);
      const result = await pinata.upload.public.file(fileObj);
      return result.cid;
    };

    const [
      statusDocumentCid,
      proofDocumentCid,
      identityDocumentCid,
      businessPlanDocumentCid,
    ] = await Promise.all([
      uploadFile(statusDocument),
      uploadFile(proofDocument),
      uploadFile(identityDocument),
      businessPlanDocument ? uploadFile(businessPlanDocument) : Promise.resolve(null),
    ]);

    const result = await prisma.$transaction(async (tx) => {
      let logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name as string)}&background=random&color=fff&size=128`;
      if (logo) {
        const uploadResult: any = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "cooperatives", public_id: logo.originalname },
              (error, result) => (error ? reject(error) : resolve(result)),
            )
            .end(logo.buffer);
        });
        logoUrl = uploadResult.secure_url;
      }

      const coopKey = generateCoopKey();

      const createdCooperative = await tx.cooperatives.create({
        data: {
          name: name as string,
          description: description as string,
          logo: logoUrl,
          founders: founders as string[],
          latitude: latitude ? Number(latitude) : null,
          longitude: longitude ? Number(longitude) : null,
          encryptionKey: coopKey,
          creatorId: req.user.id,
          statusDocumentIpfsCid: statusDocumentCid,
          proofDocumentIpfsCid: proofDocumentCid,
          identityDocumentIpfsCid: identityDocumentCid,
          businessPlanDocumentIpfsCid: businessPlanDocumentCid,
        },
      });

      await tx.memberships.create({
        data: {
          userId: req.user.id,
          cooperativeId: createdCooperative.id,
          status: "ACCEPTED",
          grade: "ADMIN",
          role: "FARMER",
        },
      });

      return createdCooperative;
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occured" });
  }

  return res.end();
}

export async function getCooperatives(req: Request, res: Response) {
  const { lat, lng, radius = 15 } = req.query;

  try {
    const cooperatives = await prisma.cooperatives.findMany();

    if (lat && lng) {
      const userLat = Number(lat);
      const userLng = Number(lng);
      const rad = Number(radius);

      // Filtrage spatial simple (Haversine serait mieux pour la production)
      const filtered = cooperatives.filter((coop) => {
        if (!coop.latitude || !coop.longitude) return false;
        const dist = Math.sqrt(
          (coop.latitude - userLat) ** 2 + (coop.longitude - userLng) ** 2,
        );
        // Approximation: 1 degré ~= 111km
        return dist * 111 <= rad;
      });
      return res.status(200).json(filtered);
    }

    res.status(200).json(cooperatives);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération" });
  }
}

export async function joinCooperative(req: Request, res: Response) {
  const { cooperativeId } = req.body;

  try {
    await prisma.$transaction(async (tx) => {
      const cooperative = await tx.cooperatives.findUnique({
        where: {
          id: cooperativeId,
        },
      });

      if (!cooperative) {
        return res.status(404).json({ message: "La coopérative n'existe pas" });
      }

      const createdMembership = await tx.memberships.create({
        data: {
          userId: req.user.id,
          cooperativeId: cooperative.id,
          status: "PENDING",
          grade: "MEMBER",
          role: "FARMER",
        },
      });

      res.status(201).json(createdMembership);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite" });
  }

  return res.end();
}

export async function approveCooperativeJoin(req: Request, res: Response) {
  const { cooperativeId, memberId, isApproved } = req.body;

  if (!cooperativeId || !memberId || !isApproved) {
    return res
      .status(400)
      .json({ message: "Les champs ne sont pas renseignés" });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const cooperative = await tx.cooperatives.findUnique({
        where: {
          id: cooperativeId,
        },
      });

      if (!cooperative) {
        return res.status(404).json({ message: "La coopérative n'existe pas" });
      }

      const membership = await tx.memberships.findUnique({
        where: {
          userId_cooperativeId: {
            userId: memberId,
            cooperativeId: cooperativeId,
          },
        },
        include: {
          cooperative: true,
        },
      });

      if (!membership) {
        return res
          .status(404)
          .json({ message: "Le membre n'est pas membre de cette coopérative" });
      }

      await tx.memberships.update({
        where: {
          userId_cooperativeId: {
            userId: memberId,
            cooperativeId: cooperativeId,
          },
        },
        data: {
          status: isApproved
            ? "ACCEPTED"
            : "REJECTED",
        },
      });

      res.status(200).json();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite" });
  }

  return res.end();
}
