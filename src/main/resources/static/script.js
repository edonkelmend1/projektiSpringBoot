const API = "https://ancient-oasis-62824-6c7097a4f2bf.herokuapp.com/api/perdoruesit";

function login(){

const username = document.getElementById("login-username").value;
const password = document.getElementById("login-password").value;

fetch(`${API}/login`, {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })


})
.then(res => {

    if(!res.ok) throw new Error("Login failed");
    return res.json();

})
.then(data => {

    localStorage.setItem("perdoruesiId", data.id);
    window.location.href= "dashboard.html";


})
.catch(err => alert(err.message));

}


function register(){

    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    fetch(`${API}/regjistro`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })


    })
    .then(res => {

        if(!res.ok) throw new Error("Regjistrimi deshtoi!");
        return res.json();


    })
    .then(() => alert("Jeni regjistruar me sukses, tani mund te kyceni!"))
    .catch(err => alert(err.message));


}