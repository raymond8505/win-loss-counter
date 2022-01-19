import React from "react";
import { css } from "@emotion/css";
import Counter from "./Counter";
import { useCounters } from "./CounterContext";

const Counters = ({}) => {

    const {reset} = useCounters();

    return (<div
        className={css`
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: space-around;
          align-items: center;
        `}
      >
        <Counter label="Wins" slug="wins" />
        <button onClick={()=>reset()} className={css`
            font-size: 2rem;
            padding: .3em .8em;
        `}>Reset</button>
        <Counter label="Losses" slug="losses" />
      </div>);
}

export default Counters;