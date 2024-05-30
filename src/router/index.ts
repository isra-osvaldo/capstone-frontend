import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import siteRouter from "./site.router";
import keycloak from "../security/keycloak-config";
import exchangeRouter from "./exchange.router";

const routes: Array<RouteRecordRaw> = [
  siteRouter,
  exchangeRouter,
  { path: "/:pathMatch(.*)*", redirect: "/site/home" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { isAuthorize } = to.meta;

  if (!isAuthorize) {
    return next();
  }

  if (keycloak.authenticated) {
    // El usuario está autenticado, permitir navegación a la siguiente ruta
    if (keycloak.isTokenExpired()) {
      // si acaba el token, refrescar
      try {
        await keycloak.updateToken(import.meta.env.VITE_APP_INACTIVITY_TIME);
      } catch (error) {
        await keycloak.logout();
      }
    }

    return next();
  } else {
    // El usuario no está autenticado, redirigir al home
    router.push({ name: "home" });
    return next();
  }
});

export default router;
