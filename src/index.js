import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Header from './components/NewTaskForm';
import TodoList from './components/TaskList';
import Footer from './components/Footer';

function debounce(fn, debounceTime = 200) {
  let timeout;
  function result() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, debounceTime);
  }
  return result;
}

let storage = window.localStorage;
if (!storage.getItem('todoData')) {
  let date = new Date();
  storage.setItem(
    'todoData',
    JSON.stringify([
      {
        label: 'Drink Coffee',
        id: 1,
        completed: false,
        editing: false,
        hidden: false,
        date: date,
      },
      {
        label: 'Make Awesome App',
        id: 2,
        completed: false,
        editing: false,
        hidden: false,
        date: date,
      },
      {
        label: 'Have a lunch',
        id: 3,
        completed: false,
        editing: false,
        hidden: false,
        date: date,
      },
    ])
  );
}

export default class App extends Component {
  state = {
    todoData: JSON.parse(storage.getItem('todoData')),
    count: JSON.parse(storage.getItem('todoData')).filter((task) => {
      if (task.completed === false) {
        return true;
      }
      return false;
    }).length,
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      let element = todoData.findIndex((el) => el.id === id);
      const newTodoData = [...todoData.slice(0, element), ...todoData.slice(element + 1)];
      storage.setItem('todoData', JSON.stringify(newTodoData));

      return {
        todoData: newTodoData,
      };
    });
  };

  updateCount = () => {
    this.setState(({ todoData }) => {
      let newCount = todoData.filter((task) => {
        if (task.completed === false) {
          return true;
        }
        return false;
      }).length;
      return {
        count: newCount,
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todoData !== this.state.todoData) {
      this.updateCount();
    }
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      let index = todoData.findIndex((el) => el.id === id);
      const newArr = todoData.map((obj) => {
        const newObject = Object.assign({}, obj);
        return newObject;
      });
      let task = newArr[index];
      let status = todoData[index].completed;
      if (!task.completed) {
        task.completed = !status;
      } else {
        task.completed = !task.completed;
      }
      newArr[index] = task;
      storage.setItem('todoData', JSON.stringify(newArr));
      return {
        todoData: newArr,
      };
    });
  };

  onToggleEditing = (id) => {
    this.setState(({ todoData }) => {
      let index = todoData.findIndex((el) => el.id === id);
      const newArr = todoData.map((obj) => {
        const newObject = Object.assign({}, obj);
        return newObject;
      });
      let task = newArr[index];
      let status = todoData[index].editing;
      if (!task.editing) {
        task.editing = !status;
      } else {
        task.editing = !task.editing;
      }
      newArr[index] = task;
      storage.setItem('todoData', JSON.stringify(newArr));
      return {
        todoData: newArr,
      };
    });
  };

  editTask = (id, line) => {
    this.setState(({ todoData }) => {
      let index = todoData.findIndex((el) => el.id === id);
      const newArr = todoData.map((obj) => {
        const newObject = Object.assign({}, obj);
        return newObject;
      });
      let task = newArr[index];
      let status = todoData[index].editing;
      if (!task.editing) {
        task.editing = !status;
      } else {
        task.editing = !task.editing;
      }
      task.label = line;
      newArr[index] = task;
      storage.setItem('todoData', JSON.stringify(newArr));
      return {
        todoData: newArr,
      };
    });
  };

  addTask = (newLabel) => {
    this.setState(({ todoData }) => {
      let id = Math.random().toString(36).slice(2);
      let label = newLabel;
      let date = new Date();
      let newTask = {
        label: label,
        id: id,
        completed: false,
        editing: false,
        hidden: false,
        date: date,
      };
      let newTodoData = [...todoData, newTask];
      storage.setItem('todoData', JSON.stringify(newTodoData));
      return {
        todoData: newTodoData,
      };
    });
  };

  getLabel = debounce((line) => {
    if (line) {
      this.addTask(line);
      return true;
    }
    return false;
  });

  onFilter = (id) => {
    if (id === 'All') {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.map((obj) => {
          const newObject = Object.assign({}, obj);
          newObject.hidden = false;
          return newObject;
        });
        storage.setItem('todoData', JSON.stringify(newTodoData));
        return {
          todoData: newTodoData,
        };
      });
    } else if (id === 'Active') {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.map((obj) => {
          const newObject = Object.assign({}, obj);
          if (newObject.completed === false) {
            newObject.hidden = false;
          } else {
            newObject.hidden = true;
          }
          return newObject;
        });
        storage.setItem('todoData', JSON.stringify(newTodoData));
        return {
          todoData: newTodoData,
        };
      });
    } else {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.map((obj) => {
          const newObject = Object.assign({}, obj);
          if (newObject.completed === true) {
            newObject.hidden = false;
          } else {
            newObject.hidden = true;
          }
          return newObject;
        });
        storage.setItem('todoData', JSON.stringify(newTodoData));
        return {
          todoData: newTodoData,
        };
      });
    }
  };

  onClear = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData
        .map((obj) => {
          const newObject = Object.assign({}, obj);
          return newObject;
        })
        .filter((task) => {
          if (task.completed === false) {
            return true;
          }
          return false;
        });
      storage.setItem('todoData', JSON.stringify(newTodoData));
      return {
        todoData: newTodoData,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <Header onTyped={this.getLabel} />
        <TodoList
          todos={this.state.todoData}
          onDeleted={this.deleteTask}
          onToggleEditing={this.onToggleEditing}
          onToggleCompleted={this.onToggleCompleted}
          editTask={this.editTask}
        />
        <Footer onFilter={this.onFilter} onClear={this.onClear} count={this.state.count} />
      </section>
    );
  }
}

let container = null;

document.addEventListener('DOMContentLoaded', function () {
  if (!container) {
    container = document.getElementById('root');
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
});
