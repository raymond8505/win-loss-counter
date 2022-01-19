import { useEffect } from "react";
import { CounterContext, CounterController } from "./CounterContext";
import Counters from "./Counters";

function App() {
  useEffect(() => {
    let wakeLock;

    (async () => {
      if ("wakeLock" in window.navigator) {
        wakeLock = await window.navigator.wakeLock.request("screen");
      }
    })();

    return () => {
      wakeLock?.release();
    };
  }, []);
  return (
    <CounterContext.Provider value={CounterController()}>
      <Counters />
    </CounterContext.Provider>
  );
}

export default App;
