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
      const task = {description: 'task1', completed: false,  index: 0}
      const task1 = {description: 'Task 2', completed: false, index: 1}
      const task2 = {description: 'Task 3', completed: false, index: 2}
      setTodo(task);
      setTodo(task1);
      setTodo(task2);
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
   
    
 
