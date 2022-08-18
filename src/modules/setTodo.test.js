/**
 * @jest-environment jsdom
 */
import setTodo from "./setTodo.js";
import getTodo from "./getTodo.js";
import removeTodo from "./removeTodo.js";
import renderAddedList from "./renderAddedList.js";

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
  
  global.localStorage = new LocalStorageMock();
  describe('Local storage data operations', () => {

    test('should add item to local storage', () => {
      let tasksList = getTodo().todo;
      const task1 = {description: 'task1', completed: false,  index: 1}
      const task2 = {description: 'Task 2', completed: false, index: 2}
      const task3 = {description: 'Task 3', completed: false, index: 3}
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
   
  /*  test('Remove Item from Local Storage', () => {
      const tasksList = getTodo().todo;
      removeTodo(tasksList[0].index);
      expect(getTodo().todo.length).toBe(0);
    })
  */
    });
   
    describe('check for add-delete operations', () => {
       test('properly remove task items', () => { 
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

          let tasksList = getTodo().todo; 
          const removeId = '2'; 
          const removeIdInt = parseInt(removeId, 10) - 1; 
          removeTodo(removeId); tasksList = getTodo().todo; 
          let tasksValueElt = document.querySelectorAll('.checkbox-task')[removeIdInt + 1];  
          expect(tasksList[removeIdInt].description).toBe('Task 3'); 
          expect(tasksList[removeIdInt].index).toEqual(removeIdInt + 1); 
          expect(tasksValueElt.value).toBe('Task 3');
      }) 
  }) 
 
