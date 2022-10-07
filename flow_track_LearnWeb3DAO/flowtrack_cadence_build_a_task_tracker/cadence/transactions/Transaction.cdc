// import HelloWorld from 0x01
import TaskTracker from 0x02

transaction(newGreeting: String) {

  // prepare(signer: AuthAccount) {}

  // execute {
    // HelloWorld.setGreeting(newGreeting: newGreeting)
  //}

  prepare(acct: AuthAccount) {
    let myTaskList <- TaskTracker.createTaskList()
    acct.save(<- myTaskList, to: /storage/MyTaskList)
    log("Created Resource")
  }

  execute {}
}
