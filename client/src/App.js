import { CounterContext, CounterController } from "./CounterContext";
import Counters from "./Counters";

function App() {
  return (
    <CounterContext.Provider value={CounterController()}>
      <Counters />
    </CounterContext.Provider>
  );
}

export default App;
