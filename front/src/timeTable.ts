const timeTableColum = document.getElementById("time-table-colum")
const weekDays = ["mon", "tue", "wen", "thu", "fri"]
fetch("/timeTableData").then(
    res => res.json()
).then(data => {
    if(data) {
      const originalTimeTable = data.originalTimeTable
      const myClassTimeTable = data.myClassTimeTable
      for(let i = 0; i < myClassTimeTable.length; i++) {
          const weekDay = document.createElement("div")
          weekDay.id = `${weekDays[i]}`
        for(let n = 0; n < myClassTimeTable[i].length; n++) {
            const subjectBox = document.createElement("div")
            subjectBox.classList.add(`subject`)
            if(originalTimeTable[i][n].subject !== myClassTimeTable[i][n].subject) {
                subjectBox.classList.add("subject-changed")
            }
            const subject = document.createElement("span")
            if(myClassTimeTable[i][n].subject !== "") {
                subject.innerText = myClassTimeTable[i][n].subject
            } else {
                subject.innerText = "ㅤ"
            }
            const teacher = document.createElement("span")
            if(myClassTimeTable[i][n].teacher !== "") {
                teacher.innerText = myClassTimeTable[i][n].teacher
            } else {
                teacher.innerText = "ㅤ"
            }
            subjectBox.append(subject, teacher)
            weekDay.append(subjectBox)
            timeTableColum?.append(weekDay)
        }
      }
    }
})