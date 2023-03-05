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
const CalendarDates = require("calendar-dates");
const calendarDates = new CalendarDates();

const dataSelected = document.querySelector(".data_selected");
const month = document.querySelector(".current_month");
const year = document.querySelector(".current_year");
const monthNext = document.querySelector(".calendar_month_next");
const yearNext = document.querySelector(".calendar_year_next");
const yearBack = document.querySelector(".calendar_year_back");
const btnCalendarOpen = document.querySelector(".btn_calendar_open");
const btnCalendarClose = document.querySelector(".btn_calendar_close");
const days = document.querySelector(".days");
const calendar = document.querySelector(".calendar");



// -----вибір місяця і року-----------------------------------------

let dates = new Date(); 
let currMonth = dates.getMonth();
let currYear = dates.getFullYear();
let currDate = dates.getDate();


dataSelected.textContent = `${addLeadingZero(currDate)}/${addLeadingZero(currMonth + 1)}/${currYear}`;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

month.innerText = months[currMonth];
year.innerText = currYear;
 

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};


// -----вибір місяця і року-----------------------------------------

monthNext.addEventListener("click", onNextMonth);
yearNext.addEventListener("click", onNextYear);
yearBack.addEventListener("click", onBackYear);


function onNextMonth() {   
    
    if (currMonth === 11) {
        currMonth = 0;
        month.innerText = months[currMonth]; 
            
    } else {
        currMonth += 1;
        month.innerText = months[currMonth];       
    } 
    
    mainAsync();
}

function onNextYear() {   
    currYear += 1;
    year.innerText = currYear;  

    mainAsync();
}

function onBackYear() {
    currYear -= 1;
    year.innerText = currYear;

    mainAsync();
}

// --------рендер днів--------------------------------------



mainAsync = async () => {
    const data = new Date(Number(year.textContent), months.indexOf(month.textContent));

    const mayDates = await calendarDates.getDates(data);
    console.log(mayDates);

    createMarkup(mayDates);
    
};
mainAsync();

function createMarkup(mayDates) {
   
    const markup = mayDates.map(({ date, type }) => {
        return `<li class="${type}">${date}</li>`;
    }).join('');

    days.innerHTML = markup;
}

// ---------відкриття і закриття календаря---------

btnCalendarOpen.addEventListener("click", onOpenCalendar);

function onOpenCalendar() {
    calendar.classList.toggle('visually-hidden');
   
    btnCalendarClose.style.display = "block";
    btnCalendarOpen.style.display = "none";
}

btnCalendarClose.addEventListener("click", onCloseCalendar);

function onCloseCalendar() {
    calendar.classList.toggle('visually-hidden');
   
    btnCalendarClose.style.display = "none";
    btnCalendarOpen.style.display = "block";
}