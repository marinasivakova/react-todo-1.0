import React, { Component } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Timer from '../Timer';

export default class Task extends Component {
  render() {
    let { onToggleCompleted, onToggleEditing, onDeleted, editTask, label, completed, editing, hidden, date, timer } =
      this.props;

    const pressEdit = (e) => {
      if (!e.target.value) {
        e.target.value = label;
        e.target.select();
      }
    };

    const selectText = (e) => {
      e.target.select();
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
    const classes = {
      checkbox: cn('toggle'),
      edit: cn('icon icon-edit', { hidden: completed }),
      task: cn({ completed: completed, editing: editing, hidden: hidden }),
    };

    return (
      <li className={classes.task}>
        <div className="view">
          <input onClick={onToggleCompleted} className={classes.checkbox} type="checkbox" defaultChecked={completed} />
          <label>
            <span className="title">{label}</span>
            <Timer completed={completed} passedTime={timer} />
            <span className="description">created {createdTime}</span>
          </label>
          <button className={classes.edit} onClick={onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input
          type="text"
          defaultValue={label}
          className="edit"
          onKeyDown={pressKey}
          onChange={pressEdit}
          onFocus={selectText}
        />
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
