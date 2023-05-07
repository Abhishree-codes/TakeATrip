
function ValidateEmail(input) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {      
      return true;     
    }
    return false;
  }

  function showPopup(popupId,popuptextId,popuptext) {
    let popup = document.getElementById(popupId);
    let popUpText=document.getElementById(popuptextId)
    popup.classList.add('active');
    popup.style.display = "block";
    popUpText.innerText=popuptext;    
  }
  
  // hide the popup
  function hidePopup(popupId) {
    let popup = document.getElementById(popupId);
    popup.classList.remove('active');
    popup.style.display = "none"
  }

  export {ValidateEmail,showPopup,hidePopup}
