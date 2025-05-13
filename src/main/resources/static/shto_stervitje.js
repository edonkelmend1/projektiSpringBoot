document.addEventListener("DOMContentLoaded", () => {

const user = JSON.parse(localStorage.getItem("user"));

if(!user){

window.location.href = "index.html";
return;
}


const form = document.getElementById("stervitjaForm");
const statusDiv = document.getElementById("status");

form.addEventListener("submit", async (e) => {
e.preventDefault();

const data = document.getElementById("data").value;
const hapat = parseInt(document.getElementById("hapat").value);
const kalorite = parseInt(document.getElementById("kalorite").value);
const distanca = parseFloat(document.getElementById("distanca").value);
const pulsi_max = parseInt(document.getElementById("pulsi_max").value);
const pulsi_para_stervitjes = parseInt(document.getElementById("pulsi_para_stervitjes").value);

const entry = {

perdoruesiId: user.id,
data: data,
hapat: hapat,
kalorite_e_humbura: kalorite,
distanca: distanca,
pulsi_maksimal_gjate_stervitjes: pulsi_max,
pulsi_para_stervitjes: pulsi_para_stervitjes
};

try{
    const response = await fetch(`http://localhost:8080/api/stervitja/${user.id}`, {

    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(entry)



    });
    if(response.ok){
    statusDiv.innerHTML = `<div class="alert alert-success">Te dhenat u ruajten me sukses!</div>`;
    form.reset();





} else{
const error = await response.text();
statusDiv.innerHTML = `<div class="alert alert-danger"> Gabim: ${error}</div>`;
}
} catch (err) {

console.error(err);
}

});


});