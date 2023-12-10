import express from 'express'
import * as fs from 'fs'
import * as https from "node:https"
import Timetable from 'comcigan-parser'
import * as path from "node:path"
import { timetableData } from 'comcigan-parser'
import * as ssl from 'ssl-root-cas'
const server = express()
const verify = "sw006612"
const schoolName = "도당고등학교"
const key = "2cc3c2c2e95a49b2a74610f642ab01c6"
const t = new Timetable()
let myClassTimeTable: Array<Array<{}>>
const rootCas = ssl.create()
https.globalAgent.options.ca = rootCas

https.createServer({key: fs.readFileSync("../ssl/classhelper.kro.kr-key.pem"), cert: fs.readFileSync("../ssl/classhelper.kro.kr-crt.pem")}, server)
  .listen(443)
server.use(express.urlencoded({ extended: false }), express.json())


server.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../front/public/index.html"))
})
server.get("/manager", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../front/public/html/manager.html"))
})
server.get("/notice", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../front/public/html/notice.html"))
})
server.get("/meal", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../front/public/html/meal.html"))
})
server.get("/exam", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../front/public/html/exam.html"))
})
server.get("/timeTable", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../front/public/html/timeTable.html"))
})
server.get("/noticeData", (_req, res) => {
    const data = JSON.parse(fs.readFileSync('../data/notices.json', 'utf-8'))
    res.json(data)
})
server.get("/examData", (_req, res) => {
    const data = JSON.parse(fs.readFileSync('../data/exam.json', 'utf-8'))
    res.json(data)
})
server.get("/mealData", async (_req, res) => {
    const date = new Date()
    const getYear = date.getFullYear()
    const getMonth = `0${date.getMonth()+1}`
    const ym = `${getYear}${getMonth}`
    const getMealInfo = () => {
        return new Promise((resolve, _reject) => {
            https.request(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530471&MLSV_YMD=${ym}`, (res) => {
                let result = ''
                res.on('data', buffer => {
                    result += buffer.toString()
                })
                res.on('end', () => resolve(JSON.parse(result)))
            }).on('error', console.error).end()
        })
    }
    const mealInfoJSON = await getMealInfo()
    res.json(mealInfoJSON)
})
server.get("/timeTableData", (_req, res) => {
    ;(async () => {
        await t.init({maxGrade: 3, cache: 0})
        const schoolList = await t.search('도당')
        const mySchool = schoolList.find(school => school.name == schoolName)!
        t.setSchool(mySchool.code)
        const table: timetableData = await t.getTimetable()
        myClassTimeTable = table[2][9]
    })()
    const originalTimeTable = JSON.parse(fs.readFileSync('../data/originalTimeTable.json', 'utf-8'))
    const data = {originalTimeTable, myClassTimeTable}
    res.json(data)
})
server.post("/createNotice", (req, res) => {
    const title = req.body.value.title
    const description = req.body.value.description
    const pw = req.body.key
    const path = `../data/notices.json`
    const data: {title:string, description:string}[] = JSON.parse(fs.readFileSync(path, 'utf-8'))
    let isDupl = false
    data.forEach((val) => {
        if(val.title === title) {
            isDupl = true
        }
    })
    if(pw === verify){
        if(!isDupl) {
            data.push({ title, description })
            fs.writeFileSync(path, JSON.stringify(data))
            res.json({"response": "created"})
        } else {
            res.json({"response": "duplication-error"})
        }
    } else {
        res.json({"response": "pw-error"})
    }
})
server.post("/createExam", (req, res) => {
    const subject = req.body.value.subject
    const type = req.body.value.type
    const date = req.body.value.date
    const description = req.body.value.description
    let randomId = Math.floor(Math.random() * 100)
    const examData = JSON.parse(fs.readFileSync("../data/exam.json", "utf-8"))
    const duplFilter = () => {
        Array.from(examData).forEach((val: any) => {
            if(val.id === `a${randomId}`) {
                randomId = Math.floor(Math.random() * 100)
                duplFilter()
            }
        })
    }
    duplFilter()
    const pw = req.body.key
    const path = `../data/exam.json`
    const data: {subject:string, type:string, date:string, description:string, id:string}[] = JSON.parse(fs.readFileSync(path, 'utf-8'))
    if(pw === verify){
        data.push({ subject, type, date, description, id: `a${randomId}` })
        fs.writeFileSync(path, JSON.stringify(data))
        res.json({"response": "created"})
    } else {
        res.json({"response": "pw-error"})
    }
})
server.post("/deleteNotice", (req, res) => {
    const id = req.body.id
    const deleteOrNot = req.body.deleteOrNot
    const noticesData: {title:string, description:string}[] = JSON.parse(fs.readFileSync(`../data/notices.json`, 'utf-8'))
    const pw = req.body.key
    if(pw === verify){
        if(deleteOrNot) {
            noticesData.forEach((val, i) => {
                if(val.title === id) {
                    noticesData.splice(i, 1)
                    fs.writeFileSync(`../data/notices.json`, JSON.stringify(noticesData))
                    res.json({"response": "deleted"})
                }
            })
        }
    } else {
        res.json({"response": "pw-error"})
    }
})
server.post("/deleteExam", (req, res) => {
    const id = req.body.id
    const deleteOrNot = req.body.deleteOrNot
    const noticesData:{subject:string, type:string, date:string, description:string, id:string}[] = JSON.parse(fs.readFileSync(`../data/exam.json`, 'utf-8'))
    const pw = req.body.key
    if(pw === verify){
        if(deleteOrNot) {
            noticesData.forEach((val, i) => {
                if(val.id === id) {
                    noticesData.splice(i, 1)
                    fs.writeFileSync(`../data/exam.json`, JSON.stringify(noticesData))
                    res.json({"response": "deleted"})
                }
            })
        }
    } else {
        res.json({"response": "pw-error"})
    }
})

server.use(express.static(`${__dirname}/../../front/public`))

server.listen(80, () => {
    console.log("불빡")
})