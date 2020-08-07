// Your code here

function createEmployeeRecord(array) {
  let employeeHash = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeHash
}

function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord)
}

function createTimeInEvent(employeeObj, datetime) {
  let datetimeHash = {
    type: "TimeIn",
    hour: parseInt(datetime.split(" ")[1]),
    date: datetime.split(" ")[0]
  }

  employeeObj.timeInEvents.push(datetimeHash)

  return employeeObj
}

function createTimeOutEvent(employeeObj, datetime) {
  let datetimeHash = {
    type: "TimeOut",
    hour: parseInt(datetime.split(" ")[1]),
    date: datetime.split(" ")[0]
  }

  employeeObj.timeOutEvents.push(datetimeHash)

  return employeeObj
}

function hoursWorkedOnDate(employeeObj, dateWorked) {
  let timeOut = employeeObj.timeOutEvents.filter(hash => hash.date === dateWorked)[0].hour
  let timeIn = employeeObj.timeInEvents.filter(hash => hash.date === dateWorked)[0].hour

  let hoursWorked = timeOut-timeIn
  return hoursWorked/100
}

function wagesEarnedOnDate(employeeObj, dateWorked) {
  let wage = employeeObj.payPerHour * hoursWorkedOnDate(employeeObj, dateWorked)
  return wage
}

function allWagesFor(employeeObj) {
  let dates = employeeObj.timeInEvents.map(hash => hash.date)
  let totalWage = dates.reduce((total, date) => total += wagesEarnedOnDate(employeeObj, date), 0)
  return totalWage
}

function calculatePayroll(arrayEmployeeObj) {
  let payroll = arrayEmployeeObj.reduce((total, employee) => total += allWagesFor(employee), 0)
  return payroll
}

function findEmployeeByFirstName(arrayEmployeeObj, name) {
  let employeeHash = arrayEmployeeObj.filter(employee => employee.firstName == name)[0]
  return employeeHash
}
