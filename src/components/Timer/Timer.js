import { useState, useEffect } from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';

const Timer = ({ completed, passedTime, created, onComplete }) => {
  const [count, setCount] = useState(1);
  const [interval, setTheInterval] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [timeCurrent, setTime] = useState(null);
  let [timeString, setTimeString] = useState('');
  const getTimeString = () => {
    if (timeCurrent) {
      setTimeString(
        timeCurrent.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'UTC',
        })
      );
    }
  };
  const createInitialTimer = () => {
    while (passedTime[0] > 0) {
      passedTime[0] = passedTime[0] - 1;
      passedTime[1] = Number(passedTime[1]) + 60;
      setCount(Number(passedTime[1]));
    }
    if (passedTime[1] > 0) {
      setCount(Number(passedTime[1]));
    }
    return passedTime[1];
  };
  const updateTimer = (e) => {
    if (!e && created) {
      const updateTimeout = () => {
        setCount((v) => v + 1);
      };
      let intervalNew = setInterval(updateTimeout, 1000);
      setTheInterval(intervalNew);
      setPressed(true);
    } else if (e.target.className === 'icon icon-play') {
      if (pressed) {
        return null;
      }
      setPressed(true);
      const updateTimeout = () => {
        setCount((v) => v + 1);
      };
      let intervalNew = setInterval(updateTimeout, 1000);
      setTheInterval(intervalNew);
    } else {
      clearInterval(interval);
      setPressed(false);
      setTheInterval(null);
    }
  };
  const classes = {
    play: cn('icon icon-play', {
      hidden: completed,
    }),
    pause: cn('icon icon-pause', {
      hidden: completed,
    }),
  };
  if (completed) {
    clearInterval(interval);
  }

  useEffect(() => {
    let number = createInitialTimer();
    let newTime = new Date(number * 1000);
    setTime(newTime);
  }, []);

  useEffect(() => {
    getTimeString();
  }, [timeCurrent]);

  useEffect(() => {
    let newTime = new Date(count * 1000);
    setTime(newTime);
    getTimeString();
    onComplete(count);
  }, [count]);
  return (
    <span className="description">
      <button className={classes.play} onClick={updateTimer}></button>
      <button className={classes.pause} onClick={updateTimer}></button>
      {timeString}
    </span>
  );
};

Timer.defaultProps = {
  completed: false,
  created: false,
  passedTime: [0, 0],
  onComplete: () => {},
};

Timer.propTypes = {
  completed: propTypes.bool,
  created: propTypes.bool,
  passedTime: propTypes.array,
  onComplete: propTypes.func,
};

export default Timer;
