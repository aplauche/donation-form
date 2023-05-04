

import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';

export default function Countdown({deadline = new Date(new Date().getTime()+(24*60*60*1000))}) {
  
  const timeOut = useStore((state) => state.timeOut)
  
  const [days, setDays] = useState('--');
  const [hours, setHours] = useState('--');
  const [minutes, setMinutes] = useState('--');
  const [seconds, setSeconds] = useState('--');

  const calculateTimeRemaining = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.max(Math.floor(time / (1000 * 60 * 60 * 24)), 0));
    setHours(Math.max(Math.floor((time / (1000 * 60 * 60)) % 24), 0));
    setMinutes(Math.max(Math.floor((time / 1000 / 60) % 60), 0));
    setSeconds(Math.max(Math.floor((time / 1000) % 60), 0));


  };

  useEffect(() => {
    calculateTimeRemaining(deadline)
    const interval = setInterval(() => calculateTimeRemaining(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if(days == 0 && hours == 0 && minutes == 0 && seconds == 0){
      timeOut()
    }
  }, [seconds])

  return (
    <div className="countdown grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
      <div className='countdown-box'>
        <span>{days}</span>
        days
      </div>
      <div className='countdown-box'>
        <span>{hours}</span>
        hours
      </div>
      <div className='countdown-box'>
        <span>{minutes}</span>
        mins
      </div>
      <div className='countdown-box'>
        <span>{seconds}</span>
        secs
      </div>
    </div>
  );
};