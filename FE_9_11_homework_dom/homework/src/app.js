const taskInput = document.querySelector('.taskInput');
const addTaskBtn = document.querySelector('.addTaskBtn');
const listOfTasks = document.querySelector('.listOfTasks');
const limitMsg = document.querySelector('.limitMsg');
const max_count = 10;
let draggingElement = null;
let counter = 1;

taskInput.addEventListener('input', function () {
  addTaskBtn.disabled = false;
});

addTaskBtn.addEventListener('click', function () {  
  let text = taskInput.value.trim();
  addItemToList(text);
  counter++;
  addTaskBtn.disabled = true;
  taskInput.value = ''; 
});

function addItemToList(text) {
  const checkIcon = createTag('i', 'class', 'material-icons', 'check_box_outline_blank');
  const checkboxItem = createTag('button', 'class', 'checkboxItem');
  const textItem = createTag('span', 'class', 'textOfItem', text);
  const deleteIcon = createTag('i', 'class', 'material-icons', 'delete');
  const deleteBtn = createTag('button', 'class', 'deleteItem');
  const list = createTag('li', 'class', 'itemOfList');
  list.setAttribute('draggable', true);
  
  checkboxItem.appendChild(checkIcon);
  deleteBtn.appendChild(deleteIcon);
  list.appendChild(checkboxItem);
  list.appendChild(textItem);
  list.appendChild(deleteBtn);
  listOfTasks.appendChild(list);
  
  deleteBtn.addEventListener('click', function () {
    list.remove();
    counter--;
    if (counter === max_count) {
      taskInput.disabled = false;
      limitMsg.style.display = 'none';
    }
  });
  
  checkboxItem.addEventListener('click', function () {
    checkIcon.textContent = 'check_box';
  });
  
  if (counter === max_count) {
    taskInput.disabled = true;
    addTaskBtn.disabled = true;
    limitMsg.style.display = 'block';
  }  
  
  dragging(list);
}

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

function dragging(listItem) {
  listItem.addEventListener('dragstart', dragStart, false);
  listItem.addEventListener('dragover', dragOver, false);
  listItem.addEventListener('dragleave', dragLeave, false);
  listItem.addEventListener('drop', drop, false);    
}

function dragStart(e) {
  draggingElement = this;    
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);
}

function dragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  if (draggingElement !== null) {
    this.classList.add('over');
  }
  e.dataTransfer.dropEffect = 'move';  
  return false;
}

function dragLeave(e) {
  this.classList.remove('over');
}

function drop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); 
  }
  
  if (draggingElement !== this && draggingElement !== null) {        
    this.parentNode.removeChild(draggingElement);
    let dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin', dropHTML);
    let dropElem = this.previousSibling;
    dragging(dropElem);    
  }
  this.classList.remove('over');
  draggingElement = null;
  return false;
}