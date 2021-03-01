/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(record){
    const employee = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(records){
    return records.map(e => createEmployeeRecord(e))
}
    

// function createTimeInEvent(dateStamp){
//     this.timeInEvents.push({
//         type: 'TimeIn',
//         hour: parseInt(dateStamp.substring(11, 15)),
//         date: dateStamp.substring(0, 10)
//     })
//     return this
// }

// function createTimeOutEvent(dateStamp){
//     this.timeOutEvents.push({
//         type: 'TimeOut',
//         hour: parseInt(dateStamp.substring(11, 15)),
//         date: dateStamp.substring(0, 10)
//     })
//     return this
// }

function createTimeInEvent(dateStamp){
    const array = dateStamp.split(' ')
    const hour = array[1]
    const date = array[0]

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date,
    })
    return this
}

function createTimeOutEvent(dateStamp){
    const array = dateStamp.split(' ')
    const hour = array[1]
    const date = array[0]

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date,
    })
    return this
}

function hoursWorkedOnDate(date){
    let timeIn = this.timeInEvents.find((e) => e.date === date).hour
    let timeOut = this.timeOutEvents.find((e) => e.date === date).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(records, firstName){
    let found
    records.forEach(element => {
        if (element.firstName === firstName){
            found = element
        }
    })
    return found
}

function calculatePayroll(records){
    let totalWages = 0
    records.forEach(element => {
        totalWages = totalWages + allWagesFor.call(element)
    })
    return totalWages
}