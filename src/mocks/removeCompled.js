const removeComplete = (todos) => {
  const newlist = todos.filter((item) => item.completed !== true);
  return newlist;
};
export default removeComplete;