const selecetedTasks = (todos, isChecked, id) => {
  if (isChecked) {
    todos.map((obj) => {
      if (id === obj.index) {
        todos[id].completed = isChecked;
      }
      return obj;
    });
  } else {
    todos.map((item) => {
      if (id === item.index) {
        return { ...item, completed: false };
      }
      return item;
    });
  }
};

export default selecetedTasks;