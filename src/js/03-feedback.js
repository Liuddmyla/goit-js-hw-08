// import throttle from "lodash.throttle";

// const formEl = document.querySelector('.feedback-form');

// const STORAGE_KEY = 'feedback-form-state';

// const formData = {};

// formEl.addEventListener('submit', onFormSubmit);
// formEl.addEventListener('input', throttle(onFormInput, 500));

// populateInput();

// function onFormSubmit(event) {

//     event.preventDefault();

//     if (event.target.elements.email.value === "" || event.target.elements.message.value === "") {
//         return alert("Увага! Всі поля повинні бути заповнені!");
//     }; 

//     console.log(formData);
    
//     event.currentTarget.reset();    
    
//     localStorage.removeItem(STORAGE_KEY);     
// }


// function onFormInput(event) {
    
//     formData[event.target.name] = event.target.value;

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

// }

// function populateInput() {
//     const saveData = localStorage.getItem(STORAGE_KEY);    

//     if (saveData) { 

//         const parseSaveData = JSON.parse(saveData);

//         Object.entries(parseSaveData).forEach(([name, value]) => {
//             formData[name] = value;
//             formEl.elements[name].value = value;
//         });             
//     };
// };

// ----------------------------------------------

const month = document.querySelector(".current_month");
const year = document.querySelector(".current_year");
const monthNext = document.querySelector(".calendar_month_next");
const yearNext = document.querySelector(".calendar_year_next");
const yearBack = document.querySelector(".calendar_year_back");


// -----вибір місяця і року-----------------------------------------
let dates = new Date(); 
currMonth = dates.getMonth();
currYear = dates.getFullYear();

year.innerText = currYear;
 
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

month.innerText = months[currMonth];

monthNext.addEventListener("click", onNextMonth);
yearNext.addEventListener("click", onNextYear);
yearBack.addEventListener("click", onBackYear);

function onNextMonth() {
   
    if (currMonth === 11) {
        currMonth = 0;
        month.innerText = months[currMonth]; 
        index = 0;
        console.log(index);
    } else {
        currMonth += 1;
        month.innerText = months[currMonth];
        index += 1;
         console.log(index);
    }  
}

function onNextYear() {
    currYear += 1;
    year.innerText = currYear;
}

function onBackYear() {
     currYear -= 1;
    year.innerText = currYear;
}


// ----------------------------------------------
const CalendarDates = require("calendar-dates");
const calendarDates = new CalendarDates();

let index = months.indexOf(`${month.textContent}`);
const monthValue = Number(index);
const yearValue = Number(year.textContent);

console.log(monthValue, yearValue);



const log = console.log;
const data = new Date(yearValue, monthValue);

mainAsync = async () => {
    const mayDates = await calendarDates.getDates(data);
//   const mayMatrix = await calendarDates.getMatrix(may2018);
  log(`May, 2018 Dates`, mayDates);
//   log(`May, 2018 Matrix`, mayMatrix);
};
mainAsync();