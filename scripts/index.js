
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
let logOutBtn=document.getElementById("c1")

let cartDropDown=document.getElementById("cart")
let accountDropDown=document.getElementById("account")




let adminBtn = document.getElementById("b3");

const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close-btn');



let user_name;



window.addEventListener("load",()=>{
  user_name=localStorage.getItem("logged_in")


  toggle()
})


function toggle(){
if(user_name){
  loginBtn.style.display="none"
  registerBtn.style.display="none"
  logOutBtn.style.display="block"

  cartDropDown.style.display="block"
  accountDropDown.style.display="block"
}else{
  loginBtn.style.display="block"
  registerBtn.style.display="block"
  logOutBtn.style.display="none"

  cartDropDown.style.display="none"
  accountDropDown.style.display="none"
}

cartDropDown.addEventListener("click",()=>{
  window.location.href="cart.html"
})

logOutBtn.addEventListener("click",()=>{
  user_name=""
  localStorage.setItem("logged_in",user_name)
  location.reload()
})
}

loginBtn.addEventListener("click",()=>{
  window.location.href="login_page/login.html"
})
registerBtn.addEventListener("click",()=>{
  window.location.href="login_page/login.html"
})
adminBtn.addEventListener("click",()=>{
  window.location.href="login_page/adminlogin.html"
})

// if username is not null
//remove login/sign up add logout-- done
//my cart, my account, logout===done
//if he clicks cart redirect to cart ---done

//if logout refresh page with local storage key as null---done
//display login sign up ---done


//now if hes not logged in youll
//all hrefs need to store a filter key and then redirect to product=== done
//product will check for filter key (and logged in key for adding to cart)---done
//if location click then redirect to product page with filter key set to location ---done

//FOR PRODUCT PAGE 

locationInp.addEventListener("click", () => {
  console.log(locationInp.value)
  localStorage.setItem("location", locationInp.value);
//value keeps coming null?
  //use this to display on product page
});

let Ooty=document.getElementById("Ooty")
let Shimla=document.getElementById("Shimla")
let Maldives=document.getElementById("Maldives")
let Varanasi=document.getElementById("Varanasi")
let Amritsar=document.getElementById("Amritsar")
let Goa=document.getElementById("Goa")
let Amsterdam=document.getElementById("Amsterdam")
let Dubai=document.getElementById("Dubai")

let locationsDropDownArray=[Ooty,Shimla,Maldives,
Varanasi,Amritsar,Goa,Amsterdam,Dubai]

locationsDropDownArray.forEach((ele)=>{
  ele.addEventListener("click",(e)=>{
    e.preventDefault()
    storeLocationKey(ele)

  })
})

function storeLocationKey(ele){
  let str=""
  if(ele.id[ele.id.length-1]==1){
    str=ele.id.slice(0,-1)
  }else{
    str=ele.id
  }
  localStorage.setItem("location",str)
  //redirect here
  window.location.href="product.html" 
}


//REDIRECTING FOR THE IMAGES

let imgDivLocationsArray=document.querySelectorAll(".card")

imgDivLocationsArray.forEach((ele)=>{
  ele.addEventListener("click",()=>{

    
    storeLocationKey(ele)
  })
})


subBtn.addEventListener("click", () => {
  showPopup()
});

function ValidateEmail() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(subInp.value)) {
    
    return true;
   
  }
  
  
  return false;
}



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



//cross deleted so code not needed??
// ---band aid 
// ---dream  trip 
// ---top trvaeller
// ---explore the beauty 
// ---find location
var menuBtn = document.querySelector('.menu-btn');
var navbar = document.querySelector('.burgerMenu');
var cross = document.querySelector('.cross');
function myburger(){
    navbar.style.display="flex"
}
menuBtn.addEventListener('click', myburger);

// cross.addEventListener('click', function(){
//     navbar.style.display="none"
// })

let discover=document.getElementById("discover")

discover.addEventListener("click",function(){

    window.location.href="product.html"
})




