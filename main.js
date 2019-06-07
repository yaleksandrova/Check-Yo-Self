var mainCardSection = document.querySelector('.card-list-area');
var cardTitle = document.getElementsByClassName('task-title');
var addTaskBtn = document.querySelector('.add-task-item-button');
var clearAll = document.querySelector('.clear-all-btn');
var tempArea = document.querySelector('.item-list-temp-area');
var makeTaskListButton = document.querySelector('.make-task-btn');
var notification = document.querySelector('.card-list-area-notif');
var taskTitleInput = document.querySelector('.add-todo-form-input');
var taskItemInput = document.querySelector('.add-task-item-input');
var allTaskItems = [];
var listItems = document.getElementById('list-items');
var todoTasks = JSON.parse(localStorage.getItem("todos")) || [];

// Event Listeners

addTaskBtn.addEventListener('click', saveAllInputItems);
mainCardSection.addEventListener('click', taskButtons);
clearAll.addEventListener('click', clearSideBar);
tempArea.addEventListener('click', deleteTask);
makeTaskListButton.addEventListener('click', saveTask);
taskItemInput.addEventListener('input', toggleButtons);
taskTitleInput.addEventListener('input', toggleButtons);

function notificationToggle() {
  if (todoTasks.length == 0) {
    notification.classList.remove("hidden")
  }
  else {
    notification.classList.add("hidden");
  }
}

window.onload = function(){
  reloadData();
  notificationToggle();
  toggleButtons();
  addTaskBtn.disabled = true;
};

function toggleButtons() {
  var task = taskItemInput.value;
  var title = taskTitleInput.value;

  if(task == '' && title == '' && tempArea.innerText == ''){
    clearAll.disabled = true;
  } else {
    clearAll.disabled = false;
  }
  
  if(title == '' || tempArea.innerHTML == ''){
    makeTaskListButton.disabled = true;
  } else {
  makeTaskListButton.disabled = false;
  }

  if(task == '' && tempArea.innerText !== '' ){

    addTaskBtn.disabled = true;
  } else {
    addTaskBtn.disabled = false;
  }
}

function addItemsToList(newItem) {
  var listHTML = `
    <li class="add-item" data-id="${newItem.id}" id="">
    <img class="delete-item" src="images/delete.svg" />
    <p class="add-item-text" id="content">${newItem.content}</p> </li>`
    tempArea.insertAdjacentHTML('beforeend', listHTML);
    taskItemInput.value = "";
}

function saveAllInputItems() {
  var newItem = new Items(taskItemInput.value);
  allTaskItems.push(newItem);
  toggleButtons();
  addItemsToList(newItem);
  addTaskBtn.disabled = true;
}

function deleteTask(element) {
  element.preventDefault();
  var input = element.target.closest('li').getElementsByTagName('p')[0].innerHTML;
  var noDeletedItems = allTaskItems.filter(function(task){
    return task.content !== input;   
  });
  
  allTaskItems = noDeletedItems;
  element.target.closest('li').remove();
}

function removeAllTempItems() {
  while (listItems.firstChild) {
    listItems.removeChild(listItems.firstChild);
    }
}

function clearSideBar() {
  taskItemInput.value = '';
  taskTitleInput.value = '';
  removeAllTempItems();
  toggleButtons();
  allTaskItems = [];
  }

function saveTask() {
  createTodo();
  notificationToggle();
  toggleButtons();
  addTaskBtn.disabled = true;
}

function createTodo() {
  var newTodo = new Task(taskTitleInput.value, allTaskItems);
  newTodo.saveToStorage();
  todoTasks.push(newTodo);
  
  addTaskToDOM(newTodo);
  removeAllTempItems();
  taskItemInput.value = '';
  taskTitleInput.value = '';
}

