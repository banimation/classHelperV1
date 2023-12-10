const password = document.getElementById("password")! as HTMLInputElement

const noticeCreate = document.getElementById("notice-create")
const noticeDelete = document.getElementById("notice-delete")

const examCreate = document.getElementById("exam-create")
const examDelete = document.getElementById("exam-delete")

const noticeCreatePop = document.getElementById("notice-create-pop")!
const noticeDeletePopUp = document.getElementById("notice-delete-pop")!

const examCreatePop = document.getElementById("exam-create-pop")!
const examDeletePopUp = document.getElementById("exam-delete-pop")!

const managerCloseBtn = document.getElementsByClassName("close-btn")

const noticeCreateInputTitle = document.getElementById("notice-create-input-title") as HTMLInputElement
const noticeCreateInputDescription = document.getElementById("notice-create-input-description") as HTMLInputElement
const noticeCreateBtn = document.getElementById("notice-create-btn")

const examCreateInputSubject = document.getElementById("exam-create-input-subject") as HTMLSelectElement
const examType = document.getElementById("exam-type") as HTMLSelectElement
const examCrateInputDate = document.getElementById("exam-create-input-date") as HTMLInputElement
const examCreateInputDescription = document.getElementById("exam-create-input-description") as HTMLInputElement
const examCreateBtn = document.getElementById("exam-create-btn")

const noticeList = document.getElementById("notice-list")

const examList = document.getElementById("exam-list")

const updateNoticeList = () => {
    fetch("/noticeData").then(
        res => res.json()
    ).then(data => {
        if(data) {
            noticeList?.replaceChildren()
            data.forEach((val:{title:string, description:string}) => {
                const noticeItem = document.createElement('div')
                noticeItem.classList.add("notice-item")
                noticeItem.id = val.title
                const itemName = document.createElement('div')
                itemName.classList.add("notice-item-name")
                itemName.innerText = val.title
                const deleteBtn = document.createElement('div')
                deleteBtn.classList.add("notice-delete-btn")
                deleteBtn.innerText = "delete"
                noticeItem.append(itemName, deleteBtn)
                noticeList?.append(noticeItem)
                deleteBtn.addEventListener('click', () => {
                    const deleteOrNot = confirm(`${val.title}를(을) 삭제하시겠습니까?`)
                    const data = {"key": password.value, deleteOrNot, "id": val.title}
                    fetch("/deleteNotice", {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify(data)
                    }).then(res => res.json()).then(data => {
                        if(data) {
                            if(data.response === "pw-error") {
                                alert("worng password")
                            } else {
                                updateNoticeList()
                                alert("deleted")
                            }
                        }
                    })
                })
            })
        }
    })
}

const updateExamList = () => {
    fetch("/examData").then(
        res => res.json()
    ).then(data => {
        if(data) {
            examList?.replaceChildren()
            data.forEach((val:{subject:string, type:string, date:string, description:string, id:string}) => {
                const examItem = document.createElement('div')
                examItem.classList.add("exam-item")
                examItem.id = val.id
                const itemName = document.createElement('div')
                itemName.classList.add("exam-item-name")
                itemName.innerText = val.id
                const deleteBtn = document.createElement('div')
                deleteBtn.classList.add("exam-delete-btn")
                deleteBtn.innerText = "delete"
                examItem.append(itemName, deleteBtn)
                examList?.append(examItem)
                deleteBtn.addEventListener('click', () => {
                    const deleteOrNot = confirm(`${val.id}를(을) 삭제하시겠습니까?`)
                    const data = {"key": password.value, deleteOrNot, "id": val.id}
                    fetch("/deleteExam", {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify(data)
                    }).then(res => res.json()).then(data => {
                        if(data) {
                            if(data.response === "pw-error") {
                                alert("worng password")
                            } else {
                                updateNoticeList()
                                alert("deleted")
                            }
                        }
                    })
                })
            })
        }
    })
}

noticeCreate?.addEventListener('click', () => {
    noticeCreatePop.style.width = "100vw"
})
noticeDelete?.addEventListener('click', () => {
    updateNoticeList()
    noticeDeletePopUp.style.width = "100vw"
})
examCreate?.addEventListener('click', () => {
    examCreatePop.style.width = "100vw"
})
examDelete?.addEventListener('click', () => {
    updateExamList()
    examDeletePopUp.style.width = "100vw"
})

Array.from(managerCloseBtn).forEach(element => {
    element.addEventListener('click', () => {
        noticeCreatePop.style.width = "0"
        noticeDeletePopUp.style.width = "0"
        examCreatePop.style.width = "0"
        examDeletePopUp.style.width = "0"
    })
})
navigator.serviceWorker.register("pwabuilder-sw.js");

function showNotification() {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("새 공지", {
          body: "클릭해서 확인",
          icon: "../android/android512.png",
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: "vibration-sample",
        });
      });
    }
  });
}
noticeCreateBtn?.addEventListener('click', async () => {
    const data = {"key": password.value, "value": {"title": noticeCreateInputTitle.value, "description": noticeCreateInputDescription.value}}
    noticeCreateInputTitle.value = ""
    noticeCreateInputDescription.value = ""
    fetch("/createNotice", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
        if(data) {
            if(data.response === "pw-error") {
                alert("worng password")
            } else if (data.response === "duplication-error") {
                alert("duplicated title")
            } else if(data.response === "created") {
                alert("created!")
                showNotification()
            }
        }
    })
})
examCreateBtn?.addEventListener('click', () => {
    const data = {"key": password.value, "value": {"subject": examCreateInputSubject.value, "type": examType.value,  "date": examCrateInputDate.value, "description": examCreateInputDescription.value}}
    examCrateInputDate.value = ""
    examCreateInputDescription.value = ""
    fetch("/createExam", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
        if(data) {
            if(data.response === "pw-error") {
                alert("worng password")
            } else if(data.response === "created") {
                alert("created!")
            }
        }
    })
})
updateNoticeList()
updateExamList()