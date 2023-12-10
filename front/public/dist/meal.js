"use strict";
const date = new Date();
const presentYear = date.getFullYear();
const presentMonth = `${date.getMonth() + 1}`.padStart(2, "0");
const presentDate = `${date.getDate()}`.padStart(2, "0");
const ym = `${presentYear}${presentMonth}`;
const md = `${presentMonth}${presentDate}`;
const ymd = `${presentYear}${presentMonth}${presentDate}`;
const mealContainer = document.getElementById("container");
const todayMeal = document.getElementById("today-meal");
const today = document.getElementById("today-md");
const todayMealInfo = document.getElementById("today-meal-info");
fetch("/mealData").then(res => res.json()).then(data => {
    if (data) {
        if (data.mealServiceDietInfo) {
            const mealData = data.mealServiceDietInfo[1].row;
            console.log(mealData);
            for (let i = 0; i < mealData.length; i++) {
                if (mealData[i].MLSV_YMD === ymd) {
                    today.innerText = `${presentMonth}/${presentDate}`;
                    todayMeal.innerHTML += mealData[i].DDISH_NM;
                    todayMealInfo.innerHTML += `
                        칼로리: ${mealData[i].CAL_INFO} </br>
                        </br>
                        영양정보: ${mealData[i].NTR_INFO}
                    `;
                }
                else {
                    if (Number(mealData[i].MLSV_YMD.slice(4, 8)) > Number(md)) {
                        const mealBox = document.createElement("div");
                        mealBox.classList.add("meal");
                        const mealDate = document.createElement("h1");
                        mealDate.innerText = `${mealData[i].MLSV_YMD.slice(4, 6)}/${mealData[i].MLSV_YMD.slice(6, 8)}`;
                        const meal = document.createElement("span");
                        meal.innerHTML = mealData[i].DDISH_NM;
                        mealBox.append(mealDate, meal);
                        mealContainer?.append(mealBox);
                    }
                }
            }
        }
        else {
            console.log("급식정보 없음");
            today.innerText = `${presentYear}/${presentMonth}\n정보없음`;
            todayMeal.innerHTML = `영양선생님이 해당 달의 급식 데이터를 나이스(neis)에 등록해야 정보가 표시됩니다.`;
        }
    }
});
