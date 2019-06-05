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
  // If task item input AND task title AND temp-list-area is empty, disable the Clear All button, else enable it.
   if(task == '' && title == '' && tempArea.innerText == ''){
     clearAll.disabled = true;
  } else {
     clearAll.disabled = false;
  }
  // If task title input is empty, or temp-list-area is empty, disable the Make Task List button, else enable it.
  if(title == '' || tempArea.innerHTML == ''){
     makeTaskListButton.disabled = true;
  } else {
   makeTaskListButton.disabled = false;
  }
// If task item input is empty, disable the Add Task [+] button
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
 //every time someone clicks the [+] button,
  //that item is added to the allTaskItems array and appended onto the temp-list
  allTaskItems.push(newItem);
  //the new Item is saved in this format: {content: "f", done: false, id: 1559708797718}
  toggleButtons();
  //this single item is then sent to the additemsToList function where it is added to the temporary area
  // or sidebar
  addItemsToList(newItem);
  addTaskBtn.disabled = true;
}
//this function deletes a single task from the temporary area
// when the X is clicked and also deletes it from the array 
function deleteTask(element) {
  element.preventDefault();
  var input = element.target.closest('li').getElementsByTagName('p')[0].innerHTML;
  //find the element that was deleted and match it with the element inside of allTaskItems array and remove it from there 
  //so that when the ticket is saved, the deleted item doesn't show up on the card 
  var noDeletedItems = allTaskItems.filter(function(task){
    return task.content !== input;   
  });
  
  allTaskItems = noDeletedItems;
  //remove the task from view 
  element.target.closest('li').remove();
}
//Function removes all of the items in the sidebar one by one . ie while items exist, remove them.

function removeAllTempItems() {
  //from a UL element - a child element is the LI element within it. The first child is the first LI element
  // so you are checking for as long as there is a first li element, delete the li's
  while (listItems.firstChild) {
    listItems.removeChild(listItems.firstChild);
    }
}
// Clear and reset everything including the temp-area-list, input fields, and toggle Make List and Clear All buttons
function clearSideBar() {
  //clear user input fields
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
//this function generates a todo task after the task was saved
function createTodo() {
  var newTodo = new Task(taskTitleInput.value, allTaskItems);
  newTodo.saveToStorage();
  todoTasks.push(newTodo);
  //display the task
  addTaskToDOM(newTodo);
  //remove all the temporary items from the sidebar
  removeAllTempItems();
  //clear User input fields
  taskItemInput.value = '';
  taskTitleInput.value = '';
}
//function adds todo card to the card list area in main
function addTaskToDOM(newTodoTask) {
  var taskUrgency = newTodoTask.urgency;
  var urgentImage;
  //determines which image to use depending on the current task's urgency boolean value
  if(taskUrgency){
    urgentImage ='images/urgent-active.svg';
  }else {
    urgentImage ='images/urgent.svg';
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

//adds each task that the user added in the sidebar to the card
function addTaskToCard(newTodoTask) {
  var checkboxImage;
  var taskListTotal = '';
  var taskComplete;
  for (var i = 0; i < newTodoTask.taskList.length; i++){
    //grabs the done boolean value from to_do list.js
    taskComplete = newTodoTask.taskList[i].done;
    //determines which image to use depending on if the task is complete
     if(taskComplete){
      checkboxImage = 'images/checkbox-active.svg';
    }else {
      checkboxImage = 'images/checkbox.svg';
    }
    //adding every list on top of the other
    taskListTotal += `
       <li class="task-card-populate">
        <img class="task-delete" src="${checkboxImage}" data-id=${newTodoTask.taskList[i].id} id="index ${i}"/>
        <p id="check-off-${taskComplete}">${newTodoTask.taskList[i].content}</p>
      </li>
      `
  }
  return taskListTotal;
}
//reloads task data on the page
function reloadData() {
//iterates over the old, tasks before loading and creates instances of a new task
var preLoadTodoTasks = todoTasks;
  //saving all of the new tasks into instances array
   var instances = preLoadTodoTasks.map(function(task) {
    task = new Task(task.title, task.taskList, task.urgency, task.id);
    return task;
  });
  todoTasks = instances;
  showReloadedTasks(todoTasks);
}

//display the tasks after reload
function showReloadedTasks(todoTasks) {
  todoTasks.forEach(function(data) {
    addTaskToDOM(data);
  });
}

// Target all of a card's buttons and create functionality for them according to their class names
function taskButtons(element) {
  //grab the task card
  var card = element.target.closest('.task-card');
  // save the card's id from its data id attribute
  var cardId = card.dataset.id;
  //find the index of the current card inside of the todoTasks array and save it
  var index = todoTasks.findIndex(function(task) {
    return task.id == cardId;});
  //if the element has a class of task card delete btn then evaluate this
  if (element.target.className === 'task-card-urgency-btn') {
    //target the card we want to make it urgent
    var cardToChangeUrgency = todoTasks[index];
    //updateToDo comes from todo_list.js and it changes the current urgency to the oppposite
    cardToChangeUrgency.updateToDo();
    mainCardSection.innerHTML = '';
    reloadData();
  }
  //if the element has a class of task card delete btn then evaluate this
  if (element.target.className === 'task-card-delete-btn') {
    var deleteObject = todoTasks[index].taskList;
    var completed = deleteObject.filter(function(element) {
    //return only the elements that have an attribute of done. Done comes from the to_do list.js file in the constructor
    return element.done === true;
  });

  if (completed.length === deleteObject.length) {
    todoTasks[index].deleteFromStorage(index);
    mainCardSection.innerHTML = '';
    reloadData();
  } else {
    alert('Complete the tasks before deleting the TODO Item.')
  }
}
  //if the element has a class name of task delete then do the following to delete the task
  if (element.target.className === 'task-delete') {

    //grab the taskId from the data attribute
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
