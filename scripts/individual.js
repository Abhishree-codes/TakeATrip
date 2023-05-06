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