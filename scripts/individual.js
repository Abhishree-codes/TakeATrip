
const usersURL = "https://api-by-nikhil.onrender.com/users";


let data = JSON.parse(localStorage.getItem("view-details"));
console.log(data);

let cont = document.querySelector(".image");
let img1 = document.createElement("img");
img1.src = data.image[0];
img1.setAttribute("alt", "#");
cont.append(img1);

function ima(item) {
    let img = document.createElement("img");
    img.src = item;

    img.addEventListener("click", function() {
        img1.src = img.src;
    });

    return img;
}

function displayImg(dat) {
    let images = document.querySelector(".images");
    dat.image.forEach(element => {
        images.append(ima(element));
    });
}

displayImg(data);


let h2=document.getElementById("tit")
h2.innerText=data.name

let price=document.getElementById("price")
price.innerText="Starting From   ₹  "+data.price


let des=document.getElementById("des")

des.innerText=data.description

let locationn=document.getElementById("location")

locationn.innerText=data.location

let catagory=document.getElementById("catagory")

catagory.innerText=data.catagory

let book=document.getElementById("book")

book.addEventListener("click",function(){
    let a=JSON.parse(localStorage.getItem("logged_in"))||"charis@gmail.com"
let imgdata=[]
    if(a==""){
        // window.location.href="index.html"
    }


    else{


        function fetchUserData() {
            fetch(usersURL)
              .then((res) => {
                return res.json();
              })
              .then((dat) => {
                console.log(dat);
               let filt=[...dat].filter(function(e){
                if(e.email==a){
                    return true
                }
                else{
                    return false
                }
               })
              let id=filt[0].id
           
               imgdata=filt[0].bookings
              
               if(!check(imgdata,data.name)){imgdata.push(data)}
               else{
                   alert("booking already done")
            }
            console.log(imgdata)
              
                fetch(`https://api-by-nikhil.onrender.com/users/${id}` ,{
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    method: 'PATCH',                                                              
                    body: JSON.stringify( { bookings: imgdata } )   
                    
                    
                    
                  }).then((res)=>res.json())
                  .then((data)=>{
                    console.log(data)
                  })
              })
             
              .catch((error) => {
                console.log(error);
              });
          }


fetchUserData()
        }


// window.location.href="index.html"
   
})

function check(a, e) {
    return a.some(element => {
      return element.name === e;
    });
  }