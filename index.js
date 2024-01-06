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

formName.addEventListener('input', function() {
    console.log(formName.value)
    if (formName.value.length === 0) {
      cardName.textContent = 'Jane Appleseed';
     }   
    else {
        cardName.textContent = this.value;   
    } 
} )
formNumber.addEventListener('input', function() {
    formNumber.value = formNumber.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    console.log(formNumber.value)
    if (formNumber.value.length === 0) {
      cardNumber.textContent = '0000 0000 0000 0000';
     }   
    else {
        cardNumber.textContent = this.value;   
    } 
} )

// Create a new Date object for the current date
var currentDate = new Date();
// // Add 3 years to the current date
// currentDate.setFullYear(currentDate.getFullYear() + 3);

// Get the month and year
var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript

var year = String(currentDate.getFullYear()).slice(-2); // Get the last 2 digits of the year
console.log(year)

// formExpiryMonth.value = month
// formExpiryYear.value = year
// cardExpiryMonth.textContent = month
// cardExpiryYear.textContent = year
// var monthPattern = /^(0?[1-9]|1[012])$/;

formExpiryMonth.addEventListener('input', function() {
    // if input field is empty OR it contains just zero
    if (this.value.length === 0 || this.value == 0) {
        cardExpiryMonth.textContent = '00';
        this.value = this.value.substring(1);

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
        // check if the extra value being added is 1,2 or 3 
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


formExpiryYear.addEventListener('input', function(){
    if (this.value.length === 0 || this.value == 0) {
        cardExpiryYear.textContent = '00';
    } 
    else {
        cardExpiryYear.textContent = this.value;   
    } 
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
    }

})
formExpiryYear.addEventListener('blur', function() {
    // Check if the input field is empty
    if(this.value === '') {
        // Display an error message
        alert('The input field is empty!');
    }
    if(this.value < year) {
        console.log('expired card')

    }
});

formCVV.addEventListener('input', function() {
    if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);

    console.log(formCVV.value)
    if (formCVV.value.length === 0) {
      cardCVV.textContent = '000';
     }   
    else {
        cardCVV.textContent = this.value;   
    } 
} )
}
