const apiRoutes = {
  root: {
    status: { path: "/", method: "GET" },
  },

  auth: {
    login: { path: "/auth/login", method: "POST" },
    logout: { path: "/logout", method: "POST" },
    me: { path: "/me", method: "GET" },
  },

  users: {
    register: { path: "/users", method: "POST" },
    list: { path: "/users/list", method: "GET" },
    listByType: { path: "/users/type", method: "GET" },
    show: { path: "/users/:id", method: "GET" },
    update: { path: "/users/:id", method: "PATCH" },
  },

  addresses: {
    show: { path: "/addresses/:id", method: "GET" },
    create: { path: "/addresses", method: "POST" },
    update: { path: "/addresses/:id", method: "PATCH" },
  },

  hospitals: {
    list: { path: "/hospitals", method: "GET" },
    show: { path: "/hospitals/:id", method: "GET" },
    choose: { path: "/hospitals/choose-hospitals", method: "POST" },
    admin: {
      list: { path: "/manager/hospitals", method: "GET" },
      show: { path: "/manager/hospitals/:id", method: "GET" },
      create: { path: "/manager/hospitals", method: "POST" },
      assignPatient: {
        path: "/manager/hospitals/assign-patient",
        method: "POST",
      },
      update: { path: "/manager/hospitals/:id", method: "PATCH" },
    },
  },

  organs: {
    listPatientOrgans: {
      path: "/organs/patient-organs/",
      method: "GET",
    },
    choose: { path: "/organs/choose-organs", method: "POST" },
    allocate: { path: "/organs/all", method: "GET" },
    admin: {
      list: { path: "/manager/organs", method: "GET" },
      show: { path: "/manager/organs/:id", method: "GET" },
      create: { path: "/manager/organs", method: "POST" },
      update: { path: "/manager/organs/:id", method: "PATCH" },
    },
  },

  patient: {
    details: { path: "/patient-details/:id", method: "GET" },
  },
};

export default apiRoutes;
