import { body } from "express-validator";

export const clientInputCheck = () => [
  body("clientName").trim().not().isEmpty().withMessage("Please provide the client's name"),
  body("isCorporate").trim().isIn(["on", ""]),
  body("yearFounded")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Year founded cannot be empty")
    .isInt()
    .withMessage("Please enter a valid year"),
  body("contactName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide the primary contact's name"),
  body("contactPhoneNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide the primary contact's phone number")
    .isLength({
      min: 11,
      max: 11,
    })
    .withMessage("Please provide a valid phone number with not less than or more than 11 digits"),
  body("contactEmailAddress")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide the primary contact's email address")
    .isEmail()
    .withMessage("Please enter a valid email address"),
];
export interface ErrorResponse {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export const formatErrorResponse = (input: ErrorResponse[]) => {
  return input.reduce((accumulator, currentItem) => {
    accumulator[currentItem.path] = currentItem.msg;
    return accumulator;
  }, {});
};
