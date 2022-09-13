const express = require("express");
import authRoute from "./auth.route";
import certificateRoute from "./certificate.route";
import configs from "../config/config";
import auth from "../middlewares/auth";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/certificates",
    route: certificateRoute,
  },
  ,
];

const devRoutes: Array<any> = [];

defaultRoutes.forEach((route: any) => {
  if (route.path !== "/docs" && route.path !== "/auth") {
    router.use(auth);
  }
  router.use(route.path, route.route);
});

if (configs.env !== "production") {
  devRoutes.forEach((route: any) => {
    router.use(route.path, route.route);
  });
}

export default router;
