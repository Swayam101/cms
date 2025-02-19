import express, { RequestHandler } from "express";

import baseRouter from "../routes";
import auth from "../features/auth";
import { IFeature } from "../interface/globals.interface";
import users from "../features/users";
import middlewares from "../middlewares";
import customer from "../features/customer";

const registerFeatureRouters = (
  app: express.Application,
  feature: IFeature,
  endpoint: string,
  middlewares: RequestHandler[]
) => {
  Object.values(feature.routers).forEach((router) => {
    app.use(endpoint, middlewares, router);
  });
};

export default (app: express.Application) => {
  app.use(baseRouter);
  registerFeatureRouters(app, auth, "/auth", []);
  registerFeatureRouters(app, users, "/user", []);
  registerFeatureRouters(app, customer, "/customer", []);
};
