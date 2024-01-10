import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import Header from './components/NewTaskForm';
import TodoList from './components/TaskList';
import Footer from './components/Footer';
import storage from './components/InitialData';

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

const App = () => {
  let [todoData, setData] = useState(JSON.parse(storage.getItem('todoData')));
  let [count, setCount] = useState(
    JSON.parse(storage.getItem('todoData')).filter((task) => {
      if (task.completed === false) {
        return true;
      }
      return false;
    }).length
  );
  let [filter, setFilter] = useState('All');
  const deleteTask = (id) => {
    setData(() => {
      let element = todoData.findIndex((el) => el.id === id);
      const newTodoData = [...todoData.slice(0, element), ...todoData.slice(element + 1)];
      storage.setItem('todoData', JSON.stringify(newTodoData));
      return newTodoData;
    });
  };
  const updateCount = () => {
    setCount(todoData.filter((task) => task.completed === false).length);
  };

  const onToggleCompleted = (id) => {
    setData(() => {
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
      return newArr;
    });
  };

  const onToggleEditing = (id) => {
    setData(() => {
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
      return newArr;
    });
  };

  const editTask = (id, line) => {
    setData(() => {
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
      return newArr;
    });
  };

  const addTask = (obj) => {
    setData(() => {
      let id = Math.random().toString(36).slice(2);
      let label = obj.taskTitle;
      let date = new Date();
      let newTask = {
        label: label,
        id: id,
        completed: false,
        editing: false,
        hidden: false,
        date: date,
        timer: [obj.minutes, obj.seconds],
        created: true,
      };
      let newTodoData = [...todoData, newTask];
      storage.setItem('todoData', JSON.stringify(newTodoData));
      return newTodoData;
    });
  };

  const getLabel = debounce((obj) => {
    addTask(obj);
    return true;
  });

  const onFilter = (id) => {
    setFilter(id);
    if (id === 'All') {
      setData(() => {
        const newTodoData = todoData.map((obj) => ({ ...obj, hidden: false }));
        storage.setItem('todoData', JSON.stringify(newTodoData));
        return newTodoData;
      });
    } else if (id === 'Active') {
      setData(() => {
        const newTodoData = todoData.map((obj) => {
          if (obj.completed === false) {
            return { ...obj, hidden: false };
          } else {
            return { ...obj, hidden: true };
          }
        });
        storage.setItem('todoData', JSON.stringify(newTodoData));
        return newTodoData;
      });
    } else {
      setData(() => {
        const newTodoData = todoData.map((obj) => {
          if (obj.completed === true) {
            return { ...obj, hidden: false };
          } else {
            return { ...obj, hidden: true };
          }
        });
        storage.setItem('todoData', JSON.stringify(newTodoData));
        return newTodoData;
      });
    }
  };

  const onClear = () => {
    setData(() => {
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
      return newTodoData;
    });
  };
  const onComplete = (e, id) => {
    setData(() => {
      let index = todoData.findIndex((el) => el.id === id);
      const newArr = todoData.map((obj) => {
        const newObject = Object.assign({}, obj);
        return newObject;
      });
      let task = newArr[index];
      task.timer = [0, e];
      newArr[index] = task;
      storage.setItem('todoData', JSON.stringify(newArr));
      return newArr;
    });
  };

  useEffect(() => {
    updateCount();
  }, [todoData]);

  useEffect(() => {
    setData(() => {
      const newArr = todoData.map((obj) => {
        const newObject = Object.assign({}, obj);
        newObject.created = false;
        return newObject;
      });
      storage.setItem('todoData', JSON.stringify(newArr));
      return newArr;
    });
  }, []);

  return (
    <section className="todoapp">
      <Header onTyped={getLabel} />
      <TodoList
        todos={todoData}
        onDeleted={deleteTask}
        onToggleEditing={onToggleEditing}
        onToggleCompleted={onToggleCompleted}
        editTask={editTask}
        onFilter={onFilter}
        filterValue={filter}
        onComplete={onComplete}
      />
      <Footer onFilter={onFilter} onClear={onClear} count={count} />
    </section>
  );
};

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
