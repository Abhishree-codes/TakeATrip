
const baseServerURL = "https://api-by-nikhil.onrender.com"




const bookURL = `${baseServerURL}/hotels`;
let mainSection = document.getElementById("data-list-wrapper");

// hotel
let bookTitleInput = document.getElementById("book-title");
let bookImageInput = document.getElementById("book-image");
let bookCategoryInput = document.getElementById("book-category");
let bookAuthorInput = document.getElementById("book-author");
let bookPriceInput = document.getElementById("book-price");
let bookCreateBtn = document.getElementById("add-book");

// Update hotel
let updateBookIdInput = document.getElementById("update-book-id");
let updateBookTitleInput = document.getElementById("update-book-title");
let updateBookImageInput = document.getElementById("update-book-image");
let updateBookAuthorInput = document.getElementById("update-book-author");
let updateBookCategoryInput = document.getElementById("update-book-category");
let updateBookPriceInput = document.getElementById("update-book-price");
let updateBookBtn = document.getElementById("update-book");

//Update hotel
let updatePriceBookId = document.getElementById("update-price-book-id");
let updatePriceBookPrice = document.getElementById("update-price-book-price");
let updatePriceBookPriceButton = document.getElementById("update-price-book");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterRoyals = document.getElementById("filter-Royals");
let filterParty = document.getElementById("filter-Party");
let filterPilgrimages = document.getElementById("filter-Pilgrimages");
let filterMountains = document.getElementById("filter-Mountains");
let filterVacation = document.getElementById("filter-Vacation");

//Search by title/author

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// //Books Data
// let booksData = [];

window.addEventListener("load",()=>{
fetchData()
})

function fetchData(){
  fetch(bookURL).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data)
    getCardList(data)
  }).catch((error)=>{
    console.log(error)
  })
}

function getCardList(data){
  mainSection.innerHTML=""
  let cardList=document.createElement("div")
  cardList.className="card-list"

  cardList.innerHTML=""

  for(let i=0; i<data.length; i++){
    cardList.append(createCard(data[i],i))
  }
  mainSection.append(cardList)
}

function createCard(item,i){
  let card=document.createElement("div")
  card.className="card"
  card.setAttribute("data-id",item.id)

  let imgDiv=document.createElement("div")
  imgDiv.className="card__img"

  let image=document.createElement("img")
  image.src=item.image[0]
  image.setAttribute("alt","book")

  imgDiv.append(image)

  let cardBody=document.createElement("div")
  cardBody.className="card-body"

  let h4=document.createElement("h4")
  h4.className="card-title"
  h4.innerText=item.name

  let p1=document.createElement("p")
  p1.className="card-author"
  p1.innerText=item.location

  let p2=document.createElement("p")
  p2.className="card-category"
  p2.innerText=item.category

  let p3=document.createElement("p")
  p3.className="card-price"
  p3.innerText=item.price

  let a=document.createElement("a")
  a.href="#"
  a.setAttribute("data-id",item.id)
  a.className="card-link"
  a.innerText="Edit"

  a.addEventListener("click",(e)=>{
    e.preventDefault()
    populate(item)
    populateOnlyPrice(item)
  })

  let btn=document.createElement("button")
  btn.setAttribute("data-id",item.id)
  btn.className="card-button"
  btn.innerText="Delete"

  btn.addEventListener("click",(e)=>{
    e.preventDefault()
    deleteBook(item)
    
  })

  cardBody.append(h4, p1,p2,p3,a,btn)
  card.append(imgDiv,cardBody)

  return card
}

bookCreateBtn.addEventListener("click",(e)=>{
  e.preventDefault()
  addNewBooks()
})

function addNewBooks(){
  fetch(bookURL,{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({
      name: bookTitleInput.value,
      location:"Ooty",
      category:bookCategoryInput.value,
      image:[bookImageInput.value],
      price:bookPriceInput.value,
      rating:"&#11088 &#11088 &#11088 &#11088 &#11088",
      description:bookAuthorInput.value,
      booked:"false" 
    })
  }).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data)
    fetchData()
  }).catch((error)=>{
    console.log(error)
  })
}

