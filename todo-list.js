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


