import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onTyped }) => {
  const [taskTitle, setTitle] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const updateState = (e) => {
    if (e.target.id === 'input-title') {
      let trimmed = e.target.value.trim();
      if (trimmed) {
        setTitle(trimmed);
      }
    }
    if (e.target.id === 'input-min') {
      if (!isNaN(Number(e.target.value))) {
        setMinutes(e.target.value);
      } else {
        setMinutes(null);
      }
    }
    if (e.target.id === 'input-sec') {
      if (!isNaN(Number(e.target.value))) {
        setSeconds(e.target.value);
      } else {
        setSeconds(null);
      }
    }
    if (taskTitle && minutes && seconds) {
      pressKey(e);
    }
  };
  const pressKey = (e) => {
    if (e.key === 'Enter') {
      onTyped({ taskTitle: taskTitle, minutes: minutes, seconds: seconds });
      document.querySelector('.new-todo-form').reset();
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input className="new-todo" id="input-title" placeholder="Task" autoFocus="" onKeyUp={updateState} />
        <input className="new-todo-form__timer" id="input-min" placeholder="Min" autoFocus="" onKeyUp={updateState} />
        <input className="new-todo-form__timer" id="input-sec" placeholder="Sec" autoFocus="" onKeyUp={updateState} />
      </form>
    </header>
  );
};

NewTaskForm.defaultProps = {
  onTyped: () => {
    console.log('no function set for typing');
  },
};
NewTaskForm.propTypes = {
  onTyped: PropTypes.func,
};

export default NewTaskForm;
