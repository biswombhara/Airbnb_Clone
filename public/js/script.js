// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();

//toggle switch
try{ 
  let taxSwitch = document.getElementById("flexSwitchCheckDefault");
  let listing_prices = document.getElementsByClassName("listing_price");
      taxSwitch.addEventListener("click", () => {
        let taxInfo = document.getElementsByClassName("tax-info");
        for(info of taxInfo){
          if(info.style.display != "inline"){
            info.style.display ="inline";
            for(listing_price of listing_prices){
              listing_price.style.display ="none";
            }
          }else{
            info.style.display ="none";
            for(listing_price of listing_prices){
              listing_price.style.display ="inline";
            }
          }
        }
      });
    }catch (err){
      console.log(err);
    }



//user

let user_icon = document.getElementById("user-icon");
user_icon.addEventListener("click",()=>{
  let lg = document.getElementById("lg");
  if(lg.style.display == ""){
    lg.style.display = "block";
    let list_group = document.querySelector(".list_group");
    list_group.style.position = "fixed";
  }else{
    lg.style.display = "";
  }
});
