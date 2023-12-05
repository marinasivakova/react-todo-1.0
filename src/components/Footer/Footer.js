import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

const Footer = ({ onFilter, onClear, count }) => {
  return (
    <footer className="footer">
      <span className="todo-count">Tasks left to do: {count}</span>
      <TasksFilter onFilter={(e) => onFilter(e)} />
      <button className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  onFilter: () => {
    console.log('no function set for filter');
  },
  onClear: () => {
    console.log('no function set for clear');
  },
  count: 0,
};

Footer.propTypes = {
  onFilter: PropTypes.func,
  onClear: PropTypes.func,
  count: PropTypes.number,
};

export default Footer;
