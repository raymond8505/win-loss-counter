import React,{useEffect, useState, useMemo} from "react";
import { useCounters } from "./CounterContext";
import {css} from '@emotion/css';

const counterButton = css`
    font-size: 2rem;
    width: 2em;
    height: 2em;
    text-align: center;
    margin: 0 .2em;
`

const Counter = ({
    slug,
    label = 'Counter',
    start = 0
}) => {

    const {state,setCounter,getTotal} = useCounters()
    const [counter,setCounterState] = useState(state.counters[slug] || {count : 0})

    const total = useMemo(()=>getTotal(),[state,slug]);

    useEffect(() => {
        console.log({state});
        setCounterState(state.counters[slug] || {count : 0});
    },[state.counters[slug],slug])

    const toPercent = (float) => {
        return Math.round(float * 100)
    }

    return (<div className={css`
        text-align: center;
    `}>
        <h2>{label ? label : slug}</h2>
        <h3>{counter.count}</h3>
        <h4>{toPercent(counter.count / total || 0)}%</h4>
        <button onClick={() => {
            setCounter(slug,counter.count - 1);
        }}
        className={counterButton}>-</button>
        <button onClick={() => {
            setCounter(slug,counter.count + 1);
        }}
        className={counterButton}>+</button>
    </div>);
}

export default Counter;