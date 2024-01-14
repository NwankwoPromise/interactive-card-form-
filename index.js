window.onload = function(){ 
const formName = document.getElementById('form-cardholder-name')
const formNumber = document.getElementById('form-card-number')
const formExpiryMonth = document.getElementById('form-MM')
const formExpiryYear = document.getElementById('form-YY')
const formCVV = document.getElementById('form-cvv')
const cardName = document.getElementById('cardholder-name')
const cardNumber = document.getElementById('card-number')
const cardExpiryMonth = document.getElementById('card-MM')
const cardExpiryYear = document.getElementById('card-YY')
const cardCVV = document.getElementById('card-cvv')
const errorMsg = document.querySelector('.blank-error-message')
const customErrorMsg = errorMsg.cloneNode(true);


formName.addEventListener('input', function() {
    console.log(formName.value)
    if (formName.value.length === 0) { cardName.textContent = 'Jane Appleseed'; }   
    else { cardName.textContent = this.value;} 
} )

const createErrorMsg = function(containerClass, errorMessage) {
    const errorMsg = document.createElement('span')
    errorMsg.classList.add('blank-error-message')
    const errorMsgContainer = document.querySelector(containerClass);
    errorMsgContainer.appendChild(errorMsg);
    errorMsg.innerHTML = errorMessage
    return errorMsg
}  
const nameErrorMsg = createErrorMsg('.name-section', 'Name is required.');

const handleBlur = function(formField, errorMsg) {
    errorMsg.style.display = formField.value === '' ? 'block' : 'none';
    errorMsg.style.top = '100%';
    formField.style.border = formField.value === '' ? '1px solid red' : '';
    formField.classList.toggle("remove-hover", formField.value === '');
};
// createErrorMsg('.name-section', 'Name is required.')
formName.addEventListener('blur', function() {
    // customErrorMsg.innerHTML = ;
    handleBlur(formName, nameErrorMsg);
    // if (formName.value === '') {
    //     customErrorMsg.style.display = 'block';  // Show the error message
    //     customErrorMsg.style.top = '100%';
    //     this.style.border = "1px solid red";
    //     this.classList.add("remove-hover");
    // } else {
    //     customErrorMsg.style.display = 'none';  // Hide the error message
    //     this.style.border = "";  // Reset the border
    //     this.classList.remove("remove-hover");
    // }
} )


formNumber.addEventListener('input', function() {

    formNumber.value = formNumber.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();

    if (formNumber.value.length === 0) { cardNumber.textContent = '0000 0000 0000 0000'; }   
    else { cardNumber.textContent = this.value; } 
} )

createErrorMsg('.number-section')
formNumber.addEventListener('blur', function() {
    customErrorMsg.innerHTML = 'Card number is required.';

    if (formNumber.value === '') {
        customErrorMsg.style.display = 'block';  // Show the error message
        customErrorMsg.style.top = '100%';
        this.style.border = "1px solid red";
        this.classList.add("remove-hover");
    } else {
        customErrorMsg.style.display = 'none';  // Hide the error message
        this.style.border = "";  // Reset the border
        this.classList.remove("remove-hover");
    }
} )
// Create a new Date object for the current date
var currentDate = new Date();
// // Add 3 years to the current date
// currentDate.setFullYear(currentDate.getFullYear() + 3);

// Get the month and year
var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript

var year = String(currentDate.getFullYear()).slice(-2); // Get the last 2 digits of the year


// formExpiryMonth.value = month
// formExpiryYear.value = year
// cardExpiryMonth.textContent = month
// cardExpiryYear.textContent = year
// var monthPattern = /^(0?[1-9]|1[012])$/;

function toggleBlankErrorMsg(el1, el2) {
    // Check if the input field is empty
    if (el1.value === '') {
        errorMsg.style.display = 'block';  // Show the error message
        el1.style.border = "1px solid red";
        el1.classList.add("remove-hover");
    } else {
        if(el2.classList.contains("remove-hover")){
            errorMsg.style.display = 'block';
        } else {
            errorMsg.style.display = 'none';  // Hide the error message
        }
        el1.style.border = "";  // Reset the border
        el1.classList.remove("remove-hover");
        console.log(true)
    }
}

formExpiryMonth.addEventListener('input', function() {
    formExpiryMonth.value = formExpiryMonth.value.replace(/\D/g, '')
    // if input field is empty OR it contains just zero
    if ( this.value == 0) {
        cardExpiryMonth.textContent = '00';
        this.value = this.value.substring(1); //empty the field by removing the 0

    } else{
        cardExpiryMonth.textContent = this.value;  
    }
 
    // If the input is a single digit number 
    if (/^[1-9]$/.test(this.value)) {
        // Add a leading zero
        this.value = '0' + this.value;
        cardExpiryMonth.textContent = this.value; 
    }

    // this block of code below removes the leading zero if user wants to type 10-12
    // check if the input value is greater than set maxlength (2) AND its second value is 1
    if (this.value.length > this.maxLength && this.value[1] == 1) {
        // check if the extra value being added is 0, 1 or 2
        if (this.value[2] == '0' || this.value[2] == '1' || this.value[2] == '2') {
            this.value = this.value.substring(1);
            cardExpiryMonth.textContent = this.value;
        }
    } 
    // this ensures max number of digits input is 2
    if  (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
        cardExpiryMonth.textContent = this.value;  
    }  
})
formExpiryMonth.addEventListener('blur', function() {
    toggleBlankErrorMsg(formExpiryMonth, formExpiryYear)
});

formExpiryYear.addEventListener('input', function(){
    if (this.value.length === 0 ) {
        cardExpiryYear.textContent = '00';
        this.value = this.value.substring(1);
    } 
    else {
        cardExpiryYear.textContent = this.value;   
    } 
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
        cardExpiryYear.textContent = this.value; 
    }

})
formExpiryYear.addEventListener('blur', function() {
    toggleBlankErrorMsg(formExpiryYear, formExpiryMonth)

    // if(this.value < year) {
    //     console.log('expired card')

    // }
    
});

formCVV.addEventListener('input', function() {
    if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);

    // console.log(formCVV.value)
    if (formCVV.value.length === 0) {
      cardCVV.textContent = '000';
     }   
    else {
        cardCVV.textContent = this.value;   
    } 
})
const blankErrorMsgContainer = document.querySelector('.expiry-cvv-container')
const cvvBlankErrorMsg = errorMsg.cloneNode(true); // 'true' indicates deep cloning, including children
blankErrorMsgContainer.appendChild(cvvBlankErrorMsg)
formCVV.addEventListener('blur', function() {
   
    // Check if the input field is empty
    if (this.value === '') {
        cvvBlankErrorMsg.style.display = 'block';  // Show the error message
        this.style.border = "1px solid red";
        cvvBlankErrorMsg.style.left = "60%"
        this.classList.add("remove-hover");
        console.log('Before:', cvvBlankErrorMsg.style.display);
    } else {
        // console.log(cvvBlankErrorMsg);
        cvvBlankErrorMsg.style.display = 'none';
        console.log('After:', cvvBlankErrorMsg.style.display);
        this.style.border = "";  // Reset the border
        this.classList.remove("remove-hover");
        console.log(cvvBlankErrorMsg.style.display)
    }
})
}
