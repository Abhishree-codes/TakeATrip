

let login = document.querySelector(".login");
    let userLogin = document.querySelector(".SignIn");
    let create = document.querySelector(".create");
    let userSubmit = document.querySelector(".submit");
    let container = document.querySelector(".container");
    let username = document.querySelector(".username");
    let email = document.querySelector(".email");
    let newEmail = document.getElementById("email");
    let password = document.querySelector(".pass");
    let newPass = document.getElementById("pass");
    let confirmPass = document.querySelector(".confirmPass");
    let singupText = document.getElementById("signupText");
    let singinText = document.getElementById("signinText");
    let goToHome = document.getElementById("toHomePage");
    let spinner = document.querySelector(".spinner");
    let spin = document.getElementById("spin");

let api="https://api-by-nikhil.onrender.com/admin";

let userData;
async function getData(){
    let res=await fetch(api,{
        method:"GET",
        headers:{
            "Content-type":"application/json"
        }
    });
      let data=await res.json();
      console.log(data);
      userData= data;
}
getData();

async function PostData(username,emailId,pwd){
  let res=await fetch(api,{
      method:"POST",
      body:JSON.stringify({
         name:username,
         email:emailId,
         password:pwd
      }),
      headers:{
      "Content-type":"application/json"
      }

  });

  let data=await res.json();
  console.log(data);
  console.log(res)
  getData();
}

    // login.onclick = () => {
    //     container.classList.add("signinForm");
    // }
    // create.onclick = () => {
    //     container.classList.remove("signinForm");
    // }


    // PLEASE USE POST METHOD TO POST HE USERDATA AND DURING REGISTERATION
    // AND USE GET METHOD TO LOGIN
    // VARIABLE IS => userData

    // userSubmit.addEventListener("click", (e) => {
    //     e.preventDefault();

    //     // Use fetch according to your need

    //     if (password.value !== confirmPass.value) {
    //         singupText.innerText = "Please enter the same password";
    //         singupText.style.color = "red";
    //         singupText.style.fontSize = "16px";

    //     } else if (checkExisting(userData)) {
    //         singupText.innerText = "Account already exist";
    //         singupText.style.color = "#00dfc4";
    //         singupText.style.fontSize = "17px";

    //     } else {
    //         // const data = {
    //         //     name: username.value,
    //         //     email: email.value,
    //         //     password: password.value
    //         // };
    //         //call api
    //         let res = PostData(username.value,email.value,password.value);
    //         res.then((res)=>{
    //           singupText.innerText = "Account Created";
    //           singupText.style.color = "greenyellow";
    //         })
    //         // userData.push(data);
    //         // localStorage.setItem("user", JSON.stringify(userData));
          
    //     }
    // });

    function checkExisting(data) {
        for (let i = 0; i < data.length; ++i) {
            if (data[i].email === email.value) {
                return true;
            }
        }
        return false;
    }

    userLogin.addEventListener("click", (e) => {
        e.preventDefault();

        // use fetch according to your need
        
        if (userData.length === 0) {
            singinText.innerText = "Account doesn't exist";
            singinText.style.color = "yellow";
        }        
         else if (checkDetails(userData)) {
            localStorage.setItem("logged_in",JSON.stringify(newEmail.value));
            singinText.innerText = "Login Successful";
            singinText.style.color = "greenyellow";

            // spin.style.display = "none";
            // spinner.style.display = "block";
            // setTimeout(() => {
            //     spinner.style.display = "block";
            //     window.location.href = "#";
            // }, 3000);

        } else {
            singinText.innerText = "Email or password is incorrect";
            singinText.style.fontSize = "16px";
            singinText.style.color = "red";
        }
    })

    function checkDetails(data) {
        for (let i = 0; i < data.length; ++i) {
            if (data[i].email === newEmail.value && data[i].password == newPass.value) {
                return true;
            }
        }
        return false;
    }
// button.addEventListener("click",function(){
   
//     let filter=data1.filter((el)=>{
//       if(el.email==email.value && el.password==password.value){
//         return true;
//       }else{
//         return false;
//       }
       
//     })

//     if(filter.length!==0&&filter!==undefined){
//         alert ("login successfull")
//     }else{
//         alert ("user name or password is incorrect")
//     }
        
    
    
  

// })







