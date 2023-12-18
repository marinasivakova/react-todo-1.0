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

export default storage;
