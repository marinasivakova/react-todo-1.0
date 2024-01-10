import React, { useEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Timer from '../Timer';

const Task = ({
  onToggleCompleted,
  onToggleEditing,
  onDeleted,
  onFilter,
  onCompleted,
  editTask,
  label,
  completed,
  editing,
  hidden,
  date,
  timer,
  created,
}) => {
  useEffect(() => {
    onFilter();
  }, [completed]);
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
      let trimmed = e.target.value.trim();
      if (trimmed) {
        return editTask(e.target.value);
      }
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

  const onComplete = (e) => {
    return onCompleted(e);
  };

  return (
    <li className={classes.task}>
      <div className="view">
        <input onClick={onToggleCompleted} className={classes.checkbox} type="checkbox" defaultChecked={completed} />
        <label>
          <span className="title">{label}</span>
          <Timer completed={completed} passedTime={timer} created={created} onComplete={onComplete} />
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
};

Task.defaultProps = {
  onToggleCompleted: () => {},
  onToggleEditing: () => {},
  onDeleted: () => {},
  onFilter: () => {},
  editTask: () => {},
  onCompleted: () => {},
  label: '',
  completed: false,
  editing: false,
  hidden: false,
  created: false,
};

Task.propTypes = {
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  onDeleted: PropTypes.func,
  onFilter: PropTypes.func,
  onCompleted: PropTypes.func,
  editTask: PropTypes.func,
  label: PropTypes.string,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  hidden: PropTypes.bool,
  created: PropTypes.bool,
};

export default Task;
