import { start, registerApplication } from "single-spa";

/**
 * Register applications here
 */
registerApplication(
  "navigation",
  () => import("navigation/NavBar"),
  () => true
);

registerApplication(
  "body",
  () => import("body/App"),
  (location) => location.pathname.startsWith("/react")
);
/*
registerApplication(
    'angularApp',
    () => import('angularApp/ApplicationPage'),
    (location) => location.pathname.startsWith('/angular')
);*/

start();
