import TaskTracker from 0x02

transaction(newGreeting: String) {

  prepare(acct: AuthAccount) {
    let myTaskList <- TaskTracker.createTaskList()
    acct.save(<- myTaskList, to: /storage/MyTaskList)
    log("Created Resource")
  }

  execute {}
}
