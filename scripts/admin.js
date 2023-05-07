const baseServerURL = "https://api-by-nikhil.onrender.com";

const bookURL = `${baseServerURL}/hotels`;
const userURL = `${baseServerURL}/users`;

let mainSection = document.getElementById("data-list-wrapper");
let paginationDiv = document.getElementById("pagination");
// hotel
let bookTitleInput = document.getElementById("book-title");
let bookImageInput = document.getElementById("book-image");
let bookCategoryInput = document.getElementById("book-category");
let bookAuthorInput = document.getElementById("book-author");
let bookPriceInput = document.getElementById("book-price");
let bookLocationInp = document.getElementById("book-location");

let bookCreateBtn = document.getElementById("add-book");

// Update hotel
let updateBookIdInput = document.getElementById("update-book-id");
let updateBookTitleInput = document.getElementById("update-book-title");
let updateBookImageInput = document.getElementById("update-book-image");
let updateBookAuthorInput = document.getElementById("update-book-author");
let updateBookCategoryInput = document.getElementById("update-book-category");
let updateBookPriceInput = document.getElementById("update-book-price");
let updateBookLocationInput = document.getElementById("update-book-location");
let updateBookBtn = document.getElementById("update-book");

//Update hotel
let updatePriceBookId = document.getElementById("update-price-book-id");
let updatePriceBookPrice = document.getElementById("update-price-book-price");
let updatePriceBookPriceButton = document.getElementById("update-price-book");

//sort and filter
let sortByPrice = document.getElementById("sort");
let filterByCategory = document.getElementById("filter-by-category");
let filterByLocation = document.getElementById("filter-by-location");
//Search by title/author


let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

//get user data

let getUserDatabtn = document.getElementById("fetch-users");

//get trips data

let getTripsDatabtn = document.getElementById("fetch-trips");
let getTripsDataheading = document.getElementById("fetch-trips-heading");
let getTripsDatabreak = document.getElementById("fetch-trips-break");

// //Books Data
// let booksData = [];

//sort and filter for users

let sortByBookings=document.getElementById("sort-by-bookings")
let sortByBookingLineBreak=document.getElementById("sort-by-bookings-break")

let sortByName=document.getElementById("sort-by-name")
let sortByNameLineBreak=document.getElementById("sort-by-name-break")


let filterByBooked=document.getElementById("filter-by-booked")
let filterByBookedLineBreak=document.getElementById("filter-by-booked-break")

let loader=document.getElementById("loader")


window.addEventListener("load", () => {
  loader.className="loader"
  fetchData();
});



let fetched_data = [];
let currentPage = 1;
let flag;

function fetchData() {
  fetch(bookURL)
    .then((res) => {
      if(res.ok){
        flag=true
      }else{
        flag=false
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      fetched_data = [...data];
      //getCardList(data);
      displayLoader()
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayLoader(){
  setTimeout(()=>{
    loader.classList.remove("loader")

    if(flag==true){
      renderData(1, fetched_data);
    }
    ;
},2000)
}

function renderData(currentPage, arr) {
  let startInd = (currentPage - 1) * 10;
  let endInd = startInd + 10;
  let itemsToShow = arr.slice(startInd, endInd);
  getCardList(itemsToShow);

  let totalPages = Math.ceil(arr.length / 10);

  paginationDiv.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationDiv.append(createButton(i));
  }
}

function createButton(i) {
  let btn = document.createElement("button");
  btn.className="pag-btn"
  btn.innerText = i;

  btn.addEventListener("click", () => {
    updateValues(i);
  });
  return btn;
}

function paginateData(page, arr) {
  currentPage = page;
  renderData(currentPage, arr);
}

function getCardList(data) {
  mainSection.innerHTML = "";
  let cardList = document.createElement("div");
  cardList.className = "card-list";

  cardList.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    cardList.append(createCard(data[i], i));
  }
  mainSection.append(cardList);
}

function createCard(item, i) {
  let card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-id", item.id);

  let imgDiv = document.createElement("div");
  imgDiv.className = "card__img";
  
  let image = document.createElement("img");
  image.src = item.image[0];
  image.setAttribute("alt", "book");

  // image.setAttribute("width","200px")

  imgDiv.append(image);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let h4 = document.createElement("h4");
  h4.className = "card_title";
  h4.innerText = item.name;

  let p1 = document.createElement("p");
  p1.className = "card-author";
  p1.innerText = item.location;

  let p2 = document.createElement("p");
  p2.className = "card-category";
  p2.innerText = item.category;

  let p3 = document.createElement("p");
  p3.className = "card-price";
  p3.innerText = item.price;

  

  let a = document.createElement("a");
  a.href = "#";
  a.setAttribute("data-id", item.id);
  a.className = "card__link";
  a.innerText = "Edit";

  a.addEventListener("click", (e) => {
    e.preventDefault();
    populate(item);
    populateOnlyPrice(item);
  });

  let btn = document.createElement("button");
  btn.setAttribute("data-id", item.id);
  btn.className = "card-button";
  btn.innerText = "Delete";

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteBook(item);
  });

  cardBody.append(h4, p1, p2, p3, a, btn);
  card.append(imgDiv, cardBody);

  return card;
}

bookCreateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addNewBooks();
});

function addNewBooks() {
  fetch(bookURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: bookTitleInput.value,
      location: bookLocationInp.value,
      category: bookCategoryInput.value,
      image: [bookImageInput.value],
      price: bookPriceInput.value,
      rating: "&#11088 &#11088 &#11088 &#11088 &#11088",
      description: bookAuthorInput.value,
      booked: "false",
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteBook(item) {
  fetch(`${bookURL}/${item.id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
}

function populate(item) {
  updateBookIdInput.value = item.id;
  updateBookTitleInput.value = item.name;
  updateBookImageInput.value = item.image;
  updateBookAuthorInput.value = item.description;
  updateBookCategoryInput.value = item.category;
  updateBookPriceInput.value = item.price;
  updateBookLocationInput.value = item.location;
}

updateBookBtn.addEventListener("click", () => {
  patchRequest();
});

function patchRequest() {
  fetch(`${bookURL}/${updateBookIdInput.value}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: updateBookTitleInput.value,
      location: updateBookLocationInput.value,
      category: updateBookCategoryInput.value,
      image: [updateBookImageInput.value],
      price: Number(updateBookPriceInput.value),
      rating: "&#11088 &#11088 &#11088 &#11088 &#11088",
      description: updateBookAuthorInput.value,
      booked: "false",
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
}

function populateOnlyPrice(item) {
  updatePriceBookPrice.value = item.price;
  updatePriceBookId.value = item.id;
}

updatePriceBookPriceButton.addEventListener("click", () => {
  updateOnlyPrice();
});

function updateOnlyPrice() {
  fetch(`${bookURL}/${updatePriceBookId.value}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      price: Number(updatePriceBookPrice.value),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
}

searchByButton.addEventListener("click", () => {
  if(searchByButton.classList.contains("user-search")){
    updateValueUser()
  }else{
  updateValues(1)
  }
});
sortByPrice.addEventListener("change", () => {
  updateValues(1);
});

filterByCategory.addEventListener("change", () => {
  updateValues(1);
});

filterByLocation.addEventListener("change", () => {
  updateValues(1);
});

function updateValues(i) {
  let filterByCategoryValue = filterByCategory.value;
  let sortByPriceValue = sortByPrice.value;
  let filterByLocationValue = filterByLocation.value;
  let searchByInputValue=searchByInput.value
  filterData(filterByCategoryValue, sortByPriceValue, filterByLocationValue,searchByInputValue, i);
}

function filterData(
  filterByCategoryValue,
  sortByPriceValue,
  filterByLocationValue,searchByInputValue,
  i
) {
  let arr = [...fetched_data];

  if (filterByCategoryValue != "") {
    arr = arr.filter((ele) => {
      return ele.category == filterByCategoryValue;
    });
  }
  if(searchByInputValue!=""){
    arr=arr.filter((ele)=>{
      return ele.name.toUpperCase().includes(searchByInputValue.toUpperCase())
    })
  }

  if (filterByLocationValue != "") {
    arr = arr.filter((ele) => {
      return ele.location == filterByLocationValue;
    });
  }
  if (sortByPriceValue == "sort-low-to-high") {
    arr.sort((a, b) => {
      return a.price - b.price;
    });
  } else if (sortByPriceValue == "sort-high-to-low") {
    arr.sort((a, b) => {
      return b.price - a.price;
    });
  }

  paginateData(i, arr);
}

getUserDatabtn.addEventListener("click", () => {
  fetchUsersData();
});

let users_fetched_data=[]


function fetchUsersData() {
  fetch(userURL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      users_fetched_data=[...data]

      getTripsDatabtn.style.display = "inline";
      getTripsDatabreak.style.display = "block";
      getTripsDataheading.style.display = "block";
      sortByBookings.style.display="block"
      sortByBookingLineBreak.style.display="block"
      sortByName.style.display="block"
      sortByNameLineBreak.style.display="block"
      filterByBooked.style.display="block"
      filterByBookedLineBreak.style.display = "block";
      searchByButton.classList.add("user-search")
      searchByInput.setAttribute("placeholder","Search By Name")
      paginationDiv.innerHTML=""
      getCardListforUsers(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

getTripsDatabtn.addEventListener("click", () => {
  getTripsDatabtn.style.display = "none";
  getTripsDatabreak.style.display = "none";
  getTripsDataheading.style.display = "none";
  sortByBookings.style.display="none"
      sortByBookingLineBreak.style.display="none"
      sortByName.style.display="none"
      sortByNameLineBreak.style.display="none"
      filterByBooked.style.display="none"
      filterByBookedLineBreak.style.display = "none";
     searchByButton.classList.remove("user-search")

  fetchData();
});



sortByBookings.addEventListener("change",()=>{
  updateValueUser()
})
sortByName.addEventListener("change",()=>{
  updateValueUser()
})

filterByBooked.addEventListener("change",()=>{
  updateValueUser()
})

function updateValueUser(){
  let sortByBookingsValue=sortByBookings.value;
  let sortByNameValue=sortByName.value;
  let filterByBookedValue=filterByBooked.value
  let searchByInputValue=searchByInput.value

  filterDataForUser(sortByBookingsValue,sortByNameValue,searchByInputValue,filterByBookedValue)
}

function filterDataForUser(sortByBookingsValue,sortByNameValue,searchByInputValue,filterByBookedValue){

  let arr = [...users_fetched_data];


  if(searchByInputValue.length!=0){
   
    arr=arr.filter((ele)=>{
      return ele.name.toUpperCase().includes(searchByInputValue.toUpperCase())
      
    })
    console.log(arr)
  }

  if (filterByBookedValue != "") {
    arr = arr.filter((ele) => {
      if(filterByBookedValue=="true"){
        return ele.booked==true
      }else if(filterByBookedValue=="false"){
        return ele.booked=="false"
      }
    });
  }

  if (sortByNameValue == "sort-low-to-high") {
    arr.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

  } else if (sortByNameValue == "sort-high-to-low") {
    arr.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
  }

  if (sortByBookingsValue == "sort-low-to-high") {
    arr.sort((a, b) => {
      return a.bookings.length - b.bookings.length;
    });

  } else if (sortByBookingsValue == "sort-high-to-low") {
    arr.sort((a, b) => {
      return b.bookings.length - a.bookings.length;
    });
  }
  getCardListforUsers(arr)
}

function getCardListforUsers(data) {
  mainSection.innerHTML = "";
  let cardList = document.createElement("div");
  cardList.className = "card-list";

  cardList.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    cardList.append(createCardforUser(data[i]));
  }
  mainSection.append(cardList);
}

function createCardforUser(item) {
  let card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-id", item.id);

  let imgDiv = document.createElement("div");
  imgDiv.className = "card__img";

  let image = document.createElement("img");
  image.src = item.image;
  image.setAttribute("alt", "book");

  imgDiv.append(image);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let h4 = document.createElement("h4");
  h4.className = "card_title";
  h4.innerText = item.name;

  let p1 = document.createElement("p");
  p1.className = "card-author";
  p1.innerText = item.email;


  let p3 = document.createElement("p");
  p3.className = "card-price";

  p3.innerText = `Trips Booked: ${item.bookings.length}`;

  let ul = bookingsList(item);

  let btn = document.createElement("button");
  btn.setAttribute("data-id", item.id);
  btn.className = "card-button";
  btn.innerText = "Delete User";

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteUser(item);
  });

  cardBody.append(h4, p1, p3, ul, btn);
  card.append(imgDiv, cardBody);

  return card;
}

function bookingsList(item) {
  let ul = document.createElement("ul");
  for (let i = 0; i < item.bookings.length; i++) {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    btn.innerText = "Delete Booking";
    li.innerText = item.bookings[i].name;
    ul.append(li, btn);

    btn.addEventListener("click", () => {
      item.bookings.splice(i, 1);
      deleteBooking(item.bookings, item);
      if(item.bookings.length==0){
        patchBookedValue(item.bookings,item)
      }
    });
  }
  return ul;
}

function deleteUser(item) {
  fetch(`${userURL}/${item.id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      //call function here
      fetchUsersData();
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteBooking(arr, item) {
  fetch(`${userURL}/${item.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      bookings: [...arr],
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fetchUsersData();
    })
    .catch((error) => {
      console.log(error);
    });
}

function patchBookedValue(arr, item) {
  fetch(`${userURL}/${item.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      booked:false,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
  
    })
    .catch((error) => {
      console.log(error);
    });
};