function addTaskToDOM(newTodoTask) {
  var taskUrgency = newTodoTask.urgency;

  if(taskUrgency){
  var urgentImage ='images/urgent-active.svg';
  }else {
  var urgentImage ='images/urgent.svg';
  }

  var singleCard = `<div class="task-card ${taskUrgency}" data-id="${newTodoTask.id}">
    <h2 class="task-title ${taskUrgency}">${newTodoTask.title}</h2>
    <div class="task-card-items ${taskUrgency}">
      <ul class="task-card-populate">
      ${addTaskToCard(newTodoTask)}
      </ul>
    </div>
    <div class="task-card-footer">
      <div class="task-card-footer-left">
        <img class="task-card-urgency-btn" id="urgent-img-${taskUrgency}" src="${urgentImage}">
        <p id="urgent-text-${taskUrgency}">URGENT</p>
      </div>
      <div class="task-card-footer-left">
        <img class="task-card-delete-btn" src="images/delete.svg">
        <p>DELETE</p>
      </div>
    </div>
  </div> `;

  mainCardSection.insertAdjacentHTML('afterbegin', singleCard)
  allTaskItems = [];
}

function addTaskToCard(newTodoTask) {
  var checkboxImage;
  var taskListTotal = '';
  for (var i = 0; i < newTodoTask.taskList.length; i++){
  var  taskComplete = newTodoTask.taskList[i].done;
  
    if(taskComplete){
      checkboxImage = 'images/checkbox-active.svg';
    }else {
      checkboxImage = 'images/checkbox.svg';
    }
  
    taskListTotal += `
      <li class="task-card-populate">
        <img class="task-delete" src="${checkboxImage}" data-id=${newTodoTask.taskList[i].id} id="index ${i}"/>
        <p id="check-off-${taskComplete}">${newTodoTask.taskList[i].content}</p>
      </li>
      `
  }
  return taskListTotal;
}

function reloadData() {
  var preLoadTodoTasks = todoTasks;
  var instances = preLoadTodoTasks.map(function(task) {
    task = new Task(task.title, task.taskList, task.urgency, task.id);
    return task;
  });
  todoTasks = instances;
  showReloadedTasks(todoTasks);
}

function showReloadedTasks(todoTasks) {
  todoTasks.forEach(function(data) {
    addTaskToDOM(data);
  });
}

function taskButtons(element) {
  var card = element.target.closest('.task-card');
  var cardId = card.dataset.id;
  var index = todoTasks.findIndex(function(task) {
    return task.id == cardId;});

    
  if (element.target.className === 'task-card-urgency-btn') {
    var cardToChangeUrgency = todoTasks[index];
    cardToChangeUrgency.updateToDo();
    mainCardSection.innerHTML = '';
    reloadData();
  }
  
  if (element.target.className === 'task-card-delete-btn') {
    var allTasksInParticularCard = todoTasks[index].taskList;
    var completed = allTasksInParticularCard.filter(function(element) {
    return element.done === true;
  });

  if (completed.length === allTasksInParticularCard.length) {
    todoTasks[index].deleteFromStorage(index);
    mainCardSection.innerHTML = '';
    reloadData();
  } else {
    alert('Complete the tasks before deleting the TODO Item.')
  }
}

  if (element.target.className === 'task-delete') {

    var taskId = element.target.dataset.id;
    var todo = todoTasks[index];
    var currentTaskIndex = todo.taskList.findIndex(function(item) {
    return item.id == taskId;
  });

    todo.updateTask(currentTaskIndex);
    todo.saveToStorage();
    mainCardSection.innerHTML = '';
    reloadData();
  }
  notificationToggle();
}

// Title Filter  //

var searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', filterTodos);

function filterTodos(e) {
  var searchTextField = e.target.value.toLowerCase();
  var results = todoTasks.filter(function(task) {
    return task.title.toLowerCase().includes(searchTextField);
  })

  mainCardSection.innerHTML = '';
  results.forEach(function(task) {
    addTaskToDOM(task);
  })
};

// Urgent Filter //


var filterUrgencyBtn = document.querySelector('.filter-urgency-btn');
filterUrgencyBtn.addEventListener('click', filterUrgency);

function filterUrgency() {
  filterUrgencyBtn.dataset.urgency === "true";

  toggleButtons();

  var filterUrgencyResults = todoTasks.filter(function(task) {
    return task.urgency === true;
  })

  mainCardSection.innerHTML = '';
  filterUrgencyResults.forEach(function(card) {
    addTaskToDOM(card);
  })
};


