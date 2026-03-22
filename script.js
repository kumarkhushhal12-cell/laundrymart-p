const config = {
    publicKey: "-ZqbNnlOKiPFUgH7S", 
    serviceId: "service_du9dmui", 
    templateId: "template_blkkk5s"
};

emailjs.init(config.publicKey);

const buttons = document.querySelectorAll(".add-btn");

const cart = document.getElementById("cartItems");

const totalDisplay = document.getElementById("total");

let total = 0;

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const serviceName = this.parentElement.querySelector("span").innerText;

        const price = Number(this.dataset.price);

        const noItems = cart.querySelector("p");
        if (noItems && noItems.innerText === "No items added") {
            cart.removeChild(noItems);
        }

        if (this.innerText === "Add Item") {
            const item = document.createElement("p");
            item.innerText = serviceName + " - ₹" + price;
            cart.appendChild(item);

            total += price;
            totalDisplay.innerText = total;

            this.innerText = "Remove Item";
            this.style.backgroundColor = "red";

        } else {
            const items = cart.querySelectorAll("p");
            for (let item of items) {
                if (item.innerText.startsWith(serviceName)) {
                    item.remove();
                    break;
                }
            }

            total -= price;
            totalDisplay.innerText = total;

            this.innerText = "Add Item";
            this.style.backgroundColor = "";

            if (cart.querySelectorAll("p").length === 0) {
                const noItems = document.createElement("p");
                noItems.innerText = "No items added";
                cart.appendChild(noItems);
            }
        }
    });
});

const emailInput = document.getElementById("email");
emailInput.addEventListener("input", function(){
    const email = this.value;
    const isValid = /^\S+@\S+\.\S+$/.test(email);
    this.style.borderColor = isValid ? "" : "red";
});

const confirmEmailInput = document.getElementById("confirmEmail");
confirmEmailInput.addEventListener("input", function(){
    const confirmEmail = this.value;
    const email = document.getElementById("email").value;
    const isValid = /^\S+@\S+\.\S+$/.test(confirmEmail) && confirmEmail === email;
    this.style.borderColor = isValid ? "" : "red";
});

document.querySelector(".book-btn").addEventListener("click", function(){
    if(total === 0){
        alert("add at least 1 item");
        return;
    }

    const name = document.getElementById("name").value;
    if(!name.trim()){
        alert("Please enter your name");
        return;
    }

    const email = document.getElementById("email").value;
    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    if(!isValidEmail){
        alert("Please enter a valid email address");
        return;
    }

    const confirmEmail = document.getElementById("confirmEmail").value;
    if(email !== confirmEmail){
        alert("Emails do not match");
        return;
    }

    const items = document.querySelectorAll("#cartItems p");
    let services = "";
    items.forEach(function(item){
        services += item.innerText + "\n";
    });

    const totalAmount = document.getElementById("total").innerText;

    emailjs.send(config.serviceId, config.templateId, {
        name: name,
        to_email: email,
        services: services,
        total: totalAmount
    }).then(function(){
        alert("Booking successful! Confirmation email sent.");
        document.getElementById("message").innerText = "Thank you for booking our service!";
        setTimeout(function(){
            document.getElementById("message").innerText = "";
        }, 5000);

        document.getElementById("cartItems").innerHTML = "";
        const noItems = document.createElement("p");
        noItems.innerText = "No items added";
        cart.appendChild(noItems);

        total = 0;
        document.getElementById("total").innerText = total;

        const buttons = document.querySelectorAll(".add-btn");
        buttons.forEach(function(btn){
            btn.innerText = "Add Item";
            btn.style.backgroundColor = "";
        });

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("confirmEmail").value = "";
        document.getElementById("phone").value = "";
    }).catch(function(error){
        alert("Error sending email: " + error.text);
    });
});

// Newsletter subscription form handling
// This is a simple beginner-friendly code for alert and validation.
const newsletterForm = document.querySelector(".subscribe-form");
newsletterForm.addEventListener("submit", function(event) {
    event.preventDefault(); // stop form from reloading page

    const newsletterName = this.querySelector("input[type='text']").value.trim();
    const newsletterEmail = this.querySelector("input[type='email']").value.trim();

    // simple email validation: must contain @ and . and not be empty
    if (!newsletterName) {
        alert("Please enter your name.");
        return;
    }

    if (!newsletterEmail || newsletterEmail.indexOf("@") === -1 || newsletterEmail.indexOf(".") === -1) {
        alert("Please enter a valid email address (example@example.com).");
        return;
    }

    // success message
    alert("Thanks for subscribing, " + newsletterName + "!");

    // optional: clear inputs after successful submit
    this.querySelector("input[type='text']").value = "";
    this.querySelector("input[type='email']").value = "";
});
