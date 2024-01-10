import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

const TaskList = ({
  todos,
  onDeleted,
  onToggleCompleted,
  onToggleEditing,
  editTask,
  onFilter,
  filterValue,
  onComplete,
}) => {
  const elements = todos.map((item) => {
    const { id } = item;

    return (
      <Task
        {...item}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleEditing={() => onToggleEditing(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        editTask={(e) => editTask(id, e)}
        onFilter={() => onFilter(filterValue)}
        onCompleted={(e) => onComplete(e, id)}
      />
    );
  });

  return (
    <ul key="main-list" className="todo-list">
      {elements}
    </ul>
  );
};

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {
    console.log('nothing set for deletion');
  },
  onToggleCompleted: () => {
    console.log('nothing set for toggling completion');
  },
  onToggleEditing: () => {
    console.log('nothing set for toggling editing');
  },
  onComplete: () => {
    console.log('nothing set for when task is done');
  },
  editTask: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onComplete: PropTypes.func,
  onToggleEditing: PropTypes.func,
  editTask: PropTypes.func,
};

export default TaskList;
