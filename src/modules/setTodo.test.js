/**
 * @jest-environment jsdom
 */
import setTodo from './setTodo.js';
import getTodo from './getTodo.js';
import removeTodo from './removeTodo.js';
import editList from './editList.js';

jest
  .spyOn(document, 'querySelector')
  .mockImplementation(() => document.createElement('div'));

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

const templateInput = (task) => {
  document.body.innerHTML += `
    <div class="list-group"> 
      <div class="list-cont"> 
        <input type="checkbox" ${task.completed ? 'checked' : ''} name="checkbox" class="checkboxlabel" > 
        <input type="text" readonly="true" class="checkbox-task" value="${task.description}" id="${task.index}"> 
      </div>
    </div> `;
  return document.body.innerHTML;
};

global.localStorage = new LocalStorageMock();
describe('Local storage data operations', () => {
  test('should add item to local storage', () => {
    let tasksList = getTodo().todo;
    const task1 = { description: 'task1', completed: false, index: 1 };
    const task2 = { description: 'Task 2', completed: false, index: 2 };
    const task3 = { description: 'Task 3', completed: false, index: 3 };
    setTodo(task1);
    setTodo(task2);
    setTodo(task3);
    tasksList = getTodo().todo;
    expect(tasksList.length).toBeGreaterThanOrEqual(3);
  });

  test('Get item from the local storage', () => {
    const tasksList = getTodo().todo;
    expect(tasksList.length).toBeGreaterThan(0);
  });
});

describe('check for add-delete operations', () => {
  document.body.innerHTML = ` 
          <div class="list-group"> 
            <div class="list-cont"> 
              <input type="checkbox" name="checkbox" class="checkboxlabel" > 
              <input type="text" readonly="true" class="checkbox-task" value="Task 1" id="0"> 
            </div>
          </div> 
          <div class="list-group"> 
            <div class="list-cont"> 
              <input type="checkbox" name="checkbox" class="checkboxlabel" > 
              <input type="text" readonly="true" class="checkbox-task" value="Task 2" id="1"> 
            </div> 
          </div> 
          <div class="list-group"> 
            <div class="list-cont"> 
              <input type="checkbox" name="checkbox" class="checkboxlabel" > 
              <input type="text" readonly="true" class="checkbox-task" value="Task 3" id="2"> 
            </div> 
          </div>`;
  test('properly remove task items', () => {
    let tasksList = getTodo().todo;
    const removeId = '2';
    const removeIdInt = parseInt(removeId, 10) - 1;
    removeTodo(removeId);
    tasksList = getTodo().todo;
    const tasksValueElt = document.querySelectorAll('.checkbox-task')[removeIdInt + 1];
    expect(tasksList[removeIdInt].description).toBe('Task 3');
    expect(tasksList[removeIdInt].index).toEqual(removeIdInt + 1);
    expect(tasksValueElt.value).toBe('Task 3');
  });

  test('Add task items', () => {
    const task4 = { description: 'task4', completed: false, index: 4 };
    templateInput(task4);
    const tasksValueElt2 = document.querySelectorAll('.checkbox-task');
    let idParse = tasksValueElt2[task4.index - 1].id;
    idParse = parseInt(idParse, 10);
    expect(tasksValueElt2[task4.index - 1].value).toBe('task4');
    expect(idParse).toBe(task4.index);
  });
});

describe('Edit to do list operations', () => {
  
  test('Check if to do list can be edited', () => {
    const editedData = "Task 1 has been edited"
    editList(editedData, 'input1');
    const todoList = getTodo().todo;
   // const indexNumber = todoList
    console.log(todoList);
    expect(todoList[todoList.length - 1].description).toBe(editedData);
  })
});
