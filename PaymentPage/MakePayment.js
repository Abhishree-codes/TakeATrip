// Catching Form
const myForm = document.querySelector("form");

// Catching Billing Adddress
const name = document.getElementById("name");
const email = document.getElementById("email");
const address = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const pincode = document.getElementById("pincode");

// Catching Payment Details
const cardName = document.getElementById("cardName");
const cardNumber = document.getElementById("cardNumber");
const expMonth = document.getElementById("expMonth");
const expYear = document.getElementById("expYear");
const cvv = document.getElementById("cvv");

let DATA = JSON.parse(localStorage.getItem("payment")) || {};

myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    DATA = {
        // Billing Address
        Name: name.value,
        Email: email.value,
        Address: address.value,
        City: city.value,
        State: state.value,
        Pincode: pincode.value,
        // Card Details
        CardName: cardName.value,
        CardNumber: cardName.value,
        ExpMonth: expMonth.value,
        ExpYear: expYear.value,
        CVV: cvv.value
    };

    localStorage.setItem("payment", JSON.stringify(DATA));
});

// Popup Card
let popup = document.querySelector(".popup");
function openPopup() {
    popup.classList.add("open_popup");
}
function closePopup() {
    popup.classList.remove("open_popup");
}