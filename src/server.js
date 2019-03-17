import "./env";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import passport from "passport";

import { prisma } from "../generated/prisma-client";

import "./passport";
import { authenticateJWT } from "./passport";

const port = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: req => ({
    request: req.request,
    prisma
  })
});

server.express.use(logger("dev"));
server.express.use(authenticateJWT);

server.start({ port }, () => `Server running on port ${port}`);
