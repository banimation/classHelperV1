"use strict";
const body = document.body;
const mainTitle = document.getElementById("title");
const notice = document.getElementById("notice");
const meal = document.getElementById("meal");
const timeTable = document.getElementById("time-table");
const exam = document.getElementById("exam");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const sidenav = document.getElementById("sidenav");
const elements = document.getElementsByTagName("*");
const btn = document.getElementsByClassName("button");
let isSidenavOpen = false;
notice?.addEventListener('click', () => {
    if (!isSidenavOpen) {
        location.href = 'notice';
    }
});
meal?.addEventListener('click', () => {
    if (!isSidenavOpen) {
        location.href = '/meal';
    }
});
timeTable?.addEventListener('click', () => {
    if (!isSidenavOpen) {
        location.href = '/timeTable';
    }
});
exam?.addEventListener('click', () => {
    if (!isSidenavOpen) {
        location.href = '/exam';
    }
});
openBtn?.addEventListener('click', () => {
    isSidenavOpen = true;
    sidenav.style.width = "250px";
    body.style.backgroundColor = "#525252";
    Array.from(elements).forEach(element => {
        element.style.color = "rgb(11, 54, 98)";
    });
    Array.from(btn).forEach(element => {
        element.style.borderColor = "rgb(11, 54, 98)";
        element.style.backgroundColor = "rgb(11, 54, 98)";
    });
});
closeBtn?.addEventListener('click', () => {
    isSidenavOpen = false;
    sidenav.style.width = "0";
    body.style.backgroundColor = "#fff";
    Array.from(elements).forEach(elements => {
        elements.style.color = "#fff";
    });
    Array.from(btn).forEach(element => {
        element.style.borderColor = "rgb(25, 118, 210)";
        element.style.backgroundColor = "rgb(25, 118, 210)";
    });
    mainTitle.style.color = "rgb(25, 118, 210)";
    openBtn.style.color = "rgb(25, 118, 210)";
});
const button = document.getElementById("notifications");
let permission = Notification.permission;
Notification.requestPermission().then((result) => {
    permission = result;
    if (permission === "denied") {
        button.style.backgroundColor = "#D10000";
        button.style.borderColor = "#D10000";
    }
    else if (permission === "granted") {
        button.style.backgroundColor = "#33EE33";
        button.style.borderColor = "#33EE33";
    }
});
