import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  state = {
    allButton: { id: 'All', className: 'selected' },
    activeButton: { id: 'Active', className: '' },
    completedButton: { id: 'Completed', className: '' },
  };

  render() {
    const { onFilter } = this.props;
    const changePicked = (value) => {
      if (value === 'All') {
        this.setState(() => {
          return {
            allButton: { id: 'All', className: 'selected' },
            activeButton: { id: 'Active', className: '' },
            completedButton: { id: 'Completed', className: '' },
          };
        });
      } else if (value === 'Active') {
        this.setState(() => {
          return {
            allButton: { id: 'All', className: '' },
            activeButton: { id: 'Active', className: 'selected' },
            completedButton: { id: 'Completed', className: '' },
          };
        });
      } else {
        this.setState(() => {
          return {
            allButton: { id: 'All', className: '' },
            activeButton: { id: 'Active', className: '' },
            completedButton: { id: 'Completed', className: 'selected' },
          };
        });
      }
    };

    const filterPressed = (e) => {
      changePicked(e.target.id);
      return onFilter(e.target.id);
    };

    return (
      <ul className="filters">
        <li>
          <button id="All" className={this.state.allButton.className} onClick={filterPressed}>
            All
          </button>
        </li>
        <li>
          <button id="Active" className={this.state.activeButton.className} onClick={filterPressed}>
            Active
          </button>
        </li>
        <li>
          <button id="Completed" className={this.state.completedButton.className} onClick={filterPressed}>
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
