import { start, registerApplication } from "single-spa";

/**
 * Register applications here
 
registerApplication(
  "navigation",
  () => import("navigation/NavBar"),
  () => true
);
*/
registerApplication(
  "body",
  () => import("body/App"),
  () => true
);

registerApplication(
  "section",
  () => import("section/App"),
  () => true
);

start();
