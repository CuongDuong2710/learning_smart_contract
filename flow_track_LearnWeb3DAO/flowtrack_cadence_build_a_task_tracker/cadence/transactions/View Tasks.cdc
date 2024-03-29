import TaskTracker from 0x02

transaction() {

    prepare(acct: AuthAccount) {
        let myTaskList = acct.borrow<&TaskTracker.TaskList>(from: /storage/MyTaskList)
            ?? panic("Nothing lives at this path")

        log(myTaskList.tasks)
    }

    execute {}
}