# 🧺 Laundrymart Booking Website

## 📌 Project Description

This is a responsive laundrymart Booking Website where users can select services, add them to a cart, and book them online. The project is built using HTML, CSS, and JavaScript, focusing on beginner-friendly structure and functionality.

---

## ✨ Features

* Add services to cart
* Dynamic total price calculation
* Booking form with user details
* Email confirmation using EmailJS
* Form validation (email & phone)
* Responsive design for all devices
* Success and error messages for user actions

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* EmailJS

---

## ⚙️ How to Run Locally

1. Download or clone this repository
2. Open the project folder
3. Open `index.html` in your browser

---

## 📧 EmailJS Setup

1. Create an account on EmailJS

2. Add an Email Service (e.g., Gmail)

3. Create an Email Template

4. Copy your:

   * Service ID
   * Template ID
   * Public Key

5. Add them in your JavaScript file:

```
emailjs.init("YOUR_PUBLIC_KEY");

emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
  name: "User Name",
  email: "user@email.com",
});
```

---

## 🚀 Deployment

This project can be deployed using Netlify:

1. Go to Netlify
2. Drag and drop your project folder
3. Get your live website link

---

## 🔐 Security Note

This project uses the EmailJS public key in the frontend, which is safe to expose.
In a production-level application, sensitive API keys should be stored in environment variables (.env) and handled through a backend server.

---

## 📷 Future Improvements

* Add backend integration
* Store bookings in database
* User authentication system
* Payment integration

---

## 🙌 Author

Created by Khushhal Kumar

---
