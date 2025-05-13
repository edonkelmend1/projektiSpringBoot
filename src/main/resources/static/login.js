document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("loginForm");





form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const errorMessageElement = document.getElementById("error-message");

    errorMessageElement.textContent = "";


    try {

        const response = await fetch("https://ancient-oasis-62824-6c7097a4f2bf.herokuapp.com/api/perdoruesit/login", {

                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
        });
        if(response.ok){
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "paneli.html";

        }else{
        const text = await response.text();
        console.error("Gabim nga serveri: ", text);
        errorMessageElement.textContent = "Emri i perdoruesit ose fjalekalimi eshte i pasakte.";
        }


    } catch (err) {
    console.error("Gabim ne login:", err);
    alert("Ka ndodhur nje gabim gjate perpunimit.")
    }

});

});