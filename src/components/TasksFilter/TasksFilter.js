import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class TasksFilter extends Component {
  state = {
    all: true,
    active: false,
    completed: false,
  };

  render() {
    const { onFilter } = this.props;
    const changePicked = (value) => {
      if (value === 'All') {
        this.setState(() => {
          return {
            all: true,
            active: false,
            completed: false,
          };
        });
      } else if (value === 'Active') {
        this.setState(() => {
          return {
            all: false,
            active: true,
            completed: false,
          };
        });
      } else {
        this.setState(() => {
          return {
            all: false,
            active: false,
            completed: true,
          };
        });
      }
    };

    const filterPressed = (e) => {
      changePicked(e.target.id);
      return onFilter(e.target.id);
    };

    const classes = {
      all: cn({ selected: this.state.all }),
      active: cn({ selected: this.state.active }),
      completed: cn({ selected: this.state.completed }),
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
  }
}

TasksFilter.defaultProps = {
  onFilter: () => {
    'nothing set for filtering';
  },
};

TasksFilter.propTypes = {
  onFilter: PropTypes.func,
};
