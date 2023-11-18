function openModal(){
  document.getElementById("myModal").style.display ="block";
}

function closeModal(){
  document.getElementById("myModal").style.display ="none";
}

$(document).ready(function(){
  $(`#newsletter-form`).submit(function(event){
    event.preventDefault();

    var email = $(`#email`).val().trim();
    var newsletter = $(`#checkbox`).is(`:checked`);

    if(!isValidEmail(email)){
      showMessage(`Please enter a valid email address.`, `error`);
      return;
    }

    $.ajax({
      url: `/submit-form.js`,
      type: `POST`,
      data:{
        email: email,
        newsletter: newsletter
      },
      success: function(response){
        showMessage(`Thank you for subscribing to our newsletter!`, `success`);
        $(`#newsletter-form`)[0].reset();
      },
      error: function(xhr,status,error){
        showMessage(`An error occurred. Please try again later!`, `error`);
         console.log(xhr.responseText);
      }
    });
  });

  function isValidEmail(email){
    var emailRegex = /\S+@\.\S+/;
    return emailRegex.test(email);
  }

  function showMessage(message,type){
    var messageContainer = $(`#message-container`);
    messageContainer.text(message);

    messageContainer.removeClass().addClass();

    setTimeout(function(){
      window.location.reload();
    },40000);
  }
});