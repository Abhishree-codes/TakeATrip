const baseServerURL = "https://api-by-nikhil.onrender.com/";
const usersURL = "https://api-by-nikhil.onrender.com/users";

let band_aids = document.getElementsByClassName("img");

// let egg=document.getElementsByClassName("eggs")
let egg = document.querySelector(".user-image>div");

//REDIRECT TO PRODUCT WITH SHIMLA SELECTED ON CLICK
let card = document.querySelector(".class");

//REDIRECT TO PRODUCT ALSO
let locationInp = document.getElementById("location-inp");

let subBtn = document.getElementById("sub");
let subInp = document.getElementById("sub-email");

//REDIRECT TO LOGIN
let loginBtn = document.getElementById("b1");
let registerBtn = document.getElementById("b2");

let adminBtn = document.getElementById("b3");

const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close-btn');

subBtn.addEventListener("click", () => {
  showPopup()
});

function ValidateEmail() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(subInp.value)) {
    
    return true;
   
  }
  
  
  return false;
}
locationInp.addEventListener("click", () => {
  localStorage.setItem("location", locationInp.value);

  //use this to display on product page
});

window.addEventListener("load", () => {
  fetchUserData();
});

function fetchUserData() {
  fetch(usersURL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      getTopFour(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getTopFour(data) {
  let arr = [];
  data.forEach((ele) => {
    arr.push(ele.bookings.length);
  });

  arr.sort((a, b) => {
    return b - a;
  });

  //   console.log(arr);

  let highestFour = arr.slice(0, 4);

  //   console.log(highestFour);

  let count = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < highestFour.length; j++) {
      if (data[i].bookings.length == highestFour[j]) {
        let image = document.createElement("img");
        let image2 = document.createElement("img");

        image.setAttribute("src", data[i].image);
        image.setAttribute("data-id", data[i].id);

        image2.setAttribute("src", data[i].image);
        image2.setAttribute("data-id", data[i].id);

        band_aids[count].append(image);
        band_aids[count].setAttribute("data-id", data[i].id);

        // egg[count].append(image2)
        // egg[count].setAttribute("data-id",data[i].id)

        band_aids[count].addEventListener("click", () => {
          band_aid_functionality(data[i].id);
        });

        count++;

        break;
      }
    }
    if (count == 4) {
      break;
    }
  }
}

function band_aid_functionality(value) {
  localStorage.setItem("top-user", value);
  window.location.href = "topUser.html";
}

// testing scrolling
var scroll =
  window.requestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var elementsToShow = document.querySelectorAll(".show-on-scroll");


function loop() {
  elementsToShow.forEach((ele) => {
    if (isElementInViewport(ele)) {
      ele.classList.add("is-visible");
    } //else {
      //ele.classList.remove("is-visible");
    //}
  });
  scroll(loop);
}

loop();

function isElementInViewport(el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }

  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  );
}

// pop up


let popUpText=document.querySelector(".popup-content>p")
// show the popup
function showPopup() {
  popup.classList.add('active');
  popup.style.display = "block";
  if(ValidateEmail()){
    popUpText.innerText="Added to Mailing List!"
  }else{
    popUpText.innerText="Invalid Email Address!"
  }
}

// hide the popup
function hidePopup() {
  popup.classList.remove('active');
  popup.style.display = "none"
}

//event listener for close button
closeBtn.addEventListener('click', hidePopup);

// example usage



