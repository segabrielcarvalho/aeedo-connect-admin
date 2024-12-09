const home = { path: "/dashboard" };

const routes = {
  home,
  dashboard: {
    path: home.path,
    users: {
      path: "/dashboard/users",
      show: { path: "/dashboard/users/[userId]" },
      create: { path: "/dashboard/users/create" },
    },
    hospitals: {
      path: "/dashboard/hospitals",
      show: { path: "/dashboard/hospitals/[hospitalId]" },
      create: { path: "/dashboard/hospitals/create" },
    },
    organs: {
      path: "/dashboard/organs",
      create: { path: "/dashboard/organs/create" },
    },
    me: { path: "/dashboard/me" },
  },
  auth: {
    login: { path: "/auth/login" },
    register: { path: "/auth/register" },
  },
};

export default routes;