function deleteBook(item){
  fetch(`${bookURL}/${item.id}`,{
    method:"DELETE"
  }).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data)
    fetchData()
  }).catch((error)=>{
    console.log(error)
  })
}

function populate(item){
  updateBookIdInput.value=item.id
  updateBookTitleInput.value=item.name
  updateBookImageInput.value=item.image
  updateBookAuthorInput.value=item.description
  updateBookCategoryInput.value=item.category
  updateBookPriceInput.value=item.price
}


updateBookBtn.addEventListener("click",()=>{
  patchRequest()
})

function patchRequest(){
  fetch(`${bookURL}/${updateBookIdInput.value}`,{
    method:"PATCH",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({
      name: updateBookTitleInput.value,
      location:"Ooty",
      category:updateBookCategoryInput.value,
      image:[updateBookImageInput.value],
      price:Number(updateBookPriceInput.value),
      rating:"&#11088 &#11088 &#11088 &#11088 &#11088",
      description:updateBookAuthorInput.value,
      booked:"false", 
    })
  }).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data)
    fetchData()
  }).catch((error)=>{
    console.log(error)
  })
}

function populateOnlyPrice(item){
  updatePriceBookPrice.value=item.price
  updatePriceBookId.value=item.id

}

updatePriceBookPriceButton.addEventListener("click",()=>{
updateOnlyPrice()
})

function updateOnlyPrice(){
  fetch(`${bookURL}/${updatePriceBookId.value}`,{
    method:"PATCH",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({
      price:Number(updatePriceBookPrice.value)
    })
  }).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data)
    fetchData()
  }).catch((error)=>{
    console.log(error)
  })
}

sortAtoZBtn.addEventListener("click",()=>{
  sortAsc()
})

function sortAsc(){
  fetch(`${bookURL}?_sort=price&_order=asc`).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data)
    getCardList(data)
  }).catch((error)=>{
    console.log(error)
  })
}

sortZtoABtn.addEventListener("click",()=>{
  sortDesc()
})

function sortDesc(){
  fetch(`${bookURL}?_sort=price&_order=desc`).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data)
    getCardList(data)
  }).catch((error)=>{
    console.log(error)
  })
}

filterClassic.addEventListener("click",()=>{
  showClassic()
})

function showClassic(){
  fetch(`${bookURL}?category=Classic`).then((res)=>{
    return res.json()
  }).then((data)=>{
    //console.log(data)
    getCardList(data)
  }).then((error)=>{
    console.log(error)
  })
}

filterFantasy.addEventListener("click",()=>{
  showFantasy()
})

function showFantasy(){
  fetch(`${bookURL}?category=Fantasy`).then((res)=>{
    return res.json()
  }).then((data)=>{
    //console.log(data)
    getCardList(data)
  }).then((error)=>{
    console.log(error)
  })
}

filterMystery.addEventListener("click",()=>{
  showMystery()
})

function showMystery(){
  fetch(`${bookURL}?category=Mystery`).then((res)=>{
    return res.json()
  }).then((data)=>{
    //console.log(data)
    getCardList(data)
  }).then((error)=>{
    console.log(error)
  })
}

searchByButton.addEventListener("click",()=>{
  search()
})

function search(){
  if(searchBySelect.value=="title"){
    searchByTitle()
  }else if(searchBySelect.value=="author"){
    searchByAuthor()
  }else if(searchBySelect.value==""){
    fetchData()
  }
}

function searchByTitle(){
  fetch(`${bookURL}?title=${searchByInput.value}`).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data)
    getCardList(data)
  }).catch((error)=>{
    console.log(error)
  })
}

function searchByAuthor(){
  fetch(`${bookURL}?author=${searchByInput.value}`).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data)
    getCardList(data)
  }).catch((error)=>{
    console.log(error)
  })
}