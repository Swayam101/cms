import authModels from "../models/auth.models";

const model = authModels.Token;

const createToken = (userId: string, token: string) => {
  return model.create({ userId, token });
};

const getToken = (token: string) => {
  return model.findOne({ token });
};

export default {
  createToken,
  getToken,
};
