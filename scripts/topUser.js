let userID=localStorage.getItem("top-user")
let usersURL="https://api-by-nikhil.onrender.com/users"


let userData=document.querySelector(".user")

let tripsData=document.querySelector(".trips")


window.addEventListener("load",()=>{
    console.log(userID)
    fetchUserData()
})

function fetchUserData(){
    fetch(`${usersURL}/${userID}`).then((res)=>{
        return res.json()
    }).then((item)=>{
        console.log(item)
        createUserCard(item)
        loopBookedArray(item)
    }).catch((error)=>{
        console.log(error)
    })
}

// NAME
//IMAGE
//TRIPS BOOKED


function createUserCard(item){
    let imgDiv=document.createElement("div")
    imgDiv.className="card-image"
    
    let image=document.createElement("img")
    image.setAttribute("src",item.image)
    
    imgDiv.append(image)

    let titleDiv=document.createElement("div")
    titleDiv.className="title"

    let h3=document.createElement("h3")
    h3.innerText=item.name

    titleDiv.append(h3)

    userData.append(imgDiv,titleDiv)
}

function loopBookedArray(item){
    item.bookings.forEach((ele)=>{
        tripsData.append(createTripCard(ele))
        console.log(ele)
    })
}

function createTripCard(ele){
    let tripCard=document.createElement("div")

    let tripCardDetails=document.createElement("div")

    tripCard.className="trip-card"

    let h1=document.createElement("h3")
    h1.innerText=ele.name

    let h2=document.createElement("h3")
    h2.innerText=ele.location

    let h3=document.createElement("h3")
    h3.innerText=ele.category
    
    let price=document.createElement("h3")
    price.innerText=ele.price

    let desc=document.createElement("desc")
    desc.innerText=ele.description


    tripCardDetails.append(h1,h2,h3,price,desc)

    let tripCardImgDiv=document.createElement("div")
    let image=document.createElement("img")

    image.setAttribute("src", ele.image[0])

    tripCardImgDiv.append(image)

    tripCard.append(tripCardDetails,tripCardImgDiv)
    return tripCard
}

