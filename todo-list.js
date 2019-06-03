class Task {
  constructor(title, task, id, urgency) {
    this.title = title;
    this.task = task;
    this.id = id;
    this.urgency = urgency || false;
  };

  saveToStorage(toDoArray) {
    localStorage.setItem("task", JSON.stringify(toDoArray));
  };

  deleteFromStorage(toDo) {
    var indexFound = toDoArray.indexOf(this);
    toDoArray.splice(indexFound, 1);
    this.saveToStorage(toDoArray);
  };

  updateToDo(toDoArray, element, newValue) {
    this.urgency = !this.urgency;
    if (element === 'title') {
      this.title = newValue
    } else if (element === 'urgency') {
      this.body = newValue
    }

    this.saveToStorage(toDoArray)
  };
  
  updateTask(vote) {
      if (this.quality <= 2) {
        this.quality++;
       } else {
      if (this.quality > 0) {
        this.quality--;
      }
    }
    
    var task = JSON.parse(localStorage.getItem("toDo"));
    toDo[this.id].quality = this.quality;
    localStorage.setItem("toDo", JSON.stringify(toDo));
  };
};