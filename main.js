var addTaskItemButton = document.querySelector('.add-task-item-button');
var cardArea = document.querySelector('.card-list-area');
var cardTitle = document.getElementsByClassName('card-list-area__task-card-title');
var clearAll = document.querySelector('.clear-all-btn');
var deleteListItemFromSidebar = document.querySelector('.sidebar__insert-list--delete-button');
var listArea = document.querySelector('.item-list-temp-area');
var makeTaskListButton = document.querySelector('.make-task-btn');
var message = document.querySelector('.card-list-area-notif');
var taskItemInput = document.querySelector('.add-task-item-input');
var taskTitleInput = document.querySelector('.add-todo-form-input');
var taskItems = [];
var todoTasks = JSON.parse(localStorage.getItem("todos")) || [];

// Event Listeners

addTaskItemButton.addEventListener('click', saveAllInputItems);
cardArea.addEventListener('click', targetTaskButtons);
clearAll.addEventListener('click', clearEverything);
listArea.addEventListener('click', deleteTask);
makeTaskListButton.addEventListener('click', saveTask);
taskItemInput.addEventListener('input', enableDisableButtons);
taskTitleInput.addEventListener('input', enableDisableButtons);


window.onload = function(){
  repopulateDataAfterReload();
  messageToggle();
  enableDisableButtons();
};

function messageToggle() {
  if (todoTasks.length == 0) {
    message.classList.remove("hidden") 
  }
  else {
    message.classList.add("hidden");
  }
}

// Sidebar functions

function enableDisableButtons() {
  
  //ternary operator
  taskItemInput.value == '' ?  addTaskItemButton.disabled = true : addTaskItemButton.disabled = false;

  taskTitleInput.value == '' || listArea.innerHTML == '' ? 
    makeTaskListButton.disabled = true : 
    makeTaskListButton.disabled = false;
  
  taskItemInput.value == '' && taskTitleInput.value == '' && listArea.innerText == '' ? 
    clearAll.disabled = true : 
    clearAll.disabled = false;
}

function addItemsToList(newItem) {
  var listHTML = `
    <li class="sidebar__insert-list item" data-id="${newItem.id}" id="">
      <img class="sidebar__insert-list--delete-button item" src="images/delete.svg" alt="Delete task from sidebar list"/>
      <p class="sidebar__insert-list--text item">${newItem.content}</p>
    <!-- //newItem.content displays the input text -->
    </li>`
    listArea.insertAdjacentHTML('beforeend', listHTML);
  taskItemInput.value = "";
}

function deleteTask(e) {
  e.preventDefault();
  e.target.closest('li').remove();
}

function deleteAllSidebarListItems() {
  var removeLiNodes = document.getElementById('list-items');
  while (removeLiNodes.firstChild) {
    removeLiNodes.removeChild(removeLiNodes.firstChild);
  }
}

function saveAllInputItems() {
  var newItem = new Items(taskItemInput.value);
  
  taskItems.push(newItem);
  addItemsToList(newItem);
  
  enableDisableButtons();
}

// On sidebar button click population functions 

function saveTask() {
  
  createTodoTask();
  
  messageToggle();
  
  enableDisableButtons();
}

function createTodoTask() {
  var newTodoTask = new Task(taskTitleInput.value, taskItems);
  
  todoTasks.push(newTodoTask);
  
  newTodoTask.saveToStorage();
  
  appendTaskToDOM(newTodoTask);
  
  deleteAllSidebarListItems();
  
  clearInputFields();
}

function appendTaskToDOM(newTodoTask) {
  var card = `
  <div class="card-list-area__task-card ${newTodoTask.urgency}" id="task-card" data-id="${newTodoTask.id}">
    <h3 class="card-list-area__task-card-title ${newTodoTask.urgency}">${newTodoTask.title}</h3>
    <div class="card-list-area__task-card__items ${newTodoTask.urgency}">
      <ul class="card-list-area__populate">
      ${appendTaskToTask(newTodoTask)}
      </ul>
    </div>
    <div class="card-list-area__task-card__footer">
      <div class="card-list-area__task-card__footer--left">
        <img class="card-list-area__task-card__footer--urgency-button" id="urgent-img-${newTodoTask.urgency}" src="${newTodoTask.urgency ? 'images/urgent-active.svg' : 'images/urgent.svg'}">
        <p id="urgent-text-${newTodoTask.urgency}">URGENT</p>
      </div>
      <div class="card-list-area__task-card__footer--right">
        <img class="card-list-area__task-card__footer--delete-button" src="images/delete.svg">
        <p>DELETE</p>
      </div>
    </div>
  </div>
  `;
  
  cardArea.insertAdjacentHTML('afterbegin', card)
  taskItems = [];
}

