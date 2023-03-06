import throttle from "lodash.throttle";

const formEl = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

populateInput();

function onFormSubmit(event) {

    event.preventDefault();

    if (event.target.elements.email.value === "" || event.target.elements.message.value === "") {
        return alert("Увага! Всі поля повинні бути заповнені!");
    }; 

    console.log(formData);
    
    event.currentTarget.reset();    
    
    localStorage.removeItem(STORAGE_KEY);     
}


function onFormInput(event) {
    
    formData[event.target.name] = event.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

}

function populateInput() {
    const saveData = localStorage.getItem(STORAGE_KEY);    

    if (saveData) { 

        const parseSaveData = JSON.parse(saveData);

        Object.entries(parseSaveData).forEach(([name, value]) => {
            formData[name] = value;
            formEl.elements[name].value = value;
        });             
    };
};

