class Task {
  constructor(title, taskItems, urgency, id) {
    this.title = title;
    this.taskList = taskItems;
    this.urgency = urgency || false;
    this.id = id || Date.now();
  }

  saveToStorage() {
    localStorage.setItem("todos", JSON.stringify(todoTasks));
  }

  deleteFromStorage(index) {
    todoTasks.splice(index, 1);
    this.saveToStorage();
  }

  updateToDo() {
    this.urgency = !this.urgency; 
    this.saveToStorage();
  }

  updateTask(index) {
    this.taskList[index].done = !this.taskList[index].done;
    this.saveToStorage();
  }
}


