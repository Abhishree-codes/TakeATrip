const baseServerURL = "https://api-by-nikhil.onrender.com/";
const usersURL = "https://api-by-nikhil.onrender.com/users";

let band_aids= document.getElementsByClassName("img");

window.addEventListener("load", () => {
  fetchUserData();
});

function fetchUserData() {
  fetch(usersURL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
    //   console.log(data);
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
        image.setAttribute("src",data[i].image)
        image.setAttribute("data-id",data[i].id)
        band_aids[count].append(image)
        band_aids[count].setAttribute("data-id",data[i].id)

        band_aids[count].addEventListener("click",()=>{
            band_aid_functionality(data[i].id)
        })

        count++;
        
        break;
      }
    }
    if(count==4){
        break;
    }
  }
}


function band_aid_functionality(value){
    localStorage.setItem("top-user",value)
    window.location.href="topUser.html"
}

