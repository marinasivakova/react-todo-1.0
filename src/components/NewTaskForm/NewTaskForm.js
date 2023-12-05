import React from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onTyped }) => {
  const pressKey = (e) => {
    if (e.key === 'Enter') {
      onTyped(e.target.value);
      e.target.value = '';
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done? (Send by Enter)"
        autoFocus=""
        onKeyDown={pressKey}
      />
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
