import { useState } from "react";

export default function useVisualMode(initial) {

const [mode, setMode] = useState(initial);
const [history, setHistory] = useState([initial]); 

//update current mode to a new mode
const transition = (newMode, replace = false) => {
  setMode(newMode);
  //add new mode to the history state array
  setHistory((prev) => {
    
    // if replace is true skip adding new mode to history
    if (replace) {
      
      return [...prev];
    }
    return [...prev, newMode];
  })
  
}
// treansitions back to prev mode
const back = () => {

  //prevents to go back past the initial mode
  if (history.length > 1) {
    
  //remove the last el of array and set mode to be the last el of history
    history.pop()
    setMode(history[history.length-1])
    
  }
}


return {
  mode,
  transition,
  back
}

}