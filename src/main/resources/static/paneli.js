document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let data = [];
    let chart;

    const today = new Date().toISOString().split("T")[0];
document.getElementById("startDate").max = today;
document.getElementById("endDate").max = today;


document.getElementById("filterByRangeBtn").addEventListener("click", () => {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  if (!startDate || !endDate || startDate > endDate) {
    alert("Ju lutem jepni një datë fillimi dhe përfundimi të vlefshme.");
    return;
  }

  const filteredData = data.filter(entry => {
    const entryDate = entry.data.split("T")[0];
    return entryDate >= startDate && entryDate <= endDate;
  });

  
  chart.data.labels = filteredData.map(entry => entry.data);
  chart.data.datasets[0].data = filteredData.map(entry => entry.hapat);
  chart.data.datasets[1].data = filteredData.map(entry => entry.kalorite_e_humbura);
  chart.data.datasets[2].data = filteredData.map(entry => entry.distanca);
  chart.update();

  
  if (filteredData.length > 0) {
    const latest = filteredData[filteredData.length - 1];
    document.getElementById("steps-box").textContent = `Hapat: ${latest.hapat}`;
    document.getElementById("calories-box").textContent = `Kalorite e humbura: ${latest.kalorite_e_humbura}`;
    document.getElementById("distance-box").textContent = `Distanca: ${latest.distanca} km`;
  } else {
    document.getElementById("steps-box").textContent = `Hapat: -`;
    document.getElementById("calories-box").textContent = `Kalorite e humbura: -`;
    document.getElementById("distance-box").textContent = `Distanca: -`;
  }


  const stervitjaList = document.getElementById("stervitjet-list");
  stervitjaList.innerHTML = "";
  filteredData.forEach(stervitje => {
    const stervitjaDiv = document.createElement("div");
    stervitjaDiv.classList.add("teDhenat-stervitja", "my-3");
    stervitjaDiv.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>Data:</strong> ${stervitje.data}<br>
          <strong>Hapat:</strong> ${stervitje.hapat}<br>
          <strong>Kalorite:</strong> ${stervitje.kalorite_e_humbura}<br>
          <strong>Distanca:</strong> ${stervitje.distanca} km
        </div>
        <div>
          <button class="btn btn-primary btn-sm edit-btn" data-id="${stervitje.id}">Edit</button>
          <button class="btn btn-primary btn-sm delete-btn" data-id="${stervitje.id}">Delete</button>
        </div>
      </div>
    `;
    stervitjaList.appendChild(stervitjaDiv);
  });
});


    if(!user){
    window.location.href = "index.html";
    return;
    }

    const usernameDisplay = document.getElementById("username-display").textContent = user.username;

    const logoutBtn = document.getElementById("logoutBtn");
    if(logoutBtn){
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.href = "index.html";
        });

    }






    try {

        const response = await fetch(`https://ancient-oasis-62824-6c7097a4f2bf.herokuapp.com/api/stervitja/perdoruesi/${user.id}`);
        data = await response.json();
        const stervitjaList = document.getElementById("stervitjet-list")

        if(data.length > 0){

        const latest = data[data.length - 1];


        document.getElementById("steps-box").textContent = `Hapat: ${latest.hapat}`;
        document.getElementById("calories-box").textContent = `Kalorite e humbura: ${latest.kalorite_e_humbura}`;
        document.getElementById("distance-box").textContent = `Distanca: ${latest.distanca} km`;


            const labels = data.map(entry => entry.data);
                const hapat = data.map(entry => entry.hapat);
                const kalorite = data.map(entry => entry.kalorite_e_humbura);
                const distanca = data.map(entry => entry.distanca);
         const ctx = document.getElementById("stervitjaChart").getContext("2d");
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Hapat',
                        data: hapat,
                        borderColor: 'rgba(25, 133, 83, 0.9)',
                        fill: true,
                        tension: 0.4,


                },
                {
                label: 'Kalorite e humbura',
                data: kalorite,
                borderColor: 'rgba(13, 202, 240, 0.9)',
                fill: true,
                tension: 0.4,


                },
                {
                label: 'Distanca (km)',
                data: distanca,
                borderColor: 'rgba(255, 193, 7, 0.9)',
                fill: true,
                tension: 0.4,


                }]
                },
                options: {
                responsive: true,
                plugins: {
                    legend: {
                    position: 'top'
                    },
                    title: {
                    display: true,
                    text: 'Progresi i stervitjeve'
                    }
                },
                scales: {
                y: {
                    beginAtZero: true,
                title: {
                    display: true,
                    text: 'Vlera'
                }
                }
                }
                }



            });

            data.forEach(stervitje => {
            const stervitjaDiv = document.createElement("div");

            stervitjaDiv.classList.add("teDhenat-stervitja", "my-3");
            stervitjaDiv.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                <div>
                    <strong>Data:</strong> ${stervitje.data}<br>
                    <strong>Hapat:</strong> ${stervitje.hapat}<br>
                    <strong>Kalorite:</strong>${stervitje.kalorite_e_humbura}<br>
                    <strong>Distanca:</strong>${stervitje.distanca} km
                    </div>
                    <div>
                    <button class="btn btn-primary btn-sm edit-btn" data-id="${stervitje.id}">Edit</button>
                    <button class="btn btn-primary btn-sm delete-btn" data-id="${stervitje.id}">Delete</button>
                    </div>

                    </div>



            `;
            stervitjaList.appendChild(stervitjaDiv);

            });
            document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const stervitjaId = event.target.dataset.id;
                window.location.href = `edit_stervitje.html?id=${stervitjaId}`;

            });

            });
            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", async (event) => {
                    const stervitjaId = event.target.dataset.id;

                    try {
                        const response = await fetch(`https://ancient-oasis-62824-6c7097a4f2bf.herokuapp.com/api/stervitja/${stervitjaId}`, {
                            method: 'DELETE',



                        });
                        if(response.ok){
                        event.target.closest(".teDhenat-stervitja").remove();
                        }

                     else {
                        alert("Error");
                    }
                    }
                 catch (err) {
                    console.error("Error", err);
                }
            });
            });




             /* const zgjedh_daten = document.getElementById("zgjedh_daten");
                zgjedh_daten.max = new Date().toISOString().split("T")[0];

                zgjedh_daten.addEventListener("change", () => {
                    const data_e_zgjedhur = zgjedh_daten.value;

                    const te_dhenat = data.filter(entry => entry.data.split("T")[0] === data_e_zgjedhur);
                if(te_dhenat.length > 0) {
                    const entry = te_dhenat[0];
                    document.getElementById("steps-box").textContent = `Hapat: ${entry.hapat}`;
                    document.getElementById("calories-box").textContent = `Kalorite e humbura: ${entry.kalorite_e_humbura}`;
                    document.getElementById("distance-box").textContent = `Distanca: ${entry.distanca}`;

                    chart.data.labels = [entry.data];
                    chart.data.datasets[0].data = [entry.hapat];
                    chart.data.datasets[1].data = [entry.kalorite_e_humbura];
                    chart.data.datasets[2].data = [entry.distanca];
                    chart.update();

                }else{

                 document.getElementById("steps-box").textContent = `Hapat: -`;
                                    document.getElementById("calories-box").textContent = `Kalorite e humbura: -`;
                                    document.getElementById("distance-box").textContent = `Distanca: -`;

                                 chart.data.labels = [];
                                 chart.data.datasets.forEach(ds => ds.data = []);
                                 chart.update();
                }


                }); */

                document.getElementById("reset-view-btn").addEventListener("click", () => {
                    const reset_btn = data[data.length - 1];
                    document.getElementById("steps-box").textContent = `Hapat: ${reset_btn.hapat}`;
                                        document.getElementById("calories-box").textContent = `Kalorite e humbura: ${reset_btn.kalorite_e_humbura}`;
                                        document.getElementById("distance-box").textContent = `Distanca: ${reset_btn.distanca} km`;


                     chart.data.labels = data.map(entry => entry.data);
                     chart.data.datasets[0].data = data.map(entry => entry.hapat);
                     chart.data.datasets[1].data = data.map(entry => entry.kalorite_e_humbura);
                     chart.data.datasets[2].data = data.map(entry => entry.distanca);
                     chart.update();

                     zgjedh_daten.value = "";


                });

        }


                const shtoBtn = document.getElementById("shtoStervitjeBtn");
                if(shtoBtn){
                shtoBtn.addEventListener("click", () => {
                    console.log("Clicked");
                    window.location.href = "shto_stervitje.html";
                });
                







        }else{
         document.getElementById("steps-box").textContent = `Steps: -`;
                document.getElementById("calories-box").textContent = `Calories Burned: -`;
                document.getElementById("distance-box").textContent = ` - km`;
        }

        }catch (err) {
        console.error("Deshtoi", err);
        }




});
