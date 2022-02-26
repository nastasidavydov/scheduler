import { useState } from "react";

export default function useVisualMode(initialMode) {

const [mode, setMode] = useState(initialMode);
const [history, setHistory] = useState([initial]); 

//update current mode to a new mode
const transition = newMode => {
  setMode(newMode);
  return mode
}

const back = () => {

}


return {
  mode,
  transition,
  back
}

}