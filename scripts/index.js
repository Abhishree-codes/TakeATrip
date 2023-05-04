<<<<<<< HEAD
=======
// ---band aid 
// ---dream  trip 
// ---top trvaeller
// ---explore the beauty 
// ---find location

let banner_Img=document.querySelector(".img")

const baseServerURL="https://api-by-nikhil.onrender.com/"
const users= "https://api-by-nikhil.onrender.com/users"


window.addEventListener("load",()=>{

})
function bannerUsers(){
    fetch(users).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data)
    })
}
>>>>>>> 1a3d66a (starting functionality and reponsiveness)
