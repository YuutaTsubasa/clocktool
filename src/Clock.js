import React, { useState, useEffect } from 'react';
import ClockHandType from './ClockHandType';

const totalDegree = 360;
const diffDegree = 90;

function Clock({settings}) 
{ 
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const getTimeValue = {
      [ClockHandType.Hour]: () => [hour, 12],
      [ClockHandType.Minute]: () => [minute, 60],
      [ClockHandType.Second]: () => [second, 60],
  }
  
  
  useEffect(() => {
    function updateTime() {
      let currentDate = new Date();
      let currentSeconds = currentDate.getSeconds() + 
            currentDate.getMilliseconds() / 1000;
      let currentMinutes = currentDate.getMinutes() + currentSeconds / 60;
      let currentHours = currentDate.getHours()
        + currentMinutes / 60;
      
      setHour(currentHours);
      setMinute(currentMinutes);
      setSecond(currentSeconds);
    }
    
    updateTime();
    let intervalId = setInterval(() => updateTime(), 1000 / 60);
    return () => clearInterval(intervalId);
  }, [hour, minute, second]);
  
  return (
    <div class="clock" style=
      {getClockStyle(settings)}>
      { 
        Object.values(ClockHandType).map(type => 
          (<ClockHand 
            size={settings.size}
            type={type} 
            totalRatio={settings.clockHands.totalRatio}
            degree={getRatioToDegree(getTimeValue[type]())}
            settings={settings.clockHands[type]} />))
      }
    </div>
  );
}

function ClockHand({size, type, totalRatio, degree, settings}) {
  return (
    <div 
      type={type} 
      class="clockHand"
      style={{
        top: `${size / 2}px`,
        left: `${size / 2}px`,
        width: `${getClockHandLength(size, settings.ratio, totalRatio)}px`,
        height: `${settings.weight}px`,
        transform: `translate(0, -50%) rotate(${degree}deg)`,
        ...(settings.background ? 
          {
            background: `url(${settings.background})`,
            "background-repeat": "no-repeat",
            "background-size": "contain"
          } : {
            background: settings.color
          })
      }}>
    </div>
  );
}

function getClockHandLength(size, ratio, totalRatio) {
  return size / 2 * ratio * totalRatio;
}

function getClockStyle({size, border, background}) {
  return {
    width: `${size}px`,
    height: `${size}px`,
    ...(border.isEnable ? { 
      border: `${border.size}px solid ${border.color}`, 
      "border-radius": `${size}px ${size}px`
    } : {}),
    ...(background ? 
       { 
          "background": `url(${background})`,
          "background-repeat": "no-repeat",
          "background-size": "contain"
       } :
       {})
  }
}

function getRatioToDegree([value, maxValue]) {
  return (value / maxValue * totalDegree - diffDegree) % totalDegree; 
}

export default Clock;
