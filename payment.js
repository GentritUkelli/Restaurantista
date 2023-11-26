var paymentForm = document.getElementById("payment-form");
var payButton = document.getElementById("pay-button");

paymentForm.addEventListener("submit", function(event){
    event.preventDefault();

    var name = document.getElementById("name").value;
    var cardNumber = document.getElementById("card-number").value;
    var cvc = document.getElementById("cvc").value;
    var expirationDate = document.getElementById("expiration-date").value;

    //validate inputs 
    if(name.trim() === '' || cardNumber.trim() === '' || cvc.trim() ==='' || expirationDate.trim() ===''){
      alert('Please fill all fields that are required.');
      return;
    }

    if(!cardNumber.match(/^\d{13,16}$/)){
       alert("Please enter a valid card number,");
       return;
    }

    if(!cvc.match(/^\d{3,4}$/)){
      alert("Please enter a valid CVC");
      return;
    }

    document.getElementById("success-message").style.display = "block";
    
    //blur the form
    paymentForm.style.filter = "blur(4px)";
    
    //reset form
    paymentForm.reset();
}); 