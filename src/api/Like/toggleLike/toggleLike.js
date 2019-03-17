import { isAuthenticated } from "../../../middleware";
export default {
  Mutation: {
    toggleLike: async (_, args, { request, prisma }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };
      try {
        //존재하는 라이크 인지 확인
        const existingLike = await prisma.$exists.like(filterOptions);

        if (existingLike) {
          await prisma.deleteManyLikes(filterOptions);
        } else {
          const newLike = await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }

        return true;
      } catch (error) {
        throw error;
      }
    }
  }
};
