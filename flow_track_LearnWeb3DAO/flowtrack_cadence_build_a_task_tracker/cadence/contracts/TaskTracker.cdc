pub contract TaskTracker {

  pub resource TaskList {
    pub var tasks: [String]
    
    init() {
      self.tasks = []
    }

    pub fun addTask(task: String) {
      self.tasks.append(task)
    }

    pub fun removeTask(idx: Integer) {
      self.tasks.remove(at: idx)
    }
  }

  pub fun createTaskList(): @TaskList {
    let myTaskList <- create TaskList()

    // This will not work
    // let newTaskList = myTaskList

    // This will work
    // let newTaskList <- myTaskList
    
    return <- myTaskList
  }
 
}