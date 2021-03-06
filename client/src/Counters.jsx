import React from "react";
import { css } from "@emotion/css";
import Counter from "./Counter";
import { useCounters } from "./CounterContext";
import { button } from "./helpers";

const Counters = () => {

    const {reset} = useCounters();

    return (<div
        className={css`
          width: 100vmax;
          height: 100vmin;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: #333;
          color: #eee
        `}
      >
        <Counter label="Wins" slug="wins" />
        <button onClick={()=>reset()} className={button + ' ' + css`
            font-size: 2rem;
            padding: .3em .8em;
            width: auto;
        `}>Reset</button>
        <Counter label="Losses" slug="losses" />
      </div>);
}

export default Counters;