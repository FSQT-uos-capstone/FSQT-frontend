import Store from "../store";

const requireAuth = () => (from, to, next) => {
  const authenticated = Store().state.auth.authenticated;
  console.log(authenticated);
  if (authenticated) return next();
  next("/gate");
};

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
    children: [{ path: "cats", component: () => import("pages/Cats.vue") }],
    beforeEnter: requireAuth()
  },
  {
    path: "/gate",
    component: () => import("layouts/GateLayout.vue"),
    children: [{ path: "", component: () => import("pages/gate/Index.vue") }]
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "register/nickname",
        component: () => import("pages/auth/RegisterNickname.vue")
      },
      {
        path: "register/account",
        component: () => import("pages/auth/RegisterAccount.vue")
      },
      {
        path: "register/email",
        component: () => import("pages/auth/RegisterEmail.vue")
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
