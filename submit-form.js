document.getElementById("newsletter-form").addEventListener("submit", function(event){
    event.preventDefault();

    const email = document.getElementById("email").valueOf.trim();
    const newsletter = document.getElementById("newsletter").checked;

    const data ={
      email: email,
      newsletter: newsletter
    };
    
    localStorage.setItem("formSubmission", JSON.stringify(data));
})