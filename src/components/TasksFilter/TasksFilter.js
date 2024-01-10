import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const TasksFilter = ({ onFilter }) => {
  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  const changePicked = (value) => {
    if (value === 'All') {
      setAll(true);
      setActive(false);
      setCompleted(false);
    } else if (value === 'Active') {
      setAll(false);
      setActive(true);
      setCompleted(false);
    } else {
      setAll(false);
      setActive(false);
      setCompleted(true);
    }
  };

  const filterPressed = (e) => {
    changePicked(e.target.id);
    return onFilter(e.target.id);
  };

  const classes = {
    all: cn({ selected: all }),
    active: cn({ selected: active }),
    completed: cn({ selected: completed }),
  };
  return (
    <ul className="filters">
      <li>
        <button id="All" className={classes.all} onClick={filterPressed}>
          All
        </button>
      </li>
      <li>
        <button id="Active" className={classes.active} onClick={filterPressed}>
          Active
        </button>
      </li>
      <li>
        <button id="Completed" className={classes.completed} onClick={filterPressed}>
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.defaultProps = {
  onFilter: () => {
    'nothing set for filtering';
  },
};

TasksFilter.propTypes = {
  onFilter: PropTypes.func,
};

export default TasksFilter;
