import { start, registerApplication, navigateToUrl } from "single-spa";
import { pathToRegexp } from "path-to-regexp";
import { APP_NAME } from "../constants/envrionment";
console.log(APP_NAME);
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
  (location) => pathToRegexp(location.pathname).test("/body")
);
registerApplication(
  "section",
  () => import("section/Home"),
  (location) => pathToRegexp(location.pathname).test("/section")
);

registerApplication(
  "guard",
  () => import("section/Home"),
  (location) => pathToRegexp(location.pathname).test("/guard")
);

window.addEventListener(
  "single-spa:before-routing-event",
  ({ detail: { oldUrl, newUrl } }) => {
    if (new URL(newUrl).pathname === "/guard") {
      console.log("redirecting!!!!!");
      navigateToUrl("/");
    }
  }
);

start();
