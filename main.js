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
bottomSection.addEventListener('click', handleCardActions);
saveBtn.addEventListener('click', instantiateIdea);
titleInput.addEventListener('keyup', disableBtns);
bodyInput.addEventListener('keyup', disableBtns);
searchInput.addEventListener('keydown', filterIdeas);