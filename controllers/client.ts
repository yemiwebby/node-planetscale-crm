import { validationResult } from "express-validator";
import { ErrorResponse, formatErrorResponse } from "../utility/validator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const index = async (req, res) => {
  const clients = await prisma.client.findMany({
    include: { primaryContact: true },
  });
  res.render("clients/index", { title: "All Clients", clients });
};

export const create = (req, res) => {
  res.render("clients/create", { title: "New Client" });
};

export const store = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorResponse = formatErrorResponse(errors.array() as ErrorResponse[]);
    res.render("clients/create", {
      title: "New Client",
      errors: errorResponse,
      values: req.body,
    });
  } else {
    const {
      clientName: name,
      isCorporate,
      yearFounded,
      contactName,
      contactPhoneNumber,
      contactEmailAddress,
    } = req.body;

    await prisma.client.create({
      data: {
        name,
        isCorporate: isCorporate === "on",
        yearFounded,
        primaryContact: {
          create: {
            name: contactName,
            phoneNumber: contactPhoneNumber,
            emailAddress: contactEmailAddress,
          },
        },
      },
    });

    res.redirect("/clients");
  }
};

export const destroy = async (req, res) => {
  const { id } = req.params;
  await prisma.client.delete({
    where: {
      id: +id,
    },
  });
  res.redirect("/clients");
};
