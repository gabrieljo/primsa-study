export const isAuthenticated = request => {
  if (!request.user) {
    throw Error("Unauthenticated user");
  }

  return;
};