function appendTaskToTask(newTodoTask) {
  var taskListIteration = '';
  
  for (var i = 0; i < newTodoTask.taskList.length; i++){
    taskListIteration += `
      <li class="card-list-area__populate--li">

<!-- //change the done method --> 
        <img class="card__task-delete" src=${newTodoTask.taskList[i].done ? 'images/checkbox-active.svg' : 'images/checkbox.svg'} alt="Delete task from card" data-id=${newTodoTask.taskList[i].id} id="index ${i}"/>
        <p id="check-off-${newTodoTask.taskList[i].done}">${newTodoTask.taskList[i].content}</p>
      </li>
      `
  } 
  
  return taskListIteration;
}

function repopulateDataAfterReload() {
  var oldTodoTasks = todoTasks;
  var newInstances = oldTodoTasks.map(function(datum) {
    datum = new Task(datum.title, datum.taskList, datum.urgency, datum.id);
    return datum;
  });
  
  todoTasks = newInstances;
  restoreTasks(todoTasks);
}

function restoreTasks(todoTasks) {
  todoTasks.forEach(function(datum) {
    appendTaskToDOM(datum);
  });
}

// Target card buttons functions 

function targetTaskButtons(e) {
  if (e.target.className === 'card-list-area__task-card__footer--urgency-button') {
    targetTaskUrgent(e);
  }
  if (e.target.className === 'card-list-area__task-card__footer--delete-button') {
    targetTaskForDeletion(e);
  }
  if (e.target.className === 'card__task-delete') {
    targetListItem(e);
  }
  messageToggle();
}

function targetTaskUrgent(e) {
  var card = e.target.closest('.card-list-area__task-card');
  var index = findTaskIndex(card);
  makeTaskDataUrgent(index);
}

function makeTaskDataUrgent(index) {
  var cardToMakeUrgent = todoTasks[index];
  cardToMakeUrgent.updateToDo();
  cardArea.innerHTML = '';
  repopulateDataAfterReload();
}

function targetTaskForDeletion(e) {
  var card = e.target.closest('.card-list-area__task-card');
  var index = findTaskIndex(card);
  activateDeleteBtn(index);
}

// Delete buttons 

function activateDeleteBtn(index) {
  var deleteObj = todoTasks[index].taskList;
  var newArray = deleteObj.filter(function(element) {
    return element.done === true;
  });
  
  if (newArray.length === deleteObj.length) {
    deleteTaskData(index);
  } else {
    alert('Complete the tasks before deleting the TODO Item.')
  }
}

function deleteTaskData(index) {
  todoTasks[index].deleteFromStorage(index);
  cardArea.innerHTML = '';
  repopulateDataAfterReload();
}

function findTaskIndex(card) {
  var cardId = card.dataset.id;
   
  //return refactor 
  return todoTasks.findIndex(function(item) {
    return item.id == cardId;
  });
}

function findItemIndex(todoObject, taskId) {
  return todoObject.taskList.findIndex(function(item) {
    return item.id == taskId;
  });
}

function targetListItem(e) {
  var taskId = e.target.dataset.id;
  var card = e.target.closest('.card-list-area__task-card');
  
  var index = findTaskIndex(card);
  var todoObject = todoTasks[index];
  var specificTaskIndex = findItemIndex(todoObject, taskId);
  todoObject.updateTask(specificTaskIndex);
  todoObject.saveToStorage();
  cardArea.innerHTML = '';
  repopulateDataAfterReload();
}

// Global clearing functions 

function clearEverything(e) {
  deleteAllSidebarListItems();
  clearInputFields();
  taskItems = [];
  enableDisableButtons();
}

function clearInputFields() {
  taskItemInput.value = '';
  taskTitleInput.value = '';
}
