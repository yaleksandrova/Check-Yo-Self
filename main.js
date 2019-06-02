var toDoArray =  JSON.parse(localStorage.getItem("toDo")) || [];
var searchInput = document.querySelector(".search-input");
var titleInput = document.querySelector(".title-input");
var itemInput = document.querySelector(".item-input");
var addBtn = document.querySelector(".plus-btn");
var makeTaskBtn = document.querySelector(".make-task-btn");
var clearAllBtn = document.querySelector(".clear-all-btn");
var filterBtn = document.querySelector(".filter-btn");
var urgentBtn = document.querySelector(".urgent-btn");
var deleteBtn = document.querySelector(".delete-btn");
var taskCard = document.querySelector(".task-card");


//Event Listeners
main.addEventListener('click', handleCardActions);
makeTaskBtn.addEventListener('click', instantiateTask);
titleInput.addEventListener('keyup', disableBtns);
itemInput.addEventListener('keyup', disableBtns);
searchInput.addEventListener('keydown', filterTasks);


function saveEdit(e) {
  var element = e.target.id === ".title-input" ? 'title' : 'urgency'
  if (e.keyCode === 13 || e.type === 'blur') {
    var newValue = e.target.innerText;
    var cardId = e.path[2].attributes[1].value
    var index = findTheIndex(cardId);
    toDoArray[index].updateToDo(toDoArray, element, newValue);
  }
};
function createCardsOnLoad() {
  var newArray = [];
  toDoArray.forEach(function(task){
    var newTask = new Task (task.title, task.body, task.id, task.urgency);
    newArray.push(newTask);
    createNewCard(newTask);
  })

  toDoArray = newArray;
};

function createNewCard(task) {
  var template = document.getElementById('new-card-template');
  var clone = template.content.cloneNode(true);
  var star = idea.star ? 'Images/star-active.svg' : 'Images/star.svg';
  clone.getElementById('article-card').setAttribute('data-id', idea.id);
  clone.getElementById('js-favoriteBtn').setAttribute('src', star);
  clone.getElementById('js-idea-title').innerText = task.title;
  clone.getElementById('js-idea-title').addEventListener('keyup', saveEdit);
  clone.getElementById('js-idea-title').addEventListener('blur', saveEdit);
  clone.getElementById('js-idea-body').innerText = task.task;
  clone.getElementById('js-idea-body').addEventListener('keyup', saveEdit);
  clone.getElementById('js-idea-body').addEventListener('blur', saveEdit);
  clone.getElementById('js-quality-value').innerText = task.urgency;
  main.insertBefore(clone, bottomSection.firstChild);
};

createCardsOnLoad();

function findTheIndex(id) {
  var findTheIndex = toDoArray.findIndex(function(card) {
    if (card.id === parseInt(id)) {
      return card;
    }
  })

  return findTheIndex;
};

function instantiateTask() {
  var newTask = new Task(titleInput.value, taskInput.value, Date.now(), );
  clearInputs();
  toDoArray.push(newTask);
  newTask.saveToStorage(toDoArray);
  saveBtn.disabled = true;
  createNewCard(newTask);
};

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
};

function disableBtns() {
  var disabledBtn = titleInput.value === '' || taskInput.value === '';
  saveBtn.disabled = disabledBtn;
};

// //function editTaskCard() {
//   var editText = document.querySelectorAll('#js-idea-text');
//   for (var i = 0; i < editText.length; i++) {
//     editText.createElement('textarea');
//   }
// };//

function findTask(id) {
  return toDoArray.find(function(toDo) {	
    return toDo.id === id
  })
};

function handleCardActions(e) {
  if (e.target.className === "delete") {
    removeCard(e);
  } else if (e.target.className === "urgent") {
  	urgency(e, e.target.parentNode.parentNode.dataset.id);
  // } else if (e.target.className === 'up-arrow') {
//     changeQuality(e, e.target.parentNode.parentNode.dataset.id);
//   }
// };

function removeCard(e){
  var id = parseInt(e.target.parentElement.parentElement.dataset.id);
  e.target.parentElement.parentElement.remove();
	var toDo = findTask(id);
	toDo.deleteFromStorage();
};

// function filterTask(e) {
//   var searchTextField = e.target.value.toLowerCase();
//   var results = toDoArray.filter(function(toDo) {
//       return toDo.title.toLowerCase().includes(searchTextField) || toDo.body.toLowerCase().includes(searchTextField);
//     })
//     taskCard.innerText = '';
//     results.forEach(function(toDo) {
//       createNewCard(toDo);
    // })
