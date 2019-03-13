import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    allUsers: async (_, args) => {
      const { id } = args;
      return await prisma.users();
    }
  }
};
