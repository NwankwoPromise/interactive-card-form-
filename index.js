window.onload = function(){ const formNumber = document.getElementById('form-card-number')
const formName = document.getElementById('form-cardholder-name')
const formExpiryMonth = document.getElementById('form-MM')
const formExpiryYear = document.getElementById('form-YY')
const formCVV = document.getElementById('form-CVV')

formName.addEventListener('input', function() {
    console.log(formName.value)

    if (formName.value.length !== 0) {
        document.getElementById('cardholder-name').innerHTML = this.value;    }   
} )
console.log(formNumber)

console.log(formExpiryMonth)
console.log(formExpiryYear)
console.log(formCVV)
}
