import { showPopup, hidePopup } from "../scripts/common.js";

const inputs = document.querySelectorAll("input"),
button = document.getElementById("verifyOtp");

// iterate over all inputs
inputs.forEach((input, index1) => {
input.addEventListener("keyup", (e) => {
  // This code gets the current input element and stores it in the currentInput variable
  // This code gets the next sibling element of the current input element and stores it in the nextInput variable
  // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
  const currentInput = input,
    nextInput = input.nextElementSibling,
    prevInput = input.previousElementSibling;

  // if the value has more than one character then clear it
  if (currentInput.value.length > 1) {
    currentInput.value = "";
    return;
  }
  // if the next input is disabled and the current value is not empty
  //  enable the next input and focus on it
  if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
    nextInput.removeAttribute("disabled");
    nextInput.focus();
  }

  // if the backspace key is pressed
  if (e.key === "Backspace") {
    // iterate over all inputs again
    inputs.forEach((input, index2) => {
      // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
      // and the previous element exists, set the disabled attribute on the input and focus on the previous element
      if (index1 <= index2 && prevInput) {
        input.setAttribute("disabled", true);
        input.value = "";
        prevInput.focus();
      }
    });
  }
  //if the fourth input( which index number is 3) is not empty and has not disable attribute then
  //add active class if not then remove the active class.
  if (!inputs[3].disabled && inputs[3].value !== "") {
    button.classList.add("active");
    return;
  }
  button.classList.remove("active");
});
});

//focus the first input which index is 0 on window load
window.addEventListener("load", () => inputs[0].focus());

let api="https://api-by-nikhil.onrender.com/users";
let otp=localStorage.getItem("otp");
let popUpCloseBtn = document.querySelector('.close-btn');

// alert(`Your one time password is ${otp}`)
showPopup('otpPopup','otpPopupText',`Your one time password is ${otp}`);    

popUpCloseBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  hidePopup('otpPopup');
});

button.addEventListener("click",async function(e){
    e.preventDefault();
    let flage=true;
    inputs.forEach((input,index)=>{
        if(input.value!=otp[index]){
            flage=false;
        }
        
    })
    if(flage){
      let data=JSON.parse(localStorage.getItem("user"))
      await PostData(data.name,data.email,data.password);
      localStorage.clear();
      localStorage.setItem("logged_in",JSON.stringify(data.email));
      location.href="/index.html";
        // let res =  PostData(data.name,data.email,data.password);
        // res.then((res)=>{
        //       localStorage.clear();
        //       localStorage.setItem("logged_in",JSON.stringify({email:data.email}));
        //       location.href="/login.html";
        //     })
    }else{
        alert("otp is incorrect")
    }
})


async function PostData(username,emailId,pwd){
    let res=await fetch(api,{
        method:"POST",
        body:JSON.stringify({
           name:username,
           email:emailId,
           password:pwd,
           image:"https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
         bookings:[],
         booked:false
        }),
        headers:{
        "Content-type":"application/json"
        }
  
    });
  
    let data=await res.json();
    console.log(data);
    console.log(res)
    //getData();
  }


  // popup karna hai