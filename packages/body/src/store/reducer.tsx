interface Action {
  type: string;
}

const initialState = {
  counter: 0,
};

export const Reducer = (state = initialState, action: Action) => {
  if (action.type === "INCREMENT")
    return { ...state, counter: state.counter + 1 };
  if (action.type === "DECREMENT")
    return { ...state, counter: state.counter - 1 };

  return state;
};
