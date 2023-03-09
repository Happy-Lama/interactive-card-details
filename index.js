
let cardHolderNameField = document.querySelector('#cardholder-name');
let cardNumberField = document.querySelector('#card-number');
let cardCvcNumber = document.querySelector('#card-cvc');
let cardExpDateMonth = document.querySelector('#exp-date-month');
let cardExpDateYear = document.querySelector('#exp-date-year');

let cardHolderNameError = cardHolderNameField.parentElement.children[cardHolderNameField.parentElement.children.length - 1];
let cardNumberError = cardNumberField.parentElement.children[cardNumberField.parentElement.children.length - 1];
let cardCvcError = cardCvcNumber.parentElement.children[cardCvcNumber.parentElement.children.length - 1];
let cardExpDateError = cardExpDateMonth.parentElement.children[cardExpDateMonth.parentElement.children.length - 1];

cardHolderNameField.addEventListener('input', (event)=>{
    event.preventDefault()
    document.querySelector('#card-holder-name').innerText = cardHolderNameField.value != '' ? cardHolderNameField.value : 'JANE APPLESEED';
    if(cardHolderNameField.validity.valid){
        cardHolderNameError.textContent = "";       
    } else {
        showCardHolderNameError();
    }
});

cardNumberField.addEventListener('input', (event)=>{
    document.querySelector('#card-details-number').innerText = cardNumberField.value != '' ? separate_in_fours(cardNumberField.value) : '0000 0000 0000 0000';
    if(cardNumberField.validity.valid){
        cardNumberError.textContent = "";
        // cardHolderNameError.className = "error";
    } else {
        showCardNumberError();
    }
});

cardExpDateMonth.addEventListener('input', (event)=>{
    document.querySelector('#card-exp-date-month').innerText = cardExpDateMonth.value != '' ? cardExpDateMonth.value : '00';
    if(cardExpDateYear.validity.valid && cardExpDateMonth.validity.valid){
        cardExpDateError.textContent = "";
        // cardHolderNameError.className = "error";
    } else {
        showCardExpDateError();
    }
});

cardExpDateYear.addEventListener('input', (event)=>{
    document.querySelector('#card-exp-date-year').innerText = cardExpDateYear.value != '' ? cardExpDateYear.value : '00';
    if(cardExpDateYear.validity.valid && cardExpDateMonth.validity.valid){
        cardExpDateError.textContent = "";
        // cardHolderNameError.className = "error";
    } else {
        showCardExpDateError();
    }
});

cardCvcNumber.addEventListener('input', (event)=>{
    document.querySelector('#card-cvc-number').innerText = cardCvcNumber.value != '' ? cardCvcNumber.value : '000';
    if(cardCvcNumber.validity.valid){
        cardCvcError.textContent = "";
        // cardHolderNameError.className = "error";
    } else {
        showCardCvcError();
    }
});

function showCardHolderNameError(){
    if(cardHolderNameField.validity.valueMissing){
        cardHolderNameError.textContent = "Cannot leave this field empty";
    }
}

function showCardNumberError(){
    if(cardNumberField.validity.valueMissing){
        cardNumberError.textContent = "Cannot leave this field empty";
    } else if(cardNumberField.validity.patternMismatch){
        cardNumberError.textContent = "Wrong format. Input numbers only";
    }
}

function showCardExpDateError(){
    if(cardExpDateMonth.validity.valueMissing || cardExpDateYear.validity.valueMissing){
        cardExpDateError.textContent = "Cannot leave this field empty";
    } else if(cardExpDateMonth.validity.rangeOverflow || cardExpDateYear.validity.rangeOverflow){
        cardExpDateError.textContent = "Wrong Input. Value too high";
    } else if(cardExpDateMonth.validity.rangeUnderflow || cardExpDateYear.validity.rangeUnderflow){
        cardExpDateError.textContent = "Wrong Input. Value too low";
    }
}

function showCardCvcError(){
    if(cardCvcNumber.validity.valueMissing){
        cardCvcError.textContent = "Cannot leave this field empty";
    } else if(cardCvcNumber.validity.patternMismatch){
        cardCvcError.textContent = "Wrong format. Input numbers only";
    }
}

function onFormClick(event){
    let form = document.querySelector('form');
    form.classList.add('active');
}

function onFormSubmit(event){
    //stop form from submitting
    event.preventDefault();

    if(!cardHolderNameField.validity.valid){
        showCardHolderNameError();
    }
    if (!cardNumberField.validity.valid){
        showCardNumberError();
    }
    if(!cardExpDateMonth.validity.valid || !cardExpDateYear.validity.valid){
        showCardExpDateError();
    }
    if(!cardCvcNumber.checkValidity()){
        showCardCvcError();
    }
    if((cardHolderNameError.textContent == '') && (cardNumberError.textContent == '') && (cardExpDateError.textContent == '') && (cardCvcError.textContent == '')){
        let form = document.querySelector("form");
        let confirmation_msg = document.querySelector(".confirmation-message");
    
    //add hidden class to the form and remove it from the confirmation message div
        form.classList.add("hidden");
        confirmation_msg.classList.remove("hidden");
    }
}

function separate_in_fours(string){
    let new_string = '';
    for(let i = 0; i < string.length; i++){
        if(i%4 == 0 && i != 0)
            new_string += ' ' + string[i];
        else
            new_string += string[i];
    }
    return new_string;
}



