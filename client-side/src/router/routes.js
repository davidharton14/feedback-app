const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/MainPage.vue") },
    { path: "/feedback", component: () => import("pages/FeedbackPage.vue") },
    { path: "/professor", component: () => import("pages/ProfessorPage.vue") },
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
