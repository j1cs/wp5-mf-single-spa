import React from "react";
import ReactDOM from "react-dom";
import { GlobalStore, IGlobalStore } from "redux-micro-frontend";
import { Store } from "redux";
import { Reducer } from "./store/reducer";
import { IncrementCounter, DecrementCounter } from "./store/action";
import singleSpaReact from "single-spa-react";

import "./index.scss";
import { Counter } from "./Counter";

interface DefaultProps {}
interface IState {
  counter: number;
}
class App extends React.Component<DefaultProps> {
  globalStore: IGlobalStore;
  store: Store;
  state: IState;
  constructor(props: DefaultProps) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.updateState = this.updateState.bind(this);
    this.globalStore = GlobalStore.Get(false);
    // BodyApp must be .env file
    this.store = this.globalStore.CreateStore("BodyApp", Reducer, []);
    this.globalStore.RegisterGlobalActions("BodyApp", [
      "INCREMENT",
      "DECREMENT",
    ]);
    this.globalStore.SubscribeToGlobalState("BodyApp", this.updateState);
  }

  incrementCounter() {
    this.globalStore.DispatchAction("BodyApp", IncrementCounter());
  }

  decrementCounter() {
    this.globalStore.DispatchAction("BodyApp", DecrementCounter());
  }

  updateState(globalState: any) {
    this.setState({
      counter: globalState.BodyApp.counter,
    });
  }

  render() {
    return (
      <div className="mt-10 text-3xl mx-auto max-w-6xl">
        <div>Name: app</div>
        <div>Framework: react</div>
        <div>Language: TypeScript</div>
        <div>CSS: Tailwind</div>
        <Counter
          count={this.state.counter}
          header="Counter"
          increment={this.incrementCounter}
          decrement={this.decrementCounter}
        />
      </div>
    );
  }
}
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
