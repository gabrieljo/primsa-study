import { generateSecret, sendSecretMail } from "../../../utils";
export default {
  Mutation: {
    requestSecret: async (_, args, { request, prisma }) => {
      const { email } = args;
      const loginSecret = generateSecret();

      try {
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        await sendSecretMail(email, loginSecret);
        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    }
  }
};
