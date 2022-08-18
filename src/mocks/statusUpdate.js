const selecetedTasks = (todos,isChecked, id) => { 
    if (isChecked) { 
        const newar = todos.map((obj) => {
          if (id === obj.index) { 
            todos[id].completed = isChecked; 
          }
          return obj;
        }); 
      } else { 
        console.log('false')
        const newarray = todos.map((item) => {
          if (id === item.index) {
            return { ...item, completed: false };
          }
          return item;
        }); 
    }
}

export default selecetedTasks;