window.addEventListener('load', window.onhashchange = () => {
  if (localStorage.getItem('todoItems')) {
    todoItems = storage.getSortedTasks();
  }
  page.load();
});

const rootNode = document.getElementById('root');

let todoItems = [];

const pages = {
  main(todoItems) {
    const todoListPage = createTag('div', 'id', 'main');
    const headerOfList = createTag('h1', 'class', 'headerOfList', 'Simple TODO application');
    const btnTask = createTag('div', 'class', 'btnTask');
    const addTaskBtn = createTag('button', 'class', 'addTaskBtn', 'Add new task');
    const listOfTasks = createTag('ul', 'class', 'listOfTasks');
    const emptyList = createTag('p', 'class', 'empty-todo', 'TODO is empty');
    
    btnTask.appendChild(addTaskBtn);
    todoListPage.appendChild(headerOfList);
    todoListPage.appendChild(btnTask);
    todoListPage.appendChild(listOfTasks);
    todoListPage.appendChild(emptyList);
    
    if (todoItems.length) {
      for (let task of todoItems) {
        const itemOfList = createTag('li', 'id', task.id);
        const checkbox = createTag('button', 'class', task.isDone ? 'checked' : 'unchecked');
        const todoText = createTag('button', 'class', 'textOfItem', task.description);
        const remove = createTag('button', 'class', 'remove');
        
        if(task.isDone ) {
          itemOfList.style.backgroundColor = 'gray';
          todoText.style.backgroundColor = 'gray';
        }
        
        checkbox.addEventListener('click', function () {  
          checkbox.className = 'checked';
          storage.setTaskDone(task.id);
          listOfTasks.appendChild(itemOfList);
          itemOfList.style.backgroundColor = 'gray';
          todoText.style.backgroundColor = 'gray';
          checkbox.disabled = false;
        });
        
        todoText.addEventListener('click', function () {  
          window.location.hash = `/modify/${task.id}`;
        });
        
        remove.addEventListener('click', function () {  
          itemOfList.remove();
          storage.removeTask(task.id);
        });
        
        itemOfList.appendChild(checkbox);
        itemOfList.appendChild(todoText);
        itemOfList.appendChild(remove);
        
        listOfTasks.appendChild(itemOfList);
      }
    }
    
    addTaskBtn.addEventListener('click', function () {  
      window.location.hash = '/add';
    });
    
    return todoListPage;
  },
  
  add() {
    const addItemPage = createTag('div', 'id', 'add');
    const addHeader = createTag('h1', 'class', 'addHeader', 'Add task');
    const taskInput = createTag('input', 'type', 'text');
    taskInput.className = 'taskInput';
    const addBtns = createTag('div', 'id', 'addBtns');
    const cancelBtn = createTag('button', 'id', 'cancelBtn', 'Cancel');
    const saveBtn = createTag('button', 'id', 'saveBtn', 'Save changes');
    saveBtn.disabled = true;
    
    addBtns.appendChild(cancelBtn);
    addBtns.appendChild(saveBtn);
    addItemPage.appendChild(addHeader);
    addItemPage.appendChild(taskInput);
    addItemPage.appendChild(addBtns);
    
    taskInput.addEventListener('input', function () {
      const description = taskInput.value.trim();
      
      saveBtn.disabled = false;
    });
    
    cancelBtn.addEventListener('click', function () {  
      window.location.hash = '/main';
    });
    
    saveBtn.addEventListener('click', function () {  
      storage.addNewTask(taskInput.value.trim());
      window.location.hash = '/main';
    });
    
    return addItemPage;
  },
  
  modify(task) { 
    const modifyItemPage = createTag('div', 'id', 'modify');
    const modifyHeader = createTag('h1', 'class', 'modifyHeader', 'Modify item');
    const taskModify = createTag('input', 'type', 'text');
    taskModify.className = 'taskModify';
    const addBtns = createTag('div', 'id', 'addBtns');
    const cancelBtn = createTag('button', 'id', 'cancelBtn', 'Cancel');
    const saveBtn = createTag('button', 'id', 'saveBtn', 'Save changes');
    saveBtn.disabled = true;
    
    addBtns.appendChild(cancelBtn);
    addBtns.appendChild(saveBtn);
    modifyItemPage.appendChild(modifyHeader);
    modifyItemPage.appendChild(taskModify);
    modifyItemPage.appendChild(addBtns);
    
    taskModify.addEventListener('input', function () {
      const description = taskModify.value.trim();
      
      saveBtn.disabled = false;
    });
    
    cancelBtn.addEventListener('click', function () {  
      window.location.hash = '/main';
    });
    
    saveBtn.addEventListener('click', function () {  
      storage.setDescription(task.id, modifyItemPage.querySelector('input').value.trim());
      window.location.hash = '/main';
    });
    
    return modifyItemPage;
  }
};

function createTag(nameOfTag, attributename = '', attributevalue = '', textNode = '') {
  const tag = document.createElement(nameOfTag);
  
  if (attributename && attributevalue) {
    tag.setAttribute(attributename, attributevalue);
  }
  
  if (textNode) {
    tag.appendChild(document.createTextNode(textNode));
  }
  
  return tag;
}

const storage = {
  addNewTask(description) {
    const id = '' + (new Date()).getTime();
    const task = {description, id, isDone: false};
    todoItems.push(task);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    return todoItems;
  },
  
  getAllTasks() {
    return JSON.parse(localStorage.getItem('todoItems'));
  },
  
  getTask(id) {
    return this.getAllTasks().find(task => task.id === id);
  },
  
  getCheckedTask() {
    return this.getAllTasks().filter(task => task.isDone === true);
  },
  
  getUncheckedTask() {
    return this.getAllTasks().filter(task => task.isDone === false);
  },
  
  getSortedTasks() {
    return this.getUncheckedTask().concat(this.getCheckedTask());
  },
  
  setTaskDone(id) {
    const updatedList = this.getAllTasks().map(task => {
      if (task.id === id) {
        task.isDone = true;
      }
      return task;
    });
    localStorage.setItem('todoItems', JSON.stringify(updatedList));
    return todoItems;
  },
  
  setDescription(id, description) {
    const updatedList = this.getAllTasks().map(task => {
      if (task.id === id) {
        task.description = description;
      }
      return task;
    });
    localStorage.setItem('todoItems', JSON.stringify(updatedList));
    return todoItems;
  },
  
  removeTask(id) {
    const updatedList = this.getAllTasks().filter(task => task.id !== id);
    localStorage.setItem('todoItems', JSON.stringify(updatedList));
    return todoItems;
  }
};

const page = {
  load() {
    const hash = window.location.hash;
    
    if (hash.endsWith('/add')) {
      this.add();
      } else if ((/\/modify\/\d+$/).test(hash)) {
      const id = hash.slice(hash.lastIndexOf('/') + 1);
      this.modify(id);
      } else {
      this.main(); 
    }
  },
  
  main() {
    rootNode.innerHTML = '';
    rootNode.appendChild(pages.main(todoItems));
  },
  
  add() {
    rootNode.innerHTML = '';
    rootNode.appendChild(pages.add());
  },
  
  modify(id) {
    const task = storage.getTask(id);
    rootNode.innerHTML = '';
    rootNode.appendChild(pages.modify(task));
  }
};