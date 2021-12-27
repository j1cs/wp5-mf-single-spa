import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

import "./index.scss";

const App = (): JSX.Element => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: app</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>
  </div>
);
const headerLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err, errInfo, props) {
    return <div>error</div>;
  },
});

export const { bootstrap, mount, unmount } = headerLifecycles;

export default App;
