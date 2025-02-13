import jwt from "jsonwebtoken";

import CONSTANTS from "../CONSTANTS";
import { ISessionData } from "../interfaces/jwt.interface";

const generateJWT = (payload: ISessionData) => {
  const expiresIn = CONSTANTS.JWT_EXPIRATION_TIME;
  return jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn });
};

const verifyJWT = (token: string) => {
  return jwt.verify(token, `${process.env.JWT_SECRET}`) as ISessionData;
};

export default {
  generateJWT,
  verifyJWT,
};
