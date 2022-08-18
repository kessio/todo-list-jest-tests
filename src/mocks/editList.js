import getTodo from '../modules/getTodo.js';
const editList = (description, inputId) => {
 const list = getTodo();
 const todoArray = list.todo;
 const index = inputId.replace('input', '');
 const newlist = todoArray.filter((item) => parseInt(index, 10) !== item.index);
   const mtindex = parseInt(index, 10);
   const todoObject = { description, completed: false, index: mtindex };
   newlist.push(todoObject);
   localStorage.setItem('todo', JSON.stringify(newlist));
}

export default editList;