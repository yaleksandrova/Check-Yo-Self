var toDoArray =  JSON.parse(localStorage.getItem("toDo")) || [];
var searchInput = document.querySelector(".search-input");
var titleInput = document.querySelector(".title-input");
var itemInput = document.querySelector(".item-input");
var addTaskBtn = document.querySelector(".plus-btn");
var makeTaskList = document.querySelector(".make-task-btn");
var clearAllBtn = document.querySelector(".clear-all-btn");
var filterBtn = document.querySelector(".filter-btn");
var urgentBtn = document.querySelector(".urgent-btn");
var deleteItemBtn = document.querySelector("#nav-task-input");
var taskCard = document.querySelector(".task-card");
var removeCard = document.querySelector(".nav");
var navTaskContainer = document.querySelector("#input-container");
// var navTaskText = document.querySelectorAll(".nav-task-text");
var main = document.querySelector("main")

//Event Listeners
navTaskContainer.addEventListener('click', deleteTask);
addTaskBtn.addEventListener('click', makeItem);
makeTaskList.addEventListener('click', createNewCard);
itemInput.addEventListener('keyup', enableTaskBtn);



// taskCard.addEventListener('click', removeFromTaskList);
// clearAllBtn.addEventListener('keyup', clearAll);
// titleInput.addEventListener('keyup', disableBtns);
// itemInput.addEventListener('keyup', disableBtns);


function makeItem() {
  enableTaskBtn();
  navTaskContainer.innerHTML =
  `<section class="taskContainer">
    <input class="nav-task-delete-btn" id="nav-task-input" type="image" src="images/delete.svg" alt="delete button">
    <p class="nav-task-text">${itemInput.value}
    </p></input>
    </section>
    `+ navTaskContainer.innerHTML;
};

function deleteTask(e) {
  e.preventDefault()
  if( e.target.closest("#nav-task-input")) {
    e.target.closest("section").remove();
  }
};

function enableTaskBtn(){
  if (itemInput.value === "") {
    addTaskBtn.disabled = !addTaskBtn.disabled; 
  }
}
var newTask = new Task(titleInput.title, taskInput.task, Date.now(), );


function createNewCard(e) {
  e.preventDefault()
  main.innerHTML +=
   `<article class="task-Card">
  <header class="card-top">
  <h2 class="task-title">
  "title"
  
  </h2>
  </header>
  <output class="card-body">
  <ul class="task-list">
 
  "Card"
  </ul>
  </output>
  <footer class="card-bottom">
  <button class="urgent-btn">
  <img src="images/urgent.svg" alt="urgent-icon" class="urgent" id="js-urgent-svg" />
  <p class="urgent-text">URGENT</p>
  </button>
  <button class="delete-btn">
  <img src="images/delete.svg" alt="delete-icon" class="delete" id="js-delete-svg" />
  <p class="delete-text">DELETE</p>
  </button>
  </footer>
  </article>`
};

// function listArray (){
// for (var i = 0; i < navTaskText.length; i++ ){
//   navTaskContainer.innerHTML += `<li class="task-checkbox">${navTaskText[i]}</li>`
// }
// };



// function addNewTask() {
//   var ul = document.querySelector();
//   var newTask = new Task(titleInput.value, taskInput.value, Date.now(), );
//   clearInputs();
//   toDoArray.push(newTask);
//   newTask.saveToStorage(toDoArray);
//   addBtn.disabled = false;
//   createNewCard(newTask);
// };

// function clearAll(e){
  //   var id = parseInt(e.target.parentElement.parentElement.dataset.id);
  //   e.target.parentElement.parentElement.remove();
// 	var toDo = findTask(id);
// 	toDo.deleteFromStorage();
// };

// function removeFromTaskList(e) {
//   if (e.target.className === "delete") {
//     removeCard(e);
//   } else if (e.target.className === "urgent") {
//   	urgency(e, e.target.parentNode.parentNode.dataset.id);
//   };

// function makeTaskList(id) {
//   return toDoArray.find(function(toDo) {	
//     return toDo.id === id
//   })
// };

// function saveEdit(e) {
//   var element = e.target.id === ".title-input" ? 'title' : 'urgency'
//   if (e.keyCode === 13 || e.type === 'blur') {
//     var newValue = e.target.innerText;
//     var cardId = e.path[2].attributes[1].value
//     var index = findTheIndex(cardId);
//     toDoArray[index].updateToDo(toDoArray, element, newValue);
//   }
// };


// function createCardsOnLoad() {
//   var newArray = [];
//   toDoArray.forEach(function(task){
//     var newTask = new Task (task.title, task.body, task.id, task.urgency);
//     newArray.push(newTask);
//     createNewCard(newTask);
//   })

//   toDoArray = newArray;
// };


// function findTheIndex(id) {
//   var findTheIndex = toDoArray.findIndex(function(card) {
//     if (card.id === parseInt(id)) {
//       return card;
//     }
//   })

//   return findTheIndex;
// };


// function clearInputs() {
//   titleInput.value = '';
//   bodyInput.value = '';
// };

// function disableAddBtn() {
//   var disabledBtn = titleInput.value === '' || taskInput.value === '';
//   addBtn.disabled = disabledBtn;
// };

// function disableClearBtn() {
//   var Btn = titleInput.value === '' || taskInput.value === '';
//   clearBtn.disabled = disabledBtn;
// };

// //function editTaskCard() {
//   var editText = document.querySelectorAll('#js-idea-text');
//   for (var i = 0; i < editText.length; i++) {
//     editText.createElement('textarea');
//   }
// };//


// function filterTask(e) {
//   var searchTextField = e.target.value.toLowerCase();
//   var results = toDoArray.filter(function(toDo) {
//       return toDo.title.toLowerCase().includes(searchTextField) || toDo.body.toLowerCase().includes(searchTextField);
//     })
//     taskCard.innerText = '';
//     results.forEach(function(toDo) {
//       createNewCard(toDo);

