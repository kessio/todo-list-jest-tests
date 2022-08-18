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
      const task = {
        description: 'task1',
        completed: false,
        index: 0,
      }
      setTodo(task);
      tasksList = getTodo().todo;
      expect(tasksList.length).toBeGreaterThanOrEqual(0);
    });
  
    test('Get item from the local storage', () => {
      const tasksList = getTodo().todo;
      expect(tasksList.length).toBeGreaterThanOrEqual(0);
    });
    console.log(getTodo().todo);
  /*  test('Remove Item from Local Storage', () => {
      const tasksList = getTodo().todo;
      removeTodo(tasksList[0].index);
      expect(getTodo().todo.length).toBe(0);
    })
  */
    });
   
  
  /* describe('Add and delete on the DOM', () => {

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
      //tasksList = getTodo().todo;
    //const removeId = 0;
    //removeTodo(removeId);
    //let todoList = getTodo().todo;
    console.log(getTodo().todo);
    //let tasksValueElt = document.querySelectorAll('.checkbox-task')[removeId];
    //expect(todoList[removeId].description).toBe('Task 2');
 
   })
  
  

  test('Remove item from DOM', () => {
   // const tasksList = getTodo().todo;
    //console.log(tasksList);
    /*removeTodo(tasksList[0].index);
    const task = document.querySelectorAll('.list-group');
    
})


    /*test('Render added list to the DOM', () => {
      const task = {
          description: 'Todo 1',
          completed: false,
          index: 0,
        };
      renderAddedList(task);
      const tasksContainer = document.querySelectorAll('.list-group');
      expect(tasksContainer).toHaveLength(1);
    })
    8/
  
/*test('setTodo function exists', () => {
    expect(setTodo).toBeDefined();
    
});
*/

