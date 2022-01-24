import React from "react";
import ReactDOM from "react-dom";
import { createStore, Store } from "redux";
import singleSpaReact from "single-spa-react";
import { Reducer } from "./store/reducer";
import { GlobalStore, IGlobalStore } from "redux-micro-frontend";
import { navigateToUrl } from "single-spa";

interface DefaultProps {}

interface IState {
  counter: number;
}
class NavBar extends React.Component<DefaultProps> {
  globalStore: IGlobalStore;
  state: IState;
  store: Store;
  constructor(props: DefaultProps) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.counterChanged = this.counterChanged.bind(this);
    this.globalStore = GlobalStore.Get();
    this.store = createStore(Reducer);
    this.globalStore.RegisterStore("NavBarApp", this.store, [
      GlobalStore.AllowAll,
    ]);
    try {
      this.globalStore.SubscribeToPartnerState(
        "NavBarApp",
        "BodyApp",
        this.counterChanged
      );
    } catch (error) {
      //Since
    }
  }
  counterChanged(counterState: any) {
    this.setState({
      counter: counterState.counter,
    });
  }
  render() {
    return (
      <nav>
        <ul>
          <li style={{ display: "inline" }}>
            <a href="/" onClick={navigateToUrl}>
              Home
            </a>
          </li>
          &nbsp;|&nbsp;
          <li style={{ display: "inline" }}>
            <a href="/body" onClick={navigateToUrl}>
              Body Application
            </a>
          </li>
          &nbsp;|&nbsp;
          <li style={{ display: "inline" }}>
            <a href="/section" onClick={navigateToUrl}>
              Section Application
            </a>
          </li>
          &nbsp;|&nbsp;
          <li style={{ display: "inline" }}>
            <a href="/guard" onClick={navigateToUrl}>
              Guard Application
            </a>
          </li>
          &nbsp;|&nbsp;
          <li style={{ display: "inline" }}>
            <a>Global Counter: {this.state.counter}</a>
          </li>
        </ul>
      </nav>
    );
  }
}

const headerLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: NavBar,
  errorBoundary(err, errInfo, props) {
    return <div>error</div>;
  },
});

export const { bootstrap, mount, unmount } = headerLifecycles;

export default NavBar;
