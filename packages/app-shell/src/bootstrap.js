import { start, registerApplication } from "single-spa";
import { pathToRegexp } from "path-to-regexp";

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
  (location) => location.pathname.startsWith("/test")
);
/*registerApplication(
    'app',
    () => import('app/App'),
    (location) => location.pathname.startsWith('/')
);
registerApplication(
    'reactApp',
    () => import('reactApp/ApplicationPage'),
    (location) => location.pathname.startsWith('/react')
);

registerApplication(
    'angularApp',
    () => import('angularApp/ApplicationPage'),
    (location) => location.pathname.startsWith('/angular')
);*/
start();
