import React, { Component } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  render() {
    let { onToggleCompleted, onToggleEditing, onDeleted, editTask, label, completed, editing, hidden, date } =
      this.props;

    const pressKey = (e) => {
      if (e.key === 'Enter') {
        return editTask(e.target.value);
      }
    };

    if (typeof date !== 'string') {
      date = date.toISOString();
    }
    let createdTime = formatDistanceToNow(parseISO(date), {
      includeSeconds: true,
    });
    let addClasses = '';
    if (completed) {
      addClasses += 'completed';
      if (hidden) {
        addClasses += ' hidden';
      }
    } else if (editing) {
      addClasses += 'editing';
    } else if (hidden) {
      addClasses += 'hidden';
    } else {
      addClasses = '';
    }

    return (
      <li className={addClasses}>
        <div className="view">
          <input onClick={onToggleCompleted} className="toggle" type="checkbox" />
          <label>
            <span className="description">{label}</span>
            <span className="created">created {createdTime}</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" onKeyDown={pressKey} />
      </li>
    );
  }
}

Task.defaultProps = {
  onToggleCompleted: () => {},
  onToggleEditing: () => {},
  onDeleted: () => {},
  editTask: () => {},
  label: '',
  completed: false,
  editing: false,
  hidden: false,
};

Task.propTypes = {
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  onDeleted: PropTypes.func,
  editTask: PropTypes.func,
  label: PropTypes.string,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  hidden: PropTypes.bool,
};
