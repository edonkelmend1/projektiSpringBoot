document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("registerForm");
const messageDiv = document.getElementById("register-message");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const username = document.getElementById("register-username").value;
const password = document.getElementById("register-password").value;

try {

const response = await fetch("http://localhost:8080/api/perdoruesit/regjistro", {

    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })



});

if(response.ok){
messageDiv.textContent = "Regjistrimi u krye me sukses! Tani mund te kyceni me llogarine tuaj";
messageDiv.className = "success";
}else {
const errorText = await response.text();
messageDiv.textContent = errorText || "Gabim gjate regjistrimit.";
messageDiv.className = "error";
}

}catch (err) {
console.error("Gabim ne regjistrim: ",err);
messageDiv.textContent = "Ka ndodhur nje gabim.";
messageDiv.className = "error";
}

});


});