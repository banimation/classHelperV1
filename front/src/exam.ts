const performanceBtn = document.getElementById("performance")!
const peperBtn = document.getElementById("peper")!
const performanceContainer = document.getElementById("performance-container")!
const peperContainer = document.getElementById("peper-container")!
const performanceArr: Array<{subject:string, type:string, date:string, description:string, id:string}> = []
const peperArr: Array<{subject:string, type:string, date:string, description:string, id:string}> = []

fetch("/examData").then(
    res => res.json()
).then(data => {
    if(data) {
        Array.from(data).forEach((val: any) => {
            if(val.type === "performance") {
                performanceArr.push(val)
            } else {
                peperArr.push(val)
            }
        })
        Array.from(performanceArr.reverse()).forEach((vals) => {
            console.log('a')
            let subjectName = ""
            switch(vals.subject) {
                case "korean":
                    subjectName = "문학"
                    break
                case "math":
                    subjectName = "수학"
                    break
                case "english":
                    subjectName = "영어"
                    break
                case "physics":
                    subjectName = "물리"
                    break
                case "chemistry":
                    subjectName = "화학"
                    break
                case "biology":
                    subjectName = "생명"
                    break
                case "earth":
                    subjectName = "지구"
                    break
                case "chinese":
                    subjectName = "중국어"
                    break
                case "athletic":
                    subjectName = "체육"
                    break
                case "art":
                    subjectName = "미술"
                    break
            }
            const board = document.createElement("div")
            board.classList.add("board")
            const subject = document.createElement("h1")
            subject.classList.add("subject")
            subject.innerText = subjectName
            const date = document.createElement("h3")
            date.innerText = `날짜: ${vals.date}`
            const id = document.createElement("h4")
            id.innerText = vals.id
            const description = document.createElement("p")
            description.innerText = vals.description
            board.append(subject, date, id, description)
            performanceContainer.append(board)
        })
        Array.from(peperArr.reverse()).forEach((vals) => {
            console.log("b")
            let subjectName = ""
            switch(vals.subject) {
                case "korean":
                    subjectName = "문학"
                    break
                case "math":
                    subjectName = "수학"
                    break
                case "english":
                    subjectName = "영어"
                    break
                case "physics":
                    subjectName = "물리"
                    break
                case "chemistry":
                    subjectName = "화학"
                    break
                case "biology":
                    subjectName = "생명"
                    break
                case "earth":
                    subjectName = "지구"
                    break
                case "chinese":
                    subjectName = "중국어"
                    break
                case "athletic":
                    subjectName = "체육"
                    break
                case "art":
                    subjectName = "미술"
                    break
            }
            const board = document.createElement("div")
            board.classList.add("board")
            const subject = document.createElement("h1")
            subject.classList.add("subject")
            subject.innerText = subjectName
            const date = document.createElement("h3")
            date.innerText = `날짜: ${vals.date}`
            const id = document.createElement("h4")
            id.innerText = vals.id
            const description = document.createElement("p")
            description.innerText = vals.description
            board.append(subject, date, id, description)
            peperContainer.append(board)
        })
    }
})
console.log(performanceArr, peperArr)


performanceBtn.addEventListener('click', () => {
    performanceContainer.classList.remove("hidden")
    peperContainer.classList.add("hidden")
    performanceBtn.classList.add("selected")
    peperBtn.classList.remove("selected")
})
peperBtn.addEventListener('click', () => {
    peperContainer.classList.remove("hidden")
    performanceContainer.classList.add("hidden")
    peperBtn.classList.add("selected")
    performanceBtn.classList.remove("selected")
})