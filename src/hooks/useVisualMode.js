import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(mode, replace = false) {
    if (replace) {
      setHistory(prevHistory => prevHistory.slice(0, history.length - 1));
    }
    setHistory(prevHistory => [...prevHistory, mode]);
    setMode(mode);
    return { transition };
  }

  const back = function() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prevHistory => prevHistory.slice(0, history.length - 1));
    }
    return { back };
  }

  return { mode, transition, back };
};