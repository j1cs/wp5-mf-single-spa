import React from "react";
interface ICounterProps {
  header: string;
  count: number;
  // both work. i don't know which use.
  increment: () => void;
  decrement: React.MouseEventHandler<HTMLButtonElement>;
}
export class Counter extends React.Component<ICounterProps> {
  render() {
    return (
      <div>
        <h2>{this.props.header}</h2>
        <span>{this.props.count}</span>
        <button onClick={this.props.increment}>+</button>
        <button onClick={this.props.decrement}>-</button>
      </div>
    );
  }
}
