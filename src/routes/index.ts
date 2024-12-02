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
    hospitals: { path: "/dashboard/hospitals" },
    organs: { path: "/dashboard/organs" },
  },
  auth: {
    login: { path: "/auth/login" },
    register: { path: "/auth/register" },
  },
};

export default routes;
