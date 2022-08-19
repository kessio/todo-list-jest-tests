import editList from '../mocks/editList.js';

const editTodo = (inputDiv) => {
  const input = inputDiv;
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const description = input.value;
      const inputId = input.id;
      if (description !== '') {
        editList(description, inputId);
        window.location.reload();
      } else {
        document.querySelector('.emptylist').style.display = 'block';
      }
    }
  });
};
export default editTodo;
