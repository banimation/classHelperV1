"use strict";
const container = document.getElementById("container");
fetch("/noticeData").then(res => res.json()).then(data => {
    if (!(data.length === 0)) {
        container?.replaceChildren();
        data.reverse().forEach((val) => {
            const board = document.createElement('div');
            board.classList.add("board");
            const title = document.createElement('h2');
            title.classList.add("notice-title");
            title.innerText = val.title;
            const description = document.createElement('div');
            description.innerText = val.description;
            description.classList.add("notice-description");
            board.append(title, description);
            container?.append(board);
        });
    }
});
