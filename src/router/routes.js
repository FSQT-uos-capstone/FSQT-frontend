import Store from "../store";

const requireAuth = () => (from, to, next) => {
  const isAuthorized = Store().getters["auth/token"] !== null;
  if (isAuthorized) return next();
  next("/gate");
};

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "search", component: () => import("pages/search/Index.vue") },
      { path: "cats", component: () => import("pages/cats/Index.vue") },
      {
        path: "cats/profile/:catId",
        component: () => import("pages/cats/Profile.vue"),
        props: true
      },
      {
        path: "users/profile/:userId",
        component: () => import("pages/users/Profile.vue"),
        props: true
      }
    ],
    beforeEnter: requireAuth()
  },
  {
    path: "/cats/chat",
    component: () => import("layouts/ChatLayout.vue"),
    children: [
      {
        path: ":catId",
        component: () => import("pages/cats/Chat.vue"),
        props: true
      }
    ]
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
        path: "",
        component: () => import("pages/auth/SignIn.vue")
      },
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
