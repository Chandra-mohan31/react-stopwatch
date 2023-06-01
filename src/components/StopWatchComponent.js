import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import "./StopWatchComponent.css";
import { IconButton } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';


function StopWatchComponent() {
    const [time,setTime] = useState(0);
    const [isRunning,setIsRunning] = useState(false);

    const [laps,setLaps] = useState([]);
    // const [lapsCount,setLapsCount] = useState(0);
    let lapsCount = 0;

  
    function formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
    
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');
      
    
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }


  //  let intervalId;
  const intervalRef = useRef(null);
   const startTimer = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIsRunning(true);
    }
   }

   const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
   }

   const resetTimer = () => {
    setTime(0);
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
    setLaps([]);
   }

   const createLaps = () => {
    const lapsObj = {
      laps: laps.length + 1,
      time: laps.length > 0 ? time - laps[0].totalTime : time,
      totalTime: time
    }
    
    setLaps([...laps,lapsObj]);

   }
  useMemo(()=>{
    console.log(laps);
  },[laps])
  return (
    <div className='stopwatch_container'>
        <div className='stop_watch'>
            <p>{formatTime(time)}</p>
            <span style={{
              color: "whitesmoke",
              fontSize: '12px'
            }}>HH&nbsp;:MM:&nbsp;SS</span>
        </div>
        <div className='stop_watch_controls'>
            {isRunning ? (
                <IconButton color='primary' size='large' className='btn' sx={{
                  margin:"10px"
                }} onClick={stopTimer}>
                  <PauseRoundedIcon fontSize='large' />
                  
                </IconButton>
            ):(
                <IconButton color='primary' sx={{
                  margin:"10px"
                }} size='large' onClick={startTimer} className='btn'>
                <PlayArrowRoundedIcon fontSize='large' />
            </IconButton>
            )}
            <IconButton sx={{
                  margin:"10px"
                }} size='large' className='btn' onClick={createLaps} disabled={!isRunning ? true:false}>
                <FlagRoundedIcon fontSize='large' />
            </IconButton>
            <IconButton sx={{
                  margin:"10px"
                }} size='large' className='btn' onClick={resetTimer}>
                <RestartAltRoundedIcon fontSize='large' />
            </IconButton>
        </div>
        <div className='laps'>
          {
            laps?.sort((a, b) => {
              return b.laps - a.laps;
          }).length > 0 ? (
              <table>
                <th>Laps</th>
                <th>Time</th>
                <th>Total Time</th>
                {laps.map(lap=>(
                  <tr>
                    <td>{lap.laps}</td>
                    <td>{formatTime(lap.time)}</td>
                    <td>{formatTime(lap.totalTime)}</td>

                  </tr>
                ))}
              </table>
            ):null
          }
        </div>
    </div>
  )
}

export default StopWatchComponent



