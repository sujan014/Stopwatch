import React, {useState, useEffect, useRef, useCallback} from "react";

const Stopwatch = () =>{
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(()=>{
    if (isRunning){
      // to clear th interval, we need to keep track of it by its unique Id.
      // setInterval function returns that Id
      intervalIdRef.current = setInterval(() => {        
        setElapsedTime(Date.now() - startTimeRef.current)
      }, 10);
    }
    // When isRunning changes, or we unmount our component, we need to stop interval from continuing.
    // If we don't, it may lead to unexpected behaviour.
    return () => {
      clearInterval(intervalIdRef.current);
    }
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;    
  }
  const stop = () => {
    setIsRunning(false);
  }
  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  }
  const formatTime = () => {

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let millis = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    millis = String(millis).padStart(2, '0');

    return `${minutes}:${seconds}:${millis}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button className='start-button' onClick={start}>Start</button>
        <button className='stop-button' onClick={stop}>Stop</button>
        <button className='reset-button' onClick={reset}>Reset</button>
      </div>
    </div>    
  )
};

export default Stopwatch;
