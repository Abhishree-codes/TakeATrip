



let pagi=document.querySelector(".pagination-container")

let totalCount=document.getElementById("total-count")

let gdata=[]
function featchData(pageNumber){

fetch(`https://api-by-nikhil.onrender.com/hotels?_page=${pageNumber}&_limit=10`)

.then((res)=> {let totalPosts = res.headers.get("X-Total-Count");
let totalButtons = Math.ceil(totalPosts / 10);

pagi.innerHTML = null;


for (let i = 1; i <= totalButtons; i++) {
  pagi.append(buttonM(i, i));
}
return res.json()})
.then((data)=>{
  
gdata=[...data]
  displayData(data)
  console.log(data.length)
  totalCount.innerText=data.length+"  Packages"
  
}

)

}
featchData(1)


function buttonM(text,dataID){
  let button=document.createElement("button")
  button.className="pagination-button"
  button.setAttribute("data-page-number",dataID)
  button.textContent=text
  button.addEventListener("click",function(e){
featchData(e.target.dataset.pageNumber)
  })
  return button
}



let main=document.querySelector(".container")
function displayData(data){

main.innerHTML=""

let cardList=document.createElement("div")
cardList.className=("card-list")

data.forEach(element => {
  cardList.append(card(element))
});

main.append(cardList)

}

function card(item){

let card=document.createElement("div")

card.className=("card")
card.setAttribute("data-id",item.id)


let cardImg=document.createElement("div")
cardImg.className=("card__img")

let img=document.createElement("img")
img.src=item.image[0]
img.setAttribute("alt",` image`)

cardImg.append(img)


let cardBody=document.createElement("div")
cardBody.className=("card__body")
let h3=document.createElement("h3")
h3.classList.add("card__item","card__title")
h3.textContent=item.name

let duraction=document.createElement("h3")
duraction.textContent= "5 Night / 6 Days"
let rating=document.createElement("h3")
rating.innerHTML="Rating " + item.rating
let loca=document.createElement("h3")
loca.innerText=" Location       "+item.location

cardBody.append(h3,duraction,rating,loca)


let pricDiv=document.createElement("div")

let EMI=document.createElement("p")
EMI.innerHTML="EMI  ₹ 1,966 "

let price=document.createElement("h2")
price.innerText="₹"+item.price

let viewB=document.createElement("button")
viewB.textContent="View Details"
viewB.id=("view-details")



viewB.addEventListener("click",function(){
localStorage.setItem("view-details",JSON.stringify(item))

window.location.href="individual-pro.html"
})
let pay=document.createElement("p")
pay.innerText="Pay & Hold  ₹ 1,000"

let earn=document.createElement("p")
earn.innerText="Earn eCash ₹ 1,289"

pricDiv.append(EMI,price,viewB,pay,earn)

card.append(cardImg,cardBody,pricDiv)
return card

}





let destination=document.getElementById("destination")

let disData=""

let searchValue=destination.value

let search=document.getElementById("Search")
search.addEventListener("click",function(){
  

  let gdataa=[...gdata]
console.log(destination.value)
  gdataa=gdataa.filter(function(e){

if(e.location.toUpperCase()==destination.value.toUpperCase()){
  return true
}
else{
  return false
}

  })
disData=[...gdataa]
  displayData(gdataa)
  pagi.style.display="none"
  totalCount.innerText=gdataa.length+"  Packages"

  

})

let popup=document.getElementById("popup")
let popdon=document.getElementById("popdon")

popup.addEventListener("click",function(){
let gdataa=disData||[...gdata]

 gdataa=gdataa.sort((a,b)=>{return a.price-b.price})
 displayData(gdataa)
 totalCount.innerText=gdataa.length+"  Packages"
})



popdon.addEventListener("click",function(){

  let gdataa=disData||[...gdata]
  console.log(disData)
  
    gdataa=gdataa.sort((a,b)=>{return b.price-a.price})
    displayData(gdataa)
    totalCount.innerText=gdataa.length+"  Packages"
})


let logo2=document.getElementById("logo12")

logo2.addEventListener("click",function(){


  featchData(1)
  pagi.style.display="flex"
  
})


let title=document.getElementById("takea")
title.addEventListener("click",function(){
window.location.href="index.html"

})
