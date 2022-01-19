import React,{useEffect, useState, useMemo} from "react";
import { useCounters } from "./CounterContext";
import {css} from '@emotion/css';
import { button } from "./helpers";


const Counter = ({
    slug,
    label = 'Counter',
    start = 0
}) => {

    const {state,setCounter,getTotal} = useCounters()
    const [counter,setCounterState] = useState(state.counters[slug] || {count : 0})

    const total = useMemo(()=>getTotal(),[state,slug]);

    useEffect(() => {
        console.log(slug);
        setCounterState(state.counters[slug] || {count : 0});
    },[state.counters[slug],slug])

    const toPercent = (float) => {
        return Math.round(float * 100)
    }

    const increment = (e) => {
        setCounter(slug,counter.count + 1);
        e.preventDefault();
        e.stopPropagation();
    }

    const decrement = (e) => {
        setCounter(slug,counter.count - 1);
            e.preventDefault();
            e.stopPropagation();
    }

    return (<div className={css`
        text-align: center;
    `}
    onClick={increment}
    >
        <h2 className={css`
            margin: 0;
        `}>{label ? label : slug}</h2>
        <h3 className={css`
            font-size: 5rem;
            margin: 0;
            `}>{counter.count}</h3>
        <h4 className={css`
            font-size: 1.5rem;
            margin: 0 0 1em 0;
            opacity: .6;
        `}>{toPercent(counter.count / total || 0)}%</h4>
        <button onClick={(e) => {
            decrement(e)
        }}
        className={button}>-</button>
        <button onClick={(e) => {
            increment(e)
        }}
        className={button}>+</button>
    </div>);
}

export default Counter;