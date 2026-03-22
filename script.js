const config = {
    publicKey: "-ZqbNnlOKiPFUgH7S",
    serviceId: "service_du9dmui",
    templateId: "template_blkkk5s"
};

emailjs.init(config.publicKey);

let total = 0;

const cart = document.getElementById("cartItems");
const totalDisplay = document.getElementById("total");

// Add / Remove Items
document.querySelectorAll(".add-btn").forEach(btn => {
    btn.onclick = function () {
        const name = this.parentElement.querySelector("span").innerText;
        const price = Number(this.dataset.price);

        if (this.innerText === "Add Item") {
            const item = document.createElement("p");
            item.innerText = name + " - ₹" + price;
            cart.appendChild(item);

            total += price;
            this.innerText = "Remove Item";
            this.style.backgroundColor = "red";
        } else {
            [...cart.children].forEach(p => {
                if (p.innerText.startsWith(name)) p.remove();
            });

            total -= price;
            this.innerText = "Add Item";
            this.style.backgroundColor = "";
        }

        totalDisplay.innerText = total;

        if (cart.children.length === 0) {
            cart.innerHTML = "<p>No items added</p>";
        }
    };
});

// Email validation (simple)
function validEmail(email) {
    return email.includes("@") && email.includes(".");
}

// Booking button
document.querySelector(".book-btn").onclick = function () {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirmEmail").value;

    if (total === 0) return alert("Add at least 1 item");
    if (!name) return alert("Enter your name");
    if (!validEmail(email)) return alert("Enter valid email");
    if (email !== confirmEmail) return alert("Emails do not match");

    let services = "";
    document.querySelectorAll("#cartItems p").forEach(p => {
        services += p.innerText + "\n";
    });

    emailjs.send(config.serviceId, config.templateId, {
        name: name,
        to_email: email,
        services: services,
        total: total
    })
    .then(() => {
        alert("Booking successful!");

        cart.innerHTML = "<p>No items added</p>";
        total = 0;
        totalDisplay.innerText = total;

        document.querySelectorAll(".add-btn").forEach(btn => {
            btn.innerText = "Add Item";
            btn.style.backgroundColor = "";
        });

        document.querySelectorAll("input").forEach(input => input.value = "");
    })
    .catch(err => alert("Error: " + err.text));
};

// Newsletter
document.querySelector(".subscribe-form").onsubmit = function (e) {
    e.preventDefault();

    const name = this.querySelector("input[type='text']").value.trim();
    const email = this.querySelector("input[type='email']").value.trim();

    if (!name) return alert("Enter your name");
    if (!validEmail(email)) return alert("Enter valid email");

    alert("Thanks for subscribing, " + name + "!");
    this.reset();
};