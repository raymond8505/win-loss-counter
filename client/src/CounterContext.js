import React, { useState, useContext } from "react";

const fromLocal = window.localStorage.getItem("counter");
export const initialState = fromLocal
  ? JSON.parse(fromLocal)
  : {
      counters: {},
    };

export const CounterController = () => {
  const [state, setState] = useState(initialState);

  const saveState = (state) => {
    window.localStorage.setItem("counter", JSON.stringify(state));
  };

  const setCounter = (slug, value) =>
    setState((prevState) => {
      const curState = { ...prevState };

      curState.counters[slug] = {
        count: value,
      };

      saveState(curState);

      return curState;
    });

  const getTotal = () => {
    let total = 0;

    Object.keys(state.counters).forEach((counter, c) => {
      console.log(counter, state.counters[counter].count);
      total += state.counters[counter].count;
    });

    return total;
  };

  const reset = () => {
    setState((prev) => {
      const newState = { ...prev };

      Object.keys(newState.counters).forEach((counter, c) => {
        newState.counters[counter].count = 0;
      });

      saveState(newState);

      return newState;
    });
  };

  return {
    state,
    setState,
    setCounter,
    getTotal,
    reset,
  };
};

export const CounterContext = React.createContext();

export const useCounters = () => useContext(CounterContext);
