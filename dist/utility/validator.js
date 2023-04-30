"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrorResponse = exports.clientInputCheck = void 0;
const express_validator_1 = require("express-validator");
const clientInputCheck = () => [
    (0, express_validator_1.body)("clientName").trim().not().isEmpty().withMessage("Please provide the client's name"),
    (0, express_validator_1.body)("isCorporate").trim().isIn(["on", ""]),
    (0, express_validator_1.body)("yearFounded")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Year founded cannot be empty")
        .isInt()
        .withMessage("Please enter a valid year"),
    (0, express_validator_1.body)("contactName")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Please provide the primary contact's name"),
    (0, express_validator_1.body)("contactPhoneNumber")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Please provide the primary contact's phone number")
        .isLength({
        min: 11,
        max: 11,
    })
        .withMessage("Please provide a valid phone number"),
    (0, express_validator_1.body)("contactEmailAddress")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Please provide the primary contact's email address")
        .isEmail()
        .withMessage("Please enter a valid email address"),
];
exports.clientInputCheck = clientInputCheck;
const formatErrorResponse = (input) => {
    return input.reduce((accumulator, currentItem) => {
        accumulator[currentItem.path] = currentItem.msg;
        return accumulator;
    }, {});
};
exports.formatErrorResponse = formatErrorResponse;
