import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import styles from 'styles/app.scss';

const Home: React.FC = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Micro-Frontend Application</h1>
    <div className={styles.status}>
      <span>TypeScript</span>
    </div>
  </div>
);
const headerLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Home,
  errorBoundary(err, errInfo, props) {
    return <div>error</div>;
  },
});

export const { bootstrap, mount, unmount } = headerLifecycles;
export default Home;
