import throttle from "lodash.throttle";

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('.feedback-form input');
const textareaEl = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

populateInput();

function onFormSubmit(event) { 

    event.preventDefault();
    
    event.currentTarget.reset();    
    
    localStorage.removeItem(STORAGE_KEY);  
    
    console.log(formData);
}


function onFormInput(event) {
    
    formData[event.target.name] = event.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

}

function populateInput() {
    const saveData = localStorage.getItem(STORAGE_KEY);
    const parseSaveData = JSON.parse(saveData);

    if (saveData) {        
        inputEl.value = parseSaveData.email;
        textareaEl.value = parseSaveData.message;       
    };
};



