require("dotenv").config();

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

const port = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));

server.start({ port }, () => `Server running on port ${port}`);
