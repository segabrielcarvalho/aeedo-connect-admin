const apiRoutes = {
  auth: {
    login: { path: "/auth/login" },
    logout: { path: "/logout" },
    me: { path: "/me" },
  },

  users: {
    list: { path: "/users/list", method: "GET" },
  },
};

export default apiRoutes;
