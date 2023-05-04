var payment = JSON.parse(localStorage.getItem("payment")) || {};
var table = document.querySelector("table");

let entry = Object.entries(payment);
showData(entry);

function showData(entry) {
    table.innerHTML = "";

    for (let i = 0; i < entry.length; ++i) {
        const [key, value] = entry[i];
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let td2 = document.createElement("td");

        td1.innerText = key;
        td2.innerText = value;
        console.log(key, value);

        tr.append(td1, td2);
        table.append(tr);
    }
}