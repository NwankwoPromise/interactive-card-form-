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


const createErrorMsg = function(containerClass, errorMessage) {
    //create span element containing error message
    const errorMsg = document.createElement('span')

    //add pre existing class styled with css
    errorMsg.classList.add('error-message')

    //call the div or container the error messsage will be appended to 
    const errorMsgContainer = document.querySelector(containerClass);

    // append error message
    errorMsgContainer.appendChild(errorMsg);
    //return the span element
    return errorMsg
}  

// store the different error messages in variables to be used when needed
const nameErrorMsg = createErrorMsg('.name-section'); //when name field is blank
const numberErrorMsg = createErrorMsg('.number-section'); // when card number field is blank
// const incompleteNumberErrorMsg = createErrorMsg('.number-section', 'Please enter a valid card number.'); // card number is incomplete
const monthOrYearErrorMsg = createErrorMsg('.mm-yy-container') // month/year input field is blank
const cvvErrorMsg = createErrorMsg('.cvv-container') // CVV input field is blank

    // const isEmpty = formField.value === ''

const addErrorState = function(formField, errorMsg) {
    // const tooShort = formNumber.value.length > 0 && formNumber.value.length < 16
    errorMsg.style.display = 'block'
    errorMsg.style.top = '100%';
    formField.style.border = '1px solid red'
    formField.classList.add("remove-hover");     
} 
const removeErrorState = function(formField, errorMsg) {
    // const tooShort = formNumber.value.length > 0 && formNumber.value.length < 16
    errorMsg.style.display = 'none'
    //errorMsg.style.top = '100%';
    formField.style.border = ''
    formField.classList.remove("remove-hover");     
} 


formName.addEventListener('input', function(){
    if(formName.value.length === 0) {
        cardName.textContent = 'Promise Dinma'
    } else {
        cardName.textContent = this.value
    }
})
formName.addEventListener('blur', function() {
    // handleBlur(formName, nameErrorMsg);
    if (formName.value === '') {
        addErrorState(this, nameErrorMsg)
        nameErrorMsg.textContent = 'Name is required'
    } else {
        removeErrorState(this, nameErrorMsg)
    }
} )

formNumber.addEventListener('input', function() {

    formNumber.value = formNumber.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();

    if (formNumber.value.length === 0) { cardNumber.textContent = '0000 0000 0000 0000'; }   
    else { cardNumber.textContent = this.value; } 
} )
formNumber.addEventListener('blur', function() {
    if(formNumber.value.length > 0 && formNumber.value.length < 16) {
        console.log(true)
        handleBlur(formNumber);
        addErrorState(this, numberErrorMsg)
    } else {
        handleBlur(formNumber, numberErrorMsg);
    }

} )
// Create a new Date object for the current date
var currentDate = new Date();

// Get the month and year
var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript

// var year = String(currentDate.getFullYear()).slice(-2); // Get the last 2 digits of the year


//work on this and mm/yy error function
function toggleErrorMsg(el1, el2, errorMsg) {
    // Check if the input field is empty
    // const isEmpty = el1.value === ''
    // addErrorState(el1, errorMsg)
    // errorMsg.textContent = 'Can not be blank.'

//    if the first element doesnt have an error state attached but the second does, hide the triggered error until the already existing one has been addressed
    if (!el1.classList.contains('remove-hover') && el2.classList.contains('remove-hover')) { 
        errorMsg.style.display = 'none';
        // removeErrorState(el1)
    } else {
        errorMsg.style.display = 'block';
    }
//    }
   
    //     el1.style.border = "";  // Reset the border
    //     el1.classList.remove("remove-hover");
    //     console.log(true)
    // // }
}
// function toggleBlankErrorMsg(el1, el2, errorMsg) {
//     // Check if the input field is empty
//     const isEmpty = el1.value === ''

//     // Show/hide the error message
//     errorMsg.style.display = isEmpty ? 'block' : 'none' 

    
//     el1.style.border = isEmpty ? '1px solid red' : ''
//     el1.classList.toggle("remove-hover", isEmpty);
//     console.log(errorMsg)
//    if(!isEmpty) {
//     if (el2.classList.contains("remove-hover")) {
//         errorMsg.style.display = 'block';
//     } else {
//         errorMsg.style.display = 'none';
//     }
//    }
   
//     //     el1.style.border = "";  // Reset the border
//     //     el1.classList.remove("remove-hover");
//     //     console.log(true)
//     // // }
// }

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
    toggleErrorMsg(formExpiryMonth, formExpiryYear, monthOrYearErrorMsg)
});

formExpiryYear.addEventListener('input', function(){
    formExpiryYear.value = formExpiryYear.value.replace(/\D/g, '')

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
    if (formName.value === '') {
        addErrorState(this, monthOrYearErrorMsg)
        monthOrYearErrorMsg.textContent = 'Can not be blank.'
    } else {
        removeErrorState(this, monthOrYearErrorMsg)
    }
        // addErrorState(el1, errorMsg)

    // toggleErrorMsg(formExpiryYear, formExpiryMonth, monthOrYearErrorMsg)
    
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
formCVV.addEventListener('blur', function() {
    if (formCVV.value === '') {
        addErrorState(this, cvvErrorMsg)
        cvvErrorMsg.textContent = "Can't be blank"
    } else {
        removeErrorState(this, cvvErrorMsg)
    }
   })
}
