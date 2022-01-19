import useWakeLock from "./useWakeLock";
import { CounterContext, CounterController } from "./CounterContext";
import Counters from "./Counters";

function App() {

  useWakeLock();
  
  return (
    <CounterContext.Provider value={CounterController()}>
      <Counters />
    </CounterContext.Provider>
  );
}

export default App;
