import React, { Component } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  render() {
    let { onToggleCompleted, onToggleEditing, onDeleted, editTask, label, completed, editing, hidden, date } =
      this.props;

    const pressEdit = (e) => {
      if (!e.target.value) {
        e.target.value = label;
      }
    };

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
    let addClassesButton = 'icon icon-edit';
    let addClassesCheckbox = 'toggle';
    if (completed) {
      addClasses += 'completed';
      addClassesButton += ' hidden';
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
          <input onClick={onToggleCompleted} className={addClassesCheckbox} type="checkbox" />
          <label>
            <span className="description">{label}</span>
            <span className="created">created {createdTime}</span>
          </label>
          <button className={addClassesButton} onClick={onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" defaultValue={label} className="edit" onKeyDown={pressKey} onChange={pressEdit} />
      </li>
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.completed !== this.props.completed) {
      this.props.onFilter();
    }
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
