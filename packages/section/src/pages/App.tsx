import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'pages/Home';
import singleSpaReact from 'single-spa-react';

const App: React.FC = () => <Home />;

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
