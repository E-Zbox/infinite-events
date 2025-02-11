import { Router } from "express";
import { createHandler } from "graphql-http/lib/use/express";
// middlewares
import { adminContext, userContext } from "@/middlewares/graphql";
import { verifyAdminToken, verifyUserToken } from "@/middlewares/verifyToken";
// schema
import schema from "@/schemas";

const adminGraphqlHandler = createHandler({
  context: adminContext,
  schema,
});

export const adminGraphqlRoutes = Router();

adminGraphqlRoutes.use([verifyAdminToken]);

adminGraphqlRoutes.all("/", adminGraphqlHandler);

const guestUserGraphqlHandler = createHandler({
  context: {},
  schema,
});

export const guestUserGraphqlRoutes = Router();

guestUserGraphqlRoutes.all("/", guestUserGraphqlHandler);

const userGraphqlHandler = createHandler({
  context: userContext,
  schema,
});

export const userGraphqlRoutes = Router();

userGraphqlRoutes.use([verifyUserToken]);

userGraphqlRoutes.all("/", userGraphqlHandler);
