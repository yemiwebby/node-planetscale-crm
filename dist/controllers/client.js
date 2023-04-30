"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.store = exports.create = exports.index = void 0;
const express_validator_1 = require("express-validator");
const validator_1 = require("../utility/validator");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clients = yield prisma.client.findMany({
        include: { primaryContact: true },
    });
    res.render("clients/index", { title: "All Clients", clients });
});
exports.index = index;
const create = (req, res) => {
    res.render("clients/create", { title: "New Client" });
};
exports.create = create;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorResponse = (0, validator_1.formatErrorResponse)(errors.array());
        res.render("clients/create", {
            title: "New Client",
            errors: errorResponse,
            values: req.body,
        });
    }
    else {
        const { clientName: name, isCorporate, yearFounded, contactName, contactPhoneNumber, contactEmailAddress, } = req.body;
        yield prisma.client.create({
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
});
exports.store = store;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.client.delete({
        where: {
            id: +id,
        },
    });
    res.redirect("/clients");
});
exports.destroy = destroy;
